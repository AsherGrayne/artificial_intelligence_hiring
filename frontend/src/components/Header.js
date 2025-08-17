import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Box,
  Avatar,
  Menu,
  MenuItem,
  Badge,
  Tooltip,
  Divider,
} from '@mui/material';
import {
  Menu as MenuIcon,
  AccountCircle,
  Settings,
  Logout,
  Person,
  Security,
  Notifications,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const Header = ({ onMenuClick }) => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleNavigateTo = (path) => {
    navigate(path);
    handleMenuClose();
  };

  const handleLogout = () => {
    // In real app, this would handle logout logic
    console.log('Logging out...');
    handleMenuClose();
    // Navigate to login page or show logout confirmation
  };

  const isMenuOpen = Boolean(anchorEl);

  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
      PaperProps={{
        sx: {
          minWidth: 200,
          mt: 1,
        }
      }}
    >
      <MenuItem onClick={() => handleNavigateTo('/profile')}>
        <Person sx={{ mr: 1 }} />
        Profile
      </MenuItem>
      
      <MenuItem onClick={() => handleNavigateTo('/settings')}>
        <Settings sx={{ mr: 1 }} />
        Settings
      </MenuItem>
      
      <Divider />
      
      <MenuItem onClick={handleLogout}>
        <Logout sx={{ mr: 1 }} />
        Logout
      </MenuItem>
    </Menu>
  );

  return (
    <AppBar
      position="fixed"
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1,
        backgroundColor: '#1976d2',
      }}
    >
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={onMenuClick}
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>

        <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1, fontWeight: 500 }}>
          Hiring System
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Tooltip title="Account settings">
            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-controls="primary-search-account-menu"
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <Avatar sx={{ width: 32, height: 32, bgcolor: 'rgba(255,255,255,0.2)' }}>
                HR
              </Avatar>
            </IconButton>
          </Tooltip>
        </Box>
      </Toolbar>
      {renderMenu}
    </AppBar>
  );
};

export default Header;
