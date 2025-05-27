import React, { useRef, useEffect, useState } from 'react';
import { 
  Box, 
  Card, 
  CardContent, 
  Typography, 
  IconButton, 
  Chip, 
  alpha,
  Slider,
  FormControlLabel,
  Switch,
  Tooltip,
  Button
} from '@mui/material';
import {
  Fullscreen as FullscreenIcon,
  FullscreenExit as FullscreenExitIcon,
  Refresh as RefreshIcon,
  CenterFocusWeak as CenterIcon,
  ZoomIn as ZoomInIcon,
  ZoomOut as ZoomOutIcon,
  Info as InfoIcon
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { designTokens } from '../../styles/designTokens';

// Create a 2D relationship graph since three.js requires additional setup
const RelationshipGraph3D = ({ data }) => {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [zoom, setZoom] = useState(1);
  const [showLabels, setShowLabels] = useState(true);
  const [connectionStrength, setConnectionStrength] = useState(50);
  const [hoveredNode, setHoveredNode] = useState(null);

  // Mock data for the relationship graph
  const graphData = data || {
    nodes: [
      { id: 1, name: 'Dr. Sarah Johnson', type: 'doctor', influence: 85, x: 0, y: 0 },
      { id: 2, name: 'Mount Sinai Hospital', type: 'hospital', influence: 95, x: 150, y: -100 },
      { id: 3, name: 'CardioFlow Pro', type: 'product', influence: 70, x: -150, y: -100 },
      { id: 4, name: 'Dr. Michael Chen', type: 'doctor', influence: 75, x: 200, y: 50 },
      { id: 5, name: 'Mayo Clinic', type: 'hospital', influence: 98, x: -200, y: 50 },
      { id: 6, name: 'Dr. Emily Rodriguez', type: 'doctor', influence: 80, x: 0, y: 150 },
      { id: 7, name: 'NeuroSync 3000', type: 'product', influence: 65, x: 100, y: 100 },
      { id: 8, name: 'Johns Hopkins', type: 'hospital', influence: 96, x: -100, y: 100 }
    ],
    links: [
      { source: 1, target: 2, strength: 90 },
      { source: 1, target: 3, strength: 85 },
      { source: 2, target: 4, strength: 70 },
      { source: 4, target: 5, strength: 80 },
      { source: 4, target: 7, strength: 75 },
      { source: 6, target: 8, strength: 88 },
      { source: 6, target: 3, strength: 60 },
      { source: 5, target: 7, strength: 65 },
      { source: 8, target: 3, strength: 55 }
    ]
  };

  const getNodeColor = (type) => {
    switch (type) {
      case 'doctor': return designTokens.colors.primary[500];
      case 'hospital': return designTokens.colors.accent[500];
      case 'product': return designTokens.colors.success[500];
      default: return designTokens.colors.text.secondary;
    }
  };

  const drawGraph = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;

    // Clear canvas
    ctx.clearRect(0, 0, width, height);

    // Save context state
    ctx.save();

    // Apply zoom and center
    ctx.translate(width / 2, height / 2);
    ctx.scale(zoom, zoom);

    // Draw connections
    graphData.links.forEach(link => {
      if (link.strength < connectionStrength) return;

      const sourceNode = graphData.nodes.find(n => n.id === link.source);
      const targetNode = graphData.nodes.find(n => n.id === link.target);

      if (!sourceNode || !targetNode) return;

      ctx.beginPath();
      ctx.moveTo(sourceNode.x, sourceNode.y);
      ctx.lineTo(targetNode.x, targetNode.y);
      
      // Gradient line
      const gradient = ctx.createLinearGradient(
        sourceNode.x, sourceNode.y,
        targetNode.x, targetNode.y
      );
      gradient.addColorStop(0, alpha(getNodeColor(sourceNode.type), 0.3));
      gradient.addColorStop(1, alpha(getNodeColor(targetNode.type), 0.3));
      
      ctx.strokeStyle = gradient;
      ctx.lineWidth = Math.max(1, (link.strength / 100) * 3);
      ctx.stroke();
    });

    // Draw nodes
    graphData.nodes.forEach(node => {
      const isHovered = hoveredNode === node.id;
      const radius = 20 + (node.influence / 100) * 20;
      
      // Node glow effect
      if (isHovered) {
        ctx.beginPath();
        ctx.arc(node.x, node.y, radius + 10, 0, Math.PI * 2);
        const glowGradient = ctx.createRadialGradient(
          node.x, node.y, 0,
          node.x, node.y, radius + 10
        );
        glowGradient.addColorStop(0, alpha(getNodeColor(node.type), 0.4));
        glowGradient.addColorStop(1, alpha(getNodeColor(node.type), 0));
        ctx.fillStyle = glowGradient;
        ctx.fill();
      }

      // Node circle
      ctx.beginPath();
      ctx.arc(node.x, node.y, radius, 0, Math.PI * 2);
      
      const nodeGradient = ctx.createRadialGradient(
        node.x - radius / 3, node.y - radius / 3, 0,
        node.x, node.y, radius
      );
      nodeGradient.addColorStop(0, getNodeColor(node.type));
      nodeGradient.addColorStop(1, alpha(getNodeColor(node.type), 0.8));
      
      ctx.fillStyle = nodeGradient;
      ctx.fill();
      
      // Node border
      ctx.strokeStyle = alpha('#FFFFFF', 0.2);
      ctx.lineWidth = 2;
      ctx.stroke();

      // Node icon/text
      if (showLabels) {
        ctx.fillStyle = '#FFFFFF';
        ctx.font = `${12 / zoom}px Inter`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        
        // Icon based on type
        const icon = node.type === 'doctor' ? '👨‍⚕️' : 
                     node.type === 'hospital' ? '🏥' : '💊';
        ctx.font = `${16 / zoom}px Inter`;
        ctx.fillText(icon, node.x, node.y);
        
        // Name below node
        ctx.font = `${10 / zoom}px Inter`;
        ctx.fillText(node.name, node.x, node.y + radius + 15);
      }
    });

    // Restore context state
    ctx.restore();
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      drawGraph();
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Animation loop
    let rotation = 0;
    const animate = () => {
      rotation += 0.005;
      
      // Update node positions for 3D effect
      graphData.nodes.forEach((node, index) => {
        const angle = (index / graphData.nodes.length) * Math.PI * 2 + rotation;
        const baseRadius = 150;
        node.x = Math.cos(angle) * baseRadius;
        node.y = Math.sin(angle) * baseRadius * 0.6; // Elliptical orbit
      });

      drawGraph();
      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [zoom, showLabels, connectionStrength, hoveredNode]);

  const handleMouseMove = (e) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) / zoom;
    const y = (e.clientY - rect.top - rect.height / 2) / zoom;

    // Check if hovering over a node
    let foundNode = null;
    graphData.nodes.forEach(node => {
      const distance = Math.sqrt(Math.pow(x - node.x, 2) + Math.pow(y - node.y, 2));
      const radius = 20 + (node.influence / 100) * 20;
      if (distance <= radius) {
        foundNode = node.id;
      }
    });

    setHoveredNode(foundNode);
  };

  return (
    <Card
      sx={{
        borderRadius: designTokens.borderRadius.xl,
        backgroundColor: alpha(designTokens.colors.background.card, 0.6),
        backdropFilter: `blur(${designTokens.blur.md})`,
        border: `1px solid ${designTokens.colors.border.light}`,
        height: isFullscreen ? '100vh' : 600,
        position: isFullscreen ? 'fixed' : 'relative',
        top: isFullscreen ? 0 : 'auto',
        left: isFullscreen ? 0 : 'auto',
        right: isFullscreen ? 0 : 'auto',
        bottom: isFullscreen ? 0 : 'auto',
        zIndex: isFullscreen ? 9999 : 'auto',
      }}
    >
      <CardContent sx={{ height: '100%', display: 'flex', flexDirection: 'column', p: 3 }}>
        {/* Header */}
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
          <Box>
            <Typography variant="h6" fontWeight="bold">
              RepSphere Intelligence Graph
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Interactive relationship mapping between doctors, hospitals, and products
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Tooltip title="Reset view">
              <IconButton onClick={() => setZoom(1)} size="small">
                <CenterIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Zoom in">
              <IconButton onClick={() => setZoom(prev => Math.min(prev + 0.2, 3))} size="small">
                <ZoomInIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Zoom out">
              <IconButton onClick={() => setZoom(prev => Math.max(prev - 0.2, 0.5))} size="small">
                <ZoomOutIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title={isFullscreen ? "Exit fullscreen" : "Fullscreen"}>
              <IconButton onClick={() => setIsFullscreen(!isFullscreen)} size="small">
                {isFullscreen ? <FullscreenExitIcon /> : <FullscreenIcon />}
              </IconButton>
            </Tooltip>
          </Box>
        </Box>

        {/* Canvas */}
        <Box sx={{ flex: 1, position: 'relative', borderRadius: designTokens.borderRadius.lg, overflow: 'hidden' }}>
          <canvas
            ref={canvasRef}
            onMouseMove={handleMouseMove}
            style={{
              width: '100%',
              height: '100%',
              background: `radial-gradient(ellipse at center, ${alpha(designTokens.colors.primary[900], 0.2)} 0%, ${designTokens.colors.background.primary} 100%)`,
              cursor: hoveredNode ? 'pointer' : 'grab',
            }}
          />
          
          {/* Legend */}
          <Box
            sx={{
              position: 'absolute',
              top: 16,
              left: 16,
              backgroundColor: alpha(designTokens.colors.background.secondary, 0.9),
              backdropFilter: `blur(${designTokens.blur.md})`,
              borderRadius: designTokens.borderRadius.lg,
              p: 2,
              border: `1px solid ${designTokens.colors.border.light}`,
            }}
          >
            <Typography variant="caption" fontWeight="bold" gutterBottom display="block">
              Node Types
            </Typography>
            {['doctor', 'hospital', 'product'].map(type => (
              <Box key={type} sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                <Box
                  sx={{
                    width: 12,
                    height: 12,
                    borderRadius: '50%',
                    backgroundColor: getNodeColor(type),
                  }}
                />
                <Typography variant="caption" textTransform="capitalize">
                  {type === 'doctor' ? 'Doctors' : type === 'hospital' ? 'Hospitals' : 'Products'}
                </Typography>
              </Box>
            ))}
          </Box>

          {/* Hover Info */}
          {hoveredNode && (
            <Box
              sx={{
                position: 'absolute',
                bottom: 16,
                left: '50%',
                transform: 'translateX(-50%)',
                backgroundColor: alpha(designTokens.colors.background.secondary, 0.95),
                backdropFilter: `blur(${designTokens.blur.xl})`,
                borderRadius: designTokens.borderRadius.lg,
                p: 2,
                border: `1px solid ${designTokens.colors.border.light}`,
                minWidth: 200,
              }}
            >
              {(() => {
                const node = graphData.nodes.find(n => n.id === hoveredNode);
                return (
                  <>
                    <Typography variant="subtitle2" fontWeight="bold">
                      {node.name}
                    </Typography>
                    <Typography variant="caption" color="text.secondary" display="block">
                      {node.type === 'doctor' ? 'Medical Professional' : 
                       node.type === 'hospital' ? 'Healthcare Facility' : 'Medical Product'}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1 }}>
                      <Typography variant="caption">Influence Score:</Typography>
                      <Chip
                        label={`${node.influence}%`}
                        size="small"
                        sx={{
                          backgroundColor: alpha(getNodeColor(node.type), 0.2),
                          color: getNodeColor(node.type),
                        }}
                      />
                    </Box>
                  </>
                );
              })()}
            </Box>
          )}
        </Box>

        {/* Controls */}
        <Box sx={{ mt: 2, display: 'flex', gap: 3, alignItems: 'center' }}>
          <FormControlLabel
            control={
              <Switch
                checked={showLabels}
                onChange={(e) => setShowLabels(e.target.checked)}
                size="small"
              />
            }
            label="Show Labels"
          />
          <Box sx={{ flex: 1 }}>
            <Typography variant="caption" gutterBottom>
              Connection Strength Filter: {connectionStrength}%
            </Typography>
            <Slider
              value={connectionStrength}
              onChange={(e, value) => setConnectionStrength(value)}
              min={0}
              max={100}
              size="small"
              sx={{
                color: designTokens.colors.primary[500],
                '& .MuiSlider-thumb': {
                  backgroundColor: designTokens.colors.primary[500],
                },
              }}
            />
          </Box>
          <Button
            variant="outlined"
            startIcon={<InfoIcon />}
            size="small"
            sx={{ borderRadius: designTokens.borderRadius.lg }}
          >
            View Details
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default RelationshipGraph3D;