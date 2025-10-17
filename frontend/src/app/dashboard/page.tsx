'use client';

import { 
  Box, 
  Typography, 
  Paper, 
  Card,
  CardContent,
  CircularProgress,
  Alert
} from '@mui/material';
import { PeopleAlt, Business, Assignment, TrendingUp } from '@mui/icons-material';
import DashboardLayout from '../../components/DashboardLayout';
import { useDashboardStats } from '../../../hooks/useResources';
import { useAuth } from '../../../hooks/useAuth';



export default function DashboardPage() {
  const { user } = useAuth();
  const { data: stats, isLoading, error } = useDashboardStats();

  if (isLoading) {
    return (
      <DashboardLayout>
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
          <CircularProgress />
        </Box>
      </DashboardLayout>
    );
  }

  if (error) {
    return (
      <DashboardLayout>
        <Alert severity="error">
          Failed to load dashboard data. Please try again.
        </Alert>
      </DashboardLayout>
    );
  }

  const statsCards = [
    {
      title: 'Total Resources',
      value: stats?.overview.totalResources?.toString() || '0',
      icon: <PeopleAlt sx={{ fontSize: 40, color: '#1A73E8' }} />,
      color: '#E3F2FD',
    },
    {
      title: 'Open Resources',
      value: stats?.overview.openResources?.toString() || '0',
      icon: <Assignment sx={{ fontSize: 40, color: '#4CAF50' }} />,
      color: '#E8F5E8',
    },
    {
      title: 'In Progress',
      value: stats?.overview.inProgressResources?.toString() || '0',
      icon: <Business sx={{ fontSize: 40, color: '#FF9800' }} />,
      color: '#FFF3E0',
    },
    {
      title: 'Urgent Resources',
      value: stats?.overview.urgentResources?.toString() || '0',
      icon: <TrendingUp sx={{ fontSize: 40, color: '#F44336' }} />,
      color: '#FFEBEE',
    },
  ];

  return (
    <DashboardLayout>
      <Box>
        <Typography variant="h4" sx={{ color: '#344767', fontWeight: 'bold', mb: 1 }}>
          Dashboard Overview
        </Typography>
        <Typography variant="body1" sx={{ color: '#7B809A', mb: 3 }}>
          Welcome back, {user?.username}! Here&apos;s your department overview.
        </Typography>

        <Box display="grid" gridTemplateColumns="repeat(auto-fit, minmax(250px, 1fr))" gap={3} mb={4}>
          {statsCards.map((stat, index) => (
            <Box key={index}>
              <Card sx={{ borderRadius: 3, boxShadow: 3 }}>
                <CardContent sx={{ p: 3 }}>
                  <Box display="flex" alignItems="center" justifyContent="space-between">
                    <Box>
                      <Typography variant="h4" sx={{ color: '#344767', fontWeight: 'bold', mb: 1 }}>
                        {stat.value}
                      </Typography>
                      <Typography variant="body2" sx={{ color: '#7B809A' }}>
                        {stat.title}
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        backgroundColor: stat.color,
                        borderRadius: 2,
                        p: 1.5,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      {stat.icon}
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Box>
          ))}
        </Box>

        <Box display="flex" gap={3} flexWrap="wrap">
          <Box flex="2" minWidth="300px">
            <Paper sx={{ p: 3, borderRadius: 3, boxShadow: 3 }}>
              <Typography variant="h6" sx={{ color: '#344767', fontWeight: 'bold', mb: 2 }}>
                Recent Activities
              </Typography>
              <Box>
                <Typography variant="body2" sx={{ color: '#7B809A', mb: 1 }}>
                  • New idle resource added: John Doe (IT Department)
                </Typography>
                <Typography variant="body2" sx={{ color: '#7B809A', mb: 1 }}>
                  • Resource assigned: Jane Smith (Marketing)
                </Typography>
                <Typography variant="body2" sx={{ color: '#7B809A', mb: 1 }}>
                  • CV uploaded for: Mike Johnson (Sales)
                </Typography>
                <Typography variant="body2" sx={{ color: '#7B809A' }}>
                  • Status updated: Sarah Wilson (HR)
                </Typography>
              </Box>
            </Paper>
          </Box>
          
          <Box flex="1" minWidth="300px">
            <Paper sx={{ p: 3, borderRadius: 3, boxShadow: 3 }}>
              <Typography variant="h6" sx={{ color: '#344767', fontWeight: 'bold', mb: 2 }}>
                Department Breakdown
              </Typography>
              <Box>
                <Box display="flex" justifyContent="space-between" mb={1}>
                  <Typography variant="body2" sx={{ color: '#7B809A' }}>IT</Typography>
                  <Typography variant="body2" sx={{ color: '#344767', fontWeight: 'medium' }}>8</Typography>
                </Box>
                <Box display="flex" justifyContent="space-between" mb={1}>
                  <Typography variant="body2" sx={{ color: '#7B809A' }}>Marketing</Typography>
                  <Typography variant="body2" sx={{ color: '#344767', fontWeight: 'medium' }}>5</Typography>
                </Box>
                <Box display="flex" justifyContent="space-between" mb={1}>
                  <Typography variant="body2" sx={{ color: '#7B809A' }}>Sales</Typography>
                  <Typography variant="body2" sx={{ color: '#344767', fontWeight: 'medium' }}>6</Typography>
                </Box>
                <Box display="flex" justifyContent="space-between">
                  <Typography variant="body2" sx={{ color: '#7B809A' }}>HR</Typography>
                  <Typography variant="body2" sx={{ color: '#344767', fontWeight: 'medium' }}>3</Typography>
                </Box>
              </Box>
            </Paper>
          </Box>
        </Box>
      </Box>
    </DashboardLayout>
  );
}