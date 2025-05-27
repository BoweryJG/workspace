import React, { useState, useEffect, useRef } from 'react';
import {
  Box,
  IconButton,
  Typography,
  Paper,
  LinearProgress,
  Fade,
  Chip,
  Stack,
  Alert,
  Tooltip
} from '@mui/material';
import { styled, alpha, keyframes } from '@mui/material/styles';
import {
  Mic as MicIcon,
  MicOff as MicOffIcon,
  GraphicEq as SoundWaveIcon,
  Psychology as AIIcon
} from '@mui/icons-material';
import { useSoundEffects } from '../hooks/useSoundEffects';

// Pulse animation for recording
const pulse = keyframes`
  0% {
    box-shadow: 0 0 0 0 rgba(138, 116, 249, 0.7);
    transform: scale(1);
  }
  70% {
    box-shadow: 0 0 0 20px rgba(138, 116, 249, 0);
    transform: scale(1.05);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(138, 116, 249, 0);
    transform: scale(1);
  }
`;

const RecordButton = styled(IconButton)(({ theme, recording }) => ({
  width: 80,
  height: 80,
  background: recording 
    ? `linear-gradient(135deg, ${theme.palette.error.main} 0%, ${theme.palette.error.dark} 100%)`
    : `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
  color: 'white',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'scale(1.1)',
    boxShadow: theme.shadows[8],
  },
  ...(recording && {
    animation: `${pulse} 2s infinite`,
  }),
}));

const VoiceVisualizer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: theme.spacing(0.5),
  height: 60,
  '& .bar': {
    width: 4,
    background: `linear-gradient(to top, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
    borderRadius: 2,
    transition: 'height 0.1s ease',
  }
}));

const TranscriptBox = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  background: alpha(theme.palette.background.paper, 0.8),
  backdropFilter: 'blur(10px)',
  border: `1px solid ${theme.palette.divider}`,
  minHeight: 100,
  maxHeight: 200,
  overflow: 'auto',
}));

const VoiceInput = ({ onTranscript, onCommand }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [interimTranscript, setInterimTranscript] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [audioLevel, setAudioLevel] = useState(0);
  const [bars, setBars] = useState(Array(12).fill(20));
  const [error, setError] = useState(null);
  
  const recognitionRef = useRef(null);
  const audioContextRef = useRef(null);
  const analyserRef = useRef(null);
  const microphoneRef = useRef(null);
  const animationFrameRef = useRef(null);
  
  const { play } = useSoundEffects();

  useEffect(() => {
    // Check if browser supports speech recognition
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    
    if (!SpeechRecognition) {
      setError('Speech recognition is not supported in your browser');
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = 'en-US';

    recognition.onresult = (event) => {
      let finalTranscript = '';
      let interimTranscript = '';

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          finalTranscript += transcript + ' ';
        } else {
          interimTranscript += transcript;
        }
      }

      if (finalTranscript) {
        setTranscript(prev => prev + finalTranscript);
        processCommand(finalTranscript);
      }
      setInterimTranscript(interimTranscript);
    };

    recognition.onerror = (event) => {
      console.error('Speech recognition error:', event.error);
      setError(`Speech recognition error: ${event.error}`);
      stopRecording();
    };

    recognition.onend = () => {
      if (isRecording) {
        recognition.start(); // Restart if still recording
      }
    };

    recognitionRef.current = recognition;

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isRecording]);

  const processCommand = (text) => {
    const lowerText = text.toLowerCase().trim();
    
    // Check for specific commands
    if (lowerText.includes('find doctor') || lowerText.includes('search for doctor')) {
      const nameMatch = text.match(/doctor\s+(\w+(?:\s+\w+)*)/i);
      if (nameMatch) {
        onCommand({ 
          type: 'search_doctor', 
          query: nameMatch[1],
          fullText: text 
        });
        play('success');
      }
    } else if (lowerText.includes('new report') || lowerText.includes('start report')) {
      onCommand({ 
        type: 'new_report',
        fullText: text 
      });
      play('success');
    } else if (lowerText.includes('show') && lowerText.includes('cardiology')) {
      onCommand({ 
        type: 'filter_specialty', 
        specialty: 'Cardiology',
        fullText: text 
      });
      play('success');
    } else {
      // General transcript
      onTranscript(text);
    }
  };

  const startRecording = async () => {
    try {
      setError(null);
      play('click');
      
      // Start speech recognition
      recognitionRef.current?.start();
      
      // Get audio stream for visualization
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      microphoneRef.current = stream;
      
      // Set up audio analysis
      audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
      analyserRef.current = audioContextRef.current.createAnalyser();
      analyserRef.current.fftSize = 256;
      
      const source = audioContextRef.current.createMediaStreamSource(stream);
      source.connect(analyserRef.current);
      
      setIsRecording(true);
      visualizeAudio();
    } catch (error) {
      console.error('Error starting recording:', error);
      setError('Unable to access microphone. Please check permissions.');
    }
  };

  const stopRecording = () => {
    play('click');
    setIsRecording(false);
    
    // Stop speech recognition
    recognitionRef.current?.stop();
    
    // Stop audio stream
    if (microphoneRef.current) {
      microphoneRef.current.getTracks().forEach(track => track.stop());
      microphoneRef.current = null;
    }
    
    // Clean up audio context
    if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
      audioContextRef.current.close();
    }
    
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
    
    setBars(Array(12).fill(20));
    
    // Process final transcript if any
    if (transcript) {
      setIsProcessing(true);
      setTimeout(() => {
        setIsProcessing(false);
        play('success');
      }, 1000);
    }
  };

  const visualizeAudio = () => {
    if (!analyserRef.current || !isRecording) return;
    
    const dataArray = new Uint8Array(analyserRef.current.frequencyBinCount);
    analyserRef.current.getByteFrequencyData(dataArray);
    
    // Calculate average volume
    const average = dataArray.reduce((a, b) => a + b) / dataArray.length;
    setAudioLevel(average / 255);
    
    // Update visualization bars
    const newBars = [];
    const barCount = 12;
    const step = Math.floor(dataArray.length / barCount);
    
    for (let i = 0; i < barCount; i++) {
      const value = dataArray[i * step];
      const height = Math.max(20, (value / 255) * 60);
      newBars.push(height);
    }
    
    setBars(newBars);
    
    animationFrameRef.current = requestAnimationFrame(visualizeAudio);
  };

  const handleToggleRecording = () => {
    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
  };

  const clearTranscript = () => {
    setTranscript('');
    setInterimTranscript('');
    play('click');
  };

  return (
    <Box sx={{ textAlign: 'center', p: 3 }}>
      <Stack spacing={3} alignItems="center">
        {/* Title */}
        <Typography variant="h5" gutterBottom>
          Voice Assistant
        </Typography>
        
        {/* Voice Commands Help */}
        <Stack direction="row" spacing={1} flexWrap="wrap" justifyContent="center">
          <Chip 
            size="small" 
            label="Say: Find doctor [name]" 
            variant="outlined" 
          />
          <Chip 
            size="small" 
            label="Say: New report" 
            variant="outlined" 
          />
          <Chip 
            size="small" 
            label="Say: Show cardiology doctors" 
            variant="outlined" 
          />
        </Stack>
        
        {/* Error Alert */}
        {error && (
          <Alert severity="error" onClose={() => setError(null)}>
            {error}
          </Alert>
        )}
        
        {/* Audio Visualizer */}
        {isRecording && (
          <Fade in={isRecording}>
            <VoiceVisualizer>
              {bars.map((height, index) => (
                <Box
                  key={index}
                  className="bar"
                  sx={{
                    height: `${height}px`,
                    opacity: 0.8 + (index % 2) * 0.2,
                  }}
                />
              ))}
            </VoiceVisualizer>
          </Fade>
        )}
        
        {/* Record Button */}
        <Tooltip title={isRecording ? "Stop recording" : "Start recording"}>
          <RecordButton
            recording={isRecording}
            onClick={handleToggleRecording}
            disabled={!!error}
          >
            {isRecording ? (
              <MicOffIcon sx={{ fontSize: 40 }} />
            ) : (
              <MicIcon sx={{ fontSize: 40 }} />
            )}
          </RecordButton>
        </Tooltip>
        
        {/* Status */}
        <Typography variant="body2" color="text.secondary">
          {isRecording ? 'Listening...' : 'Click to start voice input'}
        </Typography>
        
        {/* Transcript Box */}
        {(transcript || interimTranscript) && (
          <Fade in={true}>
            <TranscriptBox elevation={0} sx={{ width: '100%', maxWidth: 500 }}>
              <Stack spacing={1}>
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                  <Typography variant="caption" color="text.secondary">
                    Transcript
                  </Typography>
                  <IconButton size="small" onClick={clearTranscript}>
                    ×
                  </IconButton>
                </Stack>
                <Typography variant="body1">
                  {transcript}
                  <span style={{ color: 'text.secondary', fontStyle: 'italic' }}>
                    {interimTranscript}
                  </span>
                </Typography>
              </Stack>
            </TranscriptBox>
          </Fade>
        )}
        
        {/* Processing Indicator */}
        {isProcessing && (
          <Stack spacing={1} alignItems="center">
            <LinearProgress sx={{ width: 200 }} />
            <Typography variant="caption" color="text.secondary">
              <AIIcon sx={{ fontSize: 16, mr: 0.5, verticalAlign: 'middle' }} />
              Processing command...
            </Typography>
          </Stack>
        )}
        
        {/* Audio Level Indicator */}
        {isRecording && (
          <Box sx={{ position: 'absolute', bottom: 0, left: 0, right: 0 }}>
            <LinearProgress
              variant="determinate"
              value={audioLevel * 100}
              sx={{
                height: 2,
                backgroundColor: 'transparent',
                '& .MuiLinearProgress-bar': {
                  background: 'linear-gradient(90deg, #8A74F9 0%, #00D4FF 100%)',
                }
              }}
            />
          </Box>
        )}
      </Stack>
    </Box>
  );
};

export default VoiceInput;