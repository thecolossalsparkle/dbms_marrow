import React, { useState } from 'react';
import {
  Grid, Typography, Box,
  Card, CardContent,
  Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow,
  Paper, Chip, IconButton,
  Button, TextField,
  Dialog, DialogActions, DialogContent,
  DialogTitle, FormControl,
  InputLabel, Select, MenuItem,
  List, ListItem, ListItemText, ListItemAvatar,
  Avatar, Divider
} from '@mui/material';
import {
  CheckCircle, Cancel,
  Edit, Delete, Add,
  FilterList, Search,
  LocalPharmacy, EventNote,
  MedicalServices, Person
} from '@mui/icons-material';
import { useAuth } from '../../contexts/AuthContext';

// Sample data (in a real app, this would come from an API)
const prescriptions = [
  {
    id: 1,
    patient: 'Sarah Johnson',
    patientId: 'P12345',
    medication: 'Lisinopril',
    dosage: '10mg',
    frequency: 'Once daily',
    duration: '3 months',
    startDate: '2023-10-15',
    endDate: '2024-01-15',
    status: 'active',
    notes: 'Take with food'
  },
  {
    id: 2,
    patient: 'Michael Smith',
    patientId: 'P12346',
    medication: 'Metformin',
    dosage: '500mg',
    frequency: 'Twice daily',
    duration: '6 months',
    startDate: '2023-09-01',
    endDate: '2024-03-01',
    status: 'active',
    notes: 'Take with meals'
  },
  {
    id: 3,
    patient: 'Emma Davis',
    patientId: 'P12347',
    medication: 'Atorvastatin',
    dosage: '20mg',
    frequency: 'Once daily',
    duration: '3 months',
    startDate: '2023-10-10',
    endDate: '2024-01-10',
    status: 'active',
    notes: 'Take at bedtime'
  },
  {
    id: 4,
    patient: 'Robert Wilson',
    patientId: 'P12348',
    medication: 'Amlodipine',
    dosage: '5mg',
    frequency: 'Once daily',
    duration: '1 month',
    startDate: '2023-10-20',
    endDate: '2023-11-20',
    status: 'completed',
    notes: 'Monitor blood pressure'
  },
  {
    id: 5,
    patient: 'Jennifer Lopez',
    patientId: 'P12349',
    medication: 'Hydrochlorothiazide',
    dosage: '25mg',
    frequency: 'Once daily',
    duration: '2 months',
    startDate: '2023-08-15',
    endDate: '2023-10-15',
    status: 'completed',
    notes: 'Take in the morning'
  },
  {
    id: 6,
    patient: 'Charles Brown',
    patientId: 'P12350',
    medication: 'Ibuprofen',
    dosage: '400mg',
    frequency: 'As needed',
    duration: '2 weeks',
    startDate: '2023-10-25',
    endDate: '2023-11-08',
    status: 'active',
    notes: 'Take for pain, max 3 times daily'
  },
];

const medications = [
  { id: 1, name: 'Lisinopril', category: 'ACE Inhibitor', common_doses: ['5mg', '10mg', '20mg', '40mg'] },
  { id: 2, name: 'Metformin', category: 'Antidiabetic', common_doses: ['500mg', '850mg', '1000mg'] },
  { id: 3, name: 'Atorvastatin', category: 'Statin', common_doses: ['10mg', '20mg', '40mg', '80mg'] },
  { id: 4, name: 'Amlodipine', category: 'Calcium Channel Blocker', common_doses: ['2.5mg', '5mg', '10mg'] },
  { id: 5, name: 'Hydrochlorothiazide', category: 'Diuretic', common_doses: ['12.5mg', '25mg', '50mg'] },
  { id: 6, name: 'Ibuprofen', category: 'NSAID', common_doses: ['200mg', '400mg', '600mg', '800mg'] },
  { id: 7, name: 'Omeprazole', category: 'Proton Pump Inhibitor', common_doses: ['10mg', '20mg', '40mg'] },
  { id: 8, name: 'Levothyroxine', category: 'Thyroid Hormone', common_doses: ['25mcg', '50mcg', '75mcg', '100mcg', '125mcg'] },
  { id: 9, name: 'Simvastatin', category: 'Statin', common_doses: ['5mg', '10mg', '20mg', '40mg'] },
  { id: 10, name: 'Amoxicillin', category: 'Antibiotic', common_doses: ['250mg', '500mg', '875mg'] },
];

export default function Prescriptions() {
  const { currentUser } = useAuth();
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedPrescription, setSelectedPrescription] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  
  const handleOpenPrescriptionDialog = (prescription = null, editMode = false) => {
    setSelectedPrescription(prescription);
    setIsEditMode(editMode);
    setOpenDialog(true);
  };
  
  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedPrescription(null);
    setIsEditMode(false);
  };
  
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };
  
  const handleFilterChange = (filter) => {
    setActiveFilter(filter);
  };
  
  const getStatusChip = (status) => {
    switch(status) {
      case 'active':
        return (
          <Chip 
            icon={<CheckCircle />} 
            label="Active" 
            color="success" 
            size="small" 
            variant="outlined"
          />
        );
      case 'completed':
        return (
          <Chip 
            icon={<Cancel />} 
            label="Completed" 
            color="default" 
            size="small" 
            variant="outlined"
          />
        );
      default:
        return null;
    }
  };
  
  const filteredPrescriptions = prescriptions
    .filter(prescription => {
      // Apply search filter
      if (searchTerm) {
        const searchLower = searchTerm.toLowerCase();
        return prescription.patient.toLowerCase().includes(searchLower) || 
               prescription.medication.toLowerCase().includes(searchLower) ||
               prescription.patientId.toLowerCase().includes(searchLower);
      }
      return true;
    })
    .filter(prescription => {
      // Apply status filter
      if (activeFilter === 'all') return true;
      return prescription.status === activeFilter;
    });
  
  return (
    <Box>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          Prescriptions
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          Manage patient prescriptions and medications.
        </Typography>
      </Box>
      
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Card>
            <CardContent>
              {/* Search and Filter Controls */}
              <Grid container spacing={2} sx={{ mb: 3 }}>
                <Grid item xs={12} sm={6} md={4}>
                  <TextField
                    fullWidth
                    variant="outlined"
                    placeholder="Search prescriptions..."
                    InputProps={{
                      startAdornment: <Search color="action" sx={{ mr: 1 }} />,
                    }}
                    value={searchTerm}
                    onChange={handleSearchChange}
                    size="small"
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <Button 
                      variant={activeFilter === 'all' ? 'contained' : 'outlined'}
                      size="small"
                      onClick={() => handleFilterChange('all')}
                      startIcon={<FilterList />}
                    >
                      All
                    </Button>
                    <Button 
                      variant={activeFilter === 'active' ? 'contained' : 'outlined'}
                      size="small"
                      onClick={() => handleFilterChange('active')}
                      color="success"
                      startIcon={<CheckCircle />}
                    >
                      Active
                    </Button>
                    <Button 
                      variant={activeFilter === 'completed' ? 'contained' : 'outlined'}
                      size="small"
                      onClick={() => handleFilterChange('completed')}
                      color="default"
                      startIcon={<Cancel />}
                    >
                      Completed
                    </Button>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={12} md={4} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <Button 
                    variant="contained" 
                    color="primary"
                    startIcon={<Add />}
                    onClick={() => handleOpenPrescriptionDialog(null, true)}
                  >
                    New Prescription
                  </Button>
                </Grid>
              </Grid>
              
              {/* Prescriptions Table */}
              <TableContainer component={Paper} elevation={0}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Patient</TableCell>
                      <TableCell>Medication</TableCell>
                      <TableCell>Dosage</TableCell>
                      <TableCell>Frequency</TableCell>
                      <TableCell>Duration</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {filteredPrescriptions.map((prescription) => (
                      <TableRow key={prescription.id}>
                        <TableCell>
                          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                            <Typography variant="body1">
                              {prescription.patient}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              {prescription.patientId}
                            </Typography>
                          </Box>
                        </TableCell>
                        <TableCell>{prescription.medication}</TableCell>
                        <TableCell>{prescription.dosage}</TableCell>
                        <TableCell>{prescription.frequency}</TableCell>
                        <TableCell>
                          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                            <Typography variant="body2">
                              {prescription.duration}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              {prescription.startDate} - {prescription.endDate}
                            </Typography>
                          </Box>
                        </TableCell>
                        <TableCell>{getStatusChip(prescription.status)}</TableCell>
                        <TableCell>
                          <Box sx={{ display: 'flex', gap: 1 }}>
                            <IconButton 
                              size="small"
                              onClick={() => handleOpenPrescriptionDialog(prescription, false)}
                            >
                              <MedicalServices fontSize="small" />
                            </IconButton>
                            <IconButton 
                              size="small"
                              onClick={() => handleOpenPrescriptionDialog(prescription, true)}
                            >
                              <Edit fontSize="small" />
                            </IconButton>
                          </Box>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
              
              {filteredPrescriptions.length === 0 && (
                <Box sx={{ py: 4, textAlign: 'center' }}>
                  <Typography variant="body1" color="text.secondary">
                    No prescriptions found matching your criteria
                  </Typography>
                </Box>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      
      {/* Prescription Dialog */}
      <Dialog 
        open={openDialog} 
        onClose={handleCloseDialog} 
        maxWidth="md" 
        fullWidth
      >
        <DialogTitle>
          {isEditMode 
            ? (selectedPrescription ? 'Edit Prescription' : 'New Prescription') 
            : 'Prescription Details'
          }
        </DialogTitle>
        <DialogContent>
          {selectedPrescription && !isEditMode ? (
            // View Mode
            <Grid container spacing={3} sx={{ mt: 0 }}>
              <Grid item xs={12} md={6}>
                <Card variant="outlined" sx={{ mb: 2 }}>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      Patient Information
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <Avatar sx={{ mr: 2, bgcolor: 'primary.main' }}>
                        <Person />
                      </Avatar>
                      <Box>
                        <Typography variant="subtitle1">
                          {selectedPrescription.patient}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          ID: {selectedPrescription.patientId}
                        </Typography>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
                
                <Card variant="outlined">
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      Medication Details
                    </Typography>
                    <List dense>
                      <ListItem>
                        <ListItemAvatar>
                          <Avatar sx={{ bgcolor: 'secondary.light' }}>
                            <LocalPharmacy />
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText 
                          primary="Medication" 
                          secondary={selectedPrescription.medication} 
                        />
                      </ListItem>
                      <Divider component="li" />
                      <ListItem>
                        <ListItemText 
                          primary="Dosage" 
                          secondary={selectedPrescription.dosage} 
                        />
                      </ListItem>
                      <Divider component="li" />
                      <ListItem>
                        <ListItemText 
                          primary="Frequency" 
                          secondary={selectedPrescription.frequency} 
                        />
                      </ListItem>
                      <Divider component="li" />
                      <ListItem>
                        <ListItemText 
                          primary="Duration" 
                          secondary={selectedPrescription.duration} 
                        />
                      </ListItem>
                    </List>
                  </CardContent>
                </Card>
              </Grid>
              
              <Grid item xs={12} md={6}>
                <Card variant="outlined" sx={{ mb: 2 }}>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      Prescription Timeline
                    </Typography>
                    <List dense>
                      <ListItem>
                        <ListItemAvatar>
                          <Avatar sx={{ bgcolor: 'info.light' }}>
                            <EventNote />
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText 
                          primary="Start Date" 
                          secondary={selectedPrescription.startDate} 
                        />
                      </ListItem>
                      <Divider component="li" />
                      <ListItem>
                        <ListItemText 
                          primary="End Date" 
                          secondary={selectedPrescription.endDate} 
                        />
                      </ListItem>
                      <Divider component="li" />
                      <ListItem>
                        <ListItemText 
                          primary="Status" 
                          secondary={getStatusChip(selectedPrescription.status)} 
                        />
                      </ListItem>
                    </List>
                  </CardContent>
                </Card>
                
                <Card variant="outlined">
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      Notes
                    </Typography>
                    <Typography variant="body1">
                      {selectedPrescription.notes || 'No notes available'}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          ) : (
            // Edit Mode
            <Grid container spacing={2} sx={{ mt: 0 }}>
              <Grid item xs={12} md={6}>
                <TextField
                  label="Patient"
                  fullWidth
                  margin="normal"
                  value={selectedPrescription?.patient || ''}
                  disabled={true}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  label="Patient ID"
                  fullWidth
                  margin="normal"
                  value={selectedPrescription?.patientId || ''}
                  disabled={true}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth margin="normal">
                  <InputLabel>Medication</InputLabel>
                  <Select
                    value={selectedPrescription?.medication || ''}
                    label="Medication"
                  >
                    {medications.map(medication => (
                      <MenuItem key={medication.id} value={medication.name}>
                        {medication.name} ({medication.category})
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth margin="normal">
                  <InputLabel>Dosage</InputLabel>
                  <Select
                    value={selectedPrescription?.dosage || ''}
                    label="Dosage"
                  >
                    {medications
                      .find(m => m.name === (selectedPrescription?.medication || ''))
                      ?.common_doses.map(dose => (
                        <MenuItem key={dose} value={dose}>
                          {dose}
                        </MenuItem>
                      )) || []}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth margin="normal">
                  <InputLabel>Frequency</InputLabel>
                  <Select
                    value={selectedPrescription?.frequency || ''}
                    label="Frequency"
                  >
                    <MenuItem value="Once daily">Once daily</MenuItem>
                    <MenuItem value="Twice daily">Twice daily</MenuItem>
                    <MenuItem value="Three times daily">Three times daily</MenuItem>
                    <MenuItem value="Four times daily">Four times daily</MenuItem>
                    <MenuItem value="Every other day">Every other day</MenuItem>
                    <MenuItem value="Weekly">Weekly</MenuItem>
                    <MenuItem value="As needed">As needed</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth margin="normal">
                  <InputLabel>Duration</InputLabel>
                  <Select
                    value={selectedPrescription?.duration || ''}
                    label="Duration"
                  >
                    <MenuItem value="1 week">1 week</MenuItem>
                    <MenuItem value="2 weeks">2 weeks</MenuItem>
                    <MenuItem value="1 month">1 month</MenuItem>
                    <MenuItem value="2 months">2 months</MenuItem>
                    <MenuItem value="3 months">3 months</MenuItem>
                    <MenuItem value="6 months">6 months</MenuItem>
                    <MenuItem value="1 year">1 year</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  label="Start Date"
                  type="date"
                  fullWidth
                  margin="normal"
                  value={selectedPrescription?.startDate || ''}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  label="End Date"
                  type="date"
                  fullWidth
                  margin="normal"
                  value={selectedPrescription?.endDate || ''}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Notes"
                  multiline
                  rows={4}
                  fullWidth
                  margin="normal"
                  value={selectedPrescription?.notes || ''}
                  placeholder="Add special instructions or notes..."
                />
              </Grid>
            </Grid>
          )}
        </DialogContent>
        <DialogActions>
          {selectedPrescription && !isEditMode && (
            <Button 
              onClick={() => handleOpenPrescriptionDialog(selectedPrescription, true)} 
              color="primary"
              startIcon={<Edit />}
            >
              Edit
            </Button>
          )}
          <Button onClick={handleCloseDialog}>
            Cancel
          </Button>
          {isEditMode && (
            <Button 
              variant="contained" 
              color="primary"
            >
              {selectedPrescription ? 'Update' : 'Create'} Prescription
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </Box>
  );
} 