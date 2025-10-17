'use client';

import { useState } from 'react';
import { Box, Container, TextField, Button, Typography, Alert, Paper, Tabs, Tab } from '@mui/material';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAuth } from '../../../hooks/useAuth';
import DebugLogin from '../../components/DebugLogin';

// Validation schema
const loginSchema = z.object({
  username: z.string().min(1, 'Username is required'),
  password: z.string().min(1, 'Password is required'),
});

type LoginForm = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const { login, isLoading } = useAuth();
  const [error, setError] = useState('');
  const [tabValue, setTabValue] = useState(0);
  const { register, handleSubmit, formState: { errors } } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginForm) => {
    try {
      setError('');
      await login(data);
    } catch (error) {
      console.error('Login error:', error);
      setError('Login failed. Please try again.');
    }
  };

  const handleDebugLogin = async (username: string, password: string) => {
    try {
      setError('');
      await login({ username, password });
    } catch (error) {
      console.error('Debug login error:', error);
      setError('Login failed. Please try again.');
    }
  };

  return (
    <Box className="min-h-screen flex items-center justify-center" sx={{ backgroundColor: '#F8F9FA' }}>
      <Container maxWidth="md">
        <Paper elevation={3} sx={{ borderRadius: 3, overflow: 'hidden' }}>
          {/* Tabs */}
          <Tabs 
            value={tabValue} 
            onChange={(e, newValue) => setTabValue(newValue)}
            sx={{ borderBottom: 1, borderColor: 'divider' }}
          >
            <Tab label="Normal Login" />
            <Tab label="Debug Mode" />
          </Tabs>

          {/* Tab Content */}
          {tabValue === 0 ? (
            // Normal Login Tab
            <Box sx={{ p: 4 }}>
              <Box textAlign="center" mb={4}>
                <Typography variant="h4" sx={{ color: '#344767', fontWeight: 'bold', mb: 1 }}>
                  Idle Resource Management
                </Typography>
                <Typography variant="body1" sx={{ color: '#7B809A' }}>
                  Sign in to your account
                </Typography>
              </Box>
          
          {error && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {error}
            </Alert>
          )}

          <form onSubmit={handleSubmit(onSubmit)}>
            <Box mb={3}>
              <TextField
                {...register('username')}
                label="Username"
                fullWidth
                error={!!errors.username}
                helperText={errors.username?.message}
                sx={{ mb: 2 }}
              />

              <TextField
                {...register('password')}
                label="Password"
                type="password"
                fullWidth
                error={!!errors.password}
                helperText={errors.password?.message}
              />
            </Box>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              disabled={isLoading}
              sx={{
                background: 'linear-gradient(135deg, #49A3F1 0%, #1A73E8 100%)',
                borderRadius: 2,
                py: 1.5,
                textTransform: 'none',
                fontSize: '1rem',
                fontWeight: 'medium',
              }}
            >
              {isLoading ? 'Signing in...' : 'Sign In'}
            </Button>
          </form>

              <Box mt={3} textAlign="center">
                <Typography variant="body2" sx={{ color: '#7B809A' }}>
                  Test accounts: admin/password123, ra_user1/password123
                </Typography>
              </Box>
            </Box>
          ) : (
            // Debug Mode Tab  
            <DebugLogin onLogin={handleDebugLogin} isLoading={isLoading} error={error} />
          )}
        </Paper>
      </Container>
    </Box>
  );
}