import React, { useState } from 'react';
import { 
  Grid, Typography, Box, 
  Card, CardContent, 
  Table, TableBody, TableCell, 
  TableContainer, TableHead, TableRow, 
  Paper, Chip, IconButton, 
  Button, Tabs, Tab,
  Dialog, DialogActions, DialogContent, 
  DialogContentText, DialogTitle,
  TextField, MenuItem, Select, FormControl, 
  InputLabel
} from '@mui/material';
import { 
  CheckCircle, Cancel, 
  MoreVert, AccessTime,
  VideoCall, Phone, Person
} from '@mui/icons-material';
import { useAuth } from '../../contexts/AuthContext';

// Sample data (in a real app, this would come from an API)
const appointments = [
  { 
    id: 1, 
    patient: 'Sarah Johnson', 
    age: 34,
    date: '2023-11-10', 
    time: '10:00 AM', 
    type: 'Follow-up',
    status: 'confirmed',
    method: 'in-person',
    notes: 'Follow-up for hypertension medication'
  },
  { 
    id: 2, 
    patient: 'Michael Smith', 
    age: 45,
    date: '2023-11-10', 
    time: '11:30 AM', 
    type: 'New Patient',
    status: 'confirmed',
    method: 'video',
    notes: 'Initial consultation for chronic back pain'
  },
  { 
    id: 3, 
    patient: 'Emma Davis', 
    age: 28,
    date: '2023-11-10', 
    time: '02:15 PM', 
    type: 'Consultation',
    status: 'confirmed',
    method: 'in-person',
    notes: 'Discuss lab results'
  },
  { 
    id: 4, 
    patient: 'Robert Wilson', 
    age: 62,
    date: '2023-11-11', 
    time: '09:00 AM', 
    type: 'Lab Results',
    status: 'pending',
    method: 'phone',
    notes: 'Review recent blood work'
  },
  { 
    id: 5, 
    patient: 'Jennifer Lopez', 
    age: 41,
    date: '2023-11-11', 
    time: '01:30 PM', 
    type: 'Follow-up',
    status: 'confirmed',
    method: 'in-person',
    notes: 'Post-surgery follow-up'
  },
  { 
    id: 6, 
    patient: 'Charles Brown', 
    age: 55,
    date: '2023-11-12', 
    time: '10:45 AM', 
    type: 'Consultation',
    status: 'cancelled',
    method: 'video',
    notes: 'Cancelled by patient'
  },
  { 
    id: 7, 
    patient: 'Patricia Miller', 
    age: 38,
    date: '2023-11-12', 
    time: '03:00 PM', 
    type: 'New Patient',
    status: 'pending',
    method: 'in-person',
    notes: 'Initial consultation for diabetes management'
  },
];

const upcomingAppointments = appointments.filter(appointment => 
  appointment.status !== 'cancelled' && 
  new Date(`${appointment.date} ${appointment.time}`) >= new Date()
);

export default function DoctorAppointments() {
  const { currentUser } = useAuth();
  const [tabValue, setTabValue] = useState(0);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  
  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };
  
  const handleOpenDetails = (appointment) => {
    setSelectedAppointment(appointment);
    setOpenDialog(true);
  };
  
  const handleCloseDialog = () => {
    setOpenDialog(false);
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
      case 'confirmed':
        return (
          <Chip 
            icon={<CheckCircle />} 
            label="Confirmed" 
            color="success" 
            size="small" 
            variant="outlined"
          />
        );
      case 'pending':
        return (
          <Chip 
            icon={<AccessTime />} 
            label="Pending" 
            color="warning" 
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
      case 1: // Today
        const today = new Date().toISOString().split('T')[0];
        return appointments.filter(app => app.date === today);
      case 2: // Upcoming
        return upcomingAppointments;
      case 3: // Pending
        return appointments.filter(app => app.status === 'pending');
      case 4: // Cancelled
        return appointments.filter(app => app.status === 'cancelled');
      default:
        return appointments;
    }
  };
  
  return (
    <Box>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          Appointments
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          Manage your patient appointments.
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
                <Tab label="Today" />
                <Tab label="Upcoming" />
                <Tab label="Pending" />
                <Tab label="Cancelled" />
              </Tabs>
            </Box>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
                <Button 
                  variant="contained" 
                  color="primary"
                  startIcon={<Person />}
                >
                  Add Appointment
                </Button>
              </Box>
              <TableContainer component={Paper} elevation={0}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Patient</TableCell>
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
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Typography variant="body1">
                              {appointment.patient}
                            </Typography>
                            <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                              ({appointment.age})
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
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      
      {/* Appointment Details Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        {selectedAppointment && (
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
                  {selectedAppointment.patient}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Age: {selectedAppointment.age} • Appointment Type: {selectedAppointment.type}
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
                <Grid item xs={12}>
                  <Typography variant="body2" color="text.secondary">
                    Notes
                  </Typography>
                  <Typography variant="body1">
                    {selectedAppointment.notes}
                  </Typography>
                </Grid>
              </Grid>
              
              <TextField
                label="Add Notes"
                multiline
                rows={4}
                fullWidth
                variant="outlined"
                placeholder="Enter appointment notes here..."
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDialog} color="primary">
                Close
              </Button>
              <Button 
                variant="contained" 
                color="primary"
                disabled={selectedAppointment.status === 'cancelled'}
              >
                Complete Appointment
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </Box>
  );
} 