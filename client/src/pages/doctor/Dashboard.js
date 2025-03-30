import React, { useState, useEffect } from 'react';
import { 
  Grid, Typography, Box, Card, CardContent, IconButton, Avatar,
  Chip, Table, TableBody, TableCell, TableContainer, TableHead, 
  TableRow, Paper, Divider, LinearProgress, Badge, Button, CircularProgress
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AssignmentIcon from '@mui/icons-material/Assignment';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VideocamIcon from '@mui/icons-material/Videocam';
import PhoneIcon from '@mui/icons-material/Phone';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import { useAuth } from '../../contexts/AuthContext';
import doctorService from '../../services/doctor.service';
import patientService from '../../services/patient.service';

function DoctorDashboard() {
  const { currentUser } = useAuth();
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [stats, setStats] = useState({
    totalPatients: 0,
    totalAppointments: 0,
    totalPrescriptions: 0
  });
  const [upcomingAppointments, setUpcomingAppointments] = useState([]);
  const [recentPatients, setRecentPatients] = useState([]);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    async function fetchDashboardData() {
      try {
        setLoading(true);
        
        // Fetch appointments
        const appointmentsResponse = await doctorService.getDoctorAppointments();
        const appointments = appointmentsResponse.data.appointments || [];
        setUpcomingAppointments(appointments.map(appt => ({
          id: appt.id,
          patientName: appt.Patient?.User?.name || 'Unknown',
          patientAvatar: appt.Patient?.User?.profileImage || '',
          date: new Date(appt.date).toLocaleDateString(),
          time: appt.time,
          type: appt.type,
          method: appt.method,
          status: appt.status
        })));
        
        // Fetch patients 
        const patientsResponse = await patientService.getAllPatients();
        const patients = patientsResponse.data || [];
        setRecentPatients(patients.slice(0, 3).map(patient => ({
          id: patient.id,
          name: patient.User?.name || 'Unknown',
          avatar: patient.User?.profileImage || '',
          age: patient.dateOfBirth ? calculateAge(patient.dateOfBirth) : 'N/A',
          lastVisit: patient.lastVisit || 'N/A',
          condition: patient.chronicConditions || 'N/A',
          status: 'Stable' // This would come from the actual data in a real app
        })));
        
        // Fetch prescriptions
        const prescriptionsResponse = await doctorService.getDoctorPrescriptions();
        const prescriptions = prescriptionsResponse.data.prescriptions || [];
        
        // Set statistics
        setStats({
          totalPatients: patients.length || 0,
          totalAppointments: appointments.length || 0,
          totalPrescriptions: prescriptions.length || 0
        });
        
        // In a real app, you would fetch notifications from an API endpoint
        // Using dummy notifications for now
        setNotifications([
          {
            id: 1,
            type: 'appointment',
            message: 'New appointment scheduled',
            time: '30 minutes ago'
          },
          {
            id: 2,
            type: 'lab',
            message: 'Lab results ready',
            time: '2 hours ago'
          },
          {
            id: 3,
            type: 'message',
            message: 'New message from patient',
            time: '3 hours ago'
          }
        ]);
        
        setLoading(false);
      } catch (err) {
        console.error('Error fetching dashboard data:', err);
        setError('Failed to load dashboard data');
        setLoading(false);
      }
    }
    
    fetchDashboardData();
  }, []);
  
  // Helper function to calculate age from date of birth
  const calculateAge = (dateOfBirth) => {
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };
  
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
      default:
        return <Chip size="small" label={status} color="primary" sx={{ borderRadius: 1, fontWeight: 500 }} />;
    }
  };
  
  const getPatientStatusChip = (status) => {
    switch(status) {
      case 'Stable':
        return <Chip size="small" label="Stable" color="success" sx={{ borderRadius: 1, fontWeight: 500 }} />;
      case 'Improving':
        return <Chip size="small" label="Improving" color="info" sx={{ borderRadius: 1, fontWeight: 500 }} />;
      case 'Critical':
        return <Chip size="small" label="Critical" color="error" sx={{ borderRadius: 1, fontWeight: 500 }} />;
      default:
        return <Chip size="small" label={status} color="primary" sx={{ borderRadius: 1, fontWeight: 500 }} />;
    }
  };
  
  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
        <CircularProgress />
      </Box>
    );
  }
  
  if (error) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  return (
    <Box>
      <Box sx={{ mb: 5, display: 'flex', flexDirection: 'column' }}>
        <Typography variant="h4" fontWeight={700} sx={{ mb: 0.5 }}>
          Welcome{currentUser ? `, Dr. ${currentUser.name}` : ''}!
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Here's what's happening with your patients today.
        </Typography>
      </Box>
      
      {/* Stats Overview */}
      <Grid container spacing={3} sx={{ mb: 5 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card 
            sx={{
              borderRadius: 3,
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
              position: 'relative',
              overflow: 'hidden',
              height: '100%',
              '&::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                backgroundImage: 'linear-gradient(135deg, rgba(37, 99, 235, 0.1), rgba(59, 130, 246, 0.05))',
                zIndex: 0,
              }
            }}
          >
            <CardContent sx={{ position: 'relative', zIndex: 1, height: '100%' }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                <Box
                  sx={{
                    p: 1.5,
                    borderRadius: 2,
                    bgcolor: 'rgba(37, 99, 235, 0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <PersonIcon sx={{ color: 'primary.main' }} />
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <TrendingUpIcon sx={{ color: 'success.main', fontSize: 14, mr: 0.5 }} />
                  <Typography variant="caption" fontWeight={600} color="success.main">
                    +8%
                  </Typography>
                </Box>
              </Box>
              <Typography variant="h3" fontWeight={700}>
                {stats.totalPatients}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Total Patients
              </Typography>
              <LinearProgress 
                variant="determinate" 
                value={70} 
                sx={{ 
                  height: 6, 
                  borderRadius: 1,
                  bgcolor: 'rgba(37, 99, 235, 0.1)',
                  '& .MuiLinearProgress-bar': {
                    bgcolor: 'primary.main',
                  }
                }} 
              />
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <Card 
            sx={{
              borderRadius: 3,
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
              position: 'relative',
              overflow: 'hidden',
              height: '100%',
              '&::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                backgroundImage: 'linear-gradient(135deg, rgba(239, 68, 68, 0.1), rgba(248, 113, 113, 0.05))',
                zIndex: 0,
              }
            }}
          >
            <CardContent sx={{ position: 'relative', zIndex: 1, height: '100%' }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                <Box
                  sx={{
                    p: 1.5,
                    borderRadius: 2,
                    bgcolor: 'rgba(239, 68, 68, 0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <CalendarMonthIcon sx={{ color: 'error.main' }} />
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <TrendingUpIcon sx={{ color: 'success.main', fontSize: 14, mr: 0.5 }} />
                  <Typography variant="caption" fontWeight={600} color="success.main">
                    +12%
                  </Typography>
                </Box>
              </Box>
              <Typography variant="h3" fontWeight={700}>
                {stats.totalAppointments}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Total Appointments
              </Typography>
              <LinearProgress 
                variant="determinate" 
                value={60} 
                sx={{ 
                  height: 6, 
                  borderRadius: 1,
                  bgcolor: 'rgba(239, 68, 68, 0.1)',
                  '& .MuiLinearProgress-bar': {
                    bgcolor: 'error.main',
                  }
                }} 
              />
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <Card 
            sx={{
              borderRadius: 3,
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
              position: 'relative',
              overflow: 'hidden',
              height: '100%',
              '&::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                backgroundImage: 'linear-gradient(135deg, rgba(16, 185, 129, 0.1), rgba(5, 150, 105, 0.05))',
                zIndex: 0,
              }
            }}
          >
            <CardContent sx={{ position: 'relative', zIndex: 1, height: '100%' }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                <Box
                  sx={{
                    p: 1.5,
                    borderRadius: 2,
                    bgcolor: 'rgba(16, 185, 129, 0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <AssignmentIcon sx={{ color: 'success.main' }} />
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <TrendingUpIcon sx={{ color: 'success.main', fontSize: 14, mr: 0.5 }} />
                  <Typography variant="caption" fontWeight={600} color="success.main">
                    +5%
                  </Typography>
                </Box>
              </Box>
              <Typography variant="h3" fontWeight={700}>
                {stats.totalPrescriptions}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Total Prescriptions
              </Typography>
              <LinearProgress 
                variant="determinate" 
                value={40} 
                sx={{ 
                  height: 6, 
                  borderRadius: 1,
                  bgcolor: 'rgba(16, 185, 129, 0.1)',
                  '& .MuiLinearProgress-bar': {
                    bgcolor: 'success.main',
                  }
                }} 
              />
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <Card 
            sx={{
              borderRadius: 3,
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
              position: 'relative',
              overflow: 'hidden',
              height: '100%',
              '&::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                backgroundImage: 'linear-gradient(135deg, rgba(99, 102, 241, 0.1), rgba(129, 140, 248, 0.05))',
                zIndex: 0,
              }
            }}
          >
            <CardContent sx={{ position: 'relative', zIndex: 1, height: '100%' }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                <Box
                  sx={{
                    p: 1.5,
                    borderRadius: 2,
                    bgcolor: 'rgba(99, 102, 241, 0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <NotificationsIcon sx={{ color: 'info.main' }} />
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <TrendingUpIcon sx={{ color: 'success.main', fontSize: 14, mr: 0.5 }} />
                  <Typography variant="caption" fontWeight={600} color="success.main">
                    +24%
              </Typography>
                </Box>
            </Box>
              <Typography variant="h3" fontWeight={700}>
              5
            </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                New Notifications
            </Typography>
              <LinearProgress 
                variant="determinate" 
                value={80} 
                sx={{ 
                  height: 6, 
                  borderRadius: 1,
                  bgcolor: 'rgba(99, 102, 241, 0.1)',
                  '& .MuiLinearProgress-bar': {
                    bgcolor: 'info.main',
                  }
                }} 
              />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      
      <Grid container spacing={4}>
        {/* Upcoming Appointments */}
        <Grid item xs={12} lg={8}>
          <Card 
            sx={{ 
              borderRadius: 3, 
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
              height: '100%',
              overflow: 'hidden'
            }}
          >
            <CardContent sx={{ p: { xs: 2, md: 3 } }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h6" fontWeight={600}>
                  Upcoming Appointments
                </Typography>
                <Button 
                  variant="outlined" 
                  color="primary" 
                  size="small"
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
              
              <TableContainer component={Box}>
                <Table sx={{ minWidth: 650 }}>
                  <TableHead sx={{ bgcolor: 'rgba(0, 0, 0, 0.02)' }}>
                    <TableRow>
                      <TableCell sx={{ fontWeight: 600, py: 1.5 }}>Patient</TableCell>
                      <TableCell sx={{ fontWeight: 600, py: 1.5 }}>Date & Time</TableCell>
                      <TableCell sx={{ fontWeight: 600, py: 1.5 }}>Type</TableCell>
                      <TableCell sx={{ fontWeight: 600, py: 1.5 }}>Method</TableCell>
                      <TableCell sx={{ fontWeight: 600, py: 1.5 }}>Status</TableCell>
                      <TableCell sx={{ fontWeight: 600, py: 1.5 }}>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {upcomingAppointments.map((appointment) => (
                      <TableRow 
                        key={appointment.id}
                        sx={{ 
                          '&:last-child td, &:last-child th': { border: 0 },
                          transition: 'background-color 0.2s',
                          '&:hover': { bgcolor: 'rgba(0, 0, 0, 0.01)' }
                        }}
                      >
                        <TableCell>
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Avatar 
                              src={appointment.patientAvatar} 
                              alt={appointment.patientName}
                              sx={{ 
                                width: 40, 
                                height: 40, 
                                mr: 1.5,
                                border: '2px solid white',
                                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
                              }} 
                            />
                            <Typography variant="body2" fontWeight={500}>
                              {appointment.patientName}
                            </Typography>
                          </Box>
                        </TableCell>
                        <TableCell>
                          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                            <Typography variant="body2" fontWeight={500}>
                              {appointment.date}
                            </Typography>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                              <AccessTimeIcon sx={{ fontSize: 14, mr: 0.5, color: 'text.secondary' }} />
                              <Typography variant="caption" color="text.secondary">
                                {appointment.time}
                              </Typography>
                            </Box>
                          </Box>
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2">
                            {appointment.type}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            {getAppointmentMethodIcon(appointment.method)}
                            <Typography variant="body2" sx={{ ml: 0.5, textTransform: 'capitalize' }}>
                              {appointment.method.replace('-', ' ')}
                            </Typography>
                          </Box>
                        </TableCell>
                        <TableCell>
                          {getStatusChip(appointment.status)}
                        </TableCell>
                        <TableCell>
                          <IconButton size="small" sx={{ color: 'primary.main' }}>
                            <VisibilityIcon fontSize="small" />
                          </IconButton>
                          <IconButton size="small">
                            <MoreVertIcon fontSize="small" />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </Grid>
        
        {/* Notifications */}
        <Grid item xs={12} md={6} lg={4}>
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
                  Notifications
                </Typography>
                <Badge badgeContent={notifications.length} color="error">
                  <NotificationsIcon color="action" />
                </Badge>
              </Box>

              <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                {notifications.map((notification, index) => (
                  <Box key={notification.id}>
                    <Box sx={{ py: 2 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                        <Typography variant="body2" fontWeight={600}>
                          {notification.message}
                          </Typography>
                      </Box>
                      <Typography variant="caption" color="text.secondary">
                        {notification.time}
                            </Typography>
                    </Box>
                    {index < notifications.length - 1 && (
                      <Divider />
                    )}
                  </Box>
                ))}
              </Box>
              
              <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}>
                <Button 
                  variant="text" 
                  color="primary"
                  size="small"
                  sx={{ 
                    borderRadius: 2,
                    textTransform: 'none',
                    fontWeight: 600
                  }}
                >
                  View All Notifications
                      </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        
        {/* Recent Patients */}
        <Grid item xs={12} md={6} lg={8}>
          <Card 
            sx={{ 
              borderRadius: 3, 
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
              overflow: 'hidden'
            }}
          >
            <CardContent sx={{ p: { xs: 2, md: 3 } }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h6" fontWeight={600}>
                  Recent Patients
                </Typography>
                <Button 
                  variant="outlined" 
                  color="primary" 
                  size="small"
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
              
              <TableContainer component={Box}>
                <Table>
                  <TableHead sx={{ bgcolor: 'rgba(0, 0, 0, 0.02)' }}>
                    <TableRow>
                      <TableCell sx={{ fontWeight: 600, py: 1.5 }}>Patient</TableCell>
                      <TableCell sx={{ fontWeight: 600, py: 1.5 }}>Age</TableCell>
                      <TableCell sx={{ fontWeight: 600, py: 1.5 }}>Last Visit</TableCell>
                      <TableCell sx={{ fontWeight: 600, py: 1.5 }}>Condition</TableCell>
                      <TableCell sx={{ fontWeight: 600, py: 1.5 }}>Status</TableCell>
                      <TableCell sx={{ fontWeight: 600, py: 1.5 }}>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {recentPatients.map((patient) => (
                      <TableRow 
                        key={patient.id}
                        sx={{ 
                          '&:last-child td, &:last-child th': { border: 0 },
                          transition: 'background-color 0.2s',
                          '&:hover': { bgcolor: 'rgba(0, 0, 0, 0.01)' }
                        }}
                      >
                        <TableCell>
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Avatar 
                              src={patient.avatar} 
                              alt={patient.name}
                              sx={{ 
                                width: 40, 
                                height: 40, 
                                mr: 1.5,
                                border: '2px solid white',
                                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
                              }} 
                            />
                            <Typography variant="body2" fontWeight={500}>
                              {patient.name}
                            </Typography>
                          </Box>
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2">
                            {patient.age}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2">
                            {new Date(patient.lastVisit).toLocaleDateString('en-US', { 
                              month: 'short', 
                              day: 'numeric',
                              year: 'numeric'
                            })}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2">
                            {patient.condition}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          {getPatientStatusChip(patient.status)}
                        </TableCell>
                        <TableCell>
                          <IconButton size="small" sx={{ color: 'primary.main' }}>
                            <VisibilityIcon fontSize="small" />
                          </IconButton>
                          <IconButton size="small">
                            <MoreVertIcon fontSize="small" />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
} 

export default DoctorDashboard; 