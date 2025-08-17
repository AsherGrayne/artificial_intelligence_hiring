import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Card, 
  CardContent, 
  Grid, 
  Chip, 
  LinearProgress,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@mui/material';
import { Assessment as AssessmentIcon } from '@mui/icons-material';

const Evaluations = () => {
  const [openEvaluationDialog, setOpenEvaluationDialog] = useState(false);
  const [evaluationData, setEvaluationData] = useState({
    candidateId: '',
    jobId: '',
    candidateName: '',
    jobTitle: ''
  });

  const handleRunEvaluation = () => {
    setOpenEvaluationDialog(true);
  };

  const handleSubmitEvaluation = () => {
    // In real app, this would make API call to run evaluation
    console.log('Running evaluation:', evaluationData);
    
    // Show success message
    alert(`Evaluation completed for ${evaluationData.candidateName} - ${evaluationData.jobTitle}`);
    
    // Reset form and close dialog
    setEvaluationData({
      candidateId: '',
      jobId: '',
      candidateName: '',
      jobTitle: ''
    });
    setOpenEvaluationDialog(false);
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4">
          Candidate Evaluations
        </Typography>
        <Button
          variant="contained"
          startIcon={<AssessmentIcon />}
          sx={{ borderRadius: 2 }}
          onClick={handleRunEvaluation}
        >
          Run New Evaluation
        </Button>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Alice Johnson - Senior Python Developer
              </Typography>
              <Typography variant="body2" color="text.secondary" paragraph>
                Overall Score: 0.89
              </Typography>
              <Box sx={{ mb: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2">Skills Match</Typography>
                  <Typography variant="body2">0.95</Typography>
                </Box>
                <LinearProgress
                  variant="determinate"
                  value={95}
                  sx={{ height: 8, borderRadius: 4 }}
                />
              </Box>
              <Box sx={{ mb: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2">Experience Match</Typography>
                  <Typography variant="body2">1.00</Typography>
                </Box>
                <LinearProgress
                  variant="determinate"
                  value={100}
                  sx={{ height: 8, borderRadius: 4 }}
                />
              </Box>
              <Chip label="Shortlisted" color="success" size="small" />
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Bob Smith - Java Backend Developer
              </Typography>
              <Typography variant="body2" color="text.secondary" paragraph>
                Overall Score: 0.67
              </Typography>
              <Box sx={{ mb: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2">Skills Match</Typography>
                  <Typography variant="body2">0.20</Typography>
                </Box>
                <LinearProgress
                  variant="determinate"
                  value={20}
                  sx={{ height: 8, borderRadius: 4 }}
                />
              </Box>
              <Box sx={{ mb: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2">Experience Match</Typography>
                  <Typography variant="body2">0.60</Typography>
                </Box>
                <LinearProgress
                  variant="determinate"
                  value={60}
                  sx={{ height: 8, borderRadius: 4 }}
                />
              </Box>
              <Chip label="Under Review" color="warning" size="small" />
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Run Evaluation Dialog */}
      <Dialog
        open={openEvaluationDialog}
        onClose={() => setOpenEvaluationDialog(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Run New Evaluation</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Candidate ID"
                type="number"
                value={evaluationData.candidateId}
                onChange={(e) => setEvaluationData({...evaluationData, candidateId: e.target.value})}
                placeholder="Enter candidate ID"
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Job ID"
                type="number"
                value={evaluationData.jobId}
                onChange={(e) => setEvaluationData({...evaluationData, jobId: e.target.value})}
                placeholder="Enter job ID"
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Candidate Name"
                value={evaluationData.candidateName}
                onChange={(e) => setEvaluationData({...evaluationData, candidateName: e.target.value})}
                placeholder="Enter candidate name"
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Job Title"
                value={evaluationData.jobTitle}
                onChange={(e) => setEvaluationData({...evaluationData, jobTitle: e.target.value})}
                placeholder="Enter job title"
                required
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenEvaluationDialog(false)}>Cancel</Button>
          <Button 
            onClick={handleSubmitEvaluation} 
            variant="contained"
            disabled={!evaluationData.candidateId || !evaluationData.jobId || !evaluationData.candidateName || !evaluationData.jobTitle}
          >
            Run Evaluation
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Evaluations;
