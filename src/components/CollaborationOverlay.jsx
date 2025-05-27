import React, { useEffect, useRef } from 'react';
import {
  Box,
  Avatar,
  Chip,
  Tooltip,
  Typography,
  Fade,
  Paper,
  Stack,
  Badge,
  IconButton,
  Zoom
} from '@mui/material';
import {
  MouseOutlined,
  PersonPin,
  Groups,
  Close as CloseIcon
} from '@mui/icons-material';
import { alpha, styled } from '@mui/material/styles';
import { useCollaboration } from '../hooks/useCollaboration';

const CursorContainer = styled(Box)(({ theme }) => ({
  position: 'fixed',
  pointerEvents: 'none',
  zIndex: 9999,
  transition: 'all 0.1s ease-out'
}));

const Cursor = styled(Box)(({ theme, color }) => ({
  position: 'relative',
  width: 20,
  height: 20,
  '&::before': {
    content: '""',
    position: 'absolute',
    width: 0,
    height: 0,
    borderLeft: '8px solid transparent',
    borderRight: '8px solid transparent',
    borderTop: `12px solid ${color}`,
    transform: 'rotate(-45deg)',
    transformOrigin: 'top left'
  }
}));

const UserLabel = styled(Paper)(({ theme, color }) => ({
  position: 'absolute',
  top: 20,
  left: 20,
  padding: theme.spacing(0.5, 1),
  backgroundColor: color,
  color: theme.palette.getContrastText(color),
  fontSize: '0.75rem',
  fontWeight: 500,
  borderRadius: theme.shape.borderRadius,
  whiteSpace: 'nowrap',
  boxShadow: theme.shadows[2]
}));

const SelectionHighlight = styled(Box)(({ theme, color }) => ({
  position: 'absolute',
  backgroundColor: alpha(color, 0.2),
  border: `2px solid ${color}`,
  borderRadius: theme.shape.borderRadius,
  pointerEvents: 'none',
  transition: 'all 0.2s ease-out',
  '&::after': {
    content: 'attr(data-user)',
    position: 'absolute',
    top: -24,
    left: 0,
    fontSize: '0.7rem',
    backgroundColor: color,
    color: theme.palette.getContrastText(color),
    padding: '2px 6px',
    borderRadius: theme.shape.borderRadius,
    whiteSpace: 'nowrap'
  }
}));

const CollaboratorsList = styled(Paper)(({ theme }) => ({
  position: 'fixed',
  top: theme.spacing(10),
  right: theme.spacing(2),
  padding: theme.spacing(2),
  minWidth: 250,
  maxWidth: 350,
  maxHeight: 400,
  overflowY: 'auto',
  backgroundColor: alpha(theme.palette.background.paper, 0.95),
  backdropFilter: 'blur(10px)',
  border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
  boxShadow: theme.shadows[8]
}));

export const CollaborationOverlay = ({ roomId, onClose }) => {
  const {
    isConnected,
    users,
    cursors,
    selections,
    currentUserId,
    updateCursor
  } = useCollaboration(roomId);
  
  const [showCollaborators, setShowCollaborators] = React.useState(true);
  const containerRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      updateCursor({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [updateCursor]);

  // Get field positions for selection highlights
  const getFieldPosition = (fieldName) => {
    const element = document.querySelector(`[data-field="${fieldName}"]`);
    if (element) {
      const rect = element.getBoundingClientRect();
      return {
        top: rect.top,
        left: rect.left,
        width: rect.width,
        height: rect.height
      };
    }
    return null;
  };

  return (
    <>
      {/* Cursors */}
      {Array.from(cursors.entries()).map(([userId, position]) => {
        if (userId === currentUserId) return null;
        const user = users.find(u => u.id === userId);
        if (!user || !position) return null;

        return (
          <CursorContainer
            key={userId}
            style={{
              transform: `translate(${position.x}px, ${position.y}px)`
            }}
          >
            <Cursor color={user.color}>
              <UserLabel color={user.color}>
                {user.name}
              </UserLabel>
            </Cursor>
          </CursorContainer>
        );
      })}

      {/* Selection Highlights */}
      {Array.from(selections.entries()).map(([userId, selection]) => {
        if (userId === currentUserId || !selection?.active) return null;
        const user = users.find(u => u.id === userId);
        if (!user) return null;

        const position = getFieldPosition(selection.field);
        if (!position) return null;

        return (
          <SelectionHighlight
            key={`${userId}-${selection.field}`}
            color={user.color}
            data-user={user.name}
            style={position}
          />
        );
      })}

      {/* Collaborators List */}
      <Zoom in={showCollaborators}>
        <CollaboratorsList>
          <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
            <Stack direction="row" alignItems="center" spacing={1}>
              <Groups color="primary" />
              <Typography variant="h6">
                Active Collaborators
              </Typography>
            </Stack>
            <IconButton 
              size="small" 
              onClick={() => setShowCollaborators(false)}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          </Box>
          
          <Stack spacing={1.5}>
            {users.map(user => (
              <Box
                key={user.id}
                display="flex"
                alignItems="center"
                gap={1.5}
                p={1}
                sx={{
                  borderRadius: 1,
                  backgroundColor: theme => alpha(theme.palette.background.default, 0.5),
                  border: theme => `1px solid ${alpha(theme.palette.divider, 0.1)}`
                }}
              >
                <Badge
                  overlap="circular"
                  anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                  badgeContent={
                    <Box
                      sx={{
                        width: 10,
                        height: 10,
                        borderRadius: '50%',
                        backgroundColor: 'success.main',
                        border: '2px solid white'
                      }}
                    />
                  }
                >
                  <Avatar
                    sx={{
                      bgcolor: user.color,
                      width: 36,
                      height: 36,
                      fontSize: '0.875rem'
                    }}
                  >
                    {user.avatar}
                  </Avatar>
                </Badge>
                
                <Box flex={1}>
                  <Typography variant="body2" fontWeight={500}>
                    {user.name}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {user.id === currentUserId ? 'You' : 'Collaborating'}
                  </Typography>
                </Box>
                
                {cursors.has(user.id) && (
                  <Tooltip title="Active">
                    <MouseOutlined 
                      fontSize="small" 
                      sx={{ 
                        color: user.color,
                        animation: 'pulse 2s infinite'
                      }} 
                    />
                  </Tooltip>
                )}
              </Box>
            ))}
          </Stack>
          
          <Box mt={2} pt={2} borderTop={1} borderColor="divider">
            <Typography variant="caption" color="text.secondary">
              Room ID: {roomId}
            </Typography>
          </Box>
        </CollaboratorsList>
      </Zoom>

      {/* Floating indicator when list is hidden */}
      {!showCollaborators && users.length > 0 && (
        <Tooltip title="Show collaborators">
          <Chip
            icon={<Groups />}
            label={`${users.length} active`}
            onClick={() => setShowCollaborators(true)}
            color="primary"
            size="small"
            sx={{
              position: 'fixed',
              top: 80,
              right: 16,
              cursor: 'pointer'
            }}
          />
        </Tooltip>
      )}

      {/* CSS for pulse animation */}
      <style jsx global>{`
        @keyframes pulse {
          0% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
          100% {
            opacity: 1;
          }
        }
      `}</style>
    </>
  );
};