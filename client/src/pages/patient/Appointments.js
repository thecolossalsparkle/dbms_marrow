import React, { useState } from 'react';
import { 
  Grid, Typography, Box, 
  Card, CardContent, 
  Table, TableBody, TableCell, 
  TableContainer, TableHead, TableRow, 
  Paper, Chip, IconButton, 
  Button, Tabs, Tab,
  Dialog, DialogActions, DialogContent,
  DialogTitle, TextField, Select, MenuItem,
  FormControl, InputLabel, Avatar,
  List, ListItem, ListItemText, ListItemAvatar,
  Divider, Rating
} from '@mui/material';
import { 
  CheckCircle, Cancel, 
  MoreVert, AccessTime,
  VideoCall, Phone, Person,
  CalendarToday, Edit, Delete,
  Event, Notes, MedicalServices
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

// Sample data (in a real app, this would come from an API)
const appointments = [
  { 
    id: 1, 
    doctor: 'Dr. Emily Johnson', 
    specialty: 'Cardiologist',
    date: '2023-11-13', 
    time: '10:00 AM', 
    type: 'Follow-up',
    status: 'upcoming',
    method: 'in-person',
    notes: 'Bring latest test reports',
    location: 'Heart Care Medical Center, 123 Health Street'
  },
  { 
    id: 2, 
    doctor: 'Dr. James Williams', 
    specialty: 'Dermatologist',
    date: '2023-11-17', 
    time: '03:30 PM', 
    type: 'New Patient',
    status: 'upcoming',
    method: 'video',
    notes: 'Have photos of affected areas ready',
    location: null
  },
  { 
    id: 3, 
    doctor: 'Dr. Sarah Miller', 
    specialty: 'General Physician',
    date: '2023-10-20', 
    time: '09:15 AM', 
    type: 'Regular Checkup',
    status: 'completed',
    method: 'in-person',
    notes: 'Annual physical examination',
    location: 'Family Health Clinic, 456 Main Street',
    prescription: true,
    followUpRecommended: true
  },
  { 
    id: 4, 
    doctor: 'Dr. Michael Chen', 
    specialty: 'Orthopedic Surgeon',
    date: '2023-10-05', 
    time: '02:00 PM', 
    type: 'Consultation',
    status: 'completed',
    method: 'in-person',
    notes: 'Discuss knee pain and treatment options',
    location: 'Ortho Specialty Center, 789 Medical Plaza',
    prescription: true,
    followUpRecommended: true
  },
  { 
    id: 5, 
    doctor: 'Dr. Robert Wilson', 
    specialty: 'Neurologist',
    date: '2023-09-15', 
    time: '11:30 AM', 
    type: 'Consultation',
    status: 'cancelled',
    method: 'phone',
    notes: 'Discuss headache patterns',
    location: null
  },
];

const doctors = [
  { id: 1, name: 'Dr. Emily Johnson', specialty: 'Cardiologist', rating: 4.8 },
  { id: 2, name: 'Dr. James Williams', specialty: 'Dermatologist', rating: 4.5 },
  { id: 3, name: 'Dr. Sarah Miller', specialty: 'General Physician', rating: 4.9 },
  { id: 4, name: 'Dr. Michael Chen', specialty: 'Orthopedic Surgeon', rating: 4.7 },
  { id: 5, name: 'Dr. Robert Wilson', specialty: 'Neurologist', rating: 4.6 },
  { id: 6, name: 'Dr. Jennifer Lopez', specialty: 'Gynecologist', rating: 4.8 },
  { id: 7, name: 'Dr. David Brown', specialty: 'Pulmonologist', rating: 4.4 },
  { id: 8, name: 'Dr. Lisa Garcia', specialty: 'Pediatrician', rating: 4.9 },
];

export default function PatientAppointments() {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [tabValue, setTabValue] = useState(0);
  const [openDialog, setOpenDialog] = useState(false);
  const [openNewAppointmentDialog, setOpenNewAppointmentDialog] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [showCancelConfirm, setShowCancelConfirm] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState('');
  const [appointmentType, setAppointmentType] = useState('');
  const [appointmentMethod, setAppointmentMethod] = useState('');
  
  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };
  
  const handleOpenDetails = (appointment) => {
    setSelectedAppointment(appointment);
    setOpenDialog(true);
  };
  
  const handleCloseDialog = () => {
    setOpenDialog(false);
    setShowCancelConfirm(false);
  };
  
  const handleOpenNewAppointment = () => {
    setOpenNewAppointmentDialog(true);
  };
  
  const handleCloseNewAppointment = () => {
    setOpenNewAppointmentDialog(false);
  };
  
  const handleCancelAppointment = () => {
    // In a real app, this would make an API call to cancel the appointment
    console.log("Cancelling appointment:", selectedAppointment.id);
    
    // Close the dialog and clear selection
    handleCloseDialog();
  };
  
  const handleBookNewAppointment = () => {
    // In a real app, this would make an API call to book a new appointment
    console.log("Booking new appointment");
    
    // Close the dialog
    handleCloseNewAppointment();
  };
  
  const getMethodIcon = (method) => {
    switch(method) {
      case 'in-person':
        return <Person />;
      case 'video':
        return <VideoCall />;
      case 'phone':
        return <Phone />;
      default:
        return <Person />;
    }
  };

  const getStatusChip = (status) => {
    switch(status) {
      case 'upcoming':
        return (
          <Chip 
            icon={<AccessTime />} 
            label="Upcoming" 
            color="primary" 
            size="small" 
            variant="outlined"
          />
        );
      case 'completed':
        return (
          <Chip 
            icon={<CheckCircle />} 
            label="Completed" 
            color="success" 
            size="small" 
            variant="outlined"
          />
        );
      case 'cancelled':
        return (
          <Chip 
            icon={<Cancel />} 
            label="Cancelled" 
            color="error" 
            size="small" 
            variant="outlined"
          />
        );
      default:
        return null;
    }
  };
  
  const filteredAppointments = () => {
    switch(tabValue) {
      case 0: // All
        return appointments;
      case 1: // Upcoming
        return appointments.filter(app => app.status === 'upcoming');
      case 2: // Completed
        return appointments.filter(app => app.status === 'completed');
      case 3: // Cancelled
        return appointments.filter(app => app.status === 'cancelled');
      default:
        return appointments;
    }
  };
  
  return (
    <Box>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          My Appointments
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          Manage your upcoming and past appointments with doctors.
        </Typography>
      </Box>
      
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Card>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tabs 
                value={tabValue} 
                onChange={handleTabChange} 
                indicatorColor="primary"
                textColor="primary"
              >
                <Tab label="All" />
                <Tab label="Upcoming" />
                <Tab label="Completed" />
                <Tab label="Cancelled" />
              </Tabs>
            </Box>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
                <Button 
                  variant="contained" 
                  color="primary"
                  startIcon={<CalendarToday />}
                  onClick={handleOpenNewAppointment}
                >
                  Book New Appointment
                </Button>
              </Box>
              <TableContainer component={Paper} elevation={0}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Doctor</TableCell>
                      <TableCell>Date</TableCell>
                      <TableCell>Time</TableCell>
                      <TableCell>Type</TableCell>
                      <TableCell>Method</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {filteredAppointments().map((appointment) => (
                      <TableRow key={appointment.id}>
                        <TableCell>
                          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                            <Typography variant="body1">
                              {appointment.doctor}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              {appointment.specialty}
                            </Typography>
                          </Box>
                        </TableCell>
                        <TableCell>{appointment.date}</TableCell>
                        <TableCell>{appointment.time}</TableCell>
                        <TableCell>{appointment.type}</TableCell>
                        <TableCell>
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            {getMethodIcon(appointment.method)}
                            <Typography variant="body2" sx={{ ml: 1, textTransform: 'capitalize' }}>
                              {appointment.method}
                            </Typography>
                          </Box>
                        </TableCell>
                        <TableCell>{getStatusChip(appointment.status)}</TableCell>
                        <TableCell>
                          <Button 
                            variant="outlined" 
                            size="small"
                            onClick={() => handleOpenDetails(appointment)}
                          >
                            Details
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
              
              {filteredAppointments().length === 0 && (
                <Box sx={{ py: 4, textAlign: 'center' }}>
                  <Typography variant="body1" color="text.secondary">
                    No appointments found in this category
                  </Typography>
                  <Button 
                    variant="outlined" 
                    color="primary"
                    sx={{ mt: 2 }}
                    startIcon={<CalendarToday />}
                    onClick={handleOpenNewAppointment}
                  >
                    Book New Appointment
                  </Button>
                </Box>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      
      {/* Appointment Details Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        {selectedAppointment && (
          <>
            {!showCancelConfirm ? (
              <>
                <DialogTitle>
                  Appointment Details
                  <IconButton
                    aria-label="more options"
                    sx={{ position: 'absolute', right: 8, top: 8 }}
                  >
                    <MoreVert />
                  </IconButton>
                </DialogTitle>
                <DialogContent>
                  <Box sx={{ mb: 3 }}>
                    <Typography variant="h6" gutterBottom>
                      {selectedAppointment.doctor}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {selectedAppointment.specialty} • {selectedAppointment.type}
                    </Typography>
                    <Box sx={{ mt: 1 }}>
                      {getStatusChip(selectedAppointment.status)}
                    </Box>
                  </Box>
                  
                  <Grid container spacing={2} sx={{ mb: 3 }}>
                    <Grid item xs={6}>
                      <Typography variant="body2" color="text.secondary">
                        Date
                      </Typography>
                      <Typography variant="body1">
                        {selectedAppointment.date}
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="body2" color="text.secondary">
                        Time
                      </Typography>
                      <Typography variant="body1">
                        {selectedAppointment.time}
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="body2" color="text.secondary">
                        Method
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        {getMethodIcon(selectedAppointment.method)}
                        <Typography variant="body1" sx={{ ml: 1, textTransform: 'capitalize' }}>
                          {selectedAppointment.method}
                        </Typography>
                      </Box>
                    </Grid>
                    
                    {selectedAppointment.location && (
                      <Grid item xs={12}>
                        <Typography variant="body2" color="text.secondary">
                          Location
                        </Typography>
                        <Typography variant="body1">
                          {selectedAppointment.location}
                        </Typography>
                      </Grid>
                    )}
                    
                    <Grid item xs={12}>
                      <Typography variant="body2" color="text.secondary">
                        Notes
                      </Typography>
                      <Typography variant="body1">
                        {selectedAppointment.notes}
                      </Typography>
                    </Grid>
                  </Grid>
                  
                  {selectedAppointment.status === 'completed' && (
                    <Box sx={{ mt: 3 }}>
                      <Divider sx={{ mb: 2 }} />
                      
                      <Typography variant="subtitle1" gutterBottom>
                        Post-Appointment Information
                      </Typography>
                      
                      <List dense>
                        {selectedAppointment.prescription && (
                          <>
                            <ListItem>
                              <ListItemAvatar>
                                <Avatar sx={{ bgcolor: 'primary.light' }}>
                                  <MedicalServices />
                                </Avatar>
                              </ListItemAvatar>
                              <ListItemText 
                                primary="Prescription Available" 
                                secondary="View in Medical Records" 
                              />
                              <Button 
                                variant="outlined" 
                                size="small"
                                onClick={() => navigate('/patient/records')}
                              >
                                View
                              </Button>
                            </ListItem>
                            <Divider component="li" variant="inset" />
                          </>
                        )}
                        
                        {selectedAppointment.followUpRecommended && (
                          <ListItem>
                            <ListItemAvatar>
                              <Avatar sx={{ bgcolor: 'primary.light' }}>
                                <Event />
                              </Avatar>
                            </ListItemAvatar>
                            <ListItemText 
                              primary="Follow-up Recommended" 
                              secondary="Schedule your next appointment" 
                            />
                            <Button 
                              variant="outlined" 
                              size="small"
                              color="primary"
                              onClick={handleOpenNewAppointment}
                            >
                              Book
                            </Button>
                          </ListItem>
                        )}
                      </List>
                    </Box>
                  )}
                </DialogContent>
                <DialogActions>
                  {selectedAppointment.status === 'upcoming' && (
                    <>
                      <Button 
                        onClick={() => setShowCancelConfirm(true)} 
                        color="error"
                      >
                        Cancel Appointment
                      </Button>
                      <Button 
                        variant="outlined" 
                        color="primary"
                        startIcon={<Edit />}
                      >
                        Reschedule
                      </Button>
                    </>
                  )}
                  <Button onClick={handleCloseDialog} color="primary">
                    Close
                  </Button>
                </DialogActions>
              </>
            ) : (
              <>
                <DialogTitle>Cancel Appointment</DialogTitle>
                <DialogContent>
                  <Typography variant="body1" paragraph>
                    Are you sure you want to cancel your appointment with {selectedAppointment.doctor} on {selectedAppointment.date} at {selectedAppointment.time}?
                  </Typography>
                  <Typography variant="body2" color="error">
                    This action cannot be undone. Cancellation fees may apply depending on the doctor's policy.
                  </Typography>
                </DialogContent>
                <DialogActions>
                  <Button onClick={() => setShowCancelConfirm(false)}>
                    Back
                  </Button>
                  <Button 
                    onClick={handleCancelAppointment} 
                    color="error" 
                    variant="contained"
                  >
                    Cancel Appointment
                  </Button>
                </DialogActions>
              </>
            )}
          </>
        )}
      </Dialog>
      
      {/* New Appointment Dialog */}
      <Dialog open={openNewAppointmentDialog} onClose={handleCloseNewAppointment} maxWidth="md" fullWidth>
        <DialogTitle>Book New Appointment</DialogTitle>
        <DialogContent>
          <Grid container spacing={3} sx={{ mt: 0 }}>
            <Grid item xs={12}>
              <Typography variant="subtitle1" gutterBottom>
                Select a Doctor
              </Typography>
              <FormControl fullWidth margin="normal">
                <InputLabel>Doctor</InputLabel>
                <Select
                  value={selectedDoctor}
                  onChange={(e) => setSelectedDoctor(e.target.value)}
                  label="Doctor"
                >
                  <MenuItem value="">Select a doctor</MenuItem>
                  {doctors.map((doctor) => (
                    <MenuItem key={doctor.id} value={doctor.id}>
                      <Box sx={{ display: 'flex', alignItems: 'center', width: '100%', justifyContent: 'space-between' }}>
                        <Box>
                          {doctor.name} - {doctor.specialty}
                        </Box>
                        <Rating value={doctor.rating} readOnly size="small" />
                      </Box>
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              
              <Box sx={{ display: 'flex', justifyContent: 'center', my: 2 }}>
                <Typography variant="body2" color="text.secondary">
                  or
                </Typography>
              </Box>
              
              <Button 
                variant="outlined" 
                fullWidth
                onClick={() => navigate('/patient/doctors')}
              >
                Browse All Doctors
              </Button>
            </Grid>
            
            {selectedDoctor && (
              <>
                <Grid item xs={12} md={6}>
                  <FormControl fullWidth margin="normal">
                    <InputLabel>Appointment Type</InputLabel>
                    <Select
                      value={appointmentType}
                      onChange={(e) => setAppointmentType(e.target.value)}
                      label="Appointment Type"
                    >
                      <MenuItem value="">Select type</MenuItem>
                      <MenuItem value="New Patient">New Patient</MenuItem>
                      <MenuItem value="Follow-up">Follow-up</MenuItem>
                      <MenuItem value="Consultation">Consultation</MenuItem>
                      <MenuItem value="Regular Checkup">Regular Checkup</MenuItem>
                      <MenuItem value="Urgent Care">Urgent Care</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                
                <Grid item xs={12} md={6}>
                  <FormControl fullWidth margin="normal">
                    <InputLabel>Appointment Method</InputLabel>
                    <Select
                      value={appointmentMethod}
                      onChange={(e) => setAppointmentMethod(e.target.value)}
                      label="Appointment Method"
                    >
                      <MenuItem value="">Select method</MenuItem>
                      <MenuItem value="in-person">In-Person</MenuItem>
                      <MenuItem value="video">Video Call</MenuItem>
                      <MenuItem value="phone">Phone Call</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                
                <Grid item xs={12}>
                  <Typography variant="subtitle1" gutterBottom sx={{ mt: 2 }}>
                    Select Date and Time
                  </Typography>
                  <Box sx={{ p: 2, border: '1px solid #e0e0e0', borderRadius: 1 }}>
                    <Typography variant="body1" align="center" color="text.secondary">
                      After selecting a doctor and appointment details, you'll be able to view available time slots.
                    </Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                      <Button 
                        variant="contained" 
                        disabled={!selectedDoctor || !appointmentType || !appointmentMethod}
                        onClick={() => navigate(`/patient/doctors/${selectedDoctor}`)}
                      >
                        See Available Slots
                      </Button>
                    </Box>
                  </Box>
                </Grid>
                
                <Grid item xs={12}>
                  <TextField
                    label="Reason for Visit"
                    multiline
                    rows={4}
                    fullWidth
                    placeholder="Describe your symptoms or reason for the appointment"
                    margin="normal"
                  />
                </Grid>
              </>
            )}
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseNewAppointment}>
            Cancel
          </Button>
          <Button 
            variant="contained" 
            color="primary"
            disabled={!selectedDoctor || !appointmentType || !appointmentMethod}
            onClick={handleBookNewAppointment}
          >
            Continue
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
} 