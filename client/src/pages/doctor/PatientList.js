import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box, Typography, Paper, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, TextField, InputAdornment, Grid, Button, Chip,
  Select, MenuItem, FormControl, InputLabel, Pagination, IconButton,
  TableSortLabel, Tooltip
} from '@mui/material';
import {
  Search, FilterList, PersonAdd, MoreVert, 
  Circle, Star, StarBorder
} from '@mui/icons-material';

// Initialize empty patients data - will be populated from API
const patientsData = [];

export default function PatientList() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [severityFilter, setSeverityFilter] = useState('all');
  const [orderBy, setOrderBy] = useState('lastConsultation');
  const [order, setOrder] = useState('desc');
  const [page, setPage] = useState(1);
  const [rowsPerPage] = useState(5);
  const [favoritePatients, setFavoritePatients] = useState(
    patientsData.filter(patient => patient.favorite).map(patient => patient.id)
  );

  const getSeverityColor = (severity) => {
    switch (severity.toLowerCase()) {
      case 'high':
        return 'error';
      case 'medium':
        return 'warning';
      case 'low':
        return 'success';
      default:
        return 'default';
    }
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const handleSort = (property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const handleFavoriteToggle = (patientId) => {
    setFavoritePatients(prev => 
      prev.includes(patientId) 
        ? prev.filter(id => id !== patientId) 
        : [...prev, patientId]
    );
  };

  // Filter and sort patients
  const filteredPatients = patientsData.filter(patient => {
    const matchesSearch = patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         patient.condition.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesSeverity = severityFilter === 'all' || 
                           patient.severity.toLowerCase() === severityFilter.toLowerCase();
    
    return matchesSearch && matchesSeverity;
  });

  const sortedPatients = filteredPatients.sort((a, b) => {
    if (orderBy === 'name') {
      return order === 'asc'
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name);
    } else if (orderBy === 'age') {
      return order === 'asc' ? a.age - b.age : b.age - a.age;
    } else if (orderBy === 'lastConsultation') {
      return order === 'asc'
        ? new Date(a.lastConsultation) - new Date(b.lastConsultation)
        : new Date(b.lastConsultation) - new Date(a.lastConsultation);
    } else if (orderBy === 'severity') {
      const severityMap = { 'high': 3, 'medium': 2, 'low': 1 };
      return order === 'asc'
        ? severityMap[a.severity.toLowerCase()] - severityMap[b.severity.toLowerCase()]
        : severityMap[b.severity.toLowerCase()] - severityMap[a.severity.toLowerCase()];
    }
    return 0;
  });

  // Pagination
  const paginatedPatients = sortedPatients.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  return (
    <Box>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          Patients
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          Manage and monitor your patient list.
        </Typography>
      </Box>

      {/* Search and Filters */}
      <Paper sx={{ p: 2, mb: 3 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              placeholder="Search by name or condition"
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
          <Grid item xs={12} md={3}>
            <FormControl fullWidth>
              <InputLabel id="severity-filter-label">Severity Filter</InputLabel>
              <Select
                labelId="severity-filter-label"
                id="severity-filter"
                value={severityFilter}
                label="Severity Filter"
                onChange={(e) => setSeverityFilter(e.target.value)}
                startAdornment={
                  <InputAdornment position="start">
                    <FilterList />
                  </InputAdornment>
                }
              >
                <MenuItem value="all">All Severities</MenuItem>
                <MenuItem value="high">High</MenuItem>
                <MenuItem value="medium">Medium</MenuItem>
                <MenuItem value="low">Low</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={5} sx={{ display: 'flex', justifyContent: { xs: 'flex-start', md: 'flex-end' } }}>
            <Button
              variant="contained"
              startIcon={<PersonAdd />}
              onClick={() => navigate('/doctor/add-patient')}
            >
              Add New Patient
            </Button>
          </Grid>
        </Grid>
      </Paper>

      {/* Patient Table */}
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="patient table">
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                <Typography variant="subtitle2">Fav</Typography>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={orderBy === 'name'}
                  direction={orderBy === 'name' ? order : 'asc'}
                  onClick={() => handleSort('name')}
                >
                  <Typography variant="subtitle2">Patient Name</Typography>
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={orderBy === 'age'}
                  direction={orderBy === 'age' ? order : 'asc'}
                  onClick={() => handleSort('age')}
                >
                  <Typography variant="subtitle2">Age/Gender</Typography>
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle2">Contact</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle2">Condition</Typography>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={orderBy === 'severity'}
                  direction={orderBy === 'severity' ? order : 'asc'}
                  onClick={() => handleSort('severity')}
                >
                  <Typography variant="subtitle2">Severity</Typography>
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={orderBy === 'lastConsultation'}
                  direction={orderBy === 'lastConsultation' ? order : 'asc'}
                  onClick={() => handleSort('lastConsultation')}
                >
                  <Typography variant="subtitle2">Last Consultation</Typography>
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle2">Actions</Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedPatients.length > 0 ? (
              paginatedPatients.map((patient) => (
                <TableRow
                  key={patient.id}
                  hover
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell padding="checkbox">
                    <IconButton 
                      onClick={() => handleFavoriteToggle(patient.id)}
                      color="primary"
                    >
                      {favoritePatients.includes(patient.id) ? <Star /> : <StarBorder />}
                    </IconButton>
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Typography variant="body1" sx={{ fontWeight: 500 }}>
                        {patient.name}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    {patient.age} / {patient.gender.charAt(0)}
                  </TableCell>
                  <TableCell>{patient.contactInfo}</TableCell>
                  <TableCell>{patient.condition}</TableCell>
                  <TableCell>
                    <Chip
                      size="small"
                      label={patient.severity}
                      color={getSeverityColor(patient.severity)}
                      icon={<Circle sx={{ fontSize: 10 }} />}
                    />
                  </TableCell>
                  <TableCell>{formatDate(patient.lastConsultation)}</TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex' }}>
                      <Button 
                        variant="contained" 
                        size="small"
                        onClick={() => navigate(`/doctor/patients/${patient.id}`)}
                      >
                        View
                      </Button>
                      <Tooltip title="More options">
                        <IconButton>
                          <MoreVert />
                        </IconButton>
                      </Tooltip>
                    </Box>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={8} align="center">
                  <Typography variant="body1" sx={{ py: 2 }}>
                    No patients found.
                  </Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        <Box sx={{ p: 2, display: 'flex', justifyContent: 'center' }}>
          <Pagination
            count={Math.ceil(filteredPatients.length / rowsPerPage)}
            page={page}
            onChange={handlePageChange}
            color="primary"
          />
        </Box>
      </TableContainer>
    </Box>
  );
} 