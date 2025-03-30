import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  Container, Box, Typography, TextField, Button, 
  Paper, Avatar, CssBaseline, Grid, Tabs, Tab, 
  Alert, FormControl, InputLabel, Select, MenuItem,
  IconButton, Fade, LinearProgress, InputAdornment
} from '@mui/material';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import HomeIcon from '@mui/icons-material/Home';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { useAuth } from '../../contexts/AuthContext';
import ParticleBackground from '../../components/ParticleBackground';

// TabPanel component for switching between doctor/patient registration
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`register-tabpanel-${index}`}
      aria-labelledby={`register-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ width: '100%' }}>
          {children}
        </Box>
      )}
    </div>
  );
}

export default function Register() {
  // Common fields
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  
  // Doctor-specific fields
  const [specialization, setSpecialization] = useState('');
  const [experience, setExperience] = useState('');
  const [doctorAge, setDoctorAge] = useState('');
  const [doctorGender, setDoctorGender] = useState('');
  
  // Patient-specific fields
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [tabValue, setTabValue] = useState(0);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const navigate = useNavigate();
  const { register } = useAuth();

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const calculatePasswordStrength = (password) => {
    let strength = 0;
    if (password.length >= 8) strength += 25;
    if (password.match(/[a-z]+/)) strength += 25;
    if (password.match(/[A-Z]+/)) strength += 25;
    if (password.match(/[0-9]+/)) strength += 25;
    return strength;
  };

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    setPasswordStrength(calculatePasswordStrength(newPassword));
  };

  const getPasswordStrengthColor = (strength) => {
    if (strength <= 25) return 'error.main';
    if (strength <= 50) return 'warning.main';
    if (strength <= 75) return 'info.main';
    return 'success.main';
  };

  const validateForm = () => {
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return false;
    }

    if (password.length < 6) {
      setError('Password should be at least 6 characters');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    try {
      setError('');
      setLoading(true);
      
      const userType = tabValue === 0 ? 'doctor' : 'patient';
      
      // Create user data based on user type
      const userData = {
        email,
        name,
        phone,
        ...(userType === 'doctor' 
          ? { 
              specialization, 
              experience,
              age: doctorAge,
              gender: doctorGender
            } 
          : { age, gender })
      };
      
      // In a real app, this would register with a backend
      await register(userData, userType);
      
      // Redirect based on user type
      navigate(userType === 'doctor' ? '/doctor' : '/patient');
    } catch (error) {
      setError('Failed to create an account.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleClickShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
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

      <Container component="main" maxWidth="sm" sx={{ position: 'relative', zIndex: 1 }}>
        <CssBaseline />
        <Fade in={true} timeout={1000}>
          <Paper 
            elevation={3}
            sx={{
              marginTop: 4,
              marginBottom: 4,
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
              <PersonAddIcon sx={{ fontSize: 32 }} />
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
              Create Account
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
            
            <Box 
              component="form" 
              onSubmit={handleSubmit} 
              sx={{ 
                width: '100%',
                '& .MuiTextField-root': {
                  width: '100%',
                  '& .MuiOutlinedInput-root': {
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-2px)',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                    },
                  },
                },
                '& .MuiFormControl-root': {
                  width: '100%',
                },
              }}
            >
              <Grid container spacing={2.5}>
                <Grid item xs={12}>
                  <TextField
                    required
                    id="name"
                    label="Full Name"
                    name="name"
                    autoComplete="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    size="small"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    size="small"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    name="password"
                    label="Password"
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    autoComplete="new-password"
                    value={password}
                    onChange={handlePasswordChange}
                    size="small"
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                          >
                            {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                  <LinearProgress
                    variant="determinate"
                    value={passwordStrength}
                    sx={{
                      mt: 0.25,
                      height: 0.05,
                      borderRadius: 0,
                      bgcolor: 'rgba(0,0,0,0.03)',
                      '& .MuiLinearProgress-bar': {
                        bgcolor: getPasswordStrengthColor(passwordStrength),
                        transition: 'all 0.3s ease',
                      },
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    name="confirmPassword"
                    label="Confirm Password"
                    type={showConfirmPassword ? 'text' : 'password'}
                    id="confirmPassword"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    size="small"
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle confirm password visibility"
                            onClick={handleClickShowConfirmPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                          >
                            {showConfirmPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    name="phone"
                    label="Phone Number"
                    id="phone"
                    autoComplete="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    size="small"
                  />
                </Grid>
                
                {/* Doctor Specific Fields */}
                <Grid item xs={12}>
                  <TabPanel value={tabValue} index={0}>
                    <Grid container spacing={2}>
                      <Grid item xs={6}>
                        <TextField
                          required
                          name="doctorAge"
                          label="Age"
                          type="number"
                          id="doctorAge"
                          value={doctorAge}
                          onChange={(e) => setDoctorAge(e.target.value)}
                          InputProps={{ inputProps: { min: 0 } }}
                          size="small"
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <FormControl required size="small">
                          <InputLabel id="doctor-gender-label">Gender</InputLabel>
                          <Select
                            labelId="doctor-gender-label"
                            id="doctorGender"
                            value={doctorGender}
                            label="Gender"
                            onChange={(e) => setDoctorGender(e.target.value)}
                          >
                            <MenuItem value="Male">Male</MenuItem>
                            <MenuItem value="Female">Female</MenuItem>
                            <MenuItem value="Other">Other</MenuItem>
                            <MenuItem value="Prefer not to say">Prefer not to say</MenuItem>
                          </Select>
                        </FormControl>
                      </Grid>
                      <Grid item xs={7}>
                        <FormControl required size="small">
                          <InputLabel id="specialization-label">Specialization</InputLabel>
                          <Select
                            labelId="specialization-label"
                            id="specialization"
                            value={specialization}
                            label="Specialization"
                            onChange={(e) => setSpecialization(e.target.value)}
                          >
                            <MenuItem value="Cardiology">Cardiology</MenuItem>
                            <MenuItem value="Dermatology">Dermatology</MenuItem>
                            <MenuItem value="Neurology">Neurology</MenuItem>
                            <MenuItem value="Orthopedics">Orthopedics</MenuItem>
                            <MenuItem value="Pediatrics">Pediatrics</MenuItem>
                            <MenuItem value="Psychiatry">Psychiatry</MenuItem>
                            <MenuItem value="General Practice">General Practice</MenuItem>
                          </Select>
                        </FormControl>
                      </Grid>
                      <Grid item xs={5}>
                        <TextField
                          required
                          name="experience"
                          label="Years of Experience"
                          type="number"
                          id="experience"
                          value={experience}
                          onChange={(e) => setExperience(e.target.value)}
                          InputProps={{ inputProps: { min: 0 } }}
                          size="small"
                        />
                      </Grid>
                    </Grid>
                  </TabPanel>
                </Grid>
                
                {/* Patient Specific Fields */}
                <Grid item xs={12}>
                  <TabPanel value={tabValue} index={1}>
                    <Grid container spacing={2}>
                      <Grid item xs={6}>
                        <TextField
                          required
                          name="age"
                          label="Age"
                          type="number"
                          id="age"
                          value={age}
                          onChange={(e) => setAge(e.target.value)}
                          InputProps={{ inputProps: { min: 0 } }}
                          size="small"
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <FormControl required size="small">
                          <InputLabel id="gender-label">Gender</InputLabel>
                          <Select
                            labelId="gender-label"
                            id="gender"
                            value={gender}
                            label="Gender"
                            onChange={(e) => setGender(e.target.value)}
                          >
                            <MenuItem value="Male">Male</MenuItem>
                            <MenuItem value="Female">Female</MenuItem>
                            <MenuItem value="Other">Other</MenuItem>
                            <MenuItem value="Prefer not to say">Prefer not to say</MenuItem>
                          </Select>
                        </FormControl>
                      </Grid>
                    </Grid>
                  </TabPanel>
                </Grid>
              </Grid>
              
              <Button
                type="submit"
                fullWidth
                variant="contained"
                disabled={loading}
                sx={{
                  mt: 4,
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
                {loading ? 'Creating Account...' : 'Create Account'}
              </Button>
              
              <Box sx={{ textAlign: 'center', mt: 2 }}>
                <Link 
                  to="/login" 
                  style={{ 
                    textDecoration: 'none',
                    color: 'primary.main',
                  }}
                >
                  <Typography 
                    variant="body1" 
                    sx={{
                      fontWeight: 500,
                      '&:hover': {
                        textDecoration: 'underline',
                      },
                      transition: 'all 0.3s ease',
                    }}
                  >
                    Already have an account? <span style={{ fontWeight: 600 }}>Sign in</span>
                  </Typography>
                </Link>
              </Box>
            </Box>
          </Paper>
        </Fade>
      </Container>
    </Box>
  );
} 