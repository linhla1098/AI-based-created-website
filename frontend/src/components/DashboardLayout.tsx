'use client';

import { Box, Drawer, AppBar, Toolbar, List, ListItem, ListItemIcon, ListItemText, Typography, IconButton, Avatar } from '@mui/material';
import { Dashboard, People, History, Assessment, Settings, Menu as MenuIcon, Logout } from '@mui/icons-material';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

const drawerWidth = 280;

const menuItems = [
  { text: 'Dashboard', icon: <Dashboard />, path: '/dashboard' },
  { text: 'Idle Resources', icon: <People />, path: '/resources' },
  { text: 'User Management', icon: <Settings />, path: '/users' },
  { text: 'Update History', icon: <History />, path: '/history' },
  { text: 'Reports', icon: <Assessment />, path: '/reports' },
];

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const router = useRouter();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    router.push('/login');
  };

  const drawer = (
    <Box>
      <Box sx={{ p: 3, borderBottom: '1px solid #E9ECEF' }}>
        <Typography variant="h6" sx={{ color: '#344767', fontWeight: 'bold' }}>
          Idle Resource
        </Typography>
        <Typography variant="body2" sx={{ color: '#7B809A' }}>
          Management System
        </Typography>
      </Box>
      <List sx={{ pt: 2 }}>
        {menuItems.map((item) => (
          <ListItem
            key={item.text}
            sx={{
              mx: 2,
              mb: 1,
              borderRadius: 2,
              cursor: 'pointer',
              '&:hover': {
                backgroundColor: '#F8F9FA',
              },
            }}
            onClick={() => router.push(item.path)}
          >
            <ListItemIcon sx={{ color: '#7B809A', minWidth: 40 }}>
              {item.icon}
            </ListItemIcon>
            <ListItemText 
              primary={item.text} 
              sx={{ 
                '& .MuiListItemText-primary': { 
                  color: '#344767',
                  fontSize: '0.875rem',
                  fontWeight: 'medium',
                }
              }} 
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex', backgroundColor: '#F8F9FA', minHeight: '100vh' }}>
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          backgroundColor: 'white',
          boxShadow: '0px 2px 4px rgba(0,0,0,0.1)',
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' }, color: '#344767' }}
          >
            <MenuIcon />
          </IconButton>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Avatar sx={{ bgcolor: '#1A73E8', width: 32, height: 32 }}>
              A
            </Avatar>
            <IconButton onClick={handleLogout} sx={{ color: '#7B809A' }}>
              <Logout />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { 
              boxSizing: 'border-box', 
              width: drawerWidth,
              border: 'none',
              boxShadow: '2px 0px 8px rgba(0,0,0,0.1)',
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          mt: 8,
        }}
      >
        {children}
      </Box>
    </Box>
  );
}