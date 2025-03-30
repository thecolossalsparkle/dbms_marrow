import React, { useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { 
  AppBar, Box, CssBaseline, Divider, Drawer, IconButton, 
  List, ListItem, ListItemButton, ListItemIcon, ListItemText, 
  Toolbar, Typography, Avatar, Menu, MenuItem, Tooltip,
  Button, Badge, useTheme, useMediaQuery, Container,
  Paper
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import DashboardIcon from '@mui/icons-material/Dashboard';
import SearchIcon from '@mui/icons-material/Search';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import DescriptionIcon from '@mui/icons-material/Description';
import MessageIcon from '@mui/icons-material/Message';
import EmergencyIcon from '@mui/icons-material/Emergency';
import LogoutIcon from '@mui/icons-material/Logout';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SettingsIcon from '@mui/icons-material/Settings';
import PersonIcon from '@mui/icons-material/Person';
import CloseIcon from '@mui/icons-material/Close';
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety';
import { useAuth } from '../../contexts/AuthContext';

const drawerWidth = 280;

function PatientLayout() {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [notificationAnchorEl, setNotificationAnchorEl] = useState(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  // Handle profile menu
  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setAnchorEl(null);
  };

  const handleNotificationOpen = (event) => {
    setNotificationAnchorEl(event.currentTarget);
  };

  const handleNotificationClose = () => {
    setNotificationAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleEmergency = () => {
    // This would trigger emergency contact in a real application
    alert('Emergency services contacted!');
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const menuItems = [
    { text: 'Dashboard', icon: <DashboardIcon />, path: '/patient' },
    { text: 'Find Doctors', icon: <SearchIcon />, path: '/patient/doctors' },
    { text: 'My Appointments', icon: <CalendarMonthIcon />, path: '/patient/appointments' },
    { text: 'Medical Records', icon: <DescriptionIcon />, path: '/patient/records' },
    { text: 'Messages', icon: <MessageIcon />, path: '/patient/messages', badge: 3 },
  ];

  const drawer = (
    <Box sx={{ 
      height: '100%', 
      display: 'flex', 
      flexDirection: 'column',
      background: 'linear-gradient(to bottom, rgba(37, 99, 235, 0.02), rgba(37, 99, 235, 0.05))',
    }}>
      <Box 
        sx={{ 
          p: 3, 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between'
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <HealthAndSafetyIcon 
            color="primary" 
            sx={{ fontSize: 32, mr: 1.5 }} 
          />
          <Typography 
            variant="h5" 
            sx={{ 
              fontWeight: 700, 
              background: 'linear-gradient(to right, #2563eb, #60a5fa)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Marrow Health
          </Typography>
        </Box>
        {isMobile && (
          <IconButton onClick={handleDrawerToggle}>
            <CloseIcon />
          </IconButton>
        )}
      </Box>
      
      {currentUser && (
        <Box sx={{ px: 3, pb: 3 }}>
          <Paper 
            elevation={0}
            sx={{ 
              p: 2, 
              borderRadius: 2,
              background: 'linear-gradient(135deg, rgba(37, 99, 235, 0.1), rgba(59, 130, 246, 0.05))',
              border: '1px solid rgba(37, 99, 235, 0.1)',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <Avatar 
              src={currentUser.avatar} 
              alt={currentUser.name || 'Patient'} 
              sx={{ 
                width: 50, 
                height: 50,
                border: '2px solid white',
              }}
            />
            <Box sx={{ ml: 2 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                {currentUser.name || 'Patient User'}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Patient ID: {currentUser.id || 'P-12345'}
              </Typography>
            </Box>
          </Paper>
        </Box>
      )}
      
      <Divider sx={{ mx: 3, opacity: 0.6 }} />
      
      <Box sx={{ flexGrow: 1, px: 2, py: 3 }}>
        <List>
          {menuItems.map((item) => {
            const isSelected = location.pathname === item.path;
            return (
              <ListItem key={item.text} disablePadding sx={{ mb: 1 }}>
                <ListItemButton 
                  onClick={() => {
                    navigate(item.path);
                    if (isMobile) setMobileOpen(false);
                  }}
                  sx={{ 
                    borderRadius: 2,
                    py: 1.2,
                    backgroundColor: isSelected ? 'primary.light' : 'transparent',
                    color: isSelected ? 'primary.contrastText' : 'inherit',
                    '&:hover': {
                      backgroundColor: isSelected ? 'primary.light' : 'rgba(37, 99, 235, 0.08)',
                    },
                    transition: 'all 0.2s ease-in-out',
                  }}
                >
                  <ListItemIcon sx={{ 
                    color: isSelected ? 'primary.contrastText' : 'primary.main',
                    minWidth: 45,
                  }}>
                    {item.badge ? (
                      <Badge badgeContent={item.badge} color="error">
                        {item.icon}
                      </Badge>
                    ) : item.icon}
                  </ListItemIcon>
                  <ListItemText 
                    primary={item.text} 
                    primaryTypographyProps={{ 
                      fontWeight: isSelected ? 600 : 500,
                    }}
                  />
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
      </Box>
      
      <Box sx={{ p: 3 }}>
        <Button 
          variant="contained" 
          color="error" 
          startIcon={<EmergencyIcon />}
          fullWidth
          size="large"
          onClick={handleEmergency}
          sx={{ 
            py: 1.5,
            borderRadius: 2,
            fontWeight: 600,
            boxShadow: '0 4px 12px rgba(239, 68, 68, 0.25)',
            transition: 'all 0.2s ease-in-out',
            '&:hover': {
              transform: 'translateY(-2px)',
              boxShadow: '0 6px 16px rgba(239, 68, 68, 0.3)',
            },
          }}
        >
          Emergency SOS
        </Button>
      </Box>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f8fafc' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          backgroundColor: 'white',
          borderBottom: '1px solid rgba(0, 0, 0, 0.06)',
          color: 'text.primary',
        }}
      >
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: 'none' } }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" fontWeight={600} noWrap component="div">
              {menuItems.find(item => item.path === location.pathname)?.text || 'Dashboard'}
            </Typography>
          </Box>
          
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Tooltip title="Notifications">
              <IconButton 
                onClick={handleNotificationOpen}
                sx={{ mx: 1 }}
              >
                <Badge badgeContent={4} color="error">
                  <NotificationsIcon />
                </Badge>
              </IconButton>
            </Tooltip>
            
            <Menu
              anchorEl={notificationAnchorEl}
              open={Boolean(notificationAnchorEl)}
              onClose={handleNotificationClose}
              PaperProps={{
                sx: { width: 320, maxHeight: 400, mt: 1.5 }
              }}
            >
              <Box sx={{ px: 2, py: 1.5, borderBottom: '1px solid rgba(0, 0, 0, 0.06)' }}>
                <Typography variant="subtitle1" fontWeight={600}>
                  Notifications
                </Typography>
              </Box>
              <MenuItem>
                <Box sx={{ py: 0.5 }}>
                  <Typography variant="body2" fontWeight={500}>
                    New appointment confirmed
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Dr. Emily Johnson - Today, 10:00 AM
                  </Typography>
                </Box>
              </MenuItem>
              <MenuItem>
                <Box sx={{ py: 0.5 }}>
                  <Typography variant="body2" fontWeight={500}>
                    New message received
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    From Dr. James Williams - 2 hours ago
                  </Typography>
                </Box>
              </MenuItem>
              <MenuItem>
                <Box sx={{ py: 0.5 }}>
                  <Typography variant="body2" fontWeight={500}>
                    Lab results available
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Blood test results ready - Yesterday
                  </Typography>
                </Box>
              </MenuItem>
              <Box sx={{ p: 1.5, borderTop: '1px solid rgba(0, 0, 0, 0.06)', textAlign: 'center' }}>
                <Button size="small" color="primary">
                  View All Notifications
                </Button>
              </Box>
            </Menu>
            
            <Tooltip title="Account settings">
              <IconButton 
                onClick={handleProfileMenuOpen} 
                sx={{ 
                  ml: 1,
                  border: '2px solid rgba(37, 99, 235, 0.1)',
                  p: 0.5,
                }}
              >
                <Avatar 
                  alt={currentUser?.name || 'Patient'} 
                  src={currentUser?.avatar}
                  sx={{ width: 35, height: 35 }}
                />
              </IconButton>
            </Tooltip>
            
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleProfileMenuClose}
              PaperProps={{
                sx: { width: 200, mt: 1.5 }
              }}
            >
              <Box sx={{ px: 2, py: 1.5, borderBottom: '1px solid rgba(0, 0, 0, 0.06)' }}>
                <Typography variant="subtitle2" fontWeight={600}>
                  {currentUser?.name || 'Patient User'}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {currentUser?.email || 'patient@example.com'}
                </Typography>
              </Box>
              <MenuItem onClick={() => {
                handleProfileMenuClose();
                navigate('/patient/profile');
              }}>
                <ListItemIcon>
                  <PersonIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>Profile</ListItemText>
              </MenuItem>
              <MenuItem onClick={() => {
                handleProfileMenuClose();
                navigate('/patient/settings');
              }}>
                <ListItemIcon>
                  <SettingsIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>Settings</ListItemText>
              </MenuItem>
              <Divider />
              <MenuItem onClick={handleLogout}>
                <ListItemIcon>
                  <LogoutIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>Logout</ListItemText>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>
      
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { 
              boxSizing: 'border-box', 
              width: drawerWidth,
              borderRight: '1px solid rgba(0, 0, 0, 0.06)',
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { 
              boxSizing: 'border-box', 
              width: drawerWidth,
              borderRight: '1px solid rgba(0, 0, 0, 0.06)',
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      
      <Box
        component="main"
        sx={{ 
          flexGrow: 1, 
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          overflow: 'auto',
        }}
      >
        <Toolbar />
        <Container maxWidth="xl" sx={{ py: 4 }}>
          <Outlet />
        </Container>
      </Box>
    </Box>
  );
}

export default PatientLayout; 