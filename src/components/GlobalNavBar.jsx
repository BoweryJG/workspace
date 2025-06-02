import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Box from '@mui/material/Box';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import InsightsIcon from '@mui/icons-material/Insights';
import PodcastsIcon from '@mui/icons-material/Podcasts';
import LanguageIcon from '@mui/icons-material/Language';
import DashboardIcon from '@mui/icons-material/Dashboard';
import MemoryIcon from '@mui/icons-material/Memory';
import Slide from '@mui/material/Slide';
import Divider from '@mui/material/Divider';
import Tooltip from '@mui/material/Tooltip';
import Fade from '@mui/material/Fade';

const ACCENT_COLOR = '#00ffc6';

// Main navigation links
const getNavLinks = (currentUrl) => {
  const links = [
    { 
      key: 'insights',
      label: 'Market Insights', 
      href: 'https://marketdata.repspheres.com/',
      icon: <InsightsIcon fontSize="small" sx={{ color: ACCENT_COLOR }} />,
      highlight: true,
      description: 'Real-time market intelligence'
    },
    { 
      key: 'workspace',
      label: 'Workspace', 
      href: 'https://workspace.repspheres.com/',
      icon: <DashboardIcon fontSize="small" sx={{ color: ACCENT_COLOR }} />,
      description: 'Unified sales workflows'
    },
    { 
      key: 'sphereos',
      label: 'Sphere OS', 
      href: 'https://crm.repspheres.com/',
      icon: <MemoryIcon fontSize="small" sx={{ color: ACCENT_COLOR }} />,
      description: 'AI-powered CRM platform'
    },
    {
      key: 'linguistics',
      label: 'Linguistics',
      href: 'https://linguistics.repspheres.com/',
      icon: <LanguageIcon fontSize="small" sx={{ color: ACCENT_COLOR }} />,
      description: 'Communication optimization'
    },
    {
      key: 'podcast',
      label: 'Podcast',
      href: 'https://repspheres.com/?page=podcast',
      icon: <PodcastsIcon fontSize="small" sx={{ color: ACCENT_COLOR }} />,
      description: 'Industry insights & interviews'
    },
  ];

  return links;
};

// Check if a link is active
const isLinkActive = (href, currentUrl) => {
  if (href.startsWith('http')) {
    return currentUrl.includes(new URL(href).hostname);
  }
  
  // Special case for podcast page
  if (href === '/?page=podcast') {
    return currentUrl.includes('page=podcast') || currentUrl.includes('/podcast.html');
  }
  
  return currentUrl.includes(href);
};

export default function GlobalNavBar() {
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const [navLoading, setNavLoading] = React.useState(false);
  const theme = useTheme();
  
  // Breakpoints for progressive collapsing of nav links
  const hidePodcast = useMediaQuery('(max-width:1200px)');
  const hideSphereOS = useMediaQuery('(max-width:1100px)');
  const hideLinguistics = useMediaQuery('(max-width:1000px)');
  const hideWorkspace = useMediaQuery('(max-width:900px)');
  const hideInsights = useMediaQuery('(max-width:800px)');
  const isMobile = hideInsights; // all nav links collapsed below 800px
  // Show hamburger menu whenever any link is hidden
  const showMenu = hidePodcast || hideSphereOS || hideLinguistics || hideWorkspace || isMobile;
  
  // Get current URL to determine which page we're on
  const currentUrl = typeof window !== 'undefined' ? window.location.href : '';

  // Get navigation links based on current page
  const navLinks = getNavLinks(currentUrl);
  
  // Determine display styles for each nav link based on screen width
  const getLinkStyles = (key) => {
    if (key === 'podcast') {
      return { '@media (max-width:1200px)': { display: 'none' } };
    }
    if (key === 'sphereos') {
      return { '@media (max-width:1100px)': { display: 'none' } };
    }
    if (key === 'linguistics') {
      return { '@media (max-width:1000px)': { display: 'none' } };
    }
    if (key === 'workspace') {
      return { '@media (max-width:900px)': { display: 'none' } };
    }
    if (key === 'insights') {
      return { '@media (max-width:800px)': { display: 'none' } };
    }
    return {};
  };

  // Orb SVG for brand logo with gradient colors
  const orb = (
    <svg width="100%" height="100%" viewBox="0 0 32 32" style={{ filter: 'drop-shadow(0 0 6px #7B42F6AA)' }}>
      <defs>
        <radialGradient id="orbGrad" cx="50%" cy="50%" r="70%">
          <stop offset="0%" stopColor="#00ffc6" />
          <stop offset="100%" stopColor="#7B42F6" />
        </radialGradient>
      </defs>
      <circle cx="16" cy="16" r="14" fill="url(#orbGrad)" opacity="0.85" />
      <circle cx="16" cy="16" r="8" fill="#fff" opacity="0.08" />
    </svg>
  );
  
  // Handle navigation with loading state
  const handleNavigation = (href) => {
    setNavLoading(true);
    setTimeout(() => {
      window.location.href = href;
    }, 300);
  };
  
  // Handle drawer toggle with swipe support
  const toggleDrawer = (open) => (event) => {
    if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setDrawerOpen(open);
  };
  
  // Styles for different button types
  const buttonBaseStyles = {
    fontWeight: 500,
    letterSpacing: '0.03em',
    whiteSpace: 'nowrap',
    minWidth: 'auto',
    textTransform: 'none',
    borderRadius: 0,
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  };
  
  const navButtonStyles = {
    ...buttonBaseStyles,
    fontSize: { xs: '0.9rem', sm: '0.95rem' },
    px: { xs: 0.5, sm: 1 },
    py: 0.5,
    mx: { xs: 0.5, sm: 1 },
    color: '#fff',
    position: 'relative',
    overflow: 'hidden',
    '&::before': {
      content: '""',
      position: 'absolute',
      bottom: 0,
      left: '50%',
      transform: 'translateX(-50%)',
      width: '0%',
      height: '2px',
      background: `linear-gradient(90deg, ${ACCENT_COLOR} 0%, #7B42F6 100%)`,
      transition: 'width 0.3s ease',
    },
    '&:hover': {
      background: 'rgba(255,255,255,0.05)',
      transform: 'translateY(-1px)',
      '&::before': {
        width: '80%',
      },
    },
    '&.active': {
      background: 'rgba(123, 66, 246, 0.1)',
      '&::before': {
        width: '100%',
      },
    },
  };

  // Mobile drawer content
  const drawerContent = (
    <Slide direction="left" in={drawerOpen} mountOnEnter unmountOnExit>
      <Box
        sx={{ 
          width: '260px', 
          p: 2, 
          background: 'rgba(20,14,38,0.98)',
          backdropFilter: 'blur(20px)',
          borderLeft: '2px solid',
          borderImage: 'linear-gradient(180deg, #7B42F6 0%, #00ffc6 100%) 1',
          height: '100%',
          color: '#fff',
        }}
        role="presentation"
      >
        {/* RepSpheres Logo in Drawer */}
        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          mb: 4, 
          mt: 2,
          cursor: 'pointer',
          transition: 'transform 0.3s ease',
          '&:hover': {
            transform: 'scale(1.05)',
          }
        }} onClick={() => handleNavigation('https://repspheres.com')}>
          <Box sx={{ 
            width: 32, 
            height: 32, 
            mr: 1.5 
          }}>
            {orb}
          </Box>
          <Box sx={{ 
            fontSize: '1.2rem', 
            fontWeight: 800,
            display: 'flex'
          }}>
            <span>Rep</span>
            <Box component="span" sx={{
              background: 'linear-gradient(90deg, #00ffc6 0%, #7B42F6 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}>Spheres</Box>
          </Box>
        </Box>

        {/* Navigation Links */}
        <List sx={{ mb: 2 }}>
          {navLinks.map((link) => (
            <ListItem key={link.key} disablePadding sx={{ mb: 1 }}>
              <ListItemButton
                component="a"
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavigation(link.href);
                }}
                sx={{
                  py: 1,
                  borderRadius: '8px',
                  transition: 'all 0.3s ease',
                  background: isLinkActive(link.href, currentUrl) ? 'rgba(123, 66, 246, 0.2)' : 'transparent',
                  '&:hover': { 
                    bgcolor: 'rgba(255,255,255,0.1)',
                    transform: 'translateX(5px)',
                  },
                }}
              >
                <Box sx={{ mr: 2, display: 'flex', alignItems: 'center' }}>
                  {link.icon}
                </Box>
                <ListItemText 
                  primary={link.label} 
                  secondary={link.description}
                  secondaryTypographyProps={{
                    sx: { 
                      fontSize: '0.75rem', 
                      opacity: 0.7,
                      mt: 0.5
                    }
                  }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
    </Slide>
  );

  return (
    <>
      {/* Loading Progress Bar */}
      {navLoading && (
        <Box sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          height: '3px',
          background: 'linear-gradient(90deg, #00ffc6 0%, #7B42F6 100%)',
          zIndex: 9999,
          animation: 'loading 1s ease-in-out infinite',
          '@keyframes loading': {
            '0%': { transform: 'translateX(-100%)' },
            '100%': { transform: 'translateX(100%)' },
          }
        }} />
      )}
      
      <AppBar position="sticky" elevation={0} sx={{
        background: 'rgba(24,24,43,0.52)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        boxShadow: '0 6px 24px 0 rgba(123,66,246,0.15)',
        border: '1px solid rgba(123,66,246,0.13)',
        borderBottom: '1px solid rgba(123,66,246,0.10)',
        borderRadius: { xs: '0 0 16px 16px', md: '0 0 24px 24px' },
        mx: 'auto',
        mt: { xs: 0.5, md: 1 },
        width: { xs: 'calc(100% - 10px)', sm: 'calc(100% - 20px)', md: 'calc(100% - 40px)' },
        maxWidth: '1800px',
        overflow: 'hidden',
        zIndex: 1200,
        transition: 'all 0.3s ease',
        '&:hover': {
          boxShadow: '0 8px 32px 0 rgba(123,66,246,0.25)',
        },
      }}>
        <Toolbar sx={{ 
          px: { xs: 1, sm: 2 },
          height: { xs: '60px', sm: '64px' },
          minHeight: { xs: '60px', sm: '64px' },
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
          {/* Logo Section */}
          <Box 
            component="a" 
            href="https://repspheres.com" 
            onClick={(e) => {
              e.preventDefault();
              handleNavigation('https://repspheres.com');
            }}
            sx={{ 
              display: 'flex', 
              alignItems: 'center',
              textDecoration: 'none',
              color: 'inherit',
              transition: 'transform 0.3s ease',
              '&:hover': {
                transform: 'scale(1.05)',
              }
            }}
          >
            <Box sx={{ 
              display: 'flex',
              alignItems: 'center',
              mr: 1,
              width: { xs: 28, sm: 32 },
              height: { xs: 28, sm: 32 }
            }}>
              {orb}
            </Box>
            
            <Box sx={{ 
              display: 'flex',
              fontSize: { xs: '1.1rem', sm: '1.2rem' },
              fontWeight: 800,
              letterSpacing: '0.03em',
            }}>
              <Box component="span">Rep</Box>
              <Box component="span" sx={{
                background: 'linear-gradient(90deg, #00ffc6 0%, #7B42F6 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}>Spheres</Box>
            </Box>
          </Box>

          {/* Middle Section - Navigation (only on desktop) */}
          {!isMobile && (
            <Box sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              mx: 'auto',
              position: 'absolute',
              left: '50%',
              transform: 'translateX(-50%)',
            }}>
              <Box sx={{
                display: 'flex',
                alignItems: 'center',
                height: '100%',
                px: { sm: 1, md: 2 },
                maxWidth: { sm: '65vw', md: '70vw' },
                overflowX: 'auto',
                '&::-webkit-scrollbar': { display: 'none' },
                msOverflowStyle: 'none',
                scrollbarWidth: 'none',
              }}>
                {navLinks.map((link) => (
                  <Tooltip 
                    key={link.key}
                    title={link.description}
                    arrow
                    placement="bottom"
                    TransitionComponent={Fade}
                    TransitionProps={{ timeout: 300 }}
                  >
                    <Button
                      component="a"
                      href={link.href}
                      onClick={(e) => {
                        e.preventDefault();
                        handleNavigation(link.href);
                      }}
                      className={isLinkActive(link.href, currentUrl) ? 'active' : ''}
                      sx={{
                        ...navButtonStyles,
                        ...getLinkStyles(link.key),
                        '& .buttonText': {
                          display: { xs: 'none', sm: 'inline' }
                        }
                      }}
                    >
                      <Box sx={{ 
                        mr: { xs: 0, sm: 1 },
                        display: 'flex',
                        alignItems: 'center'
                      }}>
                        {link.icon}
                      </Box>
                      <Box component="span" className="buttonText">{link.label}</Box>
                    </Button>
                  </Tooltip>
                ))}
              </Box>
            </Box>
          )}

          {/* Right Section - Hamburger Menu */}
          <Box sx={{
            display: 'flex',
            alignItems: 'center',
            ml: 'auto',
          }}>
            {/* Hamburger Menu Button */}
            {showMenu && (
              <IconButton
                edge="end"
                color="inherit"
                aria-label="menu"
                onClick={toggleDrawer(true)}
                sx={{ 
                  display: { xs: 'flex' },
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    color: ACCENT_COLOR,
                    transform: 'scale(1.1)',
                  }
                }}
              >
                <MenuIcon />
              </IconButton>
            )}
          </Box>
        </Toolbar>
      </AppBar>

      {/* Drawer for Mobile Navigation */}
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={toggleDrawer(false)}
        PaperProps={{
          sx: {
            background: 'transparent',
            boxShadow: 'none',
          }
        }}
      >
        {drawerContent}
      </Drawer>
    </>
  );
}