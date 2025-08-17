import React from 'react';
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Box,
  Typography,
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  People as PeopleIcon,
  Work as WorkIcon,
  Assessment as AssessmentIcon,
  Analytics as AnalyticsIcon,
  Settings as SettingsIcon,
  VideoCall as InterviewIcon,
  Description as DocumentIcon,
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';

const drawerWidth = 240;

const menuItems = [
  { text: 'Dashboard', icon: <DashboardIcon />, path: '/' },
  { text: 'Candidates', icon: <PeopleIcon />, path: '/candidates' },
  { text: 'Jobs', icon: <WorkIcon />, path: '/jobs' },
  { text: 'Evaluations', icon: <AssessmentIcon />, path: '/evaluations' },
  { text: 'Interviews', icon: <InterviewIcon />, path: '/interviews' },
  { text: 'Documents', icon: <DocumentIcon />, path: '/documents' },
  { text: 'Analytics', icon: <AnalyticsIcon />, path: '/analytics' },
  { text: 'Settings', icon: <SettingsIcon />, path: '/settings' },
];

const Sidebar = ({ open, onClose }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigation = (path) => {
    navigate(path);
    if (window.innerWidth < 960) {
      onClose();
    }
  };

  const drawer = (
    <Box>
      <Box sx={{ p: 2, textAlign: 'center' }}>
        <Typography variant="h6" color="primary" sx={{ fontWeight: 600 }}>
          AI Hiring System
        </Typography>
      </Box>
      
      <List>
        {menuItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton
              selected={location.pathname === item.path}
              onClick={() => handleNavigation(item.path)}
              sx={{
                '&.Mui-selected': {
                  backgroundColor: 'primary.light',
                  color: 'primary.contrastText',
                  '&:hover': {
                    backgroundColor: 'primary.main',
                  },
                },
              }}
            >
              <ListItemIcon
                sx={{
                  color: location.pathname === item.path ? 'primary.contrastText' : 'inherit',
                }}
              >
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Drawer
      variant="persistent"
      anchor="left"
      open={open}
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
          top: 0,
          height: '100%',
          zIndex: (theme) => theme.zIndex.drawer,
        },
      }}
    >
      {drawer}
    </Drawer>
  );
};

export default Sidebar;
