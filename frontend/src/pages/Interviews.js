import React, { useState } from 'react';
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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
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
  Alert,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
} from '@mui/material';
import {
  Add as AddIcon,
  CalendarToday as CalendarIcon,
  VideoCall as VideoIcon,
  Person as PersonIcon,
  Work as WorkIcon,
  Schedule as ScheduleIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  CheckCircle as CheckIcon,
  Cancel as CancelIcon,
  Send as SendIcon,
} from '@mui/icons-material';

const Interviews = () => {
  const [openScheduleDialog, setOpenScheduleDialog] = useState(false);
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const [selectedInterview, setSelectedInterview] = useState(null);
  const [scheduleData, setScheduleData] = useState({
    candidateId: '',
    candidateName: '',
    jobId: '',
    jobTitle: '',
    interviewType: 'video',
    scheduledDate: '',
    scheduledTime: '',
    duration: 60,
    interviewers: [],
    notes: '',
    location: '',
    meetingLink: '',
  });

  const [interviews] = useState([
    {
      id: 1,
      candidate: 'Alice Johnson',
      job: 'Senior Python Developer',
      type: 'video',
      scheduledDate: '2024-06-20 14:00',
      duration: 60,
      status: 'scheduled',
      interviewers: ['John Smith', 'Sarah Wilson'],
      location: 'Zoom Meeting',
      meetingLink: 'https://zoom.us/j/123456789',
      notes: 'Focus on Python skills and system design',
    },
    {
      id: 2,
      candidate: 'Bob Davis',
      job: 'Frontend Developer',
      type: 'onsite',
      scheduledDate: '2024-06-21 10:00',
      duration: 90,
      status: 'completed',
      interviewers: ['Mike Johnson', 'Lisa Brown'],
      location: 'Conference Room A',
      meetingLink: '',
      notes: 'Good technical skills, strong communication',
      feedback: 'Recommended for next round',
    },
    {
      id: 3,
      candidate: 'Carol White',
      job: 'DevOps Engineer',
      type: 'video',
      scheduledDate: '2024-06-22 15:30',
      duration: 60,
      status: 'pending',
      interviewers: ['David Lee'],
      location: 'Google Meet',
      meetingLink: 'https://meet.google.com/abc-defg-hij',
      notes: 'Assess infrastructure knowledge',
    },
  ]);

  const [candidates] = useState([
    { id: 1, name: 'Alice Johnson', email: 'alice@email.com' },
    { id: 2, name: 'Bob Davis', email: 'bob@email.com' },
    { id: 3, name: 'Carol White', email: 'carol@email.com' },
  ]);

  const [jobs] = useState([
    { id: 1, title: 'Senior Python Developer', department: 'Engineering' },
    { id: 2, title: 'Frontend Developer', department: 'Engineering' },
    { id: 3, title: 'DevOps Engineer', department: 'Infrastructure' },
  ]);

  const [interviewers] = useState([
    'John Smith',
    'Sarah Wilson',
    'Mike Johnson',
    'Lisa Brown',
    'David Lee',
  ]);

  const handleScheduleInterview = () => {
    // In real app, this would save to backend
    console.log('Scheduling interview:', scheduleData);
    setOpenScheduleDialog(false);
    setScheduleData({
      candidateId: '',
      candidateName: '',
      jobId: '',
      jobTitle: '',
      interviewType: 'video',
      scheduledDate: '',
      scheduledTime: '',
      duration: 60,
      interviewers: [],
      notes: '',
      location: '',
      meetingLink: '',
    });
  };

  const handleViewDetails = (interview) => {
    setSelectedInterview(interview);
    setOpenDetailsDialog(true);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'scheduled': return 'primary';
      case 'completed': return 'success';
      case 'pending': return 'warning';
      case 'cancelled': return 'error';
      default: return 'default';
    }
  };

  const getTypeIcon = (type) => {
    return type === 'video' ? <VideoIcon /> : <PersonIcon />;
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4">
          Interview Management
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setOpenScheduleDialog(true)}
        >
          Schedule Interview
        </Button>
      </Box>

      {/* Quick Stats */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                  <Typography color="text.secondary" gutterBottom variant="body2">
                    Total Interviews
                  </Typography>
                  <Typography variant="h4" component="div">
                    {interviews.length}
                  </Typography>
                </Box>
                <CalendarIcon color="primary" sx={{ fontSize: 40 }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                  <Typography color="text.secondary" gutterBottom variant="body2">
                    Scheduled
                  </Typography>
                  <Typography variant="h4" component="div" color="primary.main">
                    {interviews.filter(i => i.status === 'scheduled').length}
                  </Typography>
                </Box>
                <ScheduleIcon color="primary" sx={{ fontSize: 40 }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                  <Typography color="text.secondary" gutterBottom variant="body2">
                    Completed
                  </Typography>
                  <Typography variant="h4" component="div" color="success.main">
                    {interviews.filter(i => i.status === 'completed').length}
                  </Typography>
                </Box>
                <CheckIcon color="success" sx={{ fontSize: 40 }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                  <Typography color="text.secondary" gutterBottom variant="body2">
                    Pending
                  </Typography>
                  <Typography variant="h4" component="div" color="warning.main">
                    {interviews.filter(i => i.status === 'pending').length}
                  </Typography>
                </Box>
                <ScheduleIcon color="warning" sx={{ fontSize: 40 }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Interviews Table */}
      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom sx={{ mb: 2 }}>
            Upcoming & Recent Interviews
          </Typography>
          
          <TableContainer component={Paper} variant="outlined">
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Candidate</TableCell>
                  <TableCell>Job</TableCell>
                  <TableCell>Type</TableCell>
                  <TableCell>Date & Time</TableCell>
                  <TableCell>Duration</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Interviewers</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {interviews.map((interview) => (
                  <TableRow key={interview.id}>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <PersonIcon color="primary" />
                        <Typography variant="body2" fontWeight="medium">
                          {interview.candidate}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <WorkIcon color="primary" />
                        <Typography variant="body2">
                          {interview.job}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Chip
                        icon={getTypeIcon(interview.type)}
                        label={interview.type === 'video' ? 'Video' : 'Onsite'}
                        size="small"
                        variant="outlined"
                      />
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">
                        {interview.scheduledDate}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">
                        {interview.duration} min
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={interview.status}
                        color={getStatusColor(interview.status)}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                        {interview.interviewers.map((interviewer, index) => (
                          <Chip
                            key={index}
                            label={interviewer}
                            size="small"
                            variant="outlined"
                          />
                        ))}
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', gap: 0.5 }}>
                        <Tooltip title="View Details">
                          <IconButton
                            size="small"
                            onClick={() => handleViewDetails(interview)}
                          >
                            <EditIcon />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Cancel Interview">
                          <IconButton size="small" color="error">
                            <CancelIcon />
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

      {/* Schedule Interview Dialog */}
      <Dialog open={openScheduleDialog} onClose={() => setOpenScheduleDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle>Schedule New Interview</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Candidate</InputLabel>
                <Select
                  value={scheduleData.candidateId}
                  label="Candidate"
                  onChange={(e) => {
                    const candidate = candidates.find(c => c.id === e.target.value);
                    setScheduleData({
                      ...scheduleData,
                      candidateId: e.target.value,
                      candidateName: candidate ? candidate.name : ''
                    });
                  }}
                >
                  {candidates.map((candidate) => (
                    <MenuItem key={candidate.id} value={candidate.id}>
                      {candidate.name} - {candidate.email}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Job Position</InputLabel>
                <Select
                  value={scheduleData.jobId}
                  label="Job Position"
                  onChange={(e) => {
                    const job = jobs.find(j => j.id === e.target.value);
                    setScheduleData({
                      ...scheduleData,
                      jobId: e.target.value,
                      jobTitle: job ? job.title : ''
                    });
                  }}
                >
                  {jobs.map((job) => (
                    <MenuItem key={job.id} value={job.id}>
                      {job.title} - {job.department}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Interview Type</InputLabel>
                <Select
                  value={scheduleData.interviewType}
                  label="Interview Type"
                  onChange={(e) => setScheduleData({...scheduleData, interviewType: e.target.value})}
                >
                  <MenuItem value="video">Video Call</MenuItem>
                  <MenuItem value="onsite">Onsite</MenuItem>
                  <MenuItem value="phone">Phone Call</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Date"
                type="date"
                value={scheduleData.scheduledDate}
                onChange={(e) => setScheduleData({...scheduleData, scheduledDate: e.target.value})}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Time"
                type="time"
                value={scheduleData.scheduledTime}
                onChange={(e) => setScheduleData({...scheduleData, scheduledTime: e.target.value})}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Duration (minutes)</InputLabel>
                <Select
                  value={scheduleData.duration}
                  label="Duration (minutes)"
                  onChange={(e) => setScheduleData({...scheduleData, duration: e.target.value})}
                >
                  <MenuItem value={30}>30 minutes</MenuItem>
                  <MenuItem value={45}>45 minutes</MenuItem>
                  <MenuItem value={60}>1 hour</MenuItem>
                  <MenuItem value={90}>1.5 hours</MenuItem>
                  <MenuItem value={120}>2 hours</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Interviewers</InputLabel>
                <Select
                  multiple
                  value={scheduleData.interviewers}
                  label="Interviewers"
                  onChange={(e) => setScheduleData({...scheduleData, interviewers: e.target.value})}
                  renderValue={(selected) => (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                      {selected.map((value) => (
                        <Chip key={value} label={value} size="small" />
                      ))}
                    </Box>
                  )}
                >
                  {interviewers.map((interviewer) => (
                    <MenuItem key={interviewer} value={interviewer}>
                      {interviewer}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Location/Meeting Link"
                value={scheduleData.location}
                onChange={(e) => setScheduleData({...scheduleData, location: e.target.value})}
                placeholder={scheduleData.interviewType === 'video' ? 'Zoom/Meet link' : 'Office location'}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Interview Notes"
                multiline
                rows={3}
                value={scheduleData.notes}
                onChange={(e) => setScheduleData({...scheduleData, notes: e.target.value})}
                placeholder="Special instructions, focus areas, or notes for the interview..."
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenScheduleDialog(false)}>Cancel</Button>
          <Button 
            onClick={handleScheduleInterview} 
            variant="contained"
            disabled={!scheduleData.candidateId || !scheduleData.jobId || !scheduleData.scheduledDate || !scheduleData.scheduledTime}
          >
            Schedule Interview
          </Button>
        </DialogActions>
      </Dialog>

      {/* Interview Details Dialog */}
      <Dialog open={openDetailsDialog} onClose={() => setOpenDetailsDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle>
          Interview Details - {selectedInterview?.candidate}
        </DialogTitle>
        <DialogContent>
          {selectedInterview && (
            <Grid container spacing={3} sx={{ mt: 1 }}>
              <Grid item xs={12} md={6}>
                <Typography variant="h6" gutterBottom>
                  Interview Information
                </Typography>
                <List dense>
                  <ListItem>
                    <ListItemIcon><WorkIcon /></ListItemIcon>
                    <ListItemText 
                      primary="Position" 
                      secondary={selectedInterview.job} 
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon><ScheduleIcon /></ListItemIcon>
                    <ListItemText 
                      primary="Date & Time" 
                      secondary={selectedInterview.scheduledDate} 
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon><CalendarIcon /></ListItemIcon>
                    <ListItemText 
                      primary="Duration" 
                      secondary={`${selectedInterview.duration} minutes`} 
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon><PersonIcon /></ListItemIcon>
                    <ListItemText 
                      primary="Type" 
                      secondary={selectedInterview.type === 'video' ? 'Video Call' : 'Onsite'} 
                    />
                  </ListItem>
                </List>
              </Grid>
              
              <Grid item xs={12} md={6}>
                <Typography variant="h6" gutterBottom>
                  Team & Location
                </Typography>
                <List dense>
                  <ListItem>
                    <ListItemIcon><PersonIcon /></ListItemIcon>
                    <ListItemText 
                      primary="Interviewers" 
                      secondary={selectedInterview.interviewers.join(', ')} 
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon><CalendarIcon /></ListItemIcon>
                    <ListItemText 
                      primary="Location" 
                      secondary={selectedInterview.location} 
                    />
                  </ListItem>
                  {selectedInterview.meetingLink && (
                    <ListItem>
                      <ListItemIcon><VideoIcon /></ListItemIcon>
                      <ListItemText 
                        primary="Meeting Link" 
                        secondary={
                          <a href={selectedInterview.meetingLink} target="_blank" rel="noopener noreferrer">
                            {selectedInterview.meetingLink}
                          </a>
                        } 
                      />
                    </ListItem>
                  )}
                </List>
              </Grid>

              {selectedInterview.notes && (
                <Grid item xs={12}>
                  <Typography variant="h6" gutterBottom>
                    Notes
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {selectedInterview.notes}
                  </Typography>
                </Grid>
              )}

              {selectedInterview.feedback && (
                <Grid item xs={12}>
                  <Divider sx={{ my: 2 }} />
                  <Typography variant="h6" gutterBottom>
                    Interview Feedback
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {selectedInterview.feedback}
                  </Typography>
                </Grid>
              )}
            </Grid>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDetailsDialog(false)}>Close</Button>
          {selectedInterview?.status === 'scheduled' && (
            <Button variant="contained" startIcon={<SendIcon />}>
              Send Reminder
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Interviews;
