import React, { useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  TextField,
  Button,
  Avatar,
  Divider,
  Switch,
  FormControlLabel,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert,
  IconButton,
  Chip,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import {
  Edit as EditIcon,
  Save as SaveIcon,
  Cancel as CancelIcon,
  Person as PersonIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  LocationOn as LocationIcon,
  Work as WorkIcon,
  School as SchoolIcon,
  Security as SecurityIcon,
  Notifications as NotificationsIcon,
  Palette as PaletteIcon,
  CameraAlt as CameraIcon,
} from '@mui/icons-material';

const Profile = () => {
  const [profile, setProfile] = useState({
    // Personal Information
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@company.com',
    phone: '+1 (555) 123-4567',
    location: 'San Francisco, CA',
    department: 'Human Resources',
    position: 'HR Manager',
    bio: 'Experienced HR professional with expertise in talent acquisition and employee development.',
    
    // Professional Details
    experience: '8 years',
    education: 'Master\'s in Human Resources',
    skills: ['Recruitment', 'Employee Relations', 'Performance Management', 'HR Analytics'],
    
    // Preferences
    emailNotifications: true,
    pushNotifications: false,
    weeklyReports: true,
    darkMode: false,
    
    // Security
    twoFactorAuth: false,
    lastPasswordChange: '2024-01-15',
    loginHistory: [
      { date: '2024-06-15 09:30', location: 'San Francisco, CA', device: 'Chrome on Windows' },
      { date: '2024-06-14 14:20', location: 'San Francisco, CA', device: 'Chrome on Windows' },
      { date: '2024-06-13 08:45', location: 'San Francisco, CA', device: 'Chrome on Windows' },
    ]
  });

  const [isEditing, setIsEditing] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [openPasswordDialog, setOpenPasswordDialog] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const handleProfileChange = (field, value) => {
    setProfile(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSaveProfile = () => {
    // In real app, this would save to backend
    console.log('Saving profile:', profile);
    setIsEditing(false);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const handleCancelEdit = () => {
    // Reset to original values
    setProfile({
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@company.com',
      phone: '+1 (555) 123-4567',
      location: 'San Francisco, CA',
      department: 'Human Resources',
      position: 'HR Manager',
      bio: 'Experienced HR professional with expertise in talent acquisition and employee development.',
      experience: '8 years',
      education: 'Master\'s in Human Resources',
      skills: ['Recruitment', 'Employee Relations', 'Performance Management', 'HR Analytics'],
      emailNotifications: true,
      pushNotifications: false,
      weeklyReports: true,
      darkMode: false,
      twoFactorAuth: false,
      lastPasswordChange: '2024-01-15',
      loginHistory: [
        { date: '2024-06-15 09:30', location: 'San Francisco, CA', device: 'Chrome on Windows' },
        { date: '2024-06-14 14:20', location: 'San Francisco, CA', device: 'Chrome on Windows' },
        { date: '2024-06-13 08:45', location: 'San Francisco, CA', device: 'Chrome on Windows' },
      ]
    });
    setIsEditing(false);
  };

  const handleChangePassword = () => {
    if (passwordData.newPassword === passwordData.confirmPassword && passwordData.newPassword.length >= 8) {
      // In real app, this would update password in backend
      console.log('Changing password...');
      setOpenPasswordDialog(false);
      setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    }
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4">
          Profile
        </Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          {!isEditing ? (
            <Button
              variant="contained"
              startIcon={<EditIcon />}
              onClick={() => setIsEditing(true)}
            >
              Edit Profile
            </Button>
          ) : (
            <>
              <Button
                variant="outlined"
                startIcon={<CancelIcon />}
                onClick={handleCancelEdit}
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                startIcon={<SaveIcon />}
                onClick={handleSaveProfile}
              >
                Save Changes
              </Button>
            </>
          )}
        </Box>
      </Box>

      {showSuccess && (
        <Alert severity="success" sx={{ mb: 3 }}>
          Profile updated successfully!
        </Alert>
      )}

      <Grid container spacing={3}>
        {/* Profile Header */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                <Box sx={{ position: 'relative' }}>
                  <Avatar
                    sx={{ width: 120, height: 120, fontSize: '3rem', bgcolor: 'primary.main' }}
                  >
                    {profile.firstName[0]}{profile.lastName[0]}
                  </Avatar>
                  {isEditing && (
                    <IconButton
                      sx={{
                        position: 'absolute',
                        bottom: 0,
                        right: 0,
                        bgcolor: 'primary.main',
                        color: 'white',
                        '&:hover': { bgcolor: 'primary.dark' }
                      }}
                    >
                      <CameraIcon />
                    </IconButton>
                  )}
                </Box>
                <Box sx={{ flexGrow: 1 }}>
                  <Typography variant="h4" gutterBottom>
                    {profile.firstName} {profile.lastName}
                  </Typography>
                  <Typography variant="h6" color="primary" gutterBottom>
                    {profile.position}
                  </Typography>
                  <Typography variant="body1" color="text.secondary" paragraph>
                    {profile.department} • {profile.experience} experience
                  </Typography>
                  <Typography variant="body2">
                    {profile.bio}
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Personal Information */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <PersonIcon sx={{ mr: 1, color: 'primary.main' }} />
                <Typography variant="h6">Personal Information</Typography>
              </Box>
              
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="First Name"
                    value={profile.firstName}
                    onChange={(e) => handleProfileChange('firstName', e.target.value)}
                    disabled={!isEditing}
                    InputProps={{
                      startAdornment: <PersonIcon sx={{ mr: 1, color: 'text.secondary' }} />,
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Last Name"
                    value={profile.lastName}
                    onChange={(e) => handleProfileChange('lastName', e.target.value)}
                    disabled={!isEditing}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Email"
                    value={profile.email}
                    onChange={(e) => handleProfileChange('email', e.target.value)}
                    disabled={!isEditing}
                    InputProps={{
                      startAdornment: <EmailIcon sx={{ mr: 1, color: 'text.secondary' }} />,
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Phone"
                    value={profile.phone}
                    onChange={(e) => handleProfileChange('phone', e.target.value)}
                    disabled={!isEditing}
                    InputProps={{
                      startAdornment: <PhoneIcon sx={{ mr: 1, color: 'text.secondary' }} />,
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Location"
                    value={profile.location}
                    onChange={(e) => handleProfileChange('location', e.target.value)}
                    disabled={!isEditing}
                    InputProps={{
                      startAdornment: <LocationIcon sx={{ mr: 1, color: 'text.secondary' }} />,
                    }}
                  />
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        {/* Professional Information */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <WorkIcon sx={{ mr: 1, color: 'primary.main' }} />
                <Typography variant="h6">Professional Information</Typography>
              </Box>
              
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Department"
                    value={profile.department}
                    onChange={(e) => handleProfileChange('department', e.target.value)}
                    disabled={!isEditing}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Position"
                    value={profile.position}
                    onChange={(e) => handleProfileChange('position', e.target.value)}
                    disabled={!isEditing}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Experience"
                    value={profile.experience}
                    onChange={(e) => handleProfileChange('experience', e.target.value)}
                    disabled={!isEditing}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Education"
                    value={profile.education}
                    onChange={(e) => handleProfileChange('education', e.target.value)}
                    disabled={!isEditing}
                    InputProps={{
                      startAdornment: <SchoolIcon sx={{ mr: 1, color: 'text.secondary' }} />,
                    }}
                  />
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        {/* Skills */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <PaletteIcon sx={{ mr: 1, color: 'primary.main' }} />
                <Typography variant="h6">Skills</Typography>
              </Box>
              
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {profile.skills.map((skill, index) => (
                  <Chip
                    key={index}
                    label={skill}
                    variant="outlined"
                    color="primary"
                  />
                ))}
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Preferences */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <NotificationsIcon sx={{ mr: 1, color: 'primary.main' }} />
                <Typography variant="h6">Preferences</Typography>
              </Box>
              
              <FormControlLabel
                control={
                  <Switch
                    checked={profile.emailNotifications}
                    onChange={(e) => handleProfileChange('emailNotifications', e.target.checked)}
                    disabled={!isEditing}
                  />
                }
                label="Email notifications"
              />
              
              <FormControlLabel
                control={
                  <Switch
                    checked={profile.pushNotifications}
                    onChange={(e) => handleProfileChange('pushNotifications', e.target.checked)}
                    disabled={!isEditing}
                  />
                }
                label="Push notifications"
              />
              
              <FormControlLabel
                control={
                  <Switch
                    checked={profile.weeklyReports}
                    onChange={(e) => handleProfileChange('weeklyReports', e.target.checked)}
                    disabled={!isEditing}
                  />
                }
                label="Weekly reports"
              />
              
              <FormControlLabel
                control={
                  <Switch
                    checked={profile.darkMode}
                    onChange={(e) => handleProfileChange('darkMode', e.target.checked)}
                    disabled={!isEditing}
                  />
                }
                label="Dark mode"
              />
            </CardContent>
          </Card>
        </Grid>

        {/* Security & Login History */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <SecurityIcon sx={{ mr: 1, color: 'primary.main' }} />
                <Typography variant="h6">Security & Login History</Typography>
              </Box>
              
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="subtitle1" gutterBottom>
                      Two-Factor Authentication
                    </Typography>
                    <FormControlLabel
                      control={
                        <Switch
                          checked={profile.twoFactorAuth}
                          onChange={(e) => handleProfileChange('twoFactorAuth', e.target.checked)}
                          disabled={!isEditing}
                        />
                      }
                      label="Enable 2FA"
                    />
                  </Box>
                  
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="subtitle1" gutterBottom>
                      Last Password Change
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {profile.lastPasswordChange}
                    </Typography>
                  </Box>
                  
                  <Button
                    variant="outlined"
                    onClick={() => setOpenPasswordDialog(true)}
                    disabled={!isEditing}
                  >
                    Change Password
                  </Button>
                </Grid>
                
                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle1" gutterBottom>
                    Recent Login Activity
                  </Typography>
                  <List dense>
                    {profile.loginHistory.map((login, index) => (
                      <ListItem key={index} sx={{ px: 0 }}>
                        <ListItemText
                          primary={login.date}
                          secondary={`${login.location} • ${login.device}`}
                        />
                      </ListItem>
                    ))}
                  </List>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Change Password Dialog */}
      <Dialog open={openPasswordDialog} onClose={() => setOpenPasswordDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Change Password</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Current Password"
                type="password"
                value={passwordData.currentPassword}
                onChange={(e) => setPasswordData({...passwordData, currentPassword: e.target.value})}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="New Password"
                type="password"
                value={passwordData.newPassword}
                onChange={(e) => setPasswordData({...passwordData, newPassword: e.target.value})}
                required
                helperText="Password must be at least 8 characters long"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Confirm New Password"
                type="password"
                value={passwordData.confirmPassword}
                onChange={(e) => setPasswordData({...passwordData, confirmPassword: e.target.value})}
                required
                error={passwordData.newPassword !== passwordData.confirmPassword && passwordData.confirmPassword !== ''}
                helperText={passwordData.newPassword !== passwordData.confirmPassword && passwordData.confirmPassword !== '' ? 'Passwords do not match' : ''}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenPasswordDialog(false)}>Cancel</Button>
          <Button 
            onClick={handleChangePassword} 
            variant="contained"
            disabled={!passwordData.currentPassword || !passwordData.newPassword || passwordData.newPassword !== passwordData.confirmPassword || passwordData.newPassword.length < 8}
          >
            Change Password
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Profile;
