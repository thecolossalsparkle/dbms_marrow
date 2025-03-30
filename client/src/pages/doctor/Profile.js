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
  Snackbar
} from '@mui/material';
import {
  Edit,
  Save,
  Add,
  Delete,
  EmailOutlined,
  PhoneOutlined,
  LocationOnOutlined,
  WorkOutlineOutlined,
  SchoolOutlined,
  EventNoteOutlined,
  LanguageOutlined
} from '@mui/icons-material';
import { useAuth } from '../../contexts/AuthContext';

const educationData = [
  {
    degree: 'Doctor of Medicine',
    institution: 'Harvard Medical School',
    year: '2012 - 2016'
  },
  {
    degree: 'Residency in Internal Medicine',
    institution: 'Massachusetts General Hospital',
    year: '2016 - 2019'
  },
  {
    degree: 'Fellowship in Cardiology',
    institution: 'Johns Hopkins Hospital',
    year: '2019 - 2022'
  }
];

const experienceData = [
  {
    position: 'Senior Cardiologist',
    institution: 'Cleveland Clinic',
    year: '2022 - Present'
  },
  {
    position: 'Cardiology Fellow',
    institution: 'Johns Hopkins Hospital',
    year: '2019 - 2022'
  },
  {
    position: 'Resident Physician',
    institution: 'Massachusetts General Hospital',
    year: '2016 - 2019'
  }
];

export default function DoctorProfile() {
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
    name: currentUser?.name || 'Dr. John Smith',
    email: currentUser?.email || 'john.smith@example.com',
    phone: '+1 (555) 123-4567',
    specialty: 'Cardiology',
    languages: ['English', 'Spanish', 'French'],
    address: '123 Medical Center Blvd, Boston, MA 02115',
    bio: 'Board-certified cardiologist with over 10 years of experience specializing in preventive cardiology and heart failure management. Committed to providing compassionate care with a focus on improving patient outcomes through personalized treatment plans and patient education.',
    licenseNumber: 'MD12345678',
    availabilityHours: 'Mon-Fri: 9AM-5PM',
    education: educationData,
    experience: experienceData,
    avatar: currentUser?.avatar || 'https://randomuser.me/api/portraits/men/36.jpg'
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
          <Typography variant="h4">Doctor Profile</Typography>
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
                  <Typography color="text.secondary" variant="subtitle1" gutterBottom>
                    {isEditing ? (
                      <TextField
                        fullWidth
                        variant="standard"
                        label="Specialty"
                        value={userData.specialty}
                        onChange={(e) => setUserData({ ...userData, specialty: e.target.value })}
                      />
                    ) : (
                      userData.specialty
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
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <EventNoteOutlined sx={{ mr: 1, color: 'primary.main' }} />
                      {isEditing ? (
                        <TextField
                          fullWidth
                          variant="standard"
                          label="Availability"
                          value={userData.availabilityHours}
                          onChange={(e) => setUserData({ ...userData, availabilityHours: e.target.value })}
                        />
                      ) : (
                        <Typography variant="body2">{userData.availabilityHours}</Typography>
                      )}
                    </Box>
                  </Stack>
                </CardContent>
              </Card>
              
              <Card variant="outlined" sx={{ width: '100%' }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Languages
                  </Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                    {userData.languages.map((language, index) => (
                      <Chip 
                        key={index}
                        label={language}
                        onDelete={isEditing ? () => {
                          setUserData({
                            ...userData,
                            languages: userData.languages.filter((_, i) => i !== index)
                          });
                        } : undefined}
                      />
                    ))}
                    {isEditing && (
                      <IconButton 
                        color="primary" 
                        size="small"
                        onClick={() => {
                          const newLanguage = prompt('Add a language');
                          if (newLanguage) {
                            setUserData({
                              ...userData,
                              languages: [...userData.languages, newLanguage]
                            });
                          }
                        }}
                      >
                        <Add />
                      </IconButton>
                    )}
                  </Box>
                </CardContent>
              </Card>
            </Box>
          </Grid>

          {/* Detailed Information */}
          <Grid item xs={12} md={8}>
            <Card variant="outlined" sx={{ mb: 3 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  About Me
                </Typography>
                {isEditing ? (
                  <TextField
                    fullWidth
                    multiline
                    rows={4}
                    variant="outlined"
                    label="Bio"
                    value={userData.bio}
                    onChange={(e) => setUserData({ ...userData, bio: e.target.value })}
                  />
                ) : (
                  <Typography variant="body1" paragraph>
                    {userData.bio}
                  </Typography>
                )}
              </CardContent>
            </Card>

            <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
              <Tabs 
                value={tabValue} 
                onChange={handleTabChange}
                variant="fullWidth"
                sx={{ mb: 1 }}
              >
                <Tab label="Education" />
                <Tab label="Experience" />
                <Tab label="License & Certifications" />
              </Tabs>
            </Box>

            {/* Education Tab */}
            {tabValue === 0 && (
              <Card variant="outlined">
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                    <Typography variant="h6">Education</Typography>
                    {isEditing && (
                      <Button 
                        startIcon={<Add />} 
                        size="small" 
                        onClick={() => {
                          // Add education logic
                          alert('Add education functionality would go here');
                        }}
                      >
                        Add
                      </Button>
                    )}
                  </Box>
                  {userData.education.map((edu, index) => (
                    <Box key={index} sx={{ mb: 3 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Box>
                          <Typography variant="subtitle1" fontWeight={600}>
                            {isEditing ? (
                              <TextField
                                variant="standard"
                                value={edu.degree}
                                onChange={(e) => {
                                  const newEdu = [...userData.education];
                                  newEdu[index].degree = e.target.value;
                                  setUserData({ ...userData, education: newEdu });
                                }}
                              />
                            ) : (
                              edu.degree
                            )}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {isEditing ? (
                              <TextField
                                variant="standard"
                                value={edu.institution}
                                onChange={(e) => {
                                  const newEdu = [...userData.education];
                                  newEdu[index].institution = e.target.value;
                                  setUserData({ ...userData, education: newEdu });
                                }}
                              />
                            ) : (
                              edu.institution
                            )}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {isEditing ? (
                              <TextField
                                variant="standard"
                                value={edu.year}
                                onChange={(e) => {
                                  const newEdu = [...userData.education];
                                  newEdu[index].year = e.target.value;
                                  setUserData({ ...userData, education: newEdu });
                                }}
                              />
                            ) : (
                              edu.year
                            )}
                          </Typography>
                        </Box>
                        {isEditing && (
                          <IconButton 
                            color="error" 
                            onClick={() => {
                              setUserData({
                                ...userData,
                                education: userData.education.filter((_, i) => i !== index)
                              });
                            }}
                          >
                            <Delete />
                          </IconButton>
                        )}
                      </Box>
                      {index < userData.education.length - 1 && <Divider sx={{ my: 2 }} />}
                    </Box>
                  ))}
                </CardContent>
              </Card>
            )}

            {/* Experience Tab */}
            {tabValue === 1 && (
              <Card variant="outlined">
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                    <Typography variant="h6">Work Experience</Typography>
                    {isEditing && (
                      <Button 
                        startIcon={<Add />} 
                        size="small" 
                        onClick={() => {
                          // Add experience logic
                          alert('Add experience functionality would go here');
                        }}
                      >
                        Add
                      </Button>
                    )}
                  </Box>
                  {userData.experience.map((exp, index) => (
                    <Box key={index} sx={{ mb: 3 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Box>
                          <Typography variant="subtitle1" fontWeight={600}>
                            {isEditing ? (
                              <TextField
                                variant="standard"
                                value={exp.position}
                                onChange={(e) => {
                                  const newExp = [...userData.experience];
                                  newExp[index].position = e.target.value;
                                  setUserData({ ...userData, experience: newExp });
                                }}
                              />
                            ) : (
                              exp.position
                            )}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {isEditing ? (
                              <TextField
                                variant="standard"
                                value={exp.institution}
                                onChange={(e) => {
                                  const newExp = [...userData.experience];
                                  newExp[index].institution = e.target.value;
                                  setUserData({ ...userData, experience: newExp });
                                }}
                              />
                            ) : (
                              exp.institution
                            )}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {isEditing ? (
                              <TextField
                                variant="standard"
                                value={exp.year}
                                onChange={(e) => {
                                  const newExp = [...userData.experience];
                                  newExp[index].year = e.target.value;
                                  setUserData({ ...userData, experience: newExp });
                                }}
                              />
                            ) : (
                              exp.year
                            )}
                          </Typography>
                        </Box>
                        {isEditing && (
                          <IconButton 
                            color="error" 
                            onClick={() => {
                              setUserData({
                                ...userData,
                                experience: userData.experience.filter((_, i) => i !== index)
                              });
                            }}
                          >
                            <Delete />
                          </IconButton>
                        )}
                      </Box>
                      {index < userData.experience.length - 1 && <Divider sx={{ my: 2 }} />}
                    </Box>
                  ))}
                </CardContent>
              </Card>
            )}

            {/* License Tab */}
            {tabValue === 2 && (
              <Card variant="outlined">
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    License & Certifications
                  </Typography>
                  <Stack spacing={3}>
                    <Box>
                      <Typography variant="subtitle1" fontWeight={600}>
                        Medical License
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                        <Typography variant="body2" sx={{ mr: 2 }}>License Number:</Typography>
                        {isEditing ? (
                          <TextField
                            variant="standard"
                            value={userData.licenseNumber}
                            onChange={(e) => setUserData({ ...userData, licenseNumber: e.target.value })}
                          />
                        ) : (
                          <Typography variant="body2" color="text.secondary">
                            {userData.licenseNumber}
                          </Typography>
                        )}
                      </Box>
                    </Box>
                    <Alert severity="info">
                      Your license and certifications are verified and up to date.
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