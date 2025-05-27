import React from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
  IconButton,
  Snackbar,
  Alert,
  Chip
} from '@mui/material';
import {
  GetApp as InstallIcon,
  Close as CloseIcon,
  CloudOff as OfflineIcon,
  Update as UpdateIcon,
  Notifications as NotificationsIcon
} from '@mui/icons-material';
import { usePWA } from '../hooks/usePWA';

export const PWAPrompt = () => {
  const {
    canInstall,
    install,
    isOffline,
    updateAvailable,
    update,
    requestNotificationPermission
  } = usePWA();
  
  const [showInstallDialog, setShowInstallDialog] = React.useState(false);
  const [showNotification, setShowNotification] = React.useState(false);
  const [notificationMessage, setNotificationMessage] = React.useState('');

  React.useEffect(() => {
    // Show install prompt after 30 seconds if available
    if (canInstall) {
      const timer = setTimeout(() => {
        setShowInstallDialog(true);
      }, 30000);
      
      return () => clearTimeout(timer);
    }
  }, [canInstall]);

  const handleInstall = async () => {
    const success = await install();
    if (success) {
      setNotificationMessage('App installed successfully!');
      setShowNotification(true);
      setShowInstallDialog(false);
      
      // Request notification permission after install
      setTimeout(async () => {
        const granted = await requestNotificationPermission();
        if (granted) {
          setNotificationMessage('Notifications enabled!');
          setShowNotification(true);
        }
      }, 2000);
    }
  };

  const handleUpdate = () => {
    update();
  };

  return (
    <>
      {/* Offline indicator */}
      {isOffline && (
        <Chip
          icon={<OfflineIcon />}
          label="Offline Mode"
          color="warning"
          size="small"
          sx={{
            position: 'fixed',
            bottom: 16,
            left: 16,
            zIndex: 1300
          }}
        />
      )}

      {/* Update available banner */}
      {updateAvailable && (
        <Box
          sx={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bgcolor: 'primary.main',
            color: 'primary.contrastText',
            p: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 2,
            zIndex: 1300
          }}
        >
          <UpdateIcon />
          <Typography variant="body2">
            A new version is available!
          </Typography>
          <Button
            size="small"
            variant="outlined"
            color="inherit"
            onClick={handleUpdate}
            sx={{ borderColor: 'inherit' }}
          >
            Update Now
          </Button>
        </Box>
      )}

      {/* Install prompt dialog */}
      <Dialog
        open={showInstallDialog && canInstall}
        onClose={() => setShowInstallDialog(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          <Box display="flex" alignItems="center" justifyContent="space-between">
            <Typography variant="h6">Install RepSpheres</Typography>
            <IconButton
              edge="end"
              color="inherit"
              onClick={() => setShowInstallDialog(false)}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent>
          <Box sx={{ textAlign: 'center', py: 2 }}>
            <InstallIcon sx={{ fontSize: 64, color: 'primary.main', mb: 2 }} />
            <Typography variant="body1" paragraph>
              Install RepSpheres for a better experience with:
            </Typography>
            <Box sx={{ textAlign: 'left', maxWidth: 300, mx: 'auto' }}>
              <Typography variant="body2" paragraph>
                ✓ Work offline
              </Typography>
              <Typography variant="body2" paragraph>
                ✓ Faster load times
              </Typography>
              <Typography variant="body2" paragraph>
                ✓ Home screen access
              </Typography>
              <Typography variant="body2" paragraph>
                ✓ Push notifications
              </Typography>
            </Box>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowInstallDialog(false)}>
            Not Now
          </Button>
          <Button
            onClick={handleInstall}
            variant="contained"
            startIcon={<InstallIcon />}
          >
            Install
          </Button>
        </DialogActions>
      </Dialog>

      {/* Notification snackbar */}
      <Snackbar
        open={showNotification}
        autoHideDuration={4000}
        onClose={() => setShowNotification(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={() => setShowNotification(false)}
          severity="success"
          sx={{ width: '100%' }}
        >
          {notificationMessage}
        </Alert>
      </Snackbar>

      {/* Install button in corner (when not installed) */}
      {canInstall && !showInstallDialog && (
        <IconButton
          onClick={() => setShowInstallDialog(true)}
          sx={{
            position: 'fixed',
            bottom: 72,
            right: 16,
            bgcolor: 'primary.main',
            color: 'primary.contrastText',
            '&:hover': {
              bgcolor: 'primary.dark'
            }
          }}
        >
          <InstallIcon />
        </IconButton>
      )}
    </>
  );
};