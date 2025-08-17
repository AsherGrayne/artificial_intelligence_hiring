import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert,
  CircularProgress,
  Snackbar,
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Visibility as ViewIcon,
  Search as SearchIcon,
} from '@mui/icons-material';
import { candidatesService } from '../firebase/services';

const Candidates = () => {
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openViewDialog, setOpenViewDialog] = useState(false);
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  const [newCandidate, setNewCandidate] = useState({
    name: '',
    email: '',
    phone: '',
    experience: '',
    education: '',
    location: '',
    skills: '',
    resumeText: '',
    status: 'active'
  });

  // Load candidates from Firebase
  useEffect(() => {
    loadCandidates();
  }, []);

  const loadCandidates = async () => {
    try {
      setLoading(true);
      const data = await candidatesService.getAll();
      setCandidates(data);
    } catch (error) {
      console.error('Error loading candidates:', error);
      showSnackbar('Error loading candidates', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleAddCandidate = () => {
    setNewCandidate({
      name: '',
      email: '',
      phone: '',
      experience: '',
      education: '',
      location: '',
      skills: '',
      resumeText: '',
      status: 'active'
    });
    setOpenAddDialog(true);
  };

  const handleEditCandidate = (candidate) => {
    setSelectedCandidate(candidate);
    setNewCandidate({
      name: candidate.name || '',
      email: candidate.email || '',
      phone: candidate.phone || '',
      experience: candidate.experience || '',
      education: candidate.education || '',
      location: candidate.location || '',
      skills: candidate.skills ? candidate.skills.join(', ') : '',
      resumeText: candidate.resumeText || '',
      status: candidate.status || 'active'
    });
    setOpenEditDialog(true);
  };

  const handleViewCandidate = (candidate) => {
    setSelectedCandidate(candidate);
    setOpenViewDialog(true);
  };

  const handleDeleteCandidate = async (candidateId) => {
    if (window.confirm('Are you sure you want to delete this candidate?')) {
      try {
        await candidatesService.delete(candidateId);
        showSnackbar('Candidate deleted successfully', 'success');
        loadCandidates(); // Reload the list
      } catch (error) {
        console.error('Error deleting candidate:', error);
        showSnackbar('Error deleting candidate', 'error');
      }
    }
  };

  const handleSubmitNewCandidate = async () => {
    try {
      const candidateData = {
        ...newCandidate,
        skills: newCandidate.skills.split(',').map(skill => skill.trim()).filter(skill => skill)
      };

      await candidatesService.add(candidateData);
      showSnackbar('Candidate added successfully', 'success');
      setOpenAddDialog(false);
      loadCandidates(); // Reload the list
    } catch (error) {
      console.error('Error adding candidate:', error);
      showSnackbar('Error adding candidate', 'error');
    }
  };

  const handleSubmitEditCandidate = async () => {
    try {
      const candidateData = {
        ...newCandidate,
        skills: newCandidate.skills.split(',').map(skill => skill.trim()).filter(skill => skill)
      };

      await candidatesService.update(selectedCandidate.id, candidateData);
      showSnackbar('Candidate updated successfully', 'success');
      setOpenEditDialog(false);
      loadCandidates(); // Reload the list
    } catch (error) {
      console.error('Error updating candidate:', error);
      showSnackbar('Error updating candidate', 'error');
    }
  };

  const showSnackbar = (message, severity = 'success') => {
    setSnackbar({ open: true, message, severity });
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  // Filter candidates based on search and status
  const filteredCandidates = candidates.filter(candidate => {
    const matchesSearch = candidate.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         candidate.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         candidate.skills?.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesStatus = filterStatus === 'all' || candidate.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4">
          Candidates Management
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleAddCandidate}
        >
          Add Candidate
        </Button>
      </Box>

      {/* Search and Filters */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                placeholder="Search candidates by name, email, or skills..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                InputProps={{
                  startAdornment: <SearchIcon sx={{ mr: 1, color: 'text.secondary' }} />,
                }}
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <FormControl fullWidth>
                <InputLabel>Status</InputLabel>
                <Select
                  value={filterStatus}
                  label="Status"
                  onChange={(e) => setFilterStatus(e.target.value)}
                >
                  <MenuItem value="all">All Status</MenuItem>
                  <MenuItem value="active">Active</MenuItem>
                  <MenuItem value="inactive">Inactive</MenuItem>
                  <MenuItem value="shortlisted">Shortlisted</MenuItem>
                  <MenuItem value="hired">Hired</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={3}>
              <Typography variant="body2" color="text.secondary">
                {filteredCandidates.length} candidates found
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Candidates Table */}
      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom sx={{ mb: 2 }}>
            Candidates ({filteredCandidates.length})
          </Typography>
          
          <TableContainer component={Paper} variant="outlined">
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Phone</TableCell>
                  <TableCell>Experience</TableCell>
                  <TableCell>Skills</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredCandidates.map((candidate) => (
                  <TableRow key={candidate.id}>
                    <TableCell>
                      <Typography variant="body2" fontWeight="medium">
                        {candidate.name}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">
                        {candidate.email}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">
                        {candidate.phone}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">
                        {candidate.experience}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                        {candidate.skills?.slice(0, 3).map((skill, index) => (
                          <Chip
                            key={index}
                            label={skill}
                            size="small"
                            variant="outlined"
                          />
                        ))}
                        {candidate.skills?.length > 3 && (
                          <Chip
                            label={`+${candidate.skills.length - 3}`}
                            size="small"
                            variant="outlined"
                          />
                        )}
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={candidate.status}
                        color={candidate.status === 'active' ? 'success' : 
                               candidate.status === 'shortlisted' ? 'warning' :
                               candidate.status === 'hired' ? 'primary' : 'default'}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', gap: 0.5 }}>
                        <Tooltip title="View Details">
                          <IconButton
                            size="small"
                            onClick={() => handleViewCandidate(candidate)}
                          >
                            <ViewIcon />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Edit">
                          <IconButton
                            size="small"
                            onClick={() => handleEditCandidate(candidate)}
                          >
                            <EditIcon />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Delete">
                          <IconButton
                            size="small"
                            color="error"
                            onClick={() => handleDeleteCandidate(candidate.id)}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </Tooltip>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>

      {/* Add Candidate Dialog */}
      <Dialog open={openAddDialog} onClose={() => setOpenAddDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle>Add New Candidate</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Name"
                value={newCandidate.name}
                onChange={(e) => setNewCandidate({...newCandidate, name: e.target.value})}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Email"
                type="email"
                value={newCandidate.email}
                onChange={(e) => setNewCandidate({...newCandidate, email: e.target.value})}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Phone"
                value={newCandidate.phone}
                onChange={(e) => setNewCandidate({...newCandidate, phone: e.target.value})}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Experience"
                value={newCandidate.experience}
                onChange={(e) => setNewCandidate({...newCandidate, experience: e.target.value})}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Education"
                value={newCandidate.education}
                onChange={(e) => setNewCandidate({...newCandidate, education: e.target.value})}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Location"
                value={newCandidate.location}
                onChange={(e) => setNewCandidate({...newCandidate, location: e.target.value})}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Skills"
                value={newCandidate.skills}
                onChange={(e) => setNewCandidate({...newCandidate, skills: e.target.value})}
                placeholder="Enter skills separated by commas"
                helperText="e.g., JavaScript, React, Node.js"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Resume Text"
                multiline
                rows={4}
                value={newCandidate.resumeText}
                onChange={(e) => setNewCandidate({...newCandidate, resumeText: e.target.value})}
                placeholder="Paste resume text here for AI analysis..."
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenAddDialog(false)}>Cancel</Button>
          <Button 
            onClick={handleSubmitNewCandidate} 
            variant="contained"
            disabled={!newCandidate.name || !newCandidate.email}
          >
            Add Candidate
          </Button>
        </DialogActions>
      </Dialog>

      {/* Edit Candidate Dialog */}
      <Dialog open={openEditDialog} onClose={() => setOpenEditDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle>Edit Candidate</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Name"
                value={newCandidate.name}
                onChange={(e) => setNewCandidate({...newCandidate, name: e.target.value})}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Email"
                type="email"
                value={newCandidate.email}
                onChange={(e) => setNewCandidate({...newCandidate, email: e.target.value})}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Phone"
                value={newCandidate.phone}
                onChange={(e) => setNewCandidate({...newCandidate, phone: e.target.value})}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Experience"
                value={newCandidate.experience}
                onChange={(e) => setNewCandidate({...newCandidate, experience: e.target.value})}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Education"
                value={newCandidate.education}
                onChange={(e) => setNewCandidate({...newCandidate, education: e.target.value})}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Location"
                value={newCandidate.location}
                onChange={(e) => setNewCandidate({...newCandidate, location: e.target.value})}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Skills"
                value={newCandidate.skills}
                onChange={(e) => setNewCandidate({...newCandidate, skills: e.target.value})}
                placeholder="Enter skills separated by commas"
                helperText="e.g., JavaScript, React, Node.js"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Resume Text"
                multiline
                rows={4}
                value={newCandidate.resumeText}
                onChange={(e) => setNewCandidate({...newCandidate, resumeText: e.target.value})}
                placeholder="Paste resume text here for AI analysis..."
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenEditDialog(false)}>Cancel</Button>
          <Button 
            onClick={handleSubmitEditCandidate} 
            variant="contained"
            disabled={!newCandidate.name || !newCandidate.email}
          >
            Update Candidate
          </Button>
        </DialogActions>
      </Dialog>

      {/* View Candidate Dialog */}
      <Dialog open={openViewDialog} onClose={() => setOpenViewDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle>
          Candidate Details - {selectedCandidate?.name}
        </DialogTitle>
        <DialogContent>
          {selectedCandidate && (
            <Grid container spacing={3} sx={{ mt: 1 }}>
              <Grid item xs={12} md={6}>
                <Typography variant="h6" gutterBottom>
                  Personal Information
                </Typography>
                <Typography variant="body2" paragraph>
                  <strong>Name:</strong> {selectedCandidate.name}
                </Typography>
                <Typography variant="body2" paragraph>
                  <strong>Email:</strong> {selectedCandidate.email}
                </Typography>
                <Typography variant="body2" paragraph>
                  <strong>Phone:</strong> {selectedCandidate.phone}
                </Typography>
                <Typography variant="body2" paragraph>
                  <strong>Location:</strong> {selectedCandidate.location}
                </Typography>
              </Grid>
              
              <Grid item xs={12} md={6}>
                <Typography variant="h6" gutterBottom>
                  Professional Details
                </Typography>
                <Typography variant="body2" paragraph>
                  <strong>Experience:</strong> {selectedCandidate.experience}
                </Typography>
                <Typography variant="body2" paragraph>
                  <strong>Education:</strong> {selectedCandidate.education}
                </Typography>
                <Typography variant="body2" paragraph>
                  <strong>Status:</strong> 
                  <Chip
                    label={selectedCandidate.status}
                    color={selectedCandidate.status === 'active' ? 'success' : 
                           selectedCandidate.status === 'shortlisted' ? 'warning' :
                           selectedCandidate.status === 'hired' ? 'primary' : 'default'}
                    size="small"
                    sx={{ ml: 1 }}
                  />
                </Typography>
              </Grid>

              <Grid item xs={12}>
                <Typography variant="h6" gutterBottom>
                  Skills
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  {selectedCandidate.skills?.map((skill, index) => (
                    <Chip
                      key={index}
                      label={skill}
                      variant="outlined"
                      color="primary"
                    />
                  ))}
                </Box>
              </Grid>

              {selectedCandidate.resumeText && (
                <Grid item xs={12}>
                  <Typography variant="h6" gutterBottom>
                    Resume Text
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {selectedCandidate.resumeText}
                  </Typography>
                </Grid>
              )}
            </Grid>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenViewDialog(false)}>Close</Button>
          <Button 
            variant="contained"
            onClick={() => {
              setOpenViewDialog(false);
              handleEditCandidate(selectedCandidate);
            }}
          >
            Edit
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Candidates;
