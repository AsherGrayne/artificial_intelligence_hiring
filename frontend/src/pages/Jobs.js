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
  Work as WorkIcon,
} from '@mui/icons-material';
import { jobsService } from '../firebase/services';

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openViewDialog, setOpenViewDialog] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDepartment, setFilterDepartment] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  const [newJob, setNewJob] = useState({
    title: '',
    company: '',
    department: '',
    location: '',
    requiredSkills: '',
    experience: '',
    education: '',
    description: '',
    status: 'active'
  });

  // Load jobs from Firebase
  useEffect(() => {
    loadJobs();
  }, []);

  const loadJobs = async () => {
    try {
      setLoading(true);
      const data = await jobsService.getAll();
      setJobs(data);
    } catch (error) {
      console.error('Error loading jobs:', error);
      showSnackbar('Error loading jobs', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleAddJob = () => {
    setNewJob({
      title: '',
      company: '',
      department: '',
      location: '',
      requiredSkills: '',
      experience: '',
      education: '',
      description: '',
      status: 'active'
    });
    setOpenAddDialog(true);
  };

  const handleEditJob = (job) => {
    setSelectedJob(job);
    setNewJob({
      title: job.title || '',
      company: job.company || '',
      department: job.department || '',
      location: job.location || '',
      requiredSkills: job.requiredSkills ? job.requiredSkills.join(', ') : '',
      experience: job.experience || '',
      education: job.education || '',
      description: job.description || '',
      status: job.status || 'active'
    });
    setOpenEditDialog(true);
  };

  const handleViewJob = (job) => {
    setSelectedJob(job);
    setOpenViewDialog(true);
  };

  const handleDeleteJob = async (jobId) => {
    if (window.confirm('Are you sure you want to delete this job?')) {
      try {
        await jobsService.delete(jobId);
        showSnackbar('Job deleted successfully', 'success');
        loadJobs(); // Reload the list
      } catch (error) {
        console.error('Error deleting job:', error);
        showSnackbar('Error deleting job', 'error');
      }
    }
  };

  const handleSubmitNewJob = async () => {
    try {
      const jobData = {
        ...newJob,
        requiredSkills: newJob.requiredSkills.split(',').map(skill => skill.trim()).filter(skill => skill)
      };

      await jobsService.add(jobData);
      showSnackbar('Job posted successfully', 'success');
      setOpenAddDialog(false);
      loadJobs(); // Reload the list
    } catch (error) {
      console.error('Error adding job:', error);
      showSnackbar('Error posting job', 'error');
    }
  };

  const handleSubmitEditJob = async () => {
    try {
      const jobData = {
        ...newJob,
        requiredSkills: newJob.requiredSkills.split(',').map(skill => skill.trim()).filter(skill => skill)
      };

      await jobsService.update(selectedJob.id, jobData);
      showSnackbar('Job updated successfully', 'success');
      setOpenEditDialog(false);
      loadJobs(); // Reload the list
    } catch (error) {
      console.error('Error updating job:', error);
      showSnackbar('Error updating job', 'error');
    }
  };

  const showSnackbar = (message, severity = 'success') => {
    setSnackbar({ open: true, message, severity });
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  // Filter jobs based on search and filters
  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.company?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.requiredSkills?.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesDepartment = filterDepartment === 'all' || job.department === filterDepartment;
    const matchesStatus = filterStatus === 'all' || job.status === filterStatus;
    return matchesSearch && matchesDepartment && matchesStatus;
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
          Jobs Management
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleAddJob}
        >
          Post New Job
        </Button>
      </Box>

      {/* Search and Filters */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                placeholder="Search jobs by title, company, or skills..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                InputProps={{
                  startAdornment: <SearchIcon sx={{ mr: 1, color: 'text.secondary' }} />,
                }}
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <FormControl fullWidth>
                <InputLabel>Department</InputLabel>
                <Select
                  value={filterDepartment}
                  label="Department"
                  onChange={(e) => setFilterDepartment(e.target.value)}
                >
                  <MenuItem value="all">All Departments</MenuItem>
                  <MenuItem value="Engineering">Engineering</MenuItem>
                  <MenuItem value="Marketing">Marketing</MenuItem>
                  <MenuItem value="Sales">Sales</MenuItem>
                  <MenuItem value="HR">HR</MenuItem>
                  <MenuItem value="Finance">Finance</MenuItem>
                  <MenuItem value="Design">Design</MenuItem>
                </Select>
              </FormControl>
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
                  <MenuItem value="closed">Closed</MenuItem>
                  <MenuItem value="draft">Draft</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={2}>
              <Typography variant="body2" color="text.secondary">
                {filteredJobs.length} jobs found
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Jobs Table */}
      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom sx={{ mb: 2 }}>
            Job Postings ({filteredJobs.length})
          </Typography>
          
          <TableContainer component={Paper} variant="outlined">
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Title</TableCell>
                  <TableCell>Company</TableCell>
                  <TableCell>Department</TableCell>
                  <TableCell>Location</TableCell>
                  <TableCell>Required Skills</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredJobs.map((job) => (
                  <TableRow key={job.id}>
                    <TableCell>
                      <Typography variant="body2" fontWeight="medium">
                        {job.title}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">
                        {job.company}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">
                        {job.department}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">
                        {job.location}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                        {job.requiredSkills?.slice(0, 3).map((skill, index) => (
                          <Chip
                            key={index}
                            label={skill}
                            size="small"
                            variant="outlined"
                            color="primary"
                          />
                        ))}
                        {job.requiredSkills?.length > 3 && (
                          <Chip
                            label={`+${job.requiredSkills.length - 3}`}
                            size="small"
                            variant="outlined"
                          />
                        )}
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={job.status}
                        color={job.status === 'active' ? 'success' : 
                               job.status === 'closed' ? 'error' : 'default'}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', gap: 0.5 }}>
                        <Tooltip title="View Details">
                          <IconButton
                            size="small"
                            onClick={() => handleViewJob(job)}
                          >
                            <ViewIcon />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Edit">
                          <IconButton
                            size="small"
                            onClick={() => handleEditJob(job)}
                          >
                            <EditIcon />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Delete">
                          <IconButton
                            size="small"
                            color="error"
                            onClick={() => handleDeleteJob(job.id)}
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

      {/* Add Job Dialog */}
      <Dialog open={openAddDialog} onClose={() => setOpenAddDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle>Post New Job</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Job Title"
                value={newJob.title}
                onChange={(e) => setNewJob({...newJob, title: e.target.value})}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Company"
                value={newJob.company}
                onChange={(e) => setNewJob({...newJob, company: e.target.value})}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth required>
                <InputLabel>Department</InputLabel>
                <Select
                  value={newJob.department}
                  label="Department"
                  onChange={(e) => setNewJob({...newJob, department: e.target.value})}
                >
                  <MenuItem value="Engineering">Engineering</MenuItem>
                  <MenuItem value="Marketing">Marketing</MenuItem>
                  <MenuItem value="Sales">Sales</MenuItem>
                  <MenuItem value="HR">HR</MenuItem>
                  <MenuItem value="Finance">Finance</MenuItem>
                  <MenuItem value="Design">Design</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Location"
                value={newJob.location}
                onChange={(e) => setNewJob({...newJob, location: e.target.value})}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Required Skills"
                value={newJob.requiredSkills}
                onChange={(e) => setNewJob({...newJob, requiredSkills: e.target.value})}
                placeholder="Enter skills separated by commas"
                helperText="e.g., JavaScript, React, Node.js"
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Experience Required"
                value={newJob.experience}
                onChange={(e) => setNewJob({...newJob, experience: e.target.value})}
                placeholder="e.g., 5+ years"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Education Required"
                value={newJob.education}
                onChange={(e) => setNewJob({...newJob, education: e.target.value})}
                placeholder="e.g., Bachelor's degree"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Job Description"
                multiline
                rows={4}
                value={newJob.description}
                onChange={(e) => setNewJob({...newJob, description: e.target.value})}
                placeholder="Describe the role, responsibilities, and requirements..."
                required
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenAddDialog(false)}>Cancel</Button>
          <Button 
            onClick={handleSubmitNewJob} 
            variant="contained"
            disabled={!newJob.title || !newJob.company || !newJob.department || !newJob.location || !newJob.requiredSkills || !newJob.description}
          >
            Post Job
          </Button>
        </DialogActions>
      </Dialog>

      {/* Edit Job Dialog */}
      <Dialog open={openEditDialog} onClose={() => setOpenEditDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle>Edit Job</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Job Title"
                value={newJob.title}
                onChange={(e) => setNewJob({...newJob, title: e.target.value})}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Company"
                value={newJob.company}
                onChange={(e) => setNewJob({...newJob, company: e.target.value})}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth required>
                <InputLabel>Department</InputLabel>
                <Select
                  value={newJob.department}
                  label="Department"
                  onChange={(e) => setNewJob({...newJob, department: e.target.value})}
                >
                  <MenuItem value="Engineering">Engineering</MenuItem>
                  <MenuItem value="Marketing">Marketing</MenuItem>
                  <MenuItem value="Sales">Sales</MenuItem>
                  <MenuItem value="HR">HR</MenuItem>
                  <MenuItem value="Finance">Finance</MenuItem>
                  <MenuItem value="Design">Design</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Location"
                value={newJob.location}
                onChange={(e) => setNewJob({...newJob, location: e.target.value})}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Required Skills"
                value={newJob.requiredSkills}
                onChange={(e) => setNewJob({...newJob, requiredSkills: e.target.value})}
                placeholder="Enter skills separated by commas"
                helperText="e.g., JavaScript, React, Node.js"
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Experience Required"
                value={newJob.experience}
                onChange={(e) => setNewJob({...newJob, experience: e.target.value})}
                placeholder="e.g., 5+ years"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Education Required"
                value={newJob.education}
                onChange={(e) => setNewJob({...newJob, education: e.target.value})}
                placeholder="e.g., Bachelor's degree"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Job Description"
                multiline
                rows={4}
                value={newJob.description}
                onChange={(e) => setNewJob({...newJob, description: e.target.value})}
                placeholder="Describe the role, responsibilities, and requirements..."
                required
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenEditDialog(false)}>Cancel</Button>
          <Button 
            onClick={handleSubmitEditJob} 
            variant="contained"
            disabled={!newJob.title || !newJob.company || !newJob.department || !newJob.location || !newJob.requiredSkills || !newJob.description}
          >
            Update Job
          </Button>
        </DialogActions>
      </Dialog>

      {/* View Job Dialog */}
      <Dialog open={openViewDialog} onClose={() => setOpenViewDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle>
          Job Details - {selectedJob?.title}
        </DialogTitle>
        <DialogContent>
          {selectedJob && (
            <Grid container spacing={3} sx={{ mt: 1 }}>
              <Grid item xs={12} md={6}>
                <Typography variant="h6" gutterBottom>
                  Basic Information
                </Typography>
                <Typography variant="body2" paragraph>
                  <strong>Title:</strong> {selectedJob.title}
                </Typography>
                <Typography variant="body2" paragraph>
                  <strong>Company:</strong> {selectedJob.company}
                </Typography>
                <Typography variant="body2" paragraph>
                  <strong>Department:</strong> {selectedJob.department}
                </Typography>
                <Typography variant="body2" paragraph>
                  <strong>Location:</strong> {selectedJob.location}
                </Typography>
                <Typography variant="body2" paragraph>
                  <strong>Status:</strong> 
                  <Chip
                    label={selectedJob.status}
                    color={selectedJob.status === 'active' ? 'success' : 
                           selectedJob.status === 'closed' ? 'error' : 'default'}
                    size="small"
                    sx={{ ml: 1 }}
                  />
                </Typography>
              </Grid>
              
              <Grid item xs={12} md={6}>
                <Typography variant="h6" gutterBottom>
                  Requirements
                </Typography>
                <Typography variant="body2" paragraph>
                  <strong>Experience:</strong> {selectedJob.experience}
                </Typography>
                <Typography variant="body2" paragraph>
                  <strong>Education:</strong> {selectedJob.education}
                </Typography>
              </Grid>

              <Grid item xs={12}>
                <Typography variant="h6" gutterBottom>
                  Required Skills
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  {selectedJob.requiredSkills?.map((skill, index) => (
                    <Chip
                      key={index}
                      label={skill}
                      variant="outlined"
                      color="primary"
                    />
                  ))}
                </Box>
              </Grid>

              {selectedJob.description && (
                <Grid item xs={12}>
                  <Typography variant="h6" gutterBottom>
                    Job Description
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {selectedJob.description}
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
              handleEditJob(selectedJob);
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

export default Jobs;
