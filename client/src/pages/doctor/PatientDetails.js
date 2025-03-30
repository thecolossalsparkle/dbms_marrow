import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box, Typography, Paper, Grid, Tabs, Tab, Divider, Button,
  Card, CardContent, List, ListItem, ListItemText, 
  Chip, IconButton, TextField, Stack, MenuItem, Select,
  FormControl, InputLabel, Dialog, DialogTitle, 
  DialogContent, DialogActions, Avatar, Table, 
  TableBody, TableCell, TableContainer, TableHead, TableRow
} from '@mui/material';
import {
  Edit, Person, AccessTime, AddCircleOutline,
  Download, Visibility, Delete, Send, Print, Share
} from '@mui/icons-material';

// Initialize empty patient data structure - will be populated from API
const patientData = {
  id: null,
  name: "",
  age: null,
  gender: "",
  dateOfBirth: "",
  contactInfo: "",
  email: "",
  address: "",
  bloodType: "",
  allergies: [],
  emergencyContact: "",
  insurance: "",
  firstVisit: "",
  lastVisit: "",
  upcomingAppointment: "",
  conditions: [],
  vitalSigns: [],
  medications: [],
  labResults: [],
  medicalHistory: [],
  notes: []
};

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`patient-tabpanel-${index}`}
      aria-labelledby={`patient-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ py: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

export default function PatientDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(0);
  const [patient, setPatient] = useState(null);
  const [loading, setLoading] = useState(true);
  const [openNoteDialog, setOpenNoteDialog] = useState(false);
  const [newNote, setNewNote] = useState({ title: '', content: '' });
  const [openPrescriptionDialog, setOpenPrescriptionDialog] = useState(false);
  const [newPrescription, setNewPrescription] = useState({
    medication: '',
    dosage: '',
    frequency: '',
    duration: '',
    instructions: ''
  });

  useEffect(() => {
    // In a real app, this would be an API call using the ID from params
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setPatient(patientData);
      setLoading(false);
    }, 300);
  }, [id]);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handleOpenNoteDialog = () => {
    setOpenNoteDialog(true);
  };

  const handleCloseNoteDialog = () => {
    setOpenNoteDialog(false);
    setNewNote({ title: '', content: '' });
  };

  const handleSaveNote = () => {
    // In a real app, this would post to an API
    const currentDate = new Date().toISOString().split('T')[0];
    const note = {
      date: currentDate,
      title: newNote.title,
      content: newNote.content,
      doctor: "Dr. Emily Johnson"
    };
    
    setPatient({
      ...patient,
      notes: [note, ...patient.notes]
    });
    
    handleCloseNoteDialog();
  };

  const handleOpenPrescriptionDialog = () => {
    setOpenPrescriptionDialog(true);
  };

  const handleClosePrescriptionDialog = () => {
    setOpenPrescriptionDialog(false);
    setNewPrescription({
      medication: '',
      dosage: '',
      frequency: '',
      duration: '',
      instructions: ''
    });
  };

  const handleSavePrescription = () => {
    // In a real app, this would post to an API
    const currentDate = new Date().toISOString().split('T')[0];
    const medication = {
      name: newPrescription.medication,
      dosage: newPrescription.dosage,
      frequency: newPrescription.frequency,
      startDate: currentDate,
      endDate: null,
      purpose: newPrescription.instructions
    };
    
    setPatient({
      ...patient,
      medications: [medication, ...patient.medications]
    });
    
    handleClosePrescriptionDialog();
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <Typography>Loading patient data...</Typography>
      </Box>
    );
  }

  if (!patient) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <Typography>Patient not found.</Typography>
      </Box>
    );
  }

  return (
    <Box>
      {/* Header Section */}
      <Paper sx={{ p: 3, mb: 3 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Avatar
                sx={{ width: 80, height: 80, mr: 3, bgcolor: 'primary.main', fontSize: '2rem' }}
              >
                {patient.name.charAt(0)}
              </Avatar>
              <Box>
                <Typography variant="h4" gutterBottom>
                  {patient.name}
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
                  <Typography variant="body1" color="text.secondary">
                    {patient.age} years old, {patient.gender}
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    Blood Type: {patient.bloodType}
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    Patient ID: #{patient.id}
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box sx={{ display: 'flex', justifyContent: { xs: 'flex-start', md: 'flex-end' }, gap: 1, flexWrap: 'wrap' }}>
              <Button 
                variant="outlined" 
                startIcon={<Share />}
                onClick={() => {}}
              >
                Share Record
              </Button>
              <Button 
                variant="outlined" 
                startIcon={<Print />}
                onClick={() => {}}
              >
                Print Summary
              </Button>
              <Button 
                variant="contained" 
                startIcon={<Send />}
                onClick={() => navigate('/doctor/messages')}
              >
                Message Patient
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Paper>

      {/* Quick Info Cards */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                Last Visit
              </Typography>
              <Typography variant="h6">
                {new Date(patient.lastVisit).toLocaleDateString()}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                Next Appointment
              </Typography>
              <Typography variant="h6">
                {new Date(patient.upcomingAppointment).toLocaleDateString()}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {new Date(patient.upcomingAppointment).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                Active Medications
              </Typography>
              <Typography variant="h6">
                {patient.medications.filter(med => !med.endDate).length}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                Allergies
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                {patient.allergies.map((allergy, index) => (
                  <Chip 
                    key={index} 
                    label={allergy} 
                    size="small" 
                    color="error" 
                  />
                ))}
                {patient.allergies.length === 0 && (
                  <Typography variant="body1">None reported</Typography>
                )}
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Action Buttons */}
      <Box sx={{ mb: 3, display: 'flex', gap: 2, flexWrap: 'wrap' }}>
        <Button 
          variant="contained" 
          startIcon={<AddCircleOutline />}
          onClick={handleOpenNoteDialog}
        >
          Add Note
        </Button>
        <Button 
          variant="contained" 
          startIcon={<AddCircleOutline />}
          onClick={handleOpenPrescriptionDialog}
        >
          Add Prescription
        </Button>
        <Button 
          variant="outlined" 
          startIcon={<AccessTime />}
          onClick={() => navigate('/doctor/appointments')}
        >
          Schedule Appointment
        </Button>
      </Box>

      {/* Tabs & Content */}
      <Paper sx={{ mb: 3 }}>
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          variant="scrollable"
          scrollButtons="auto"
          sx={{ borderBottom: 1, borderColor: 'divider' }}
        >
          <Tab label="Overview" />
          <Tab label="Medical Records" />
          <Tab label="Medications" />
          <Tab label="Lab Results" />
          <Tab label="Vital Signs" />
          <Tab label="Notes" />
        </Tabs>

        {/* Overview Tab */}
        <TabPanel value={activeTab} index={0}>
          <Grid container spacing={3}>
            {/* Personal Information */}
            <Grid item xs={12} md={6}>
              <Typography variant="h6" gutterBottom>
                Personal Information
              </Typography>
              <Card variant="outlined">
                <List>
                  <ListItem>
                    <ListItemText 
                      primary="Full Name" 
                      secondary={patient.name} 
                    />
                  </ListItem>
                  <Divider component="li" />
                  <ListItem>
                    <ListItemText 
                      primary="Date of Birth" 
                      secondary={new Date(patient.dateOfBirth).toLocaleDateString()} 
                    />
                  </ListItem>
                  <Divider component="li" />
                  <ListItem>
                    <ListItemText 
                      primary="Gender" 
                      secondary={patient.gender} 
                    />
                  </ListItem>
                  <Divider component="li" />
                  <ListItem>
                    <ListItemText 
                      primary="Blood Type" 
                      secondary={patient.bloodType} 
                    />
                  </ListItem>
                  <Divider component="li" />
                  <ListItem>
                    <ListItemText 
                      primary="Contact Number" 
                      secondary={patient.contactInfo} 
                    />
                  </ListItem>
                  <Divider component="li" />
                  <ListItem>
                    <ListItemText 
                      primary="Email" 
                      secondary={patient.email} 
                    />
                  </ListItem>
                  <Divider component="li" />
                  <ListItem>
                    <ListItemText 
                      primary="Address" 
                      secondary={patient.address} 
                    />
                  </ListItem>
                  <Divider component="li" />
                  <ListItem>
                    <ListItemText 
                      primary="Emergency Contact" 
                      secondary={patient.emergencyContact} 
                    />
                  </ListItem>
                  <Divider component="li" />
                  <ListItem>
                    <ListItemText 
                      primary="Insurance" 
                      secondary={patient.insurance} 
                    />
                  </ListItem>
                </List>
              </Card>
            </Grid>

            {/* Medical Conditions */}
            <Grid item xs={12} md={6}>
              <Typography variant="h6" gutterBottom>
                Medical Conditions
              </Typography>
              <Card variant="outlined">
                <List>
                  {patient.conditions.map((condition, index) => (
                    <React.Fragment key={index}>
                      {index > 0 && <Divider component="li" />}
                      <ListItem
                        secondaryAction={
                          <Chip 
                            label={condition.severity} 
                            size="small" 
                            color={
                              condition.severity === 'High' ? 'error' :
                              condition.severity === 'Medium' ? 'warning' : 'success'
                            }
                          />
                        }
                      >
                        <ListItemText 
                          primary={condition.name} 
                          secondary={`Diagnosed: ${new Date(condition.diagnosedDate).toLocaleDateString()} • Status: ${condition.status}`} 
                        />
                      </ListItem>
                    </React.Fragment>
                  ))}
                </List>
              </Card>

              <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
                Recent Medical History
              </Typography>
              <Card variant="outlined">
                <List>
                  {patient.medicalHistory.slice(0, 3).map((item, index) => (
                    <React.Fragment key={index}>
                      {index > 0 && <Divider component="li" />}
                      <ListItem>
                        <ListItemText 
                          primary={new Date(item.date).toLocaleDateString()} 
                          secondary={item.description} 
                        />
                      </ListItem>
                    </React.Fragment>
                  ))}
                </List>
                <Box sx={{ p: 2, textAlign: 'center' }}>
                  <Button 
                    size="small" 
                    onClick={() => setActiveTab(1)}
                  >
                    View Full Medical History
                  </Button>
                </Box>
              </Card>
            </Grid>
          </Grid>
        </TabPanel>

        {/* Medical Records Tab */}
        <TabPanel value={activeTab} index={1}>
          <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h6">
              Medical History
            </Typography>
            <Button 
              variant="outlined" 
              startIcon={<AddCircleOutline />}
              onClick={() => {}}
            >
              Add Record
            </Button>
          </Box>
          <TableContainer component={Paper} variant="outlined">
            <Table sx={{ minWidth: 650 }}>
              <TableHead>
                <TableRow>
                  <TableCell>Date</TableCell>
                  <TableCell>Description</TableCell>
                  <TableCell align="right">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {patient.medicalHistory.map((record, index) => (
                  <TableRow key={index}>
                    <TableCell>{new Date(record.date).toLocaleDateString()}</TableCell>
                    <TableCell>{record.description}</TableCell>
                    <TableCell align="right">
                      <IconButton size="small">
                        <Edit />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </TabPanel>

        {/* Medications Tab */}
        <TabPanel value={activeTab} index={2}>
          <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h6">
              Current Medications
            </Typography>
            <Button 
              variant="outlined" 
              startIcon={<AddCircleOutline />}
              onClick={handleOpenPrescriptionDialog}
            >
              Add Medication
            </Button>
          </Box>
          <TableContainer component={Paper} variant="outlined">
            <Table sx={{ minWidth: 650 }}>
              <TableHead>
                <TableRow>
                  <TableCell>Medication</TableCell>
                  <TableCell>Dosage</TableCell>
                  <TableCell>Frequency</TableCell>
                  <TableCell>Start Date</TableCell>
                  <TableCell>End Date</TableCell>
                  <TableCell>Purpose</TableCell>
                  <TableCell align="right">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {patient.medications.map((medication, index) => (
                  <TableRow key={index}>
                    <TableCell>{medication.name}</TableCell>
                    <TableCell>{medication.dosage}</TableCell>
                    <TableCell>{medication.frequency}</TableCell>
                    <TableCell>{new Date(medication.startDate).toLocaleDateString()}</TableCell>
                    <TableCell>{medication.endDate ? new Date(medication.endDate).toLocaleDateString() : 'Ongoing'}</TableCell>
                    <TableCell>{medication.purpose}</TableCell>
                    <TableCell align="right">
                      <IconButton size="small">
                        <Edit />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </TabPanel>

        {/* Lab Results Tab */}
        <TabPanel value={activeTab} index={3}>
          <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h6">
              Lab Results
            </Typography>
            <Button 
              variant="outlined" 
              startIcon={<AddCircleOutline />}
              onClick={() => {}}
            >
              Upload Results
            </Button>
          </Box>
          <TableContainer component={Paper} variant="outlined">
            <Table sx={{ minWidth: 650 }}>
              <TableHead>
                <TableRow>
                  <TableCell>Date</TableCell>
                  <TableCell>Test</TableCell>
                  <TableCell>Result</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell align="right">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {patient.labResults.map((result, index) => (
                  <TableRow key={index}>
                    <TableCell>{new Date(result.date).toLocaleDateString()}</TableCell>
                    <TableCell>{result.name}</TableCell>
                    <TableCell>{result.value || '-'}</TableCell>
                    <TableCell>
                      <Chip 
                        label={result.status} 
                        size="small" 
                        color={result.status === 'Normal' ? 'success' : 'warning'} 
                      />
                    </TableCell>
                    <TableCell align="right">
                      <IconButton size="small">
                        <Visibility />
                      </IconButton>
                      <IconButton size="small">
                        <Download />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </TabPanel>

        {/* Vital Signs Tab */}
        <TabPanel value={activeTab} index={4}>
          <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h6">
              Vital Signs History
            </Typography>
            <Button 
              variant="outlined" 
              startIcon={<AddCircleOutline />}
              onClick={() => {}}
            >
              Add Vital Signs
            </Button>
          </Box>
          <TableContainer component={Paper} variant="outlined">
            <Table sx={{ minWidth: 650 }}>
              <TableHead>
                <TableRow>
                  <TableCell>Date</TableCell>
                  <TableCell>Blood Pressure</TableCell>
                  <TableCell>Heart Rate</TableCell>
                  <TableCell>Temperature</TableCell>
                  <TableCell>Weight</TableCell>
                  <TableCell>BMI</TableCell>
                  <TableCell align="right">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {patient.vitalSigns.map((vital, index) => (
                  <TableRow key={index}>
                    <TableCell>{new Date(vital.date).toLocaleDateString()}</TableCell>
                    <TableCell>{vital.bloodPressure} mmHg</TableCell>
                    <TableCell>{vital.heartRate} bpm</TableCell>
                    <TableCell>{vital.temperature}°F</TableCell>
                    <TableCell>{vital.weight} lbs</TableCell>
                    <TableCell>{vital.bmi}</TableCell>
                    <TableCell align="right">
                      <IconButton size="small">
                        <Edit />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </TabPanel>

        {/* Notes Tab */}
        <TabPanel value={activeTab} index={5}>
          <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h6">
              Clinical Notes
            </Typography>
            <Button 
              variant="outlined" 
              startIcon={<AddCircleOutline />}
              onClick={handleOpenNoteDialog}
            >
              Add Note
            </Button>
          </Box>
          <Grid container spacing={2}>
            {patient.notes.map((note, index) => (
              <Grid item xs={12} key={index}>
                <Card variant="outlined">
                  <CardContent>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                      <Typography variant="subtitle1" fontWeight="bold">
                        {note.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {new Date(note.date).toLocaleDateString()}
                      </Typography>
                    </Box>
                    <Typography variant="body2" paragraph>
                      {note.content}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      Added by: {note.doctor}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </TabPanel>
      </Paper>

      {/* Add Note Dialog */}
      <Dialog 
        open={openNoteDialog} 
        onClose={handleCloseNoteDialog}
        fullWidth
        maxWidth="md"
      >
        <DialogTitle>Add Clinical Note</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Title"
            fullWidth
            variant="outlined"
            value={newNote.title}
            onChange={(e) => setNewNote({...newNote, title: e.target.value})}
            sx={{ mb: 2 }}
          />
          <TextField
            margin="dense"
            label="Note Content"
            fullWidth
            multiline
            rows={6}
            variant="outlined"
            value={newNote.content}
            onChange={(e) => setNewNote({...newNote, content: e.target.value})}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseNoteDialog}>Cancel</Button>
          <Button 
            onClick={handleSaveNote} 
            variant="contained"
            disabled={!newNote.title || !newNote.content}
          >
            Save Note
          </Button>
        </DialogActions>
      </Dialog>

      {/* Add Prescription Dialog */}
      <Dialog 
        open={openPrescriptionDialog} 
        onClose={handleClosePrescriptionDialog}
        fullWidth
        maxWidth="md"
      >
        <DialogTitle>Add Prescription</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 0.5 }}>
            <Grid item xs={12}>
              <TextField
                label="Medication Name"
                fullWidth
                variant="outlined"
                value={newPrescription.medication}
                onChange={(e) => setNewPrescription({...newPrescription, medication: e.target.value})}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Dosage"
                fullWidth
                variant="outlined"
                value={newPrescription.dosage}
                onChange={(e) => setNewPrescription({...newPrescription, dosage: e.target.value})}
                placeholder="e.g., 10mg"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Frequency"
                fullWidth
                variant="outlined"
                value={newPrescription.frequency}
                onChange={(e) => setNewPrescription({...newPrescription, frequency: e.target.value})}
                placeholder="e.g., Once daily"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Duration"
                fullWidth
                variant="outlined"
                value={newPrescription.duration}
                onChange={(e) => setNewPrescription({...newPrescription, duration: e.target.value})}
                placeholder="e.g., 30 days"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Instructions/Purpose"
                fullWidth
                multiline
                rows={3}
                variant="outlined"
                value={newPrescription.instructions}
                onChange={(e) => setNewPrescription({...newPrescription, instructions: e.target.value})}
                placeholder="Special instructions or purpose of medication"
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClosePrescriptionDialog}>Cancel</Button>
          <Button 
            onClick={handleSavePrescription} 
            variant="contained"
            disabled={!newPrescription.medication || !newPrescription.dosage || !newPrescription.frequency}
          >
            Save Prescription
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
} 