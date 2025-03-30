import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Container, Box, Typography, TextField, Button, 
  Paper, Avatar, CssBaseline, Grid, Alert, IconButton, Fade
} from '@mui/material';
import LockResetIcon from '@mui/icons-material/LockReset';
import HomeIcon from '@mui/icons-material/Home';
import ParticleBackground from '../../components/ParticleBackground';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      setError('');
      setSuccess('');
      setLoading(true);
      
      // In a real app, this would call a password reset API
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setSuccess('Password reset instructions have been sent to your email.');
    } catch (error) {
      setError('Failed to send password reset email. Please try again.');
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
              <LockResetIcon sx={{ fontSize: 32 }} />
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
              Reset Password
            </Typography>
            
            <Typography 
              variant="body1" 
              color="text.secondary" 
              align="center" 
              sx={{ mb: 3 }}
            >
              Enter your email address and we'll send you instructions to reset your password.
            </Typography>
            
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
            
            {success && (
              <Alert 
                severity="success" 
                sx={{ 
                  width: '100%', 
                  mb: 2,
                }}
              >
                {success}
              </Alert>
            )}
            
            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1, width: '100%' }}>
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
                {loading ? 'Sending...' : 'Reset Password'}
              </Button>
              
              <Grid 
                container 
                sx={{
                  mt: 2,
                  textAlign: 'center',
                  '& a': {
                    textDecoration: 'none',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      color: 'primary.dark',
                    },
                  },
                }}
              >
                <Grid item xs={12}>
                  <Link to="/login" style={{ textDecoration: 'none' }}>
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
                      Back to Login
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