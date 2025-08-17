import React, { useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Switch,
  FormControlLabel,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Divider,
  Alert,
  Slider,
  Chip,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import {
  Save as SaveIcon,
  Refresh as RefreshIcon,
  Add as AddIcon,
  Delete as DeleteIcon,
  Settings as SettingsIcon,
  Security as SecurityIcon,
  Notifications as NotificationsIcon,
  Palette as PaletteIcon,
} from '@mui/icons-material';

const Settings = () => {
  const [settings, setSettings] = useState({
    // System Settings
    autoSave: true,
    darkMode: false,
    language: 'en',
    timezone: 'UTC',
    
    // AI Configuration
    aiEnabled: true,
    biasDetectionSensitivity: 0.7,
    evaluationThreshold: 0.6,
    autoEvaluation: true,
    
    // Notifications
    emailNotifications: true,
    pushNotifications: false,
    evaluationAlerts: true,
    biasAlerts: true,
    
    // Security
    twoFactorAuth: false,
    sessionTimeout: 30,
    passwordExpiry: 90,
    
    // Custom Skills
    customSkills: ['Python', 'React', 'AWS', 'Docker'],
  });

  const [openSkillDialog, setOpenSkillDialog] = useState(false);
  const [newSkill, setNewSkill] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSettingChange = (setting, value) => {
    setSettings(prev => ({
      ...prev,
      [setting]: value
    }));
  };

  const handleSaveSettings = () => {
    // In real app, this would save to backend
    console.log('Saving settings:', settings);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const handleResetSettings = () => {
    // Reset to default values
    setSettings({
      autoSave: true,
      darkMode: false,
      language: 'en',
      timezone: 'UTC',
      aiEnabled: true,
      biasDetectionSensitivity: 0.7,
      evaluationThreshold: 0.6,
      autoEvaluation: true,
      emailNotifications: true,
      pushNotifications: false,
      evaluationAlerts: true,
      biasAlerts: true,
      twoFactorAuth: false,
      sessionTimeout: 30,
      passwordExpiry: 90,
      customSkills: ['Python', 'React', 'AWS', 'Docker'],
    });
  };

  const handleAddSkill = () => {
    if (newSkill.trim() && !settings.customSkills.includes(newSkill.trim())) {
      setSettings(prev => ({
        ...prev,
        customSkills: [...prev.customSkills, newSkill.trim()]
      }));
      setNewSkill('');
      setOpenSkillDialog(false);
    }
  };

  const handleRemoveSkill = (skillToRemove) => {
    setSettings(prev => ({
      ...prev,
      customSkills: prev.customSkills.filter(skill => skill !== skillToRemove)
    }));
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4">
          Settings
        </Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button
            variant="outlined"
            startIcon={<RefreshIcon />}
            onClick={handleResetSettings}
          >
            Reset to Defaults
          </Button>
          <Button
            variant="contained"
            startIcon={<SaveIcon />}
            onClick={handleSaveSettings}
          >
            Save Settings
          </Button>
        </Box>
      </Box>

      {showSuccess && (
        <Alert severity="success" sx={{ mb: 3 }}>
          Settings saved successfully!
        </Alert>
      )}

      <Grid container spacing={3}>
        {/* System Settings */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <SettingsIcon sx={{ mr: 1, color: 'primary.main' }} />
                <Typography variant="h6">System Settings</Typography>
              </Box>
              
              <FormControlLabel
                control={
                  <Switch
                    checked={settings.autoSave}
                    onChange={(e) => handleSettingChange('autoSave', e.target.checked)}
                  />
                }
                label="Auto-save changes"
              />
              
              <FormControlLabel
                control={
                  <Switch
                    checked={settings.darkMode}
                    onChange={(e) => handleSettingChange('darkMode', e.target.checked)}
                  />
                }
                label="Dark mode"
              />
              
              <FormControl fullWidth sx={{ mt: 2 }}>
                <InputLabel>Language</InputLabel>
                <Select
                  value={settings.language}
                  label="Language"
                  onChange={(e) => handleSettingChange('language', e.target.value)}
                >
                  <MenuItem value="en">English</MenuItem>
                  <MenuItem value="es">Spanish</MenuItem>
                  <MenuItem value="fr">French</MenuItem>
                  <MenuItem value="de">German</MenuItem>
                </Select>
              </FormControl>
              
              <FormControl fullWidth sx={{ mt: 2 }}>
                <InputLabel>Timezone</InputLabel>
                <Select
                  value={settings.timezone}
                  label="Timezone"
                  onChange={(e) => handleSettingChange('timezone', e.target.value)}
                >
                  <MenuItem value="UTC">UTC</MenuItem>
                  <MenuItem value="EST">Eastern Time</MenuItem>
                  <MenuItem value="PST">Pacific Time</MenuItem>
                  <MenuItem value="GMT">GMT</MenuItem>
                </Select>
              </FormControl>
            </CardContent>
          </Card>
        </Grid>

        {/* AI Configuration */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <SettingsIcon sx={{ mr: 1, color: 'primary.main' }} />
                <Typography variant="h6">AI Configuration</Typography>
              </Box>
              
              <FormControlLabel
                control={
                  <Switch
                    checked={settings.aiEnabled}
                    onChange={(e) => handleSettingChange('aiEnabled', e.target.checked)}
                  />
                }
                label="Enable AI features"
              />
              
              <FormControlLabel
                control={
                  <Switch
                    checked={settings.autoEvaluation}
                    onChange={(e) => handleSettingChange('autoEvaluation', e.target.checked)}
                  />
                }
                label="Auto-evaluation"
              />
              
              <Box sx={{ mt: 2 }}>
                <Typography gutterBottom>Bias Detection Sensitivity</Typography>
                <Slider
                  value={settings.biasDetectionSensitivity}
                  onChange={(e, value) => handleSettingChange('biasDetectionSensitivity', value)}
                  min={0.1}
                  max={1.0}
                  step={0.1}
                  marks
                  valueLabelDisplay="auto"
                />
                <Typography variant="caption" color="text.secondary">
                  Current: {settings.biasDetectionSensitivity}
                </Typography>
              </Box>
              
              <Box sx={{ mt: 2 }}>
                <Typography gutterBottom>Evaluation Threshold</Typography>
                <Slider
                  value={settings.evaluationThreshold}
                  onChange={(e, value) => handleSettingChange('evaluationThreshold', value)}
                  min={0.1}
                  max={1.0}
                  step={0.1}
                  marks
                  valueLabelDisplay="auto"
                />
                <Typography variant="caption" color="text.secondary">
                  Current: {settings.evaluationThreshold}
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Notifications */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <NotificationsIcon sx={{ mr: 1, color: 'primary.main' }} />
                <Typography variant="h6">Notifications</Typography>
              </Box>
              
              <FormControlLabel
                control={
                  <Switch
                    checked={settings.emailNotifications}
                    onChange={(e) => handleSettingChange('emailNotifications', e.target.checked)}
                  />
                }
                label="Email notifications"
              />
              
              <FormControlLabel
                control={
                  <Switch
                    checked={settings.pushNotifications}
                    onChange={(e) => handleSettingChange('pushNotifications', e.target.checked)}
                  />
                }
                label="Push notifications"
              />
              
              <FormControlLabel
                control={
                  <Switch
                    checked={settings.evaluationAlerts}
                    onChange={(e) => handleSettingChange('evaluationAlerts', e.target.checked)}
                  />
                }
                label="Evaluation alerts"
              />
              
              <FormControlLabel
                control={
                  <Switch
                    checked={settings.biasAlerts}
                    onChange={(e) => handleSettingChange('biasAlerts', e.target.checked)}
                  />
                }
                label="Bias detection alerts"
              />
            </CardContent>
          </Card>
        </Grid>

        {/* Security */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <SecurityIcon sx={{ mr: 1, color: 'primary.main' }} />
                <Typography variant="h6">Security</Typography>
              </Box>
              
              <FormControlLabel
                control={
                  <Switch
                    checked={settings.twoFactorAuth}
                    onChange={(e) => handleSettingChange('twoFactorAuth', e.target.checked)}
                  />
                }
                label="Two-factor authentication"
              />
              
              <Box sx={{ mt: 2 }}>
                <Typography gutterBottom>Session Timeout (minutes)</Typography>
                <Slider
                  value={settings.sessionTimeout}
                  onChange={(e, value) => handleSettingChange('sessionTimeout', value)}
                  min={15}
                  max={120}
                  step={15}
                  marks
                  valueLabelDisplay="auto"
                />
                <Typography variant="caption" color="text.secondary">
                  Current: {settings.sessionTimeout} minutes
                </Typography>
              </Box>
              
              <Box sx={{ mt: 2 }}>
                <Typography gutterBottom>Password Expiry (days)</Typography>
                <Slider
                  value={settings.passwordExpiry}
                  onChange={(e, value) => handleSettingChange('passwordExpiry', value)}
                  min={30}
                  max={365}
                  step={30}
                  marks
                  valueLabelDisplay="auto"
                />
                <Typography variant="caption" color="text.secondary">
                  Current: {settings.passwordExpiry} days
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Custom Skills */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <PaletteIcon sx={{ mr: 1, color: 'primary.main' }} />
                <Typography variant="h6">Custom Skills Management</Typography>
              </Box>
              
              <Box sx={{ mb: 2 }}>
                <Button
                  variant="outlined"
                  startIcon={<AddIcon />}
                  onClick={() => setOpenSkillDialog(true)}
                >
                  Add New Skill
                </Button>
              </Box>
              
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {settings.customSkills.map((skill, index) => (
                  <Chip
                    key={index}
                    label={skill}
                    onDelete={() => handleRemoveSkill(skill)}
                    deleteIcon={<DeleteIcon />}
                    variant="outlined"
                  />
                ))}
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Add Skill Dialog */}
      <Dialog open={openSkillDialog} onClose={() => setOpenSkillDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Add New Skill</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Skill Name"
            value={newSkill}
            onChange={(e) => setNewSkill(e.target.value)}
            placeholder="Enter skill name"
            sx={{ mt: 1 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenSkillDialog(false)}>Cancel</Button>
          <Button 
            onClick={handleAddSkill} 
            variant="contained"
            disabled={!newSkill.trim() || settings.customSkills.includes(newSkill.trim())}
          >
            Add Skill
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Settings;
