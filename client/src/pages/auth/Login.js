import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  Container, Box, Typography, TextField, Button, 
  Paper, Avatar, CssBaseline, Grid, FormControlLabel, 
  Checkbox, Tabs, Tab, Alert, IconButton, Fade
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import HomeIcon from '@mui/icons-material/Home';
import { useAuth } from '../../contexts/AuthContext';
import ParticleBackground from '../../components/ParticleBackground';

// TabPanel component for switching between doctor/patient login
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`login-tabpanel-${index}`}
      aria-labelledby={`login-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [tabValue, setTabValue] = useState(0);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      setError('');
      setLoading(true);
      
      const userType = tabValue === 0 ? 'doctor' : 'patient';
      
      // In a real app, this would authenticate with a backend
      await login({ email, name: email.split('@')[0] }, userType);
      
      // Redirect based on user type
      navigate(userType === 'doctor' ? '/doctor' : '/patient');
    } catch (error) {
      setError('Failed to sign in. Please check your credentials.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        background: 'linear-gradient(135deg, rgba(37, 99, 235, 0.1), rgba(59, 130, 246, 0.1))',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <ParticleBackground />
      
      {/* Home Button */}
      <Box sx={{ position: 'absolute', top: 20, left: 20, zIndex: 2 }}>
        <Fade in={true} timeout={1000}>
          <IconButton
            component={Link}
            to="/"
            sx={{
              bgcolor: 'white',
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
              '&:hover': {
                bgcolor: 'grey.100',
                transform: 'translateY(-2px)',
                boxShadow: '0 6px 16px rgba(0,0,0,0.15)',
              },
              transition: 'all 0.3s ease',
            }}
          >
            <HomeIcon color="primary" />
          </IconButton>
        </Fade>
      </Box>

      <Container component="main" maxWidth="xs" sx={{ position: 'relative', zIndex: 1 }}>
        <CssBaseline />
        <Fade in={true} timeout={1000}>
          <Paper 
            elevation={3}
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              padding: 4,
              borderRadius: 3,
              background: 'rgba(255, 255, 255, 0.9)',
              backdropFilter: 'blur(10px)',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              transition: 'transform 0.3s ease, box-shadow 0.3s ease',
              '&:hover': {
                transform: 'translateY(-5px)',
                boxShadow: '0 12px 40px rgba(0, 0, 0, 0.15)',
              },
            }}
          >
            <Avatar 
              sx={{ 
                m: 1, 
                bgcolor: 'primary.main',
                width: 56,
                height: 56,
                boxShadow: '0 4px 12px rgba(37, 99, 235, 0.2)',
                transition: 'transform 0.3s ease',
                '&:hover': {
                  transform: 'scale(1.1) rotate(5deg)',
                },
              }}
            >
              <LockOutlinedIcon sx={{ fontSize: 32 }} />
            </Avatar>
            <Typography 
              component="h1" 
              variant="h4" 
              sx={{ 
                mb: 2,
                fontWeight: 700,
                background: 'linear-gradient(45deg, #1e40af, #3b82f6)',
                backgroundClip: 'text',
                textFillColor: 'transparent',
              }}
            >
              Welcome Back
            </Typography>
            
            <Tabs 
              value={tabValue} 
              onChange={handleTabChange} 
              aria-label="user type tabs"
              variant="fullWidth"
              sx={{
                width: '100%',
                mb: 3,
                '& .MuiTab-root': {
                  fontSize: '1rem',
                  fontWeight: 600,
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    bgcolor: 'rgba(37, 99, 235, 0.05)',
                  },
                },
                '& .Mui-selected': {
                  color: 'primary.main',
                },
              }}
            >
              <Tab label="Doctor" />
              <Tab label="Patient" />
            </Tabs>
            
            {error && (
              <Alert 
                severity="error" 
                sx={{ 
                  width: '100%', 
                  mb: 2,
                  animation: 'shake 0.5s ease-in-out',
                  '@keyframes shake': {
                    '0%, 100%': { transform: 'translateX(0)' },
                    '10%, 30%, 50%, 70%, 90%': { transform: 'translateX(-5px)' },
                    '20%, 40%, 60%, 80%': { transform: 'translateX(5px)' },
                  },
                }}
              >
                {error}
              </Alert>
            )}
            
            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1, width: '100%' }}>
              <TabPanel value={tabValue} index={0}>
                <Typography 
                  variant="subtitle1" 
                  color="text.secondary" 
                  gutterBottom
                  sx={{ textAlign: 'center', fontWeight: 500 }}
                >
                  Access your doctor dashboard
                </Typography>
              </TabPanel>
              <TabPanel value={tabValue} index={1}>
                <Typography 
                  variant="subtitle1" 
                  color="text.secondary" 
                  gutterBottom
                  sx={{ textAlign: 'center', fontWeight: 500 }}
                >
                  Access your patient portal
                </Typography>
              </TabPanel>
              
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-2px)',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                    },
                  },
                }}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-2px)',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                    },
                  },
                }}
              />
              <FormControlLabel
                control={
                  <Checkbox 
                    value="remember" 
                    color="primary"
                    sx={{
                      '&:hover': { transform: 'scale(1.05)' },
                      transition: 'transform 0.2s ease',
                    }}
                  />
                }
                label="Remember me"
                sx={{ mt: 1 }}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                disabled={loading}
                sx={{
                  mt: 3,
                  mb: 2,
                  py: 1.5,
                  fontSize: '1.1rem',
                  fontWeight: 600,
                  position: 'relative',
                  overflow: 'hidden',
                  background: 'linear-gradient(45deg, #1e40af, #3b82f6)',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: '0 8px 20px rgba(37, 99, 235, 0.3)',
                  },
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    background: 'linear-gradient(45deg, transparent, rgba(255,255,255,0.2), transparent)',
                    transform: 'translateX(-100%)',
                    transition: 'transform 0.6s ease',
                  },
                  '&:hover::before': {
                    transform: 'translateX(100%)',
                  },
                }}
              >
                {loading ? 'Signing in...' : 'Sign In'}
              </Button>
              <Grid 
                container 
                spacing={2}
                sx={{
                  mt: 1,
                  '& a': {
                    textDecoration: 'none',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      color: 'primary.dark',
                    },
                  },
                }}
              >
                <Grid item xs={12} sm={6}>
                  <Link to="/forgot-password" style={{ textDecoration: 'none' }}>
                    <Typography 
                      variant="body2" 
                      color="primary"
                      sx={{
                        fontWeight: 500,
                        '&:hover': {
                          textDecoration: 'underline',
                        },
                      }}
                    >
                      Forgot password?
                    </Typography>
                  </Link>
                </Grid>
                <Grid item xs={12} sm={6} sx={{ textAlign: { sm: 'right' } }}>
                  <Link to="/register" style={{ textDecoration: 'none' }}>
                    <Typography 
                      variant="body2" 
                      color="primary"
                      sx={{
                        fontWeight: 500,
                        '&:hover': {
                          textDecoration: 'underline',
                        },
                      }}
                    >
                      Don't have an account? Sign Up
                    </Typography>
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Paper>
        </Fade>
      </Container>
    </Box>
  );
} 