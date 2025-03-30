import React, { useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Button,
  Container,
  Grid,
  Typography,
  Card,
  CardContent,
  useTheme,
  useMediaQuery,
  Avatar,
  Stack,
  IconButton,
  Chip,
  Paper,
  Fade,
  Slide,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Modal,
  CircularProgress
} from '@mui/material';
import {
  LocalHospital,
  People,
  CalendarToday,
  Message,
  Security,
  Speed,
  Star,
  ArrowForward,
  AccessTime,
  Favorite,
  LocationOn,
  Phone,
  Email,
  PlayArrow,
  Close,
} from '@mui/icons-material';
import ParticleBackground from '../components/ParticleBackground';
import { contentService } from '../services';

const Home = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [activeIndex, setActiveIndex] = useState(0);
  const [isVisible, setIsVisible] = useState({});
  const [videoModalOpen, setVideoModalOpen] = useState(false);
  
  // Add state for dynamic content
  const [features, setFeatures] = useState([]);
  const [statistics, setStatistics] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [specialties, setSpecialties] = useState([]);
  const [achievements, setAchievements] = useState([]);
  const [loading, setLoading] = useState({
    features: true,
    statistics: true,
    testimonials: true,
    specialties: true,
    achievements: true
  });
  const [error, setError] = useState({
    features: null,
    statistics: null,
    testimonials: null,
    specialties: null,
    achievements: null
  });

  // Fetch content data
  useEffect(() => {
    const fetchContent = async () => {
      try {
        // Fetch features
        const featuresResponse = await contentService.getFeatures();
        setFeatures(featuresResponse.data);
        setLoading(prev => ({ ...prev, features: false }));
        
        // Fetch statistics
        const statisticsResponse = await contentService.getStatistics();
        setStatistics(statisticsResponse.data);
        setLoading(prev => ({ ...prev, statistics: false }));
        
        // Fetch testimonials
        const testimonialsResponse = await contentService.getTestimonials();
        setTestimonials(testimonialsResponse.data);
        setLoading(prev => ({ ...prev, testimonials: false }));
        
        // Fetch specialties
        const specialtiesResponse = await contentService.getSpecialties();
        setSpecialties(specialtiesResponse.data);
        setLoading(prev => ({ ...prev, specialties: false }));
        
        // Fetch achievements
        const achievementsResponse = await contentService.getAchievements();
        setAchievements(achievementsResponse.data);
        setLoading(prev => ({ ...prev, achievements: false }));
      } catch (err) {
        console.error('Error fetching content data:', err);
        setError({
          features: 'Failed to load features. Please try again later.',
          statistics: 'Failed to load statistics. Please try again later.',
          testimonials: 'Failed to load testimonials. Please try again later.',
          specialties: 'Failed to load specialties. Please try again later.',
          achievements: 'Failed to load achievements. Please try again later.'
        });
        setLoading({
          features: false,
          statistics: false,
          testimonials: false,
          specialties: false,
          achievements: false
        });
      }
    };
    
    fetchContent();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('.animate-on-scroll');
      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        const isVisible = rect.top <= window.innerHeight * 0.75;
        setIsVisible(prev => ({ ...prev, [section.id]: isVisible }));
      });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (testimonials.length > 0) {
      const interval = setInterval(() => {
        setActiveIndex((prev) => (prev + 1) % testimonials.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [testimonials]);

  const handleOpenVideoModal = () => {
    setVideoModalOpen(true);
  };

  const handleCloseVideoModal = () => {
    setVideoModalOpen(false);
  };
  
  // Loading indicator
  if (Object.values(loading).some(status => status)) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ position: 'relative', overflowX: 'hidden' }}>
      {/* Hero Section - Completely Redesigned with Dark Style */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #0f172a, #1e293b)',
          color: 'white',
          position: 'relative',
          overflow: 'hidden',
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          pt: { xs: 8, md: 0 },
          pb: { xs: 10, md: 0 },
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'radial-gradient(circle at center, rgba(59, 130, 246, 0.1), transparent 70%)',
            zIndex: 1,
          },
        }}
      >
        
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 3 }}>
          <Grid container spacing={6} alignItems="center">
            <Grid item xs={12} md={6} className="fadeInLeft">
              <Slide direction="right" in={true} timeout={1000}>
                <Box>
                  <Typography
                    variant="h1"
                    sx={{
                      fontSize: { xs: '2.5rem', md: '4rem' },
                      fontWeight: 800,
                      mb: 3,
                      lineHeight: 1.1,
                      textShadow: '0 2px 4px rgba(0,0,0,0.1)',
                      background: 'linear-gradient(45deg, #fff, #e0e7ff)',
                      backgroundClip: 'text',
                      textFillColor: 'transparent',
                    }}
                  >
                    Your Health Journey Starts Here
                  </Typography>
                  <Typography
                    variant="h5"
                    sx={{
                      mb: 4,
                      opacity: 0.9,
                      lineHeight: 1.6,
                      textShadow: '0 1px 2px rgba(0,0,0,0.1)',
                    }}
                  >
                    Experience healthcare like never before. Connect with top doctors, manage your health records, and get personalized care - all in one place.
                  </Typography>
                  <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                    <Button
                      component={RouterLink}
                      to="/register"
                      variant="contained"
                      size="large"
                      sx={{
                        bgcolor: '#2563eb',
                        color: 'white',
                        px: 6,
                        py: 2,
                        fontSize: '1.1rem',
                        fontWeight: 600,
                        transition: 'all 0.3s ease',
                        boxShadow: '0 4px 6px rgba(37, 99, 235, 0.3)',
                        '&:hover': {
                          transform: 'translateY(-3px)',
                          boxShadow: '0 20px 40px rgba(37, 99, 235, 0.4)',
                          bgcolor: '#1d4ed8',
                        },
                      }}
                    >
                      Start Your Journey
                    </Button>
                    <Button
                      startIcon={<PlayArrow />}
                      variant="outlined"
                      size="large"
                      onClick={handleOpenVideoModal}
                      sx={{
                        borderColor: 'white',
                        color: 'white',
                        px: 6,
                        py: 2,
                        fontSize: '1.1rem',
                        fontWeight: 600,
                        '&:hover': {
                          borderColor: 'white',
                          bgcolor: 'rgba(255,255,255,0.1)',
                        },
                      }}
                    >
                      Watch How It Works
                    </Button>
                  </Stack>
                </Box>
              </Slide>
            </Grid>
            <Grid item xs={12} md={6}>
              <Slide direction="left" in={true} timeout={1000}>
                <Box
                  sx={{
                    position: 'relative',
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      top: -20,
                      left: -20,
                      right: 20,
                      bottom: 20,
                      border: '2px solid rgba(255,255,255,0.2)',
                      borderRadius: 4,
                      animation: 'float 6s ease-in-out infinite',
                    },
                  }}
                >
                  <Box
                    component="div"
                    sx={{
                      width: '100%',
                      borderRadius: 4,
                      boxShadow: '0 30px 60px rgba(0,0,0,0.3)',
                      transform: 'perspective(1000px) rotateY(-5deg)',
                      transition: 'all 0.5s ease',
                      overflow: 'hidden',
                      aspectRatio: '16/9',
                      position: 'relative',
                      '&:hover': {
                        transform: 'perspective(1000px) rotateY(0deg) translateY(-10px)',
                      },
                      '&::after': {
                        content: '""',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: 'linear-gradient(135deg, rgba(0,0,0,0.4), rgba(0,0,0,0.2))',
                        zIndex: 1,
                      }
                    }}
                  >
                    <Box
                      component="img"
                      src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=2000"
                      alt="Digital Healthcare"
                      sx={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                      }}
                    />
                    <IconButton
                      sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        bgcolor: 'rgba(255,255,255,0.2)',
                        backdropFilter: 'blur(10px)',
                        color: 'white',
                        zIndex: 2,
                        p: 2,
                        '&:hover': {
                          bgcolor: 'rgba(255,255,255,0.3)',
                          transform: 'translate(-50%, -50%) scale(1.1)',
                        },
                        transition: 'all 0.3s ease',
                      }}
                      onClick={handleOpenVideoModal}
                    >
                      <PlayArrow sx={{ fontSize: 40 }} />
                    </IconButton>
                  </Box>
                </Box>
              </Slide>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Video Modal */}
      <Dialog
        open={videoModalOpen}
        onClose={handleCloseVideoModal}
        maxWidth="lg"
        fullWidth
        sx={{
          '& .MuiDialog-paper': {
            bgcolor: '#0f172a',
            color: 'white',
            borderRadius: 2,
            overflow: 'hidden',
          }
        }}
      >
        <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 2 }}>
          <Typography variant="h6">How Our Platform Works</Typography>
          <IconButton edge="end" color="inherit" onClick={handleCloseVideoModal}>
            <Close />
          </IconButton>
        </DialogTitle>
        <DialogContent sx={{ p: 0 }}>
          <Box sx={{ position: 'relative', width: '100%', pt: '56.25%' }}>
            <iframe
              src="https://www.youtube.com/embed/EngW7tLk6R8"
              title="Healthcare Platform Introduction"
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                border: 'none',
              }}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </Box>
        </DialogContent>
      </Dialog>

      {/* Specialties Section - Enhanced with 3D Cards */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography
          variant="h2"
          align="center"
          className="gradient-text"
          sx={{
            mb: 6,
            fontWeight: 800,
            position: 'relative',
            '&::after': {
              content: '""',
              position: 'absolute',
              bottom: -10,
              left: '50%',
              transform: 'translateX(-50%)',
              width: 100,
              height: 4,
              background: 'linear-gradient(90deg, #2563eb, #60a5fa)',
              borderRadius: 2,
            },
          }}
        >
          Explore Our Specialties
        </Typography>
        <Grid container spacing={2} justifyContent="center">
          {specialties.map((specialty, index) => (
            <Grid item key={index}>
              <Box
                sx={{
                  position: 'relative',
                  overflow: 'visible',
                  m: 1,
                }}
              >
                <Chip
                  label={specialty.name}
                  sx={{
                    px: 3,
                    py: 3,
                    fontSize: '1rem',
                    fontWeight: 600,
                    background: `linear-gradient(135deg, ${
                      index % 8 === 0 ? '#ff6b6b, #ffa8a8' :
                      index % 8 === 1 ? '#4dabf7, #74c0fc' :
                      index % 8 === 2 ? '#38d9a9, #63e6be' :
                      index % 8 === 3 ? '#9775fa, #b197fc' :
                      index % 8 === 4 ? '#ffd43b, #ffe066' :
                      index % 8 === 5 ? '#ff922b, #ffc078' :
                      index % 8 === 6 ? '#69db7c, #8ce99a' :
                      '#a5d8ff, #74c0fc'
                    })`,
                    color: '#fff',
                    textShadow: '0 1px 2px rgba(0,0,0,0.1)',
                    transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                    transform: 'perspective(1000px)',
                    zIndex: 2,
                    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
                    border: '1px solid rgba(255, 255, 255, 0.5)',
                    minWidth: '160px',
                    minHeight: '60px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      borderRadius: 'inherit',
                      background: 'rgba(255, 255, 255, 0.2)',
                      clipPath: 'polygon(0% 0%, 30% 0%, 10% 100%, 0% 100%)',
                      opacity: 0.5,
                      transition: 'all 0.4s ease',
                    },
                    '&:hover': {
                      transform: 'perspective(1000px) rotateX(10deg) translateY(-5px) scale(1.05)',
                      boxShadow: '0 20px 30px rgba(0,0,0,0.15), 0 10px 15px rgba(0,0,0,0.08)',
                      borderColor: 'rgba(255, 255, 255, 0.8)',
                      '&::before': {
                        clipPath: 'polygon(0% 0%, 100% 0%, 80% 100%, 0% 100%)',
                        opacity: 0.8,
                      },
                      '& + .specialty-description': {
                        opacity: 1,
                        visibility: 'visible',
                        transform: 'translateY(0) translateX(-50%)',
                      },
                    },
                    '&:active': {
                      transform: 'perspective(1000px) translateY(-2px) scale(1.02)',
                      boxShadow: '0 10px 20px rgba(0,0,0,0.12), 0 5px 10px rgba(0,0,0,0.06)',
                    },
                  }}
                />
                <Box
                  className="specialty-description"
                  sx={{
                    position: 'absolute',
                    top: '100%',
                    left: '50%',
                    transform: 'translateY(-10px) translateX(-50%)',
                    mt: 2,
                    p: 3,
                    borderRadius: 3,
                    backgroundColor: 'rgba(255, 255, 255, 0.98)',
                    backdropFilter: 'blur(10px)',
                    boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1), 0 0 0 1px rgba(255, 255, 255, 0.4)',
                    border: '1px solid rgba(255, 255, 255, 0.5)',
                    opacity: 0,
                    visibility: 'hidden',
                    transition: 'all 0.4s cubic-bezier(0.3, 0, 0.2, 1.5)',
                    zIndex: 10,
                    width: 280,
                    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.98), rgba(248, 250, 252, 0.95))',
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      top: -8,
                      left: '50%',
                      marginLeft: -8,
                      width: 16,
                      height: 16,
                      backgroundColor: 'white',
                      background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.98), rgba(248, 250, 252, 0.95))',
                      transform: 'rotate(45deg)',
                      borderTop: '1px solid rgba(255, 255, 255, 0.5)',
                      borderLeft: '1px solid rgba(255, 255, 255, 0.5)',
                      boxShadow: '-3px -3px 5px rgba(0, 0, 0, 0.03)',
                      zIndex: -1,
                    },
                  }}
                >
                  <Typography 
                    variant="body2" 
                    sx={{ 
                      lineHeight: 1.6,
                      fontWeight: 500,
                      color: 'text.primary',
                      textAlign: 'center' 
                    }}
                  >
                    {specialty.description}
                  </Typography>
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Statistics Section - Enhanced with Animated Numbers */}
      <Box
        sx={{
          background: theme.palette.gradients.glass,
          backdropFilter: 'blur(10px)',
          py: 12,
          position: 'relative',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'url("https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=2000")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: 0.1,
            zIndex: -1,
            transform: 'scale(1.1)',
            animation: 'subtle-zoom 20s infinite alternate',
          },
          '@keyframes subtle-zoom': {
            '0%': { transform: 'scale(1)' },
            '100%': { transform: 'scale(1.1)' },
          },
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4}>
            {statistics.map((stat, index) => (
              <Grid item xs={6} md={3} key={index}>
                <Fade in={true} timeout={500 + index * 200}>
                  <Card
                    sx={{
                      textAlign: 'center',
                      py: 6,
                      background: 'rgba(255,255,255,0.9)',
                      backdropFilter: 'blur(10px)',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        transform: 'translateY(-10px)',
                        boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
                      },
                    }}
                  >
                    <Typography
                      variant="h2"
                      sx={{
                        fontWeight: 800,
                        mb: 1,
                        background: 'linear-gradient(45deg, #2563eb, #60a5fa)',
                        backgroundClip: 'text',
                        textFillColor: 'transparent',
                      }}
                    >
                      {stat.number}
                    </Typography>
                    <Typography
                      variant="h6"
                      sx={{
                        color: 'text.secondary',
                        fontWeight: 500,
                      }}
                    >
                      {stat.label}
                    </Typography>
                  </Card>
                </Fade>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Features Section - Enhanced with Interactive Cards */}
      <Container maxWidth="lg" sx={{ py: { xs: 8, md: 12 } }}>
        <Typography
          variant="h2"
          align="center"
          sx={{
            mb: 2,
            fontWeight: 800,
            background: 'linear-gradient(45deg, #1e40af, #3b82f6)',
            backgroundClip: 'text',
            textFillColor: 'transparent',
          }}
        >
          Why Choose Our Platform?
        </Typography>
        <Typography
          variant="h5"
          align="center"
          color="text.secondary"
          sx={{ mb: 8, maxWidth: 800, mx: 'auto' }}
        >
          Experience healthcare reimagined with cutting-edge technology and compassionate care
        </Typography>
        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              key={index}
              className="animate-on-scroll"
              id={`feature-${index}`}
            >
              <Fade in={isVisible[`feature-${index}`]} timeout={500}>
                <Card
                  sx={{
                    height: '100%',
                    background: theme.palette.gradients.glass,
                    backdropFilter: 'blur(10px)',
                    transition: 'all 0.3s ease',
                    position: 'relative',
                    overflow: 'hidden',
                    cursor: 'pointer',
                    '&:hover': {
                      transform: 'translateY(-10px) scale(1.02)',
                      boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
                      '& .feature-icon': {
                        transform: 'scale(1.1) rotate(10deg)',
                        color: 'primary.main',
                      },
                      '& .feature-content': {
                        transform: 'translateY(-5px)',
                      },
                      '&::after': {
                        transform: 'rotate(30deg) translateX(0)',
                      },
                    },
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      height: '4px',
                      background: 'linear-gradient(90deg, #2563eb, #60a5fa)',
                    },
                    '&::after': {
                      content: '""',
                      position: 'absolute',
                      top: '-50%',
                      left: '-50%',
                      width: '200%',
                      height: '200%',
                      background: 'linear-gradient(45deg, rgba(255,255,255,0), rgba(255,255,255,0.1), rgba(255,255,255,0))',
                      transform: 'rotate(30deg) translateX(-100%)',
                      transition: 'transform 0.5s ease',
                    },
                  }}
                >
                  <CardContent sx={{ p: 4 }}>
                    <Box
                      className="feature-icon"
                      sx={{
                        color: 'primary.main',
                        mb: 3,
                        transition: 'all 0.3s ease',
                        transform: 'scale(1)',
                      }}
                    >
                      {feature.icon}
                    </Box>
                    <Box
                      className="feature-content"
                      sx={{
                        transition: 'all 0.3s ease',
                      }}
                    >
                      <Typography
                        variant="h5"
                        sx={{
                          mb: 2,
                          fontWeight: 700,
                          color: 'primary.dark',
                        }}
                      >
                        {feature.title}
                      </Typography>
                      <Typography
                        variant="body1"
                        sx={{
                          color: 'text.secondary',
                          lineHeight: 1.7,
                        }}
                      >
                        {feature.description}
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
              </Fade>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Testimonials Section */}
      <Box
        sx={{
          bgcolor: 'background.default',
          py: { xs: 8, md: 12 },
          position: 'relative',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'linear-gradient(135deg, rgba(37, 99, 235, 0.03), rgba(59, 130, 246, 0.05))',
            zIndex: 0,
          },
        }}
      >
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
          <Typography
            variant="h2"
            align="center"
            sx={{
              mb: 2,
              fontWeight: 800,
              background: 'linear-gradient(45deg, #1e40af, #3b82f6)',
              backgroundClip: 'text',
              textFillColor: 'transparent',
            }}
          >
            What Our Users Say
          </Typography>
          <Typography
            variant="h5"
            align="center"
            color="text.secondary"
            sx={{ mb: 8 }}
          >
            Join our community of satisfied healthcare providers and patients
          </Typography>
          <Box sx={{ position: 'relative' }}>
            {testimonials.map((testimonial, index) => (
              <Fade
                key={index}
                in={activeIndex === index}
                timeout={800}
                sx={{
                  display: activeIndex === index ? 'block' : 'none',
                }}
              >
                <Card
                  elevation={2}
                  sx={{
                    maxWidth: 800,
                    mx: 'auto',
                    background: 'rgba(255, 255, 255, 0.8)',
                    backdropFilter: 'blur(10px)',
                    borderRadius: 3,
                    position: 'relative',
                    overflow: 'visible',
                    '&::before': {
                      content: '"""',
                      position: 'absolute',
                      top: -40,
                      left: -20,
                      fontSize: '120px',
                      color: 'primary.light',
                      opacity: 0.1,
                      fontFamily: 'Georgia, serif',
                    },
                  }}
                >
                  <CardContent sx={{ p: { xs: 3, md: 6 } }}>
                    <Typography
                      variant="h5"
                      sx={{
                        mb: 4,
                        fontWeight: 500,
                        lineHeight: 1.8,
                        color: 'text.primary',
                        fontStyle: 'italic',
                      }}
                    >
                      {testimonial.quote}
                    </Typography>
                    <Box 
                      sx={{ 
                        display: 'flex', 
                        alignItems: 'center',
                        mt: 4,
                      }}
                    >
                      <Avatar
                        src={testimonial.image}
                        sx={{
                          width: 64,
                          height: 64,
                          mr: 3,
                          border: '3px solid',
                          borderColor: 'primary.light',
                        }}
                      />
                      <Box>
                        <Typography 
                          variant="h6" 
                          sx={{ 
                            fontWeight: 600,
                            color: 'text.primary',
                          }}
                        >
                          {testimonial.name}
                        </Typography>
                        <Typography 
                          variant="subtitle1" 
                          sx={{ 
                            color: 'primary.main',
                            fontWeight: 500,
                          }}
                        >
                          {testimonial.role}
                        </Typography>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              </Fade>
            ))}
            <Stack
              direction="row"
              spacing={2}
              justifyContent="center"
              sx={{ mt: 4 }}
            >
              {testimonials.map((_, index) => (
                <Box
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  sx={{
                    width: 10,
                    height: 10,
                    borderRadius: '50%',
                    bgcolor: activeIndex === index ? 'primary.main' : 'grey.300',
                    transition: 'all 0.3s ease',
                    cursor: 'pointer',
                    '&:hover': {
                      transform: 'scale(1.2)',
                      bgcolor: activeIndex === index ? 'primary.main' : 'grey.400',
                    },
                  }}
                />
              ))}
            </Stack>
          </Box>
        </Container>
      </Box>

      {/* Achievements Section - Enhanced with Interactive Elements */}
      <Container maxWidth="lg" sx={{ py: { xs: 8, md: 12 } }}>
        <Grid container spacing={4}>
          {achievements.map((achievement, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Card
                sx={{
                  height: '100%',
                  background: theme.palette.gradients.glass,
                  backdropFilter: 'blur(10px)',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer',
                  '&:hover': {
                    transform: 'translateY(-10px) scale(1.02)',
                    boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
                    '& .achievement-icon': {
                      transform: 'scale(1.2) rotate(10deg)',
                    },
                  },
                }}
              >
                <CardContent sx={{ p: 4, textAlign: 'center' }}>
                  <Box 
                    className="achievement-icon"
                    sx={{ 
                      mb: 3,
                      transition: 'all 0.3s ease',
                      transform: 'scale(1)',
                    }}
                  >
                    {achievement.icon}
                  </Box>
                  <Typography variant="h5" sx={{ mb: 2, fontWeight: 700 }}>
                    {achievement.title}
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    {achievement.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Enhanced CTA Section - With More Dynamic Effects */}
      <Box
        sx={{
          position: 'relative',
          py: { xs: 8, md: 12 },
          background: 'linear-gradient(135deg, #1e40af, #3b82f6)',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: 'url("https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=2000")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: 0.1,
            animation: 'subtle-zoom 20s infinite alternate',
          },
        }}
      >
        <ParticleBackground />
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2 }}>
          <Box
            sx={{
              textAlign: 'center',
              p: { xs: 4, md: 8 },
              borderRadius: 4,
              background: 'rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              position: 'relative',
              overflow: 'hidden',
              '&::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'linear-gradient(45deg, rgba(255,255,255,0.1), rgba(255,255,255,0))',
                transform: 'translateX(-100%)',
                transition: 'transform 0.6s ease',
              },
              '&:hover::before': {
                transform: 'translateX(100%)',
              },
            }}
          >
            <Typography
              variant="h2"
              sx={{
                mb: 3,
                fontWeight: 800,
                color: 'white',
                textShadow: '0 2px 4px rgba(0,0,0,0.1)',
              }}
            >
              Ready to Transform Your Healthcare Experience?
            </Typography>
            <Typography
              variant="h5"
              sx={{
                mb: 6,
                color: 'rgba(255, 255, 255, 0.9)',
                maxWidth: 800,
                mx: 'auto',
              }}
            >
              Join thousands of healthcare providers and patients who trust our platform.
              Start your journey to better healthcare today.
            </Typography>
            <Stack
              direction={{ xs: 'column', sm: 'row' }}
              spacing={3}
              justifyContent="center"
            >
              <Button
                component={RouterLink}
                to="/register"
                variant="contained"
                size="large"
                sx={{
                  bgcolor: '#2563eb',
                  color: 'white',
                  px: 8,
                  py: 2,
                  fontSize: '1.2rem',
                  fontWeight: 600,
                  transition: 'all 0.3s ease',
                  boxShadow: '0 4px 6px rgba(37, 99, 235, 0.3)',
                  '&:hover': {
                    bgcolor: '#1d4ed8',
                    transform: 'translateY(-3px)',
                    boxShadow: '0 20px 40px rgba(37, 99, 235, 0.4)',
                  },
                }}
              >
                Get Started Now
              </Button>
              <Button
                component={RouterLink}
                to="/contact"
                variant="outlined"
                size="large"
                sx={{
                  borderColor: 'white',
                  color: 'white',
                  px: 8,
                  py: 2,
                  fontSize: '1.2rem',
                  fontWeight: 600,
                  '&:hover': {
                    borderColor: 'white',
                    bgcolor: 'rgba(255, 255, 255, 0.1)',
                    transform: 'translateY(-3px)',
                  },
                }}
              >
                Schedule a Demo
              </Button>
            </Stack>
          </Box>
        </Container>
      </Box>

      {/* Contact Information - Enhanced with Interactive Cards */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Grid container spacing={4} justifyContent="center">
          <Grid item xs={12} md={4}>
            <Paper
              sx={{
                p: 3,
                textAlign: 'center',
                background: theme.palette.gradients.glass,
                backdropFilter: 'blur(10px)',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-5px)',
                },
              }}
            >
              <Phone sx={{ fontSize: 40, color: 'primary.main', mb: 2 }} />
              <Typography variant="h6" gutterBottom>
                Call Us
              </Typography>
              <Typography variant="body1" color="text.secondary">
                1-800-HEALTH-CARE
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper
              sx={{
                p: 3,
                textAlign: 'center',
                background: theme.palette.gradients.glass,
                backdropFilter: 'blur(10px)',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-5px)',
                },
              }}
            >
              <Email sx={{ fontSize: 40, color: 'primary.main', mb: 2 }} />
              <Typography variant="h6" gutterBottom>
                Email Us
              </Typography>
              <Typography variant="body1" color="text.secondary">
                support@healthcare.com
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Home; 