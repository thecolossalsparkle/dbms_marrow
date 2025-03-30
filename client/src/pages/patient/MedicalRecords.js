import React, { useState } from 'react';
import { 
  Grid, Typography, Box, 
  Card, CardContent,
  Tabs, Tab, Button,
  List, ListItem, ListItemText, ListItemAvatar,
  ListItemSecondaryAction, Avatar, Divider,
  IconButton, Dialog, DialogTitle,
  DialogContent, DialogActions,
  Chip, TextField
} from '@mui/material';
import { 
  Description, LocalHospital, Download,
  Medication, Science, Event, 
  Search, FilterList, Upload,
  Visibility, Share, FilePresent,
  ContentCopy, MoreVert
} from '@mui/icons-material';
import { useAuth } from '../../contexts/AuthContext';

// Sample data for medical records
const records = [
  {
    id: 1,
    type: 'lab',
    title: 'Blood Test Results',
    doctor: 'Dr. Emily Johnson',
    date: '2023-10-05',
    facility: 'Central Lab',
    description: 'Complete blood count, lipid panel, and glucose test',
    file: 'blood_test_results.pdf',
    shared: true
  },
  {
    id: 2,
    type: 'prescription',
    title: 'Prescription - Lisinopril',
    doctor: 'Dr. Emily Johnson',
    date: '2023-10-05',
    dosage: '10mg',
    frequency: 'Once daily',
    duration: '3 months',
    instructions: 'Take with food',
    file: 'lisinopril_prescription.pdf'
  },
  {
    id: 3,
    type: 'report',
    title: 'Cardiology Consultation Report',
    doctor: 'Dr. Emily Johnson',
    date: '2023-10-05',
    facility: 'Heart Care Medical Center',
    description: 'Detailed report following cardiology consultation',
    file: 'cardiology_report.pdf'
  },
  {
    id: 4,
    type: 'lab',
    title: 'Cholesterol Panel',
    doctor: 'Dr. Sarah Miller',
    date: '2023-09-15',
    facility: 'Health First Lab',
    description: 'Lipid profile including LDL, HDL, triglycerides',
    file: 'cholesterol_panel.pdf'
  },
  {
    id: 5,
    type: 'imaging',
    title: 'Chest X-Ray',
    doctor: 'Dr. Michael Chen',
    date: '2023-08-22',
    facility: 'Radiology Partners',
    description: 'Chest x-ray, frontal and lateral views',
    file: 'chest_xray.pdf'
  },
  {
    id: 6,
    type: 'prescription',
    title: 'Prescription - Metformin',
    doctor: 'Dr. Sarah Miller',
    date: '2023-09-15',
    dosage: '500mg',
    frequency: 'Twice daily',
    duration: '6 months',
    instructions: 'Take with meals',
    file: 'metformin_prescription.pdf'
  },
  {
    id: 7,
    type: 'immunization',
    title: 'Flu Vaccine',
    doctor: 'Dr. Sarah Miller',
    date: '2023-09-10',
    facility: 'Family Health Clinic',
    description: 'Annual influenza vaccination',
    file: 'flu_vaccine_record.pdf'
  },
  {
    id: 8,
    type: 'report',
    title: 'Annual Physical Examination',
    doctor: 'Dr. Sarah Miller',
    date: '2023-09-15',
    facility: 'Family Health Clinic',
    description: 'Comprehensive annual physical assessment',
    file: 'annual_physical.pdf'
  },
  {
    id: 9,
    type: 'lab',
    title: 'Urinalysis',
    doctor: 'Dr. Sarah Miller',
    date: '2023-09-15',
    facility: 'Health First Lab',
    description: 'Complete urinalysis panel',
    file: 'urinalysis.pdf'
  },
  {
    id: 10,
    type: 'imaging',
    title: 'Knee MRI',
    doctor: 'Dr. Michael Chen',
    date: '2023-08-15',
    facility: 'Advanced Imaging Center',
    description: 'MRI scan of right knee',
    file: 'knee_mri.pdf'
  },
];

export default function PatientRecords() {
  const { currentUser } = useAuth();
  const [tabValue, setTabValue] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  
  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };
  
  const handleOpenRecord = (record) => {
    setSelectedRecord(record);
    setOpenDialog(true);
  };
  
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };
  
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };
  
  const getTypeIcon = (type) => {
    switch(type) {
      case 'lab':
        return <Science color="primary" />;
      case 'prescription':
        return <Medication color="secondary" />;
      case 'report':
        return <Description color="info" />;
      case 'imaging':
        return <LocalHospital color="error" />;
      case 'immunization':
        return <Event color="success" />;
      default:
        return <Description />;
    }
  };
  
  const getTypeChip = (type) => {
    let color;
    switch(type) {
      case 'lab':
        color = 'primary';
        break;
      case 'prescription':
        color = 'secondary';
        break;
      case 'report':
        color = 'info';
        break;
      case 'imaging':
        color = 'error';
        break;
      case 'immunization':
        color = 'success';
        break;
      default:
        color = 'default';
    }
    
    return (
      <Chip 
        icon={getTypeIcon(type)} 
        label={type.charAt(0).toUpperCase() + type.slice(1)} 
        color={color} 
        size="small" 
        variant="outlined"
      />
    );
  };
  
  const filteredRecords = () => {
    return records
      .filter(record => {
        // Apply search filter
        if (searchTerm) {
          const searchLower = searchTerm.toLowerCase();
          return record.title.toLowerCase().includes(searchLower) || 
                 record.doctor.toLowerCase().includes(searchLower) ||
                 (record.description && record.description.toLowerCase().includes(searchLower));
        }
        return true;
      })
      .filter(record => {
        // Apply tab filter
        if (tabValue === 0) return true; // All
        if (tabValue === 1) return record.type === 'lab';
        if (tabValue === 2) return record.type === 'prescription';
        if (tabValue === 3) return record.type === 'report';
        if (tabValue === 4) return record.type === 'imaging';
        if (tabValue === 5) return record.type === 'immunization';
        return true;
      })
      .sort((a, b) => new Date(b.date) - new Date(a.date)); // Sort by date, newest first
  };
  
  return (
    <Box>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          Medical Records
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          Access and manage your medical information.
        </Typography>
      </Box>
      
      <Grid container spacing={3}>
        {/* Filters and Search */}
        <Grid item xs={12}>
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    placeholder="Search records..."
                    variant="outlined"
                    size="small"
                    value={searchTerm}
                    onChange={handleSearchChange}
                    InputProps={{
                      startAdornment: <Search color="action" sx={{ mr: 1 }} />,
                    }}
                  />
                </Grid>
                <Grid item xs={12} md={6} sx={{ display: 'flex', justifyContent: { xs: 'flex-start', md: 'flex-end' } }}>
                  <Button 
                    variant="outlined" 
                    startIcon={<FilterList />}
                    sx={{ mr: 1 }}
                  >
                    Filter
                  </Button>
                  <Button 
                    variant="contained" 
                    startIcon={<Upload />}
                  >
                    Upload Record
                  </Button>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
        
        {/* Medical Records List */}
        <Grid item xs={12}>
          <Card>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tabs 
                value={tabValue} 
                onChange={handleTabChange} 
                indicatorColor="primary"
                textColor="primary"
                variant="scrollable"
                scrollButtons="auto"
              >
                <Tab label="All Records" />
                <Tab label="Lab Results" />
                <Tab label="Prescriptions" />
                <Tab label="Reports" />
                <Tab label="Imaging" />
                <Tab label="Immunizations" />
              </Tabs>
            </Box>
            <CardContent>
              {filteredRecords().length > 0 ? (
                <List>
                  {filteredRecords().map((record, index) => (
                    <React.Fragment key={record.id}>
                      {index > 0 && <Divider component="li" />}
                      <ListItem button onClick={() => handleOpenRecord(record)}>
                        <ListItemAvatar>
                          <Avatar>
                            {getTypeIcon(record.type)}
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                          primary={
                            <Typography variant="subtitle1">
                              {record.title}
                            </Typography>
                          }
                          secondary={
                            <React.Fragment>
                              <Typography component="span" variant="body2" color="text.primary">
                                {record.doctor} • {new Date(record.date).toLocaleDateString()}
                              </Typography>
                              <br />
                              <Typography component="span" variant="body2">
                                {record.description || (record.type === 'prescription' ? 
                                  `${record.dosage}, ${record.frequency}` : '')}
                              </Typography>
                            </React.Fragment>
                          }
                        />
                        <ListItemSecondaryAction sx={{ display: 'flex' }}>
                          {getTypeChip(record.type)}
                          <IconButton edge="end" aria-label="download" sx={{ ml: 1 }}>
                            <Download />
                          </IconButton>
                        </ListItemSecondaryAction>
                      </ListItem>
                    </React.Fragment>
                  ))}
                </List>
              ) : (
                <Box sx={{ py: 4, textAlign: 'center' }}>
                  <Typography variant="body1" color="text.secondary">
                    No records found matching your search criteria
                  </Typography>
                </Box>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      
      {/* Record Details Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth>
        {selectedRecord && (
          <>
            <DialogTitle>
              {selectedRecord.title}
              <IconButton
                aria-label="more options"
                sx={{ position: 'absolute', right: 8, top: 8 }}
              >
                <MoreVert />
              </IconButton>
            </DialogTitle>
            <DialogContent>
              <Box sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
                {getTypeChip(selectedRecord.type)}
                <Typography variant="body2" color="text.secondary" sx={{ ml: 2 }}>
                  Date: {new Date(selectedRecord.date).toLocaleDateString()}
                </Typography>
              </Box>
              
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <Card variant="outlined" sx={{ mb: 2 }}>
                    <CardContent>
                      <Typography variant="subtitle1" gutterBottom>
                        Record Information
                      </Typography>
                      <List dense disablePadding>
                        <ListItem disableGutters>
                          <ListItemText 
                            primary="Provider" 
                            secondary={selectedRecord.doctor} 
                          />
                        </ListItem>
                        {selectedRecord.facility && (
                          <ListItem disableGutters>
                            <ListItemText 
                              primary="Facility" 
                              secondary={selectedRecord.facility} 
                            />
                          </ListItem>
                        )}
                        <ListItem disableGutters>
                          <ListItemText 
                            primary="Description" 
                            secondary={selectedRecord.description} 
                          />
                        </ListItem>
                      </List>
                    </CardContent>
                  </Card>
                </Grid>
                
                {selectedRecord.type === 'prescription' && (
                  <Grid item xs={12} md={6}>
                    <Card variant="outlined">
                      <CardContent>
                        <Typography variant="subtitle1" gutterBottom>
                          Prescription Details
                        </Typography>
                        <List dense disablePadding>
                          <ListItem disableGutters>
                            <ListItemText 
                              primary="Dosage" 
                              secondary={selectedRecord.dosage} 
                            />
                          </ListItem>
                          <ListItem disableGutters>
                            <ListItemText 
                              primary="Frequency" 
                              secondary={selectedRecord.frequency} 
                            />
                          </ListItem>
                          <ListItem disableGutters>
                            <ListItemText 
                              primary="Duration" 
                              secondary={selectedRecord.duration} 
                            />
                          </ListItem>
                          <ListItem disableGutters>
                            <ListItemText 
                              primary="Instructions" 
                              secondary={selectedRecord.instructions} 
                            />
                          </ListItem>
                        </List>
                      </CardContent>
                    </Card>
                  </Grid>
                )}
                
                <Grid item xs={12}>
                  <Card variant="outlined">
                    <CardContent>
                      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <FilePresent sx={{ mr: 1 }} />
                          <Typography variant="subtitle1">
                            {selectedRecord.file}
                          </Typography>
                        </Box>
                        <Box>
                          <IconButton aria-label="download">
                            <Download />
                          </IconButton>
                          <IconButton aria-label="view">
                            <Visibility />
                          </IconButton>
                          <IconButton aria-label="share">
                            <Share />
                          </IconButton>
                          <IconButton aria-label="copy">
                            <ContentCopy />
                          </IconButton>
                        </Box>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDialog}>
                Close
              </Button>
              <Button variant="contained" startIcon={<Download />}>
                Download
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </Box>
  );
} 