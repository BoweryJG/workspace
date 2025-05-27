import React, { useRef, useCallback, useMemo, useState, useEffect } from 'react';
import ForceGraph3D from 'react-force-graph-3d';
import * as THREE from 'three';
import { 
  Box, 
  Paper, 
  Typography, 
  IconButton, 
  Stack,
  Chip,
  Tooltip,
  Fade,
  Card,
  CardContent,
  Avatar,
  Button,
  ButtonGroup,
  Slider,
  FormControlLabel,
  Switch
} from '@mui/material';
import { styled, alpha } from '@mui/material/styles';
import {
  Fullscreen as FullscreenIcon,
  FullscreenExit as FullscreenExitIcon,
  CenterFocusStrong as CenterIcon,
  FilterList as FilterIcon,
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon,
  ZoomIn as ZoomInIcon,
  ZoomOut as ZoomOutIcon,
  ThreeDRotation as Rotate3DIcon,
  Pause as PauseIcon,
  PlayArrow as PlayIcon
} from '@mui/icons-material';
import { designTokens } from '../styles/designTokens';

const GraphContainer = styled(Paper)(({ theme, fullscreen }) => ({
  position: fullscreen ? 'fixed' : 'relative',
  top: fullscreen ? 0 : 'auto',
  left: fullscreen ? 0 : 'auto',
  right: fullscreen ? 0 : 'auto',
  bottom: fullscreen ? 0 : 'auto',
  zIndex: fullscreen ? theme.zIndex.modal : 'auto',
  background: theme.palette.mode === 'dark' 
    ? alpha(theme.palette.background.default, 0.95)
    : alpha(theme.palette.background.paper, 0.95),
  backdropFilter: 'blur(10px)',
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: fullscreen ? 0 : theme.shape.borderRadius,
  overflow: 'hidden',
}));

const ControlPanel = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: theme.spacing(2),
  right: theme.spacing(2),
  zIndex: 10,
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(1),
}));

const InfoPanel = styled(Card)(({ theme }) => ({
  position: 'absolute',
  bottom: theme.spacing(2),
  left: theme.spacing(2),
  width: 300,
  maxHeight: 400,
  overflow: 'auto',
  background: alpha(theme.palette.background.paper, 0.9),
  backdropFilter: 'blur(10px)',
  zIndex: 10,
}));

const LegendChip = styled(Chip)(({ theme, color }) => ({
  backgroundColor: color,
  color: theme.palette.getContrastText(color),
  fontWeight: 500,
}));

// Generate mock network data
const generateNetworkData = (centerDoctor) => {
  const nodes = [];
  const links = [];
  
  // Node types and their colors
  const nodeTypes = {
    doctor: { color: '#8A74F9', size: 8 },
    hospital: { color: '#00D4FF', size: 10 },
    product: { color: '#10B981', size: 6 },
    specialty: { color: '#F59E0B', size: 7 },
    conference: { color: '#EF4444', size: 5 },
  };
  
  // Add center doctor
  nodes.push({
    id: 'center-doctor',
    name: centerDoctor?.name || 'Dr. Sarah Chen',
    type: 'doctor',
    val: 12,
    color: nodeTypes.doctor.color,
    verified: true,
    specialty: centerDoctor?.specialty || 'Cardiology',
    hospital: centerDoctor?.hospital || 'Mayo Clinic',
  });
  
  // Add hospital
  nodes.push({
    id: 'hospital-1',
    name: centerDoctor?.hospital || 'Mayo Clinic',
    type: 'hospital',
    val: nodeTypes.hospital.size,
    color: nodeTypes.hospital.color,
  });
  links.push({ source: 'center-doctor', target: 'hospital-1', value: 3 });
  
  // Add specialty network
  nodes.push({
    id: 'specialty-1',
    name: centerDoctor?.specialty || 'Cardiology',
    type: 'specialty',
    val: nodeTypes.specialty.size,
    color: nodeTypes.specialty.color,
  });
  links.push({ source: 'center-doctor', target: 'specialty-1', value: 2 });
  
  // Add related doctors
  const relatedDoctors = [
    { name: 'Dr. Michael Roberts', specialty: 'Cardiology', verified: true },
    { name: 'Dr. Emily Johnson', specialty: 'Cardiology', verified: false },
    { name: 'Dr. James Wilson', specialty: 'Internal Medicine', verified: true },
    { name: 'Dr. Lisa Martinez', specialty: 'Cardiology', verified: true },
  ];
  
  relatedDoctors.forEach((doc, i) => {
    const docId = `doctor-${i + 1}`;
    nodes.push({
      id: docId,
      name: doc.name,
      type: 'doctor',
      val: nodeTypes.doctor.size,
      color: nodeTypes.doctor.color,
      verified: doc.verified,
      specialty: doc.specialty,
    });
    
    // Connect to center doctor
    links.push({ 
      source: 'center-doctor', 
      target: docId, 
      value: Math.random() * 2 + 1 
    });
    
    // Connect to specialty
    if (doc.specialty === (centerDoctor?.specialty || 'Cardiology')) {
      links.push({ source: docId, target: 'specialty-1', value: 1 });
    }
    
    // Some connect to hospital
    if (Math.random() > 0.5) {
      links.push({ source: docId, target: 'hospital-1', value: 1 });
    }
  });
  
  // Add products
  const products = ['CardioMax Pro', 'HeartGuard Plus', 'VascuLife'];
  products.forEach((product, i) => {
    const productId = `product-${i + 1}`;
    nodes.push({
      id: productId,
      name: product,
      type: 'product',
      val: nodeTypes.product.size,
      color: nodeTypes.product.color,
    });
    
    // Connect to some doctors
    const connectedDoctors = Math.floor(Math.random() * 3) + 1;
    for (let j = 0; j < connectedDoctors; j++) {
      const randomDoc = j === 0 ? 'center-doctor' : `doctor-${Math.floor(Math.random() * 4) + 1}`;
      links.push({ 
        source: randomDoc, 
        target: productId, 
        value: Math.random() + 0.5 
      });
    }
  });
  
  // Add conference connections
  nodes.push({
    id: 'conference-1',
    name: 'ACC 2024',
    type: 'conference',
    val: nodeTypes.conference.size,
    color: nodeTypes.conference.color,
  });
  
  links.push({ source: 'center-doctor', target: 'conference-1', value: 2 });
  links.push({ source: 'doctor-1', target: 'conference-1', value: 1 });
  
  return { nodes, links };
};

const RelationshipNetwork3D = ({ doctor, height = 600 }) => {
  const fgRef = useRef();
  const [fullscreen, setFullscreen] = useState(false);
  const [selectedNode, setSelectedNode] = useState(null);
  const [highlightNodes, setHighlightNodes] = useState(new Set());
  const [highlightLinks, setHighlightLinks] = useState(new Set());
  const [hoverNode, setHoverNode] = useState(null);
  const [controlsEnabled, setControlsEnabled] = useState(true);
  const [rotationSpeed, setRotationSpeed] = useState(0.5);
  const [linkOpacity, setLinkOpacity] = useState(0.6);
  const [showLabels, setShowLabels] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  
  const graphData = useMemo(() => generateNetworkData(doctor), [doctor]);

  useEffect(() => {
    if (fgRef.current && !isPaused) {
      // Auto-rotate camera
      const rotateCamera = () => {
        if (fgRef.current && controlsEnabled) {
          const angle = Date.now() * 0.0001 * rotationSpeed;
          const distance = 300;
          fgRef.current.cameraPosition({
            x: distance * Math.sin(angle),
            y: 100,
            z: distance * Math.cos(angle),
          });
        }
      };
      
      const interval = setInterval(rotateCamera, 50);
      return () => clearInterval(interval);
    }
  }, [controlsEnabled, rotationSpeed, isPaused]);

  const handleNodeClick = useCallback(node => {
    setSelectedNode(node);
    
    // Highlight connected nodes
    const connectedNodes = new Set();
    const connectedLinks = new Set();
    
    if (node) {
      connectedNodes.add(node);
      
      graphData.links.forEach(link => {
        if (link.source.id === node.id || link.target.id === node.id) {
          connectedLinks.add(link);
          connectedNodes.add(link.source);
          connectedNodes.add(link.target);
        }
      });
    }
    
    setHighlightNodes(connectedNodes);
    setHighlightLinks(connectedLinks);
    
    // Focus camera on node
    if (node && fgRef.current) {
      fgRef.current.centerAt(node.x, node.y, 1000);
      fgRef.current.zoom(2, 1000);
    }
  }, [graphData]);

  const handleNodeHover = useCallback(node => {
    setHoverNode(node);
    document.body.style.cursor = node ? 'pointer' : 'default';
  }, []);

  const resetView = () => {
    if (fgRef.current) {
      fgRef.current.centerAt(0, 0, 1000);
      fgRef.current.zoom(1, 1000);
    }
    setSelectedNode(null);
    setHighlightNodes(new Set());
    setHighlightLinks(new Set());
  };

  const toggleFullscreen = () => {
    setFullscreen(!fullscreen);
  };

  const nodeThreeObject = useCallback(node => {
    const group = new THREE.Group();
    
    // Main sphere
    const geometry = new THREE.SphereGeometry(node.val);
    const material = new THREE.MeshPhongMaterial({
      color: node.color,
      emissive: highlightNodes.has(node) ? node.color : 0x000000,
      emissiveIntensity: highlightNodes.has(node) ? 0.3 : 0,
      shininess: 100,
    });
    const sphere = new THREE.Mesh(geometry, material);
    group.add(sphere);
    
    // Add glow effect for highlighted nodes
    if (highlightNodes.has(node) || node === hoverNode) {
      const glowGeometry = new THREE.SphereGeometry(node.val * 1.5);
      const glowMaterial = new THREE.MeshBasicMaterial({
        color: node.color,
        transparent: true,
        opacity: 0.3,
      });
      const glow = new THREE.Mesh(glowGeometry, glowMaterial);
      group.add(glow);
    }
    
    // Add verified badge for doctors
    if (node.type === 'doctor' && node.verified) {
      const badgeGeometry = new THREE.SphereGeometry(2);
      const badgeMaterial = new THREE.MeshBasicMaterial({ color: 0x10B981 });
      const badge = new THREE.Mesh(badgeGeometry, badgeMaterial);
      badge.position.set(node.val * 0.7, node.val * 0.7, 0);
      group.add(badge);
    }
    
    return group;
  }, [highlightNodes, hoverNode]);

  const linkThreeObject = useCallback(link => {
    const material = new THREE.MeshBasicMaterial({
      color: highlightLinks.has(link) ? 0x00D4FF : 0x666666,
      transparent: true,
      opacity: highlightLinks.has(link) ? 0.8 : linkOpacity,
    });
    
    const geometry = new THREE.CylinderGeometry(
      highlightLinks.has(link) ? 1 : 0.5,
      highlightLinks.has(link) ? 1 : 0.5,
      1
    );
    
    return new THREE.Mesh(geometry, material);
  }, [highlightLinks, linkOpacity]);

  return (
    <GraphContainer elevation={3} fullscreen={fullscreen}>
      <Box sx={{ position: 'relative', height: fullscreen ? '100vh' : height }}>
        <ForceGraph3D
          ref={fgRef}
          graphData={graphData}
          nodeLabel={node => showLabels ? node.name : ''}
          nodeAutoColorBy="type"
          nodeThreeObject={nodeThreeObject}
          nodeThreeObjectExtend={true}
          linkThreeObject={linkThreeObject}
          linkThreeObjectExtend={true}
          linkOpacity={linkOpacity}
          linkWidth={link => highlightLinks.has(link) ? 2 : 1}
          onNodeClick={handleNodeClick}
          onNodeHover={handleNodeHover}
          enableNodeDrag={!controlsEnabled}
          enableNavigationControls={true}
          showNavInfo={false}
          backgroundColor={alpha('#000000', 0)}
        />
        
        {/* Control Panel */}
        <ControlPanel>
          <ButtonGroup orientation="vertical" variant="contained" size="small">
            <Tooltip title="Toggle fullscreen">
              <IconButton onClick={toggleFullscreen} size="small">
                {fullscreen ? <FullscreenExitIcon /> : <FullscreenIcon />}
              </IconButton>
            </Tooltip>
            
            <Tooltip title="Reset view">
              <IconButton onClick={resetView} size="small">
                <CenterIcon />
              </IconButton>
            </Tooltip>
            
            <Tooltip title="Toggle rotation">
              <IconButton onClick={() => setIsPaused(!isPaused)} size="small">
                {isPaused ? <PlayIcon /> : <PauseIcon />}
              </IconButton>
            </Tooltip>
            
            <Tooltip title="Toggle labels">
              <IconButton onClick={() => setShowLabels(!showLabels)} size="small">
                {showLabels ? <VisibilityIcon /> : <VisibilityOffIcon />}
              </IconButton>
            </Tooltip>
          </ButtonGroup>
        </ControlPanel>
        
        {/* Settings Panel */}
        <Box sx={{ 
          position: 'absolute', 
          top: 16, 
          left: 16, 
          width: 200,
          p: 2,
          background: alpha('#000', 0.6),
          borderRadius: 1,
          backdropFilter: 'blur(10px)',
        }}>
          <Typography variant="caption" color="text.secondary" gutterBottom>
            Controls
          </Typography>
          
          <Stack spacing={2}>
            <Box>
              <Typography variant="caption">Rotation Speed</Typography>
              <Slider
                size="small"
                value={rotationSpeed}
                onChange={(e, v) => setRotationSpeed(v)}
                min={0}
                max={2}
                step={0.1}
                disabled={isPaused}
              />
            </Box>
            
            <Box>
              <Typography variant="caption">Link Opacity</Typography>
              <Slider
                size="small"
                value={linkOpacity}
                onChange={(e, v) => setLinkOpacity(v)}
                min={0.1}
                max={1}
                step={0.1}
              />
            </Box>
          </Stack>
        </Box>
        
        {/* Info Panel */}
        {selectedNode && (
          <Fade in={true}>
            <InfoPanel>
              <CardContent>
                <Stack spacing={2}>
                  <Stack direction="row" alignItems="center" spacing={2}>
                    <Avatar 
                      sx={{ 
                        bgcolor: selectedNode.color,
                        width: 48,
                        height: 48 
                      }}
                    >
                      {selectedNode.type === 'doctor' ? '👨‍⚕️' : 
                       selectedNode.type === 'hospital' ? '🏥' :
                       selectedNode.type === 'product' ? '💊' :
                       selectedNode.type === 'specialty' ? '🔬' : '📅'}
                    </Avatar>
                    <Box>
                      <Typography variant="h6">
                        {selectedNode.name}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {selectedNode.type.charAt(0).toUpperCase() + selectedNode.type.slice(1)}
                      </Typography>
                    </Box>
                  </Stack>
                  
                  {selectedNode.type === 'doctor' && (
                    <>
                      <Divider />
                      <Typography variant="body2">
                        <strong>Specialty:</strong> {selectedNode.specialty}
                      </Typography>
                      {selectedNode.hospital && (
                        <Typography variant="body2">
                          <strong>Hospital:</strong> {selectedNode.hospital}
                        </Typography>
                      )}
                      {selectedNode.verified && (
                        <Chip 
                          label="Verified" 
                          color="success" 
                          size="small" 
                          icon={<CheckCircleIcon />}
                        />
                      )}
                    </>
                  )}
                  
                  <Divider />
                  <Typography variant="caption" color="text.secondary">
                    {highlightNodes.size - 1} connections
                  </Typography>
                </Stack>
              </CardContent>
            </InfoPanel>
          </Fade>
        )}
        
        {/* Legend */}
        <Box sx={{ 
          position: 'absolute', 
          bottom: 16, 
          right: 16,
          display: 'flex',
          gap: 1,
          flexWrap: 'wrap',
          maxWidth: 300,
        }}>
          <LegendChip label="Doctor" size="small" color="#8A74F9" />
          <LegendChip label="Hospital" size="small" color="#00D4FF" />
          <LegendChip label="Product" size="small" color="#10B981" />
          <LegendChip label="Specialty" size="small" color="#F59E0B" />
          <LegendChip label="Conference" size="small" color="#EF4444" />
        </Box>
      </Box>
    </GraphContainer>
  );
};

export default RelationshipNetwork3D;