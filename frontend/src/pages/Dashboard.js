import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  LinearProgress,
  Alert,
  CircularProgress,
} from '@mui/material';
import {
  Add as AddIcon,
  Work as WorkIcon,
  People as PeopleIcon,
  Assessment as AssessmentIcon,
  TrendingUp as TrendingUpIcon,
  Warning as WarningIcon,
} from '@mui/icons-material';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import { useNavigate } from 'react-router-dom';
import { analyticsService } from '../firebase/services';

const Dashboard = () => {
  const navigate = useNavigate();
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [openCandidateDialog, setOpenCandidateDialog] = useState(false);
  const [openJobDialog, setOpenJobDialog] = useState(false);
  const [openEvaluationDialog, setOpenEvaluationDialog] = useState(false);
  const [candidateData, setCandidateData] = useState({
    name: '',
    email: '',
    experience: '',
    education: '',
    location: '',
    skills: '',
    resumeText: ''
  });
  const [jobData, setJobData] = useState({
    title: '',
    company: '',
    department: '',
    location: '',
    requiredSkills: '',
    experience: '',
    education: '',
    description: ''
  });
  const [evaluationData, setEvaluationData] = useState({
    candidateId: '',
    jobId: '',
    notes: ''
  });

  // Load analytics from Firebase
  useEffect(() => {
    loadAnalytics();
  }, []);

  const loadAnalytics = async () => {
    try {
      setLoading(true);
      const data = await analyticsService.getHiringAnalytics();
      setAnalytics(data);
    } catch (error) {
      console.error('Error loading analytics:', error);
      // Fallback to mock data if Firebase fails
      setAnalytics({
        totalCandidates: 0,
        totalJobs: 0,
        totalEvaluations: 0,
        totalInterviews: 0,
        evaluationSuccessRate: 0,
        interviewCompletionRate: 0
      });
    } finally {
      setLoading(false);
    }
  };

  const handleAddCandidate = () => {
    setCandidateData({
      name: '',
      email: '',
      experience: '',
      education: '',
      location: '',
      skills: '',
      resumeText: ''
    });
    setOpenCandidateDialog(true);
  };

  const handlePostJob = () => {
    setJobData({
      title: '',
      company: '',
      department: '',
      location: '',
      requiredSkills: '',
      experience: '',
      education: '',
      description: ''
    });
    setOpenJobDialog(true);
  };

  const handleRunEvaluation = () => {
    setEvaluationData({
      candidateId: '',
      jobId: '',
      notes: ''
    });
    setOpenEvaluationDialog(true);
  };

  const handleViewAnalytics = () => {
    navigate('/analytics');
  };

  const handleSubmitCandidate = () => {
    // In real app, this would save to Firebase
    console.log('Adding candidate:', candidateData);
    setOpenCandidateDialog(false);
    // Refresh analytics
    loadAnalytics();
  };

  const handleSubmitJob = () => {
    // In real app, this would save to Firebase
    console.log('Posting job:', jobData);
    setOpenJobDialog(false);
    // Refresh analytics
    loadAnalytics();
  };

  const handleSubmitEvaluation = () => {
    // In real app, this would save to Firebase
    console.log('Running evaluation:', evaluationData);
    setOpenEvaluationDialog(false);
    // Refresh analytics
    loadAnalytics();
  };

  // Mock data for charts (in real app, this would come from Firebase)
  const chartData = [
    { name: 'Engineering', value: 45 },
    { name: 'Marketing', value: 25 },
    { name: 'Sales', value: 20 },
    { name: 'HR', value: 10 },
  ];

  const evaluationChartData = [
    { name: 'Passed', value: 65, color: '#4caf50' },
    { name: 'Under Review', value: 25, color: '#ff9800' },
    { name: 'Rejected', value: 10, color: '#f44336' },
  ];

  const biasData = [
    { name: 'Low Risk', value: 70, color: '#4caf50' },
    { name: 'Medium Risk', value: 20, color: '#ff9800' },
    { name: 'High Risk', value: 10, color: '#f44336' },
  ];

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>

      {/* Key Metrics */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                  <Typography color="textSecondary" gutterBottom variant="body2">
                    Total Candidates
                  </Typography>
                  <Typography variant="h4">
                    {analytics?.totalCandidates || 0}
                  </Typography>
                </Box>
                <PeopleIcon color="primary" sx={{ fontSize: 40 }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                  <Typography color="textSecondary" gutterBottom variant="body2">
                    Active Jobs
                  </Typography>
                  <Typography variant="h4">
                    {analytics?.totalJobs || 0}
                  </Typography>
                </Box>
                <WorkIcon color="primary" sx={{ fontSize: 40 }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                  <Typography color="textSecondary" gutterBottom variant="body2">
                    Evaluations
                  </Typography>
                  <Typography variant="h4">
                    {analytics?.totalEvaluations || 0}
                  </Typography>
                </Box>
                <AssessmentIcon color="primary" sx={{ fontSize: 40 }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                  <Typography color="textSecondary" gutterBottom variant="body2">
                    Interviews
                  </Typography>
                  <Typography variant="h4">
                    {analytics?.totalInterviews || 0}
                  </Typography>
                </Box>
                <TrendingUpIcon color="primary" sx={{ fontSize: 40 }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Quick Actions */}
      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Quick Actions
          </Typography>
          <Grid container spacing={2}>
            <Grid item>
              <Chip
                icon={<AddIcon />}
                label="Add New Candidate"
                onClick={handleAddCandidate}
                variant="outlined"
                sx={{ cursor: 'pointer', '&:hover': { backgroundColor: 'action.hover' } }}
              />
            </Grid>
            <Grid item>
              <Chip
                icon={<WorkIcon />}
                label="Post New Job"
                onClick={handlePostJob}
                variant="outlined"
                sx={{ cursor: 'pointer', '&:hover': { backgroundColor: 'action.hover' } }}
              />
            </Grid>
            <Grid item>
              <Chip
                icon={<AssessmentIcon />}
                label="Run Evaluation"
                onClick={handleRunEvaluation}
                variant="outlined"
                sx={{ cursor: 'pointer', '&:hover': { backgroundColor: 'action.hover' } }}
              />
            </Grid>
            <Grid item>
              <Chip
                icon={<TrendingUpIcon />}
                label="View Analytics"
                onClick={handleViewAnalytics}
                variant="outlined"
                sx={{ cursor: 'pointer', '&:hover': { backgroundColor: 'action.hover' } }}
              />
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Charts */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Department Distribution
              </Typography>
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={chartData}
                    cx="50%"
                    cy="50%"
                    outerRadius={60}
                    dataKey="value"
                    label={({ name, value }) => `${name}: ${value}%`}
                  >
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={`hsl(${index * 90}, 70%, 60%)`} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Evaluation Results
              </Typography>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={evaluationChartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Progress Indicators */}
      <Grid container spacing={3} sx={{ mt: 2 }}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Evaluation Success Rate
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <Box sx={{ flex: 1, mr: 1 }}>
                  <LinearProgress
                    variant="determinate"
                    value={analytics?.evaluationSuccessRate || 0}
                    sx={{ height: 8, borderRadius: 4 }}
                  />
                </Box>
                <Typography variant="body2" color="textSecondary">
                  {Math.round(analytics?.evaluationSuccessRate || 0)}%
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Interview Completion Rate
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <Box sx={{ flex: 1, mr: 1 }}>
                  <LinearProgress
                    variant="determinate"
                    value={analytics?.interviewCompletionRate || 0}
                    sx={{ height: 8, borderRadius: 4 }}
                  />
                </Box>
                <Typography variant="body2" color="textSecondary">
                  {Math.round(analytics?.interviewCompletionRate || 0)}%
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Recent Evaluations */}
      <Card sx={{ mt: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Recent Evaluations
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
              <Box sx={{ p: 2, border: '1px solid', borderColor: 'divider', borderRadius: 1 }}>
                <Typography variant="subtitle2" gutterBottom>
                  John Doe - Frontend Developer
                </Typography>
                <Typography variant="body2" color="textSecondary" gutterBottom>
                  Score: 85/100
                </Typography>
                <Chip
                  label="Passed"
                  color="success"
                  size="small"
                  variant="outlined"
                />
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box sx={{ p: 2, border: '1px solid', borderColor: 'divider', borderRadius: 1 }}>
                <Typography variant="subtitle2" gutterBottom>
                  Jane Smith - Data Scientist
                </Typography>
                <Typography variant="body2" color="textSecondary" gutterBottom>
                  Score: 92/100
                </Typography>
                <Chip
                  label="Passed"
                  color="success"
                  size="small"
                  variant="outlined"
                />
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box sx={{ p: 2, border: '1px solid', borderColor: 'divider', borderRadius: 1 }}>
                <Typography variant="subtitle2" gutterBottom>
                  Mike Johnson - DevOps Engineer
                </Typography>
                <Typography variant="body2" color="textSecondary" gutterBottom>
                  Score: 78/100
                </Typography>
                <Chip
                  label="Under Review"
                  color="warning"
                  size="small"
                  variant="outlined"
                />
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Add Candidate Dialog */}
      <Dialog open={openCandidateDialog} onClose={() => setOpenCandidateDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle>Add New Candidate</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Name"
                value={candidateData.name}
                onChange={(e) => setCandidateData({...candidateData, name: e.target.value})}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Email"
                type="email"
                value={candidateData.email}
                onChange={(e) => setCandidateData({...candidateData, email: e.target.value})}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Experience"
                value={candidateData.experience}
                onChange={(e) => setCandidateData({...candidateData, experience: e.target.value})}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Education"
                value={candidateData.education}
                onChange={(e) => setCandidateData({...candidateData, education: e.target.value})}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Location"
                value={candidateData.location}
                onChange={(e) => setCandidateData({...candidateData, location: e.target.value})}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Skills"
                value={candidateData.skills}
                onChange={(e) => setCandidateData({...candidateData, skills: e.target.value})}
                placeholder="e.g., JavaScript, React, Node.js"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Resume Text"
                multiline
                rows={4}
                value={candidateData.resumeText}
                onChange={(e) => setCandidateData({...candidateData, resumeText: e.target.value})}
                placeholder="Paste resume text here for AI analysis..."
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenCandidateDialog(false)}>Cancel</Button>
          <Button 
            onClick={handleSubmitCandidate} 
            variant="contained"
            disabled={!candidateData.name || !candidateData.email}
          >
            Add Candidate
          </Button>
        </DialogActions>
      </Dialog>

      {/* Post Job Dialog */}
      <Dialog open={openJobDialog} onClose={() => setOpenJobDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle>Post New Job</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Job Title"
                value={jobData.title}
                onChange={(e) => setJobData({...jobData, title: e.target.value})}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Company"
                value={jobData.company}
                onChange={(e) => setJobData({...jobData, company: e.target.value})}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth required>
                <InputLabel>Department</InputLabel>
                <Select
                  value={jobData.department}
                  label="Department"
                  onChange={(e) => setJobData({...jobData, department: e.target.value})}
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
                value={jobData.location}
                onChange={(e) => setJobData({...jobData, location: e.target.value})}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Required Skills"
                value={jobData.requiredSkills}
                onChange={(e) => setJobData({...jobData, requiredSkills: e.target.value})}
                placeholder="Enter skills separated by commas"
                helperText="e.g., JavaScript, React, Node.js"
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Experience Required"
                value={jobData.experience}
                onChange={(e) => setJobData({...jobData, experience: e.target.value})}
                placeholder="e.g., 5+ years"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Education Required"
                value={jobData.education}
                onChange={(e) => setJobData({...jobData, education: e.target.value})}
                placeholder="e.g., Bachelor's degree"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Job Description"
                multiline
                rows={4}
                value={jobData.description}
                onChange={(e) => setJobData({...jobData, description: e.target.value})}
                placeholder="Describe the role, responsibilities, and requirements..."
                required
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenJobDialog(false)}>Cancel</Button>
          <Button 
            onClick={handleSubmitJob} 
            variant="contained"
            disabled={!jobData.title || !jobData.company || !jobData.department || !jobData.location || !jobData.requiredSkills || !jobData.description}
          >
            Post Job
          </Button>
        </DialogActions>
      </Dialog>

      {/* Run Evaluation Dialog */}
      <Dialog open={openEvaluationDialog} onClose={() => setOpenEvaluationDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Run New Evaluation</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Candidate ID"
                value={evaluationData.candidateId}
                onChange={(e) => setEvaluationData({...evaluationData, candidateId: e.target.value})}
                placeholder="Enter candidate ID or select from list"
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Job ID"
                value={evaluationData.jobId}
                onChange={(e) => setEvaluationData({...evaluationData, jobId: e.target.value})}
                placeholder="Enter job ID or select from list"
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Notes"
                multiline
                rows={3}
                value={evaluationData.notes}
                onChange={(e) => setEvaluationData({...evaluationData, notes: e.target.value})}
                placeholder="Additional notes for evaluation..."
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenEvaluationDialog(false)}>Cancel</Button>
          <Button 
            onClick={handleSubmitEvaluation} 
            variant="contained"
            disabled={!evaluationData.candidateId || !evaluationData.jobId}
          >
            Run Evaluation
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Dashboard;
