import React, { useState } from 'react';
import { 
  Grid, Typography, Box, 
  Card, CardContent, 
  Avatar, Button, Chip,
  Dialog, DialogActions, DialogContent, 
  DialogTitle, TextField, Rating,
  List, ListItem, ListItemText, ListItemAvatar,
  Divider, IconButton, Tab, Tabs
} from '@mui/material';
import { 
  LocationOn, Phone, Email, 
  CalendarToday, AccessTime, Star,
  Language, LinkedIn, Twitter,
  ThumbUp, Comment, Schedule,
  MoreVert, ArrowBack
} from '@mui/icons-material';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

// Initialize empty doctor data - will be populated from API
const doctor = {
  id: "",
  name: "",
  avatar: null,
  specialty: "",
  qualification: "",
  experience: "",
  rating: 0,
  reviews: 0,
  about: "",
  education: [],
  certifications: [],
  contact: {
    email: "",
    phone: "",
    website: "",
    location: ""
  },
  social: {
    linkedin: "",
    twitter: ""
  },
  languages: [],
  specializations: [],
  insuranceAccepted: [],
  availability: {
    monday: [],
    tuesday: [],
    wednesday: [],
    thursday: [],
    friday: [],
    saturday: [],
    sunday: []
  }
};

// Initialize empty reviews - will be populated from API
const reviews = [];

// Initialize empty available slots - will be populated from API
const availableSlots = [];

export default function DoctorDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  
  const [tabValue, setTabValue] = useState(0);
  const [openAppointmentDialog, setOpenAppointmentDialog] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
  const [appointmentType, setAppointmentType] = useState('');
  const [appointmentNotes, setAppointmentNotes] = useState('');
  
  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };
  
  const handleOpenAppointmentDialog = () => {
    setOpenAppointmentDialog(true);
    setSelectedDate(availableSlots[0]);
    setSelectedTimeSlot(null);
    setAppointmentType('');
    setAppointmentNotes('');
  };
  
  const handleCloseAppointmentDialog = () => {
    setOpenAppointmentDialog(false);
  };
  
  const handleSelectDate = (date) => {
    setSelectedDate(date);
    setSelectedTimeSlot(null);
  };
  
  const handleSelectTimeSlot = (timeSlot) => {
    setSelectedTimeSlot(timeSlot);
  };
  
  const handleBookAppointment = () => {
    // In a real app, this would make an API call to book the appointment
    console.log("Booking appointment:", {
      doctor: doctor.id,
      date: selectedDate.date,
      timeSlot: selectedTimeSlot,
      type: appointmentType,
      notes: appointmentNotes
    });
    
    // Close dialog and potentially navigate or show confirmation
    handleCloseAppointmentDialog();
    // For demo purposes, just navigate to appointments
    navigate('/patient/appointments');
  };
  
  return (
    <Box>
      <Box sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
        <IconButton onClick={() => navigate(-1)} sx={{ mr: 1 }}>
          <ArrowBack />
        </IconButton>
        <Typography variant="h4">
          Doctor Profile
        </Typography>
      </Box>
      
      {/* Doctor Profile Header */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Grid container spacing={3}>
            <Grid item xs={12} md={2} sx={{ display: 'flex', justifyContent: 'center' }}>
              <Avatar
                alt={doctor.name}
                src={doctor.avatar}
                sx={{ width: 120, height: 120, fontSize: '3rem' }}
              >
                {doctor.name.charAt(0)}
              </Avatar>
            </Grid>
            <Grid item xs={12} md={7}>
              <Typography variant="h5" gutterBottom>
                {doctor.name}
              </Typography>
              <Typography variant="subtitle1" color="text.secondary" gutterBottom>
                {doctor.specialty} • {doctor.experience}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <Rating value={doctor.rating} precision={0.1} readOnly size="small" />
                <Typography variant="body2" sx={{ ml: 1 }}>
                  {doctor.rating} ({doctor.reviews} reviews)
                </Typography>
              </Box>
              
              <Box sx={{ mt: 2, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {doctor.specializations.map((spec, index) => (
                  <Chip key={index} label={spec} size="small" />
                ))}
              </Box>
            </Grid>
            <Grid item xs={12} md={3} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 2 }}>
              <Button 
                variant="contained" 
                color="primary" 
                fullWidth
                startIcon={<CalendarToday />}
                onClick={handleOpenAppointmentDialog}
              >
                Book Appointment
              </Button>
              <Button 
                variant="outlined" 
                color="primary" 
                fullWidth
                startIcon={<Comment />}
                onClick={() => navigate('/patient/messages')}
              >
                Send Message
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      
      {/* Tabs Navigation */}
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs 
          value={tabValue} 
          onChange={handleTabChange} 
          aria-label="doctor details tabs"
          variant="scrollable"
          scrollButtons="auto"
        >
          <Tab label="About" />
          <Tab label="Education & Certifications" />
          <Tab label="Reviews" />
          <Tab label="Availability" />
          <Tab label="Contact" />
        </Tabs>
      </Box>
      
      {/* Tab Panels */}
      <Box sx={{ mb: 4 }}>
        {/* About Tab */}
        {tabValue === 0 && (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    About
                  </Typography>
                  <Typography variant="body1" paragraph>
                    {doctor.about}
                  </Typography>
                  
                  <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
                    Specializations
                  </Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                    {doctor.specializations.map((spec, index) => (
                      <Chip key={index} label={spec} />
                    ))}
                  </Box>
                  
                  <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
                    Languages
                  </Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                    {doctor.languages.map((lang, index) => (
                      <Chip key={index} label={lang} variant="outlined" />
                    ))}
                  </Box>
                  
                  <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
                    Insurance Accepted
                  </Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                    {doctor.insuranceAccepted.map((insurance, index) => (
                      <Chip key={index} label={insurance} variant="outlined" />
                    ))}
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        )}
        
        {/* Education & Certifications Tab */}
        {tabValue === 1 && (
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Education
                  </Typography>
                  <List>
                    {doctor.education.map((edu, index) => (
                      <React.Fragment key={edu.id}>
                        {index > 0 && <Divider component="li" />}
                        <ListItem alignItems="flex-start">
                          <ListItemText
                            primary={edu.degree}
                            secondary={
                              <React.Fragment>
                                <Typography component="span" variant="body2" color="text.primary">
                                  {edu.institution}
                                </Typography>
                                {` — ${edu.year}`}
                              </React.Fragment>
                            }
                          />
                        </ListItem>
                      </React.Fragment>
                    ))}
                  </List>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Certifications
                  </Typography>
                  <List>
                    {doctor.certifications.map((cert, index) => (
                      <React.Fragment key={cert.id}>
                        {index > 0 && <Divider component="li" />}
                        <ListItem alignItems="flex-start">
                          <ListItemText
                            primary={cert.name}
                            secondary={
                              <React.Fragment>
                                <Typography component="span" variant="body2" color="text.primary">
                                  {cert.organization}
                                </Typography>
                                {` — ${cert.year}`}
                              </React.Fragment>
                            }
                          />
                        </ListItem>
                      </React.Fragment>
                    ))}
                  </List>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        )}
        
        {/* Reviews Tab */}
        {tabValue === 2 && (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Card>
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                    <Typography variant="h6">
                      Patient Reviews
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Rating value={doctor.rating} precision={0.1} readOnly />
                      <Typography variant="body1" sx={{ ml: 1 }}>
                        {doctor.rating} out of 5
                      </Typography>
                    </Box>
                  </Box>
                  
                  <List>
                    {reviews.map((review, index) => (
                      <React.Fragment key={review.id}>
                        {index > 0 && <Divider component="li" />}
                        <ListItem alignItems="flex-start">
                          <ListItemAvatar>
                            <Avatar>{review.patient.charAt(0)}</Avatar>
                          </ListItemAvatar>
                          <ListItemText
                            primary={
                              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                <Typography variant="subtitle1">
                                  {review.patient}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                  {review.date}
                                </Typography>
                              </Box>
                            }
                            secondary={
                              <React.Fragment>
                                <Box sx={{ my: 1 }}>
                                  <Rating value={review.rating} size="small" readOnly />
                                </Box>
                                <Typography variant="body2" color="text.primary" paragraph>
                                  {review.comment}
                                </Typography>
                                <Button 
                                  startIcon={<ThumbUp />} 
                                  size="small"
                                  color="primary"
                                >
                                  Helpful ({review.likes})
                                </Button>
                              </React.Fragment>
                            }
                          />
                        </ListItem>
                      </React.Fragment>
                    ))}
                  </List>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        )}
        
        {/* Availability Tab */}
        {tabValue === 3 && (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Weekly Schedule
                  </Typography>
                  <Grid container spacing={2} sx={{ mt: 1 }}>
                    {Object.entries(doctor.availability).map(([day, times]) => (
                      <Grid item xs={12} sm={6} md={4} key={day}>
                        <Card variant="outlined">
                          <CardContent>
                            <Typography variant="subtitle1" sx={{ textTransform: 'capitalize' }}>
                              {day}
                            </Typography>
                            {times.length > 0 ? (
                              times.map((time, index) => (
                                <Chip 
                                  key={index} 
                                  icon={<AccessTime />} 
                                  label={time} 
                                  size="small"
                                  sx={{ mt: 1, mr: 1 }}
                                />
                              ))
                            ) : (
                              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                                Not Available
                              </Typography>
                            )}
                          </CardContent>
                        </Card>
                      </Grid>
                    ))}
                  </Grid>
                  
                  <Box sx={{ mt: 3, display: 'flex', justifyContent: 'center' }}>
                    <Button 
                      variant="contained" 
                      color="primary"
                      startIcon={<CalendarToday />}
                      onClick={handleOpenAppointmentDialog}
                      size="large"
                    >
                      Book an Appointment
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        )}
        
        {/* Contact Tab */}
        {tabValue === 4 && (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Contact Information
                  </Typography>
                  <List>
                    <ListItem>
                      <ListItemAvatar>
                        <Avatar sx={{ bgcolor: 'primary.light' }}>
                          <Phone />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText 
                        primary="Phone" 
                        secondary={doctor.contact.phone} 
                      />
                    </ListItem>
                    <Divider component="li" />
                    <ListItem>
                      <ListItemAvatar>
                        <Avatar sx={{ bgcolor: 'primary.light' }}>
                          <Email />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText 
                        primary="Email" 
                        secondary={doctor.contact.email} 
                      />
                    </ListItem>
                    <Divider component="li" />
                    <ListItem>
                      <ListItemAvatar>
                        <Avatar sx={{ bgcolor: 'primary.light' }}>
                          <LocationOn />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText 
                        primary="Location" 
                        secondary={doctor.contact.location} 
                      />
                    </ListItem>
                    <Divider component="li" />
                    <ListItem>
                      <ListItemAvatar>
                        <Avatar sx={{ bgcolor: 'primary.light' }}>
                          <Language />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText 
                        primary="Website" 
                        secondary={doctor.contact.website} 
                      />
                    </ListItem>
                  </List>
                  
                  <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
                    Social Media
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
                    <Button 
                      variant="outlined" 
                      startIcon={<LinkedIn />}
                      href={`https://${doctor.social.linkedin}`}
                      target="_blank"
                    >
                      LinkedIn
                    </Button>
                    <Button 
                      variant="outlined" 
                      startIcon={<Twitter />}
                      href={`https://${doctor.social.twitter}`}
                      target="_blank"
                    >
                      Twitter
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        )}
      </Box>
      
      {/* Appointment Booking Dialog */}
      <Dialog 
        open={openAppointmentDialog} 
        onClose={handleCloseAppointmentDialog}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          Book an Appointment with {doctor.name}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={3}>
            {/* Date Selection */}
            <Grid item xs={12} md={4}>
              <Typography variant="subtitle1" gutterBottom>
                Select Date
              </Typography>
              <List sx={{ bgcolor: 'background.paper', borderRadius: 1, border: 1, borderColor: 'divider' }}>
                {availableSlots.map((dateOption) => (
                  <ListItem 
                    key={dateOption.id} 
                    button
                    selected={selectedDate && selectedDate.id === dateOption.id}
                    onClick={() => handleSelectDate(dateOption)}
                    divider
                  >
                    <ListItemText 
                      primary={
                        <Box sx={{ fontWeight: selectedDate && selectedDate.id === dateOption.id ? 'bold' : 'regular' }}>
                          {dateOption.date}
                        </Box>
                      } 
                      secondary={dateOption.day}
                    />
                  </ListItem>
                ))}
              </List>
            </Grid>
            
            {/* Time Slot Selection */}
            <Grid item xs={12} md={8}>
              <Typography variant="subtitle1" gutterBottom>
                Select Time Slot
              </Typography>
              {selectedDate ? (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  {selectedDate.slots.map((slot, index) => (
                    <Chip
                      key={index}
                      label={slot}
                      clickable
                      color={selectedTimeSlot === slot ? 'primary' : 'default'}
                      onClick={() => handleSelectTimeSlot(slot)}
                      icon={<AccessTime />}
                      sx={{ mb: 1 }}
                    />
                  ))}
                </Box>
              ) : (
                <Typography variant="body2" color="text.secondary">
                  Please select a date first
                </Typography>
              )}
              
              {/* Appointment Details Form */}
              <Box sx={{ mt: 3 }}>
                <Typography variant="subtitle1" gutterBottom>
                  Appointment Details
                </Typography>
                <TextField
                  select
                  label="Appointment Type"
                  fullWidth
                  margin="normal"
                  value={appointmentType}
                  onChange={(e) => setAppointmentType(e.target.value)}
                  SelectProps={{
                    native: true,
                  }}
                >
                  <option value=""></option>
                  <option value="New Patient Consultation">New Patient Consultation</option>
                  <option value="Follow-up">Follow-up</option>
                  <option value="Annual Check-up">Annual Check-up</option>
                  <option value="Emergency">Emergency</option>
                  <option value="Procedure">Procedure</option>
                </TextField>
                
                <TextField
                  label="Notes for the Doctor"
                  multiline
                  rows={4}
                  fullWidth
                  margin="normal"
                  placeholder="Describe your symptoms or reason for visit"
                  value={appointmentNotes}
                  onChange={(e) => setAppointmentNotes(e.target.value)}
                />
              </Box>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseAppointmentDialog}>
            Cancel
          </Button>
          <Button 
            variant="contained" 
            color="primary"
            disabled={!selectedDate || !selectedTimeSlot || !appointmentType}
            onClick={handleBookAppointment}
            startIcon={<Schedule />}
          >
            Book Appointment
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
} 