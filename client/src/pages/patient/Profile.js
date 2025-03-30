import React, { useState } from 'react';
import {
  Box,
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Avatar,
  Button,
  TextField,
  Divider,
  Paper,
  Stack,
  IconButton,
  Chip,
  Alert,
  Tabs,
  Tab,
  Snackbar,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  ListItemIcon
} from '@mui/material';
import {
  Edit,
  Save,
  Add,
  Delete,
  EmailOutlined,
  PhoneOutlined,
  LocationOnOutlined,
  CalendarMonthOutlined,
  FavoriteOutlined,
  NotesOutlined,
  LocalHospitalOutlined,
  MedicalInformationOutlined,
  AccessibilityNewOutlined,
  HeightOutlined,
  MonitorWeightOutlined,
  BloodtypeOutlined
} from '@mui/icons-material';
import { useAuth } from '../../contexts/AuthContext';

// Mock data
const allergiesData = [
  { name: 'Penicillin', severity: 'High', reaction: 'Anaphylaxis' },
  { name: 'Peanuts', severity: 'Moderate', reaction: 'Skin rash, itching' },
  { name: 'Dust mites', severity: 'Low', reaction: 'Sneezing, congestion' }
];

const medicationsData = [
  { name: 'Lisinopril', dosage: '10mg', frequency: 'Once daily', purpose: 'Blood pressure' },
  { name: 'Metformin', dosage: '500mg', frequency: 'Twice daily', purpose: 'Diabetes' },
  { name: 'Atorvastatin', dosage: '20mg', frequency: 'Once daily', purpose: 'Cholesterol' }
];

const emergencyContactsData = [
  { name: 'Jane Smith', relationship: 'Spouse', phone: '(555) 123-4567' },
  { name: 'Michael Smith', relationship: 'Son', phone: '(555) 234-5678' }
];

export default function PatientProfile() {
  const { currentUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [tabValue, setTabValue] = useState(0);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  });

  // Mock user data - would be replaced with actual user data from authentication context
  const [userData, setUserData] = useState({
    name: currentUser?.name || 'Robert Johnson',
    email: currentUser?.email || 'robert.johnson@example.com',
    phone: '+1 (555) 987-6543',
    dateOfBirth: '05/12/1985',
    address: '456 Residential Ave, Apt 303, New York, NY 10001',
    gender: 'Male',
    bloodType: 'O+',
    height: '5\'10"',
    weight: '175 lbs',
    allergies: allergiesData,
    medications: medicationsData,
    emergencyContacts: emergencyContactsData,
    primaryPhysician: 'Dr. Sarah Williams',
    insuranceProvider: 'Blue Cross Blue Shield',
    policyNumber: 'BCB12345678',
    avatar: currentUser?.avatar || 'https://randomuser.me/api/portraits/men/32.jpg'
  });

  const handleSaveProfile = () => {
    // Save profile logic would go here
    setIsEditing(false);
    setSnackbar({
      open: true,
      message: 'Profile updated successfully!',
      severity: 'success'
    });
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <Container maxWidth="lg">
      <Paper elevation={3} sx={{ p: 3, mb: 4, borderRadius: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
          <Typography variant="h4">My Profile</Typography>
          <Button
            variant={isEditing ? "contained" : "outlined"}
            color={isEditing ? "success" : "primary"}
            startIcon={isEditing ? <Save /> : <Edit />}
            onClick={() => isEditing ? handleSaveProfile() : setIsEditing(true)}
          >
            {isEditing ? 'Save Changes' : 'Edit Profile'}
          </Button>
        </Box>

        <Grid container spacing={4}>
          {/* Profile Overview */}
          <Grid item xs={12} md={4}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <Avatar
                src={userData.avatar}
                alt={userData.name}
                sx={{ width: 200, height: 200, mb: 3, boxShadow: 3 }}
              />
              {isEditing && (
                <Button variant="outlined" size="small" sx={{ mb: 2 }}>
                  Change Photo
                </Button>
              )}
              <Card variant="outlined" sx={{ width: '100%', mb: 3 }}>
                <CardContent>
                  <Typography variant="h5" gutterBottom fontWeight={600}>
                    {isEditing ? (
                      <TextField
                        fullWidth
                        variant="standard"
                        label="Full Name"
                        value={userData.name}
                        onChange={(e) => setUserData({ ...userData, name: e.target.value })}
                      />
                    ) : (
                      userData.name
                    )}
                  </Typography>
                  <Divider sx={{ my: 2 }} />
                  <Stack spacing={2}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <EmailOutlined sx={{ mr: 1, color: 'primary.main' }} />
                      {isEditing ? (
                        <TextField
                          fullWidth
                          variant="standard"
                          label="Email"
                          value={userData.email}
                          onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                        />
                      ) : (
                        <Typography variant="body2">{userData.email}</Typography>
                      )}
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <PhoneOutlined sx={{ mr: 1, color: 'primary.main' }} />
                      {isEditing ? (
                        <TextField
                          fullWidth
                          variant="standard"
                          label="Phone"
                          value={userData.phone}
                          onChange={(e) => setUserData({ ...userData, phone: e.target.value })}
                        />
                      ) : (
                        <Typography variant="body2">{userData.phone}</Typography>
                      )}
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <CalendarMonthOutlined sx={{ mr: 1, color: 'primary.main' }} />
                      {isEditing ? (
                        <TextField
                          fullWidth
                          variant="standard"
                          label="Date of Birth"
                          value={userData.dateOfBirth}
                          onChange={(e) => setUserData({ ...userData, dateOfBirth: e.target.value })}
                        />
                      ) : (
                        <Typography variant="body2">DOB: {userData.dateOfBirth}</Typography>
                      )}
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <LocationOnOutlined sx={{ mr: 1, color: 'primary.main' }} />
                      {isEditing ? (
                        <TextField
                          fullWidth
                          variant="standard"
                          label="Address"
                          value={userData.address}
                          onChange={(e) => setUserData({ ...userData, address: e.target.value })}
                        />
                      ) : (
                        <Typography variant="body2">{userData.address}</Typography>
                      )}
                    </Box>
                  </Stack>
                </CardContent>
              </Card>
              
              <Card variant="outlined" sx={{ width: '100%' }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Emergency Contacts
                  </Typography>
                  {userData.emergencyContacts.map((contact, index) => (
                    <Box key={index} sx={{ mb: 2 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Box>
                          {isEditing ? (
                            <TextField
                              fullWidth
                              variant="standard"
                              label="Name"
                              value={contact.name}
                              onChange={(e) => {
                                const newContacts = [...userData.emergencyContacts];
                                newContacts[index].name = e.target.value;
                                setUserData({ ...userData, emergencyContacts: newContacts });
                              }}
                              sx={{ mb: 1 }}
                            />
                          ) : (
                            <Typography variant="subtitle2">{contact.name}</Typography>
                          )}
                          {isEditing ? (
                            <TextField
                              fullWidth
                              variant="standard"
                              label="Relationship"
                              value={contact.relationship}
                              onChange={(e) => {
                                const newContacts = [...userData.emergencyContacts];
                                newContacts[index].relationship = e.target.value;
                                setUserData({ ...userData, emergencyContacts: newContacts });
                              }}
                              sx={{ mb: 1 }}
                            />
                          ) : (
                            <Typography variant="body2" color="text.secondary">
                              {contact.relationship}
                            </Typography>
                          )}
                          {isEditing ? (
                            <TextField
                              fullWidth
                              variant="standard"
                              label="Phone"
                              value={contact.phone}
                              onChange={(e) => {
                                const newContacts = [...userData.emergencyContacts];
                                newContacts[index].phone = e.target.value;
                                setUserData({ ...userData, emergencyContacts: newContacts });
                              }}
                            />
                          ) : (
                            <Typography variant="body2" color="text.secondary">
                              {contact.phone}
                            </Typography>
                          )}
                        </Box>
                        {isEditing && (
                          <IconButton 
                            color="error" 
                            size="small"
                            onClick={() => {
                              setUserData({
                                ...userData,
                                emergencyContacts: userData.emergencyContacts.filter((_, i) => i !== index)
                              });
                            }}
                          >
                            <Delete />
                          </IconButton>
                        )}
                      </Box>
                      {index < userData.emergencyContacts.length - 1 && <Divider sx={{ my: 2 }} />}
                    </Box>
                  ))}
                  {isEditing && (
                    <Button 
                      startIcon={<Add />} 
                      size="small" 
                      variant="outlined"
                      fullWidth
                      sx={{ mt: 2 }}
                      onClick={() => {
                        setUserData({
                          ...userData,
                          emergencyContacts: [...userData.emergencyContacts, {
                            name: '',
                            relationship: '',
                            phone: ''
                          }]
                        });
                      }}
                    >
                      Add Emergency Contact
                    </Button>
                  )}
                </CardContent>
              </Card>
            </Box>
          </Grid>

          {/* Detailed Information */}
          <Grid item xs={12} md={8}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
              <Tabs 
                value={tabValue} 
                onChange={handleTabChange}
                variant="fullWidth"
                sx={{ mb: 1 }}
              >
                <Tab label="Health Information" />
                <Tab label="Allergies" />
                <Tab label="Medications" />
                <Tab label="Insurance" />
              </Tabs>
            </Box>

            {/* Health Information Tab */}
            {tabValue === 0 && (
              <Card variant="outlined">
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Physical Information
                  </Typography>
                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <AccessibilityNewOutlined sx={{ mr: 1, color: 'primary.main' }} />
                        <Typography variant="subtitle2" sx={{ minWidth: 80 }}>Gender:</Typography>
                        {isEditing ? (
                          <TextField
                            variant="standard"
                            value={userData.gender}
                            onChange={(e) => setUserData({ ...userData, gender: e.target.value })}
                          />
                        ) : (
                          <Typography variant="body2">{userData.gender}</Typography>
                        )}
                      </Box>
                    </Grid>
                    
                    <Grid item xs={12} sm={6}>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <BloodtypeOutlined sx={{ mr: 1, color: 'primary.main' }} />
                        <Typography variant="subtitle2" sx={{ minWidth: 80 }}>Blood Type:</Typography>
                        {isEditing ? (
                          <TextField
                            variant="standard"
                            value={userData.bloodType}
                            onChange={(e) => setUserData({ ...userData, bloodType: e.target.value })}
                          />
                        ) : (
                          <Typography variant="body2">{userData.bloodType}</Typography>
                        )}
                      </Box>
                    </Grid>
                    
                    <Grid item xs={12} sm={6}>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <HeightOutlined sx={{ mr: 1, color: 'primary.main' }} />
                        <Typography variant="subtitle2" sx={{ minWidth: 80 }}>Height:</Typography>
                        {isEditing ? (
                          <TextField
                            variant="standard"
                            value={userData.height}
                            onChange={(e) => setUserData({ ...userData, height: e.target.value })}
                          />
                        ) : (
                          <Typography variant="body2">{userData.height}</Typography>
                        )}
                      </Box>
                    </Grid>
                    
                    <Grid item xs={12} sm={6}>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <MonitorWeightOutlined sx={{ mr: 1, color: 'primary.main' }} />
                        <Typography variant="subtitle2" sx={{ minWidth: 80 }}>Weight:</Typography>
                        {isEditing ? (
                          <TextField
                            variant="standard"
                            value={userData.weight}
                            onChange={(e) => setUserData({ ...userData, weight: e.target.value })}
                          />
                        ) : (
                          <Typography variant="body2">{userData.weight}</Typography>
                        )}
                      </Box>
                    </Grid>
                  </Grid>

                  <Divider sx={{ my: 3 }} />
                  
                  <Typography variant="h6" gutterBottom>
                    Primary Care Physician
                  </Typography>
                  <Box sx={{ mb: 3 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <LocalHospitalOutlined sx={{ mr: 1, color: 'primary.main' }} />
                      <Typography variant="subtitle2" sx={{ minWidth: 80 }}>Doctor:</Typography>
                      {isEditing ? (
                        <TextField
                          variant="standard"
                          value={userData.primaryPhysician}
                          onChange={(e) => setUserData({ ...userData, primaryPhysician: e.target.value })}
                        />
                      ) : (
                        <Typography variant="body2">{userData.primaryPhysician}</Typography>
                      )}
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            )}

            {/* Allergies Tab */}
            {tabValue === 1 && (
              <Card variant="outlined">
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                    <Typography variant="h6">Allergies & Sensitivities</Typography>
                    {isEditing && (
                      <Button 
                        startIcon={<Add />} 
                        size="small" 
                        onClick={() => {
                          setUserData({
                            ...userData,
                            allergies: [...userData.allergies, {
                              name: '',
                              severity: '',
                              reaction: ''
                            }]
                          });
                        }}
                      >
                        Add
                      </Button>
                    )}
                  </Box>
                  {userData.allergies.length > 0 ? (
                    userData.allergies.map((allergy, index) => (
                      <Box key={index} sx={{ mb: 3 }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                          <Box sx={{ width: '100%' }}>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                              <FavoriteOutlined sx={{ mr: 1, color: 'error.main' }} />
                              {isEditing ? (
                                <TextField
                                  fullWidth
                                  variant="standard"
                                  label="Allergy"
                                  value={allergy.name}
                                  onChange={(e) => {
                                    const newAllergies = [...userData.allergies];
                                    newAllergies[index].name = e.target.value;
                                    setUserData({ ...userData, allergies: newAllergies });
                                  }}
                                />
                              ) : (
                                <Typography variant="subtitle1" fontWeight={600}>
                                  {allergy.name}
                                </Typography>
                              )}
                            </Box>
                            
                            <Grid container spacing={2} sx={{ mt: 1 }}>
                              <Grid item xs={12} sm={6}>
                                <Typography variant="caption" color="text.secondary">Severity:</Typography>
                                {isEditing ? (
                                  <TextField
                                    fullWidth
                                    variant="standard"
                                    value={allergy.severity}
                                    onChange={(e) => {
                                      const newAllergies = [...userData.allergies];
                                      newAllergies[index].severity = e.target.value;
                                      setUserData({ ...userData, allergies: newAllergies });
                                    }}
                                  />
                                ) : (
                                  <Typography variant="body2">
                                    {allergy.severity}
                                  </Typography>
                                )}
                              </Grid>
                              <Grid item xs={12} sm={6}>
                                <Typography variant="caption" color="text.secondary">Reaction:</Typography>
                                {isEditing ? (
                                  <TextField
                                    fullWidth
                                    variant="standard"
                                    value={allergy.reaction}
                                    onChange={(e) => {
                                      const newAllergies = [...userData.allergies];
                                      newAllergies[index].reaction = e.target.value;
                                      setUserData({ ...userData, allergies: newAllergies });
                                    }}
                                  />
                                ) : (
                                  <Typography variant="body2">
                                    {allergy.reaction}
                                  </Typography>
                                )}
                              </Grid>
                            </Grid>
                          </Box>
                          {isEditing && (
                            <IconButton 
                              color="error" 
                              onClick={() => {
                                setUserData({
                                  ...userData,
                                  allergies: userData.allergies.filter((_, i) => i !== index)
                                });
                              }}
                            >
                              <Delete />
                            </IconButton>
                          )}
                        </Box>
                        {index < userData.allergies.length - 1 && <Divider sx={{ my: 2 }} />}
                      </Box>
                    ))
                  ) : (
                    <Alert severity="info" sx={{ mt: 2 }}>
                      No allergies recorded. {isEditing && 'Click "Add" to record an allergy.'}
                    </Alert>
                  )}
                </CardContent>
              </Card>
            )}

            {/* Medications Tab */}
            {tabValue === 2 && (
              <Card variant="outlined">
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                    <Typography variant="h6">Current Medications</Typography>
                    {isEditing && (
                      <Button 
                        startIcon={<Add />} 
                        size="small" 
                        onClick={() => {
                          setUserData({
                            ...userData,
                            medications: [...userData.medications, {
                              name: '',
                              dosage: '',
                              frequency: '',
                              purpose: ''
                            }]
                          });
                        }}
                      >
                        Add
                      </Button>
                    )}
                  </Box>
                  {userData.medications.length > 0 ? (
                    userData.medications.map((medication, index) => (
                      <Box key={index} sx={{ mb: 3 }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                          <Box sx={{ width: '100%' }}>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                              <MedicalInformationOutlined sx={{ mr: 1, color: 'primary.main' }} />
                              {isEditing ? (
                                <TextField
                                  fullWidth
                                  variant="standard"
                                  label="Medication"
                                  value={medication.name}
                                  onChange={(e) => {
                                    const newMeds = [...userData.medications];
                                    newMeds[index].name = e.target.value;
                                    setUserData({ ...userData, medications: newMeds });
                                  }}
                                />
                              ) : (
                                <Typography variant="subtitle1" fontWeight={600}>
                                  {medication.name}
                                </Typography>
                              )}
                            </Box>
                            
                            <Grid container spacing={2} sx={{ mt: 1 }}>
                              <Grid item xs={12} sm={4}>
                                <Typography variant="caption" color="text.secondary">Dosage:</Typography>
                                {isEditing ? (
                                  <TextField
                                    fullWidth
                                    variant="standard"
                                    value={medication.dosage}
                                    onChange={(e) => {
                                      const newMeds = [...userData.medications];
                                      newMeds[index].dosage = e.target.value;
                                      setUserData({ ...userData, medications: newMeds });
                                    }}
                                  />
                                ) : (
                                  <Typography variant="body2">
                                    {medication.dosage}
                                  </Typography>
                                )}
                              </Grid>
                              <Grid item xs={12} sm={4}>
                                <Typography variant="caption" color="text.secondary">Frequency:</Typography>
                                {isEditing ? (
                                  <TextField
                                    fullWidth
                                    variant="standard"
                                    value={medication.frequency}
                                    onChange={(e) => {
                                      const newMeds = [...userData.medications];
                                      newMeds[index].frequency = e.target.value;
                                      setUserData({ ...userData, medications: newMeds });
                                    }}
                                  />
                                ) : (
                                  <Typography variant="body2">
                                    {medication.frequency}
                                  </Typography>
                                )}
                              </Grid>
                              <Grid item xs={12} sm={4}>
                                <Typography variant="caption" color="text.secondary">Purpose:</Typography>
                                {isEditing ? (
                                  <TextField
                                    fullWidth
                                    variant="standard"
                                    value={medication.purpose}
                                    onChange={(e) => {
                                      const newMeds = [...userData.medications];
                                      newMeds[index].purpose = e.target.value;
                                      setUserData({ ...userData, medications: newMeds });
                                    }}
                                  />
                                ) : (
                                  <Typography variant="body2">
                                    {medication.purpose}
                                  </Typography>
                                )}
                              </Grid>
                            </Grid>
                          </Box>
                          {isEditing && (
                            <IconButton 
                              color="error" 
                              onClick={() => {
                                setUserData({
                                  ...userData,
                                  medications: userData.medications.filter((_, i) => i !== index)
                                });
                              }}
                            >
                              <Delete />
                            </IconButton>
                          )}
                        </Box>
                        {index < userData.medications.length - 1 && <Divider sx={{ my: 2 }} />}
                      </Box>
                    ))
                  ) : (
                    <Alert severity="info" sx={{ mt: 2 }}>
                      No medications recorded. {isEditing && 'Click "Add" to record a medication.'}
                    </Alert>
                  )}
                </CardContent>
              </Card>
            )}

            {/* Insurance Tab */}
            {tabValue === 3 && (
              <Card variant="outlined">
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Insurance Information
                  </Typography>
                  <Stack spacing={3}>
                    <Box>
                      <Typography variant="subtitle2" color="text.secondary">
                        Provider
                      </Typography>
                      {isEditing ? (
                        <TextField
                          fullWidth
                          variant="outlined"
                          size="small"
                          value={userData.insuranceProvider}
                          onChange={(e) => setUserData({ ...userData, insuranceProvider: e.target.value })}
                          sx={{ mt: 1 }}
                        />
                      ) : (
                        <Typography variant="body1" fontWeight={500}>
                          {userData.insuranceProvider}
                        </Typography>
                      )}
                    </Box>
                    
                    <Box>
                      <Typography variant="subtitle2" color="text.secondary">
                        Policy Number
                      </Typography>
                      {isEditing ? (
                        <TextField
                          fullWidth
                          variant="outlined"
                          size="small"
                          value={userData.policyNumber}
                          onChange={(e) => setUserData({ ...userData, policyNumber: e.target.value })}
                          sx={{ mt: 1 }}
                        />
                      ) : (
                        <Typography variant="body1" fontWeight={500}>
                          {userData.policyNumber}
                        </Typography>
                      )}
                    </Box>
                    
                    <Alert severity="info">
                      Please keep your insurance information up to date to ensure smooth processing of your medical claims.
                    </Alert>
                  </Stack>
                </CardContent>
              </Card>
            )}
          </Grid>
        </Grid>
      </Paper>
      
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        message={snackbar.message}
      />
    </Container>
  );
} 