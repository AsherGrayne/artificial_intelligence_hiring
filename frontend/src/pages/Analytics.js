import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Card, 
  CardContent, 
  Grid, 
  Chip,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField
} from '@mui/material';
import { TrendingUp as TrendingUpIcon, Warning as WarningIcon, Assessment as AssessmentIcon } from '@mui/icons-material';

const Analytics = () => {
  const [openReportDialog, setOpenReportDialog] = useState(false);
  const [reportData, setReportData] = useState({
    reportType: '',
    dateRange: '',
    department: '',
    customMetrics: ''
  });

  const handleGenerateReport = () => {
    setOpenReportDialog(true);
  };

  const handleSubmitReport = () => {
    // In real app, this would generate and download a report
    console.log('Generating report:', reportData);
    
    // Show success message
    alert(`Report generated successfully for ${reportData.reportType}`);
    
    // Reset form and close dialog
    setReportData({
      reportType: '',
      dateRange: '',
      department: '',
      customMetrics: ''
    });
    setOpenReportDialog(false);
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4">
          Hiring Analytics & Insights
        </Typography>
        <Button
          variant="contained"
          startIcon={<AssessmentIcon />}
          sx={{ borderRadius: 2 }}
          onClick={handleGenerateReport}
        >
          Generate Report
        </Button>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Key Metrics
              </Typography>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <Typography variant="body2">Total Candidates</Typography>
                <Typography variant="h6">156</Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <Typography variant="body2">Active Jobs</Typography>
                <Typography variant="h6">23</Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <Typography variant="body2">Average Score</Typography>
                <Typography variant="h6">0.73</Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <Typography variant="body2">Bias Detected</Typography>
                <Typography variant="h6" color="warning.main">12</Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Recent Insights
              </Typography>
              <Box sx={{ mb: 2 }}>
                <Chip
                  icon={<TrendingUpIcon />}
                  label="Strong skills alignment detected"
                  color="success"
                  size="small"
                  sx={{ mb: 1 }}
                />
              </Box>
              <Box sx={{ mb: 2 }}>
                <Chip
                  icon={<WarningIcon />}
                  label="Skills gap in AWS and Docker"
                  color="warning"
                  size="small"
                  sx={{ mb: 1 }}
                />
              </Box>
              <Box sx={{ mb: 2 }}>
                <Chip
                  icon={<TrendingUpIcon />}
                  label="Bias detection rate decreased"
                  color="success"
                  size="small"
                  sx={{ mb: 1 }}
                />
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Generate Report Dialog */}
      <Dialog
        open={openReportDialog}
        onClose={() => setOpenReportDialog(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>Generate Analytics Report</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth required>
                <InputLabel>Report Type</InputLabel>
                <Select
                  value={reportData.reportType}
                  label="Report Type"
                  onChange={(e) => setReportData({...reportData, reportType: e.target.value})}
                >
                  <MenuItem value="comprehensive">Comprehensive Report</MenuItem>
                  <MenuItem value="candidates">Candidates Analysis</MenuItem>
                  <MenuItem value="jobs">Jobs Analysis</MenuItem>
                  <MenuItem value="bias">Bias Detection Report</MenuItem>
                  <MenuItem value="skills">Skills Gap Analysis</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Date Range</InputLabel>
                <Select
                  value={reportData.dateRange}
                  label="Date Range"
                  onChange={(e) => setReportData({...reportData, dateRange: e.target.value})}
                >
                  <MenuItem value="last7days">Last 7 Days</MenuItem>
                  <MenuItem value="last30days">Last 30 Days</MenuItem>
                  <MenuItem value="last3months">Last 3 Months</MenuItem>
                  <MenuItem value="last6months">Last 6 Months</MenuItem>
                  <MenuItem value="lastyear">Last Year</MenuItem>
                  <MenuItem value="custom">Custom Range</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Department</InputLabel>
                <Select
                  value={reportData.department}
                  label="Department"
                  onChange={(e) => setReportData({...reportData, department: e.target.value})}
                >
                  <MenuItem value="all">All Departments</MenuItem>
                  <MenuItem value="engineering">Engineering</MenuItem>
                  <MenuItem value="marketing">Marketing</MenuItem>
                  <MenuItem value="sales">Sales</MenuItem>
                  <MenuItem value="hr">Human Resources</MenuItem>
                  <MenuItem value="finance">Finance</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Custom Metrics (optional)"
                multiline
                rows={3}
                value={reportData.customMetrics}
                onChange={(e) => setReportData({...reportData, customMetrics: e.target.value})}
                placeholder="Specify any additional metrics or insights you'd like to include..."
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenReportDialog(false)}>Cancel</Button>
          <Button 
            onClick={handleSubmitReport} 
            variant="contained"
            disabled={!reportData.reportType}
          >
            Generate Report
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Analytics;
