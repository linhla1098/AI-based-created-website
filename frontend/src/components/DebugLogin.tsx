'use client';

import { useState } from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  Button, 
  Alert,
  Divider,
  List,
  ListItem,
  ListItemText,
  Chip
} from '@mui/material';

const testAccounts = [
  { username: 'admin', password: 'password123', role: 'ADMIN', department: 'IT' },
  { username: 'ra_user1', password: 'password123', role: 'RA', department: 'IT' },
  { username: 'ra_user2', password: 'password123', role: 'RA', department: 'HR' },
  { username: 'manager_it', password: 'password123', role: 'MANAGER', department: 'IT' },
  { username: 'manager_hr', password: 'password123', role: 'MANAGER', department: 'HR' },
  { username: 'viewer1', password: 'password123', role: 'VIEWER', department: 'IT' },
];

interface DebugLoginProps {
  onLogin: (username: string, password: string) => void;
  isLoading: boolean;
  error: string;
}

export default function DebugLogin({ onLogin, isLoading, error }: DebugLoginProps) {
  const [connectionStatus, setConnectionStatus] = useState<'checking' | 'connected' | 'error'>('checking');
  const [backendInfo, setBackendInfo] = useState<{status: string; timestamp: string; message: string} | null>(null);

  const checkBackendConnection = async () => {
    try {
      setConnectionStatus('checking');
      const response = await fetch('http://localhost:3001/health');
      if (response.ok) {
        const data = await response.json();
        setBackendInfo(data);
        setConnectionStatus('connected');
      } else {
        setConnectionStatus('error');
      }
    } catch (error) {
      console.error('Backend connection failed:', error);
      setConnectionStatus('error');
    }
  };

  // Check connection on mount
  useState(() => {
    checkBackendConnection();
  });

  const handleQuickLogin = (account: typeof testAccounts[0]) => {
    onLogin(account.username, account.password);
  };

  return (
    <Box className="p-4 space-y-4">
      <Typography variant="h5" sx={{ color: '#344767', fontWeight: 'bold', mb: 2 }}>
        🛠️ Debug Login Panel
      </Typography>

      {/* Backend Connection Status */}
      <Paper sx={{ p: 3, borderRadius: 2 }}>
        <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
          <Typography variant="h6" sx={{ color: '#344767' }}>
            Backend Connection Status
          </Typography>
          <Button onClick={checkBackendConnection} size="small" variant="outlined">
            Refresh
          </Button>
        </Box>
        
        {connectionStatus === 'checking' && (
          <Alert severity="info">Checking backend connection...</Alert>
        )}
        
        {connectionStatus === 'connected' && (
          <Alert severity="success">
            ✅ Backend connected successfully!
            {backendInfo && (
              <Box mt={1}>
                <Typography variant="body2">
                  Status: {backendInfo.status} | Time: {backendInfo.timestamp}
                </Typography>
              </Box>
            )}
          </Alert>
        )}
        
        {connectionStatus === 'error' && (
          <Alert severity="error">
            ❌ Cannot connect to backend at http://localhost:3001
            <br />
            Make sure the NestJS server is running with: npm run start:dev
          </Alert>
        )}
      </Paper>

      {/* Quick Login Accounts */}
      <Paper sx={{ p: 3, borderRadius: 2 }}>
        <Typography variant="h6" sx={{ color: '#344767', mb: 2 }}>
          Quick Login Test Accounts
        </Typography>
        
        <List>
          {testAccounts.map((account, index) => (
            <ListItem key={index} sx={{ px: 0 }}>
              <ListItemText
                primary={
                  <Box display="flex" alignItems="center" gap={1}>
                    <Typography variant="body1" fontWeight="medium">
                      {account.username}
                    </Typography>
                    <Chip 
                      label={account.role} 
                      size="small" 
                      color={account.role === 'ADMIN' ? 'primary' : 'default'}
                    />
                    <Chip label={account.department} size="small" variant="outlined" />
                  </Box>
                }
                secondary={`Password: ${account.password}`}
              />
              <Button
                variant="contained"
                size="small"
                disabled={isLoading || connectionStatus !== 'connected'}
                onClick={() => handleQuickLogin(account)}
                sx={{ ml: 2 }}
              >
                {isLoading ? 'Logging in...' : 'Login'}
              </Button>
            </ListItem>
          ))}
        </List>
      </Paper>

      {/* Error Display */}
      {error && (
        <Alert severity="error">
          <Typography variant="body2" fontWeight="medium">Login Error:</Typography>
          {error}
        </Alert>
      )}

      {/* Debug Information */}
      <Paper sx={{ p: 3, borderRadius: 2 }}>
        <Typography variant="h6" sx={{ color: '#344767', mb: 2 }}>
          Debug Information
        </Typography>
        
        <Typography variant="body2" color="text.secondary">
          • Frontend URL: {window.location.origin}
          <br />
          • Backend URL: http://localhost:3001
          <br />
          • Authentication: JWT Bearer Token
          <br />
          • Storage: localStorage (access_token, user)
        </Typography>

        <Divider sx={{ my: 2 }} />

        <Typography variant="body2" color="text.secondary">
          <strong>Troubleshooting Steps:</strong>
          <br />
          1. Ensure MySQL is running and database &apos;idle_resource_db&apos; exists
          <br />
          2. Check if seed data was created: npm run seed (in backend folder)
          <br />
          3. Verify backend is running on port 3001: npm run start:dev
          <br />
          4. Open browser dev tools (F12) and check Console/Network tabs for errors
        </Typography>
      </Paper>
    </Box>
  );
}