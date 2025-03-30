import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box, Typography, Paper, Grid, Card, CardContent, CardMedia,
  CardActions, Button, TextField, InputAdornment, Chip, Rating,
  FormControl, InputLabel, Select, MenuItem, Pagination, Avatar,
  List, ListItem, ListItemIcon, ListItemText, Divider, Stack,
  CircularProgress
} from '@mui/material';
import {
  Search, FilterList, AccessTime, Language, 
  LocalHospital, Star, Verified
} from '@mui/icons-material';
import patientService from '../../services/patient.service';

export default function DoctorList() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [specializationFilter, setSpecializationFilter] = useState('All Specializations');
  const [languageFilter, setLanguageFilter] = useState('All Languages');
  const [availabilityFilter, setAvailabilityFilter] = useState('Any time');
  const [page, setPage] = useState(1);
  const [rowsPerPage] = useState(4);
  
  // Add state for dynamic data
  const [doctorsData, setDoctorsData] = useState([]);
  const [specializations, setSpecializations] = useState(["All Specializations"]);
  const [languages, setLanguages] = useState(["All Languages"]);
  const [availabilityOptions, setAvailabilityOptions] = useState(["Any time"]);
  const [loading, setLoading] = useState({
    doctors: true,
    specializations: true,
    languages: true,
    availability: true
  });
  const [error, setError] = useState({
    doctors: null,
    specializations: null,
    languages: null,
    availability: null
  });
  
  // Fetch data on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch doctors list
        const doctorsResponse = await patientService.getDoctorsList();
        setDoctorsData(doctorsResponse.data);
        setLoading(prev => ({ ...prev, doctors: false }));
        
        // Fetch specializations
        const specializationsResponse = await patientService.getSpecializations();
        setSpecializations(["All Specializations", ...specializationsResponse.data]);
        setLoading(prev => ({ ...prev, specializations: false }));
        
        // Fetch languages
        const languagesResponse = await patientService.getLanguages();
        setLanguages(["All Languages", ...languagesResponse.data]);
        setLoading(prev => ({ ...prev, languages: false }));
        
        // Fetch availability options
        const availabilityResponse = await patientService.getAvailabilityOptions();
        setAvailabilityOptions(["Any time", ...availabilityResponse.data]);
        setLoading(prev => ({ ...prev, availability: false }));
      } catch (err) {
        console.error('Error fetching data:', err);
        setError({
          doctors: 'Failed to load doctors. Please try again later.',
          specializations: 'Failed to load specializations. Please try again later.',
          languages: 'Failed to load languages. Please try again later.',
          availability: 'Failed to load availability options. Please try again later.'
        });
        setLoading({
          doctors: false,
          specializations: false,
          languages: false,
          availability: false
        });
      }
    };
    
    fetchData();
  }, []);

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  // Filter doctors
  const filteredDoctors = doctorsData.filter(doctor => {
    const matchesSearch = doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doctor.specialization.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doctor.hospital.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesSpecialization = specializationFilter === 'All Specializations' || 
                                 doctor.specialization === specializationFilter;
    
    const matchesLanguage = languageFilter === 'All Languages' || 
                           doctor.languages.includes(languageFilter);
    
    let matchesAvailability = true;
    if (availabilityFilter === 'Available today') {
      matchesAvailability = doctor.availability.includes('today');
    } else if (availabilityFilter === 'Available tomorrow') {
      matchesAvailability = doctor.availability.includes('tomorrow');
    } else if (availabilityFilter === 'This week') {
      matchesAvailability = !doctor.availability.includes('next week');
    }
    
    return matchesSearch && matchesSpecialization && matchesLanguage && matchesAvailability;
  });

  // Pagination
  const paginatedDoctors = filteredDoctors.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  // Get initials from name for avatar
  const getInitials = (name) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase();
  };

  // Loading indicator
  if (loading.doctors || loading.specializations || loading.languages || loading.availability) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          Find Doctors
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          Search and connect with specialists for your health needs.
        </Typography>
      </Box>

      {/* Search and Filters */}
      <Paper sx={{ p: 2, mb: 3 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              placeholder="Search by name, specialty, or hospital"
              variant="outlined"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12} sm={4} md={2}>
            <FormControl fullWidth>
              <InputLabel id="specialization-filter-label">Specialization</InputLabel>
              <Select
                labelId="specialization-filter-label"
                id="specialization-filter"
                value={specializationFilter}
                label="Specialization"
                onChange={(e) => setSpecializationFilter(e.target.value)}
              >
                {specializations.map((specialization) => (
                  <MenuItem key={specialization} value={specialization}>
                    {specialization}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={4} md={2}>
            <FormControl fullWidth>
              <InputLabel id="language-filter-label">Language</InputLabel>
              <Select
                labelId="language-filter-label"
                id="language-filter"
                value={languageFilter}
                label="Language"
                onChange={(e) => setLanguageFilter(e.target.value)}
              >
                {languages.map((language) => (
                  <MenuItem key={language} value={language}>
                    {language}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={4} md={2}>
            <FormControl fullWidth>
              <InputLabel id="availability-filter-label">Availability</InputLabel>
              <Select
                labelId="availability-filter-label"
                id="availability-filter"
                value={availabilityFilter}
                label="Availability"
                onChange={(e) => setAvailabilityFilter(e.target.value)}
              >
                {availabilityOptions.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Paper>

      {/* Doctor Cards */}
      <Box>
        {filteredDoctors.length > 0 ? (
          <>
            <Grid container spacing={3}>
              {paginatedDoctors.map((doctor) => (
                <Grid item xs={12} key={doctor.id}>
                  <Card sx={{ display: { xs: 'block', md: 'flex' }, position: 'relative' }}>
                    {doctor.rating >= 4.8 && (
                      <Chip
                        icon={<Verified />}
                        label="Top Rated"
                        color="primary"
                        size="small"
                        sx={{
                          position: 'absolute',
                          top: 10,
                          right: 10,
                          zIndex: 1
                        }}
                      />
                    )}
                    <Box sx={{ 
                      display: 'flex', 
                      justifyContent: 'center', 
                      alignItems: 'center',
                      p: 2,
                      width: { xs: '100%', md: '200px' } 
                    }}>
                      <Avatar 
                        sx={{ 
                          width: 120, 
                          height: 120, 
                          fontSize: '2.5rem',
                          bgcolor: 'primary.main'
                        }}
                      >
                        {getInitials(doctor.name)}
                      </Avatar>
                    </Box>
                    <CardContent sx={{ flex: '1 0 auto', p: 3 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap' }}>
                        <Box>
                          <Typography variant="h5" component="div" gutterBottom>
                            {doctor.name}
                          </Typography>
                          <Typography variant="subtitle1" color="text.secondary" gutterBottom>
                            {doctor.specialization} • {doctor.experience} years experience
                          </Typography>
                          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                            <Rating 
                              value={doctor.rating} 
                              precision={0.1} 
                              readOnly 
                              size="small"
                            />
                            <Typography variant="body2" sx={{ ml: 1 }}>
                              {doctor.rating} ({doctor.reviewCount} reviews)
                            </Typography>
                          </Box>
                        </Box>
                        <Box>
                          <Chip 
                            icon={<AccessTime fontSize="small" />}
                            label={doctor.availability}
                            variant="outlined"
                            color="primary"
                            size="small"
                            sx={{ mb: 1 }}
                          />
                        </Box>
                      </Box>
                      
                      <Divider sx={{ my: 2 }} />
                      
                      <Grid container spacing={2}>
                        <Grid item xs={12} md={7}>
                          <Typography variant="body2" paragraph>
                            {doctor.about}
                          </Typography>
                          <Stack direction="row" spacing={1} sx={{ mb: 1 }}>
                            {doctor.languages.map((language) => (
                              <Chip 
                                key={language}
                                icon={<Language fontSize="small" />}
                                label={language}
                                size="small"
                                variant="outlined"
                              />
                            ))}
                          </Stack>
                        </Grid>
                        <Grid item xs={12} md={5}>
                          <List dense>
                            <ListItem>
                              <ListItemIcon sx={{ minWidth: 36 }}>
                                <LocalHospital fontSize="small" />
                              </ListItemIcon>
                              <ListItemText 
                                primary={doctor.hospital}
                                primaryTypographyProps={{ variant: 'body2' }}
                              />
                            </ListItem>
                            <ListItem>
                              <ListItemIcon sx={{ minWidth: 36 }}>
                                <Star fontSize="small" />
                              </ListItemIcon>
                              <ListItemText 
                                primary={doctor.education}
                                primaryTypographyProps={{ variant: 'body2' }}
                              />
                            </ListItem>
                            <ListItem>
                              <ListItemIcon sx={{ minWidth: 36 }}>
                                <AccessTime fontSize="small" />
                              </ListItemIcon>
                              <ListItemText 
                                primary={`Next available: ${doctor.nextAvailable}`}
                                primaryTypographyProps={{ variant: 'body2' }}
                              />
                            </ListItem>
                          </List>
                        </Grid>
                      </Grid>
                    </CardContent>
                    <CardActions sx={{ p: 2, justifyContent: { xs: 'center', md: 'flex-end' }, flexDirection: { xs: 'column', sm: 'row' }, gap: 1 }}>
                      <Typography variant="subtitle1" color="primary.main" sx={{ fontWeight: 'bold' }}>
                        {doctor.consultationFee}/session
                      </Typography>
                      <Button 
                        variant="outlined" 
                        onClick={() => navigate(`/patient/doctors/${doctor.id}`)}
                      >
                        View Profile
                      </Button>
                      <Button 
                        variant="contained"
                        onClick={() => navigate(`/patient/booking/${doctor.id}`)}
                      >
                        Book Appointment
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
            
            <Box sx={{ mt: 3, display: 'flex', justifyContent: 'center' }}>
              <Pagination
                count={Math.ceil(filteredDoctors.length / rowsPerPage)}
                page={page}
                onChange={handlePageChange}
                color="primary"
              />
            </Box>
          </>
        ) : (
          <Paper sx={{ p: 4, textAlign: 'center' }}>
            <Typography variant="h6" gutterBottom>
              No doctors found matching your criteria
            </Typography>
            <Typography variant="body1" color="text.secondary" paragraph>
              Try adjusting your filters or search term to see more results.
            </Typography>
            <Button 
              variant="contained"
              onClick={() => {
                setSearchTerm('');
                setSpecializationFilter('All Specializations');
                setLanguageFilter('All Languages');
                setAvailabilityFilter('Any time');
              }}
            >
              Clear Filters
            </Button>
          </Paper>
        )}
      </Box>
    </Box>
  );
} 