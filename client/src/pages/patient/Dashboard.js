import React, { useState, useEffect } from 'react';
import { 
  Grid, Typography, Box, Card, CardContent, IconButton, 
  Avatar, Chip, Button, Divider, LinearProgress, Paper, CircularProgress
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import SearchIcon from '@mui/icons-material/Search';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import DescriptionIcon from '@mui/icons-material/Description';
import MedicationIcon from '@mui/icons-material/Medication';
import FavoriteIcon from '@mui/icons-material/Favorite';
import MonitorHeartIcon from '@mui/icons-material/MonitorHeart';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import VideocamIcon from '@mui/icons-material/Videocam';
import PhoneIcon from '@mui/icons-material/Phone';
import SpaIcon from '@mui/icons-material/Spa';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useAuth } from '../../contexts/AuthContext';
import patientService from '../../services/patient.service';
import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom';

function PatientDashboard() {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState([]);
  const [prescriptions, setPrescriptions] = useState([]);
  const [medicationReminders, setMedicationReminders] = useState([]);
  const [healthMetrics, setHealthMetrics] = useState([]);
  const [loading, setLoading] = useState({
    appointments: true,
    prescriptions: true,
    medicationReminders: true,
    healthMetrics: true
  });
  const [error, setError] = useState({
    appointments: null,
    prescriptions: null,
    medicationReminders: null,
    healthMetrics: null
  });
  
  // Fetch appointment data
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch appointments
        const appointmentResponse = await patientService.getPatientAppointments();
        setAppointments(appointmentResponse.data);
        setLoading(prev => ({ ...prev, appointments: false }));
        
        // Fetch prescriptions
        const prescriptionResponse = await patientService.getPatientPrescriptions();
        setPrescriptions(prescriptionResponse.data);
        setLoading(prev => ({ ...prev, prescriptions: false }));
        
        // Fetch medication reminders
        const medicationResponse = await patientService.getMedicationReminders();
        setMedicationReminders(medicationResponse.data);
        setLoading(prev => ({ ...prev, medicationReminders: false }));
        
        // Fetch health metrics
        const healthMetricsResponse = await patientService.getHealthMetrics();
        setHealthMetrics(healthMetricsResponse.data);
        setLoading(prev => ({ ...prev, healthMetrics: false }));
        
      } catch (err) {
        console.error('Error fetching patient data:', err);
        setError({
          appointments: 'Failed to load appointments. Please try again later.',
          prescriptions: 'Failed to load prescriptions. Please try again later.',
          medicationReminders: 'Failed to load medication reminders. Please try again later.',
          healthMetrics: 'Failed to load health metrics. Please try again later.'
        });
        setLoading({
          appointments: false,
          prescriptions: false,
          medicationReminders: false,
          healthMetrics: false
        });
      }
    };
    
    fetchData();
  }, []);
  
  const getAppointmentMethodIcon = (method) => {
    switch(method) {
      case 'video':
        return <VideocamIcon color="primary" fontSize="small" />;
      case 'phone':
        return <PhoneIcon color="primary" fontSize="small" />;
      case 'in-person':
      default:
        return <PersonIcon color="primary" fontSize="small" />;
    }
  };
  
  const getStatusChip = (status) => {
    switch(status) {
      case 'confirmed':
        return <Chip size="small" label="Confirmed" color="success" sx={{ borderRadius: 1, fontWeight: 500 }} />;
      case 'pending':
        return <Chip size="small" label="Pending" color="warning" sx={{ borderRadius: 1, fontWeight: 500 }} />;
      case 'cancelled':
        return <Chip size="small" label="Cancelled" color="error" sx={{ borderRadius: 1, fontWeight: 500 }} />;
      case 'today':
        return <Chip size="small" label="Today" color="error" sx={{ borderRadius: 1, fontWeight: 500 }} />;
      case 'upcoming':
        return <Chip size="small" label="Upcoming" color="info" sx={{ borderRadius: 1, fontWeight: 500 }} />;
      default:
        return <Chip size="small" label={status} color="primary" sx={{ borderRadius: 1, fontWeight: 500 }} />;
    }
  };

  const getValueColor = (status) => {
    switch(status) {
      case 'normal':
        return 'success.main';
      case 'warning':
        return 'warning.main';
      case 'critical':
        return 'error.main';
      default:
        return 'text.primary';
    }
  };

  // Format appointment date display
  const formatAppointmentDate = (dateString) => {
    const appointmentDate = new Date(dateString);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    // Check if date is today
    if (appointmentDate.toDateString() === today.toDateString()) {
      return 'Today';
    }
    
    // Check if date is tomorrow
    if (appointmentDate.toDateString() === tomorrow.toDateString()) {
      return 'Tomorrow';
    }
    
    // Return formatted date
    return format(appointmentDate, 'MMM d, yyyy');
  };
  
  // Format appointment time display
  const formatAppointmentTime = (timeString) => {
    // Assuming time comes in a format like "10:00:00"
    if (!timeString) return '';
    
    const [hours, minutes] = timeString.split(':');
    const hour = parseInt(hours, 10);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const hour12 = hour % 12 || 12;
    
    return `${hour12}:${minutes} ${ampm}`;
  };
  
  return (
    <Box>
      {/* Welcome Section */}
      <Box sx={{ mb: 5 }}>
        <Typography variant="h4" fontWeight={700} sx={{ mb: 0.5 }}>
          Welcome{currentUser ? `, ${currentUser.name}` : ''}!
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Here's an overview of your health status and upcoming appointments.
        </Typography>
      </Box>
      
      {/* Quick Action Buttons */}
      <Grid container spacing={2} sx={{ mb: 5 }}>
          <Grid item xs={6} sm={3}>
          <Card 
            sx={{
              borderRadius: 3,
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
              transition: 'transform 0.2s ease, box-shadow 0.2s ease',
              height: '100%',
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: '0 10px 24px rgba(0, 0, 0, 0.1)',
                '& .MuiSvgIcon-root': {
                  transform: 'scale(1.1)',
                },
              },
            }}
          >
            <CardContent sx={{ 
              height: '100%', 
              display: 'flex', 
              flexDirection: 'column',
              alignItems: 'center', 
              p: 3,
              textAlign: 'center',
            }}>
              <Box 
                sx={{ 
                  p: 1.5, 
                  borderRadius: 2, 
                  mb: 2, 
                  bgcolor: 'rgba(37, 99, 235, 0.1)', 
                  width: 55, 
                  height: 55, 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                }}
              >
                <SearchIcon 
                  color="primary" 
                  sx={{ 
                    fontSize: 30,
                    transition: 'transform 0.2s ease',
                  }}
                />
              </Box>
              <Typography variant="h6" fontWeight={600} gutterBottom>
                Find Doctor
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ flexGrow: 1, mb: 2 }}>
                Search specialists near you
            </Typography>
              <Button 
                variant="outlined" 
                color="primary" 
                size="small"
                fullWidth
                sx={{ 
                  mt: 'auto', 
                  borderRadius: 2, 
                  textTransform: 'none',
                  fontWeight: 600
                }}
              >
                Search
              </Button>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={6} sm={3}>
          <Card 
            sx={{
              borderRadius: 3,
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
              transition: 'transform 0.2s ease, box-shadow 0.2s ease',
              height: '100%',
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: '0 10px 24px rgba(0, 0, 0, 0.1)',
                '& .MuiSvgIcon-root': {
                  transform: 'scale(1.1)',
                },
              },
            }}
          >
            <CardContent sx={{ 
              height: '100%', 
              display: 'flex', 
              flexDirection: 'column',
              alignItems: 'center', 
              p: 3,
              textAlign: 'center',
            }}>
              <Box 
                sx={{ 
                  p: 1.5, 
                  borderRadius: 2, 
                  mb: 2, 
                  bgcolor: 'rgba(244, 63, 94, 0.1)', 
                  width: 55, 
                  height: 55, 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                }}
              >
                <CalendarMonthIcon 
                  color="secondary" 
                  sx={{ 
                    fontSize: 30,
                    transition: 'transform 0.2s ease',
                  }}
                />
              </Box>
              <Typography variant="h6" fontWeight={600} gutterBottom>
                Book Appointment
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ flexGrow: 1, mb: 2 }}>
                Schedule your next visit
            </Typography>
              <Button 
                variant="outlined" 
                color="secondary" 
                size="small"
                fullWidth
                sx={{ 
                  mt: 'auto', 
                  borderRadius: 2, 
                  textTransform: 'none',
                  fontWeight: 600
                }}
              >
                Book Now
              </Button>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={6} sm={3}>
          <Card 
            sx={{
              borderRadius: 3,
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
              transition: 'transform 0.2s ease, box-shadow 0.2s ease',
              height: '100%',
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: '0 10px 24px rgba(0, 0, 0, 0.1)',
                '& .MuiSvgIcon-root': {
                  transform: 'scale(1.1)',
                },
              },
            }}
          >
            <CardContent sx={{ 
              height: '100%', 
              display: 'flex', 
              flexDirection: 'column',
              alignItems: 'center', 
              p: 3,
              textAlign: 'center',
            }}>
              <Box 
                sx={{ 
                  p: 1.5, 
                  borderRadius: 2, 
                  mb: 2, 
                  bgcolor: 'rgba(99, 102, 241, 0.1)', 
                  width: 55, 
                  height: 55, 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                }}
              >
                <DescriptionIcon 
                  color="info" 
                  sx={{ 
                    fontSize: 30,
                    transition: 'transform 0.2s ease',
                  }}
                />
              </Box>
              <Typography variant="h6" fontWeight={600} gutterBottom>
                View Records
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ flexGrow: 1, mb: 2 }}>
                Access your medical history
            </Typography>
              <Button 
                variant="outlined" 
                color="info" 
                size="small"
                fullWidth
                sx={{ 
                  mt: 'auto', 
                  borderRadius: 2, 
                  textTransform: 'none',
                  fontWeight: 600
                }}
              >
                View
              </Button>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={6} sm={3}>
          <Card 
            sx={{
              borderRadius: 3,
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
              transition: 'transform 0.2s ease, box-shadow 0.2s ease',
              height: '100%',
              background: 'linear-gradient(135deg, #ef4444, #f87171)',
              color: 'white',
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: '0 10px 24px rgba(239, 68, 68, 0.25)',
                '& .MuiSvgIcon-root': {
                  transform: 'scale(1.1)',
                },
              },
            }}
          >
            <CardContent sx={{ 
              height: '100%', 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center', 
              p: 3,
              textAlign: 'center',
            }}>
              <Box 
                sx={{ 
                  p: 1.5, 
                  borderRadius: 2, 
                  mb: 2, 
                  bgcolor: 'rgba(255, 255, 255, 0.2)', 
                  width: 55, 
                  height: 55, 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                }}
              >
                <LocalHospitalIcon 
                  sx={{ 
                    fontSize: 30,
                    color: 'white',
                    transition: 'transform 0.2s ease',
                  }}
                />
              </Box>
              <Typography variant="h6" fontWeight={600} gutterBottom>
                Emergency
              </Typography>
              <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.9)', flexGrow: 1, mb: 2 }}>
                Request urgent assistance
            </Typography>
              <Button 
                variant="contained" 
                color="error" 
                size="small"
                fullWidth
                sx={{ 
                  mt: 'auto', 
                  borderRadius: 2, 
                  textTransform: 'none',
                  fontWeight: 600,
                  bgcolor: 'white',
                  color: 'error.main',
                  '&:hover': {
                    bgcolor: 'rgba(255, 255, 255, 0.9)',
                  }
                }}
              >
                Call Now
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      
      {/* Health Stats Overview */}
      <Grid container spacing={3} sx={{ mb: 5 }}>
        {healthMetrics.map((metric) => (
          <Grid item xs={12} md={4} key={metric.id}>
            <Card 
              sx={{ 
                borderRadius: 3,
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
                height: '100%',
                overflow: 'hidden',
                position: 'relative',
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  background: metric.status === 'normal' 
                    ? 'linear-gradient(135deg, rgba(16, 185, 129, 0.05), rgba(52, 211, 153, 0.02))'
                    : metric.status === 'warning'
                      ? 'linear-gradient(135deg, rgba(245, 158, 11, 0.05), rgba(251, 191, 36, 0.02))'
                      : 'linear-gradient(135deg, rgba(239, 68, 68, 0.05), rgba(248, 113, 113, 0.02))',
                  zIndex: 0,
                }
              }}
            >
              <CardContent sx={{ position: 'relative', zIndex: 1, p: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Box 
                    sx={{ 
                      p: 1,
                      borderRadius: 2,
                      bgcolor: metric.status === 'normal' 
                        ? 'rgba(16, 185, 129, 0.1)'
                        : metric.status === 'warning'
                          ? 'rgba(245, 158, 11, 0.1)'
                          : 'rgba(239, 68, 68, 0.1)',
                      mr: 2
                    }}
                  >
                    <Box sx={{ color: getValueColor(metric.status) }}>
                      {metric.icon}
                    </Box>
                  </Box>
                  <Box>
                    <Typography variant="subtitle2" color="text.secondary">
                      {metric.name}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Typography variant="h5" fontWeight={700} sx={{ color: getValueColor(metric.status) }}>
                        {metric.value}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ ml: 0.5 }}>
                        {metric.unit}
                      </Typography>
                    </Box>
                  </Box>
                  <Box sx={{ ml: 'auto', display: 'flex', alignItems: 'center' }}>
                    {metric.trend === 'up' && <TrendingUpIcon fontSize="small" color="success" />}
                    {metric.trend === 'down' && <TrendingDownIcon fontSize="small" color="error" />}
                    <Typography 
                      variant="caption" 
                      fontWeight={600} 
                      sx={{ 
                        ml: 0.5,
                        color: metric.trend === 'up' 
                          ? 'success.main' 
                          : metric.trend === 'down' 
                            ? 'error.main' 
                            : 'text.secondary'
                      }}
                    >
                      {metric.change}
                    </Typography>
                  </Box>
                </Box>
                <LinearProgress 
                  variant="determinate" 
                  value={metric.status === 'normal' ? 75 : metric.status === 'warning' ? 55 : 35}
                  sx={{ 
                    height: 6, 
                    borderRadius: 3,
                    bgcolor: 'rgba(0, 0, 0, 0.05)',
                    '.MuiLinearProgress-bar': {
                      bgcolor: getValueColor(metric.status),
                    }
                  }}
                />
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={4}>
        {/* Upcoming Appointments */}
        <Grid item xs={12} md={7}>
          <Card 
            sx={{ 
              borderRadius: 3, 
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
              height: '100%',
              overflow: 'hidden'
            }}
          >
            <CardContent sx={{ p: { xs: 2, md: 3 }, height: '100%' }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h6" fontWeight={600}>
                  Upcoming Appointments
                </Typography>
                <Button 
                  variant="outlined" 
                  color="primary" 
                  size="small"
                  endIcon={<ArrowForwardIcon />}
                  sx={{ 
                    borderRadius: 2,
                    textTransform: 'none',
                    fontWeight: 600,
                    px: 2
                  }}
                >
                  View All
                </Button>
              </Box>
              
              <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                {loading.appointments ? (
                  <Box sx={{ display: 'flex', justifyContent: 'center', p: 2 }}>
                    <CircularProgress size={30} />
                  </Box>
                ) : error.appointments ? (
                  <Typography color="error" variant="body2" sx={{ p: 2 }}>
                    {error.appointments}
                  </Typography>
                ) : appointments.length === 0 ? (
                  <Typography variant="body2" color="text.secondary" sx={{ p: 2 }}>
                    No upcoming appointments found.
                  </Typography>
                ) : (
                  appointments.map((appointment, index) => (
                    <Paper
                      key={appointment.id}
                      elevation={0}
                      sx={{
                        p: 2,
                        mb: index < appointments.length - 1 ? 2 : 0,
                        borderRadius: 2,
                        border: '1px solid rgba(0, 0, 0, 0.05)',
                        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                        '&:hover': {
                          transform: 'translateY(-2px)',
                          boxShadow: '0 8px 20px rgba(0, 0, 0, 0.1)',
                        },
                      }}
                    >
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                        <Typography variant="subtitle1" fontWeight={600}>
                          {appointment.doctor?.user?.name || 'Doctor'}
                        </Typography>
                        {getStatusChip(appointment.status)}
                      </Box>
                      <Typography variant="body2" color="text.secondary" gutterBottom>
                        {appointment.doctor?.specialty || 'Specialist'}
                      </Typography>
                      
                      <Box sx={{ display: 'flex', mt: 2 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', mr: 3 }}>
                          <CalendarMonthIcon fontSize="small" color="primary" sx={{ mr: 1, fontSize: 16 }} />
                          <Typography variant="body2" fontWeight={500}>
                            {formatAppointmentDate(appointment.date)}
                          </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <AccessTimeIcon fontSize="small" color="primary" sx={{ mr: 1, fontSize: 16 }} />
                          <Typography variant="body2" fontWeight={500}>
                            {formatAppointmentTime(appointment.time)}
                          </Typography>
                        </Box>
                      </Box>
                      
                      <Box sx={{ display: 'flex', alignItems: 'center', mt: 1.5 }}>
                        {getAppointmentMethodIcon(appointment.method)}
                        <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                          {appointment.method === 'in-person' ? appointment.location : 
                           appointment.method === 'video' ? 'Video consultation' : 'Phone consultation'}
                        </Typography>
                      </Box>
                      
                      {appointment.reasonForVisit && (
                        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                          <strong>Reason:</strong> {appointment.reasonForVisit}
                        </Typography>
                      )}
                    </Paper>
                  ))
                )}
              </Box>
            </CardContent>
          </Card>
        </Grid>
        
        {/* Medication Reminders */}
        <Grid item xs={12} md={5}>
          <Card 
            sx={{ 
              borderRadius: 3, 
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
              height: '100%',
              overflow: 'hidden'
            }}
          >
            <CardContent sx={{ p: { xs: 2, md: 3 }, height: '100%' }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h6" fontWeight={600}>
                  Medication Reminders
                </Typography>
                <Button 
                  variant="outlined" 
                  color="primary" 
                  size="small"
                  endIcon={<ArrowForwardIcon />}
                  sx={{ 
                    borderRadius: 2,
                    textTransform: 'none',
                    fontWeight: 600,
                    px: 2
                  }}
                >
                  View All
                </Button>
              </Box>
              
              <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                {loading.prescriptions ? (
                  <Box sx={{ display: 'flex', justifyContent: 'center', p: 2 }}>
                    <CircularProgress size={30} />
                  </Box>
                ) : error.prescriptions ? (
                  <Typography color="error" variant="body2" sx={{ p: 2 }}>
                    {error.prescriptions}
                  </Typography>
                ) : prescriptions.length === 0 ? (
                  <Typography variant="body2" color="text.secondary" sx={{ p: 2 }}>
                    No prescriptions found.
                  </Typography>
                ) : (
                  prescriptions.map((prescription, index) => {
                    // Parse medications JSON
                    const medications = JSON.parse(prescription.medications || '[]');
                    return (
                      <Box key={prescription.id}>
                        <Paper
                          elevation={0}
                          sx={{
                            p: 2,
                            borderRadius: 2,
                            border: '1px solid rgba(0, 0, 0, 0.05)',
                            transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                            '&:hover': {
                              transform: 'translateY(-2px)',
                              boxShadow: '0 8px 20px rgba(0, 0, 0, 0.1)',
                            },
                          }}
                        >
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                            <Typography variant="subtitle1" fontWeight={600}>
                              {prescription.diagnosis}
                            </Typography>
                            {getStatusChip(prescription.status)}
                          </Box>
                          
                          {medications.map((med, medIndex) => (
                            <Box key={medIndex} sx={{ mb: medIndex === medications.length - 1 ? 0 : 1 }}>
                              <Typography variant="body2" fontWeight={500} color="primary.main">
                                {med.name} ({med.dosage})
                              </Typography>
                              <Typography variant="body2" color="text.secondary">
                                {med.frequency} for {med.duration}
                              </Typography>
                            </Box>
                          ))}
                          
                          <Box sx={{ mt: 1.5, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Typography variant="caption" color="text.secondary">
                              Issued: {new Date(prescription.issueDate).toLocaleDateString()}
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                              {prescription.refills > 0 ? `Refills: ${prescription.refills}` : 'No refills'}
                            </Typography>
                          </Box>
                        </Paper>
                        {index < prescriptions.length - 1 && (
                          <Box sx={{ my: 2, px: 2 }}>
                            <Divider />
                          </Box>
                        )}
                      </Box>
                    );
                  })
                )}
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
} 

export default PatientDashboard; 