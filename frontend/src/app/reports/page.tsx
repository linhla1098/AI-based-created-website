'use client';

import { useState } from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  Card,
  CardContent,
  Stack,
  TextField,
  MenuItem,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip
} from '@mui/material';

import { 
  TrendingUp,
  Assessment,
  PieChart,
  BarChart,
  GetApp,
  DateRange,
  Business,
  Person,
  Schedule
} from '@mui/icons-material';
import DashboardLayout from '@/components/DashboardLayout';

interface DepartmentStats {
  department: string;
  totalResources: number;
  openResources: number;
  inProgressResources: number;
  closedResources: number;
  averageRate: number;
  urgentResources: number;
}

interface MonthlyTrend {
  month: string;
  newResources: number;
  closedResources: number;
  utilization: number;
}

const mockDepartmentStats: DepartmentStats[] = [
  {
    department: 'IT',
    totalResources: 25,
    openResources: 8,
    inProgressResources: 12,
    closedResources: 5,
    averageRate: 4800,
    urgentResources: 3
  },
  {
    department: 'Marketing',
    totalResources: 18,
    openResources: 6,
    inProgressResources: 8,
    closedResources: 4,
    averageRate: 3900,
    urgentResources: 2
  },
  {
    department: 'Finance',
    totalResources: 15,
    openResources: 4,
    inProgressResources: 7,
    closedResources: 4,
    averageRate: 5100,
    urgentResources: 1
  },
  {
    department: 'HR',
    totalResources: 12,
    openResources: 3,
    inProgressResources: 6,
    closedResources: 3,
    averageRate: 4200,
    urgentResources: 1
  },
  {
    department: 'Operations',
    totalResources: 10,
    openResources: 2,
    inProgressResources: 5,
    closedResources: 3,
    averageRate: 3800,
    urgentResources: 0
  }
];

const mockMonthlyTrends: MonthlyTrend[] = [
  { month: 'Jan 2024', newResources: 15, closedResources: 8, utilization: 73 },
  { month: 'Feb 2024', newResources: 12, closedResources: 10, utilization: 78 },
  { month: 'Mar 2024', newResources: 18, closedResources: 14, utilization: 82 },
  { month: 'Apr 2024', newResources: 20, closedResources: 16, utilization: 85 },
  { month: 'May 2024', newResources: 14, closedResources: 12, utilization: 80 },
  { month: 'Jun 2024', newResources: 16, closedResources: 15, utilization: 88 }
];

const reportTypes = [
  { value: 'department', label: 'Department Analysis' },
  { value: 'monthly', label: 'Monthly Trends' },
  { value: 'utilization', label: 'Utilization Report' },
  { value: 'skills', label: 'Skills Analysis' }
];

const timeRanges = [
  { value: 'last30', label: 'Last 30 Days' },
  { value: 'last90', label: 'Last 3 Months' },
  { value: 'last180', label: 'Last 6 Months' },
  { value: 'lastyear', label: 'Last Year' },
  { value: 'custom', label: 'Custom Range' }
];

export default function ReportsPage() {
  const [selectedReport, setSelectedReport] = useState('department');
  const [timeRange, setTimeRange] = useState('last90');

  const handleExportReport = () => {
    console.log('Exporting report:', selectedReport, 'for period:', timeRange);
    // TODO: Implement report export logic
  };

  const getUtilizationColor = (utilization: number) => {
    if (utilization >= 90) return '#4CAF50';
    if (utilization >= 75) return '#FF9800';
    return '#F44336';
  };

  const totalStats = {
    totalResources: mockDepartmentStats.reduce((sum, dept) => sum + dept.totalResources, 0),
    openResources: mockDepartmentStats.reduce((sum, dept) => sum + dept.openResources, 0),
    inProgressResources: mockDepartmentStats.reduce((sum, dept) => sum + dept.inProgressResources, 0),
    closedResources: mockDepartmentStats.reduce((sum, dept) => sum + dept.closedResources, 0),
    urgentResources: mockDepartmentStats.reduce((sum, dept) => sum + dept.urgentResources, 0),
    avgRate: Math.round(mockDepartmentStats.reduce((sum, dept) => sum + dept.averageRate, 0) / mockDepartmentStats.length)
  };

  return (
    <DashboardLayout>
      <Box>
        {/* Header */}
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
          <Stack direction="row" spacing={2} alignItems="center">
            <Assessment sx={{ color: '#1A73E8', fontSize: 32 }} />
            <Typography variant="h4" sx={{ color: '#344767', fontWeight: 'bold' }}>
              Reports & Analytics
            </Typography>
          </Stack>
          <Button
            variant="contained"
            startIcon={<GetApp />}
            onClick={handleExportReport}
            sx={{
              background: 'linear-gradient(135deg, #4CAF50 0%, #2E7D32 100%)',
              borderRadius: 2,
              textTransform: 'none',
            }}
          >
            Export Report
          </Button>
        </Box>

        {/* Report Filters */}
        <Paper sx={{ p: 3, mb: 3, borderRadius: 3, boxShadow: 2 }}>
          <Stack direction="row" spacing={3} alignItems="center">
            <TextField
              select
              label="Report Type"
              value={selectedReport}
              onChange={(e) => setSelectedReport(e.target.value)}
              sx={{ minWidth: 200 }}
            >
              {reportTypes.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              select
              label="Time Range"
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              sx={{ minWidth: 180 }}
            >
              {timeRanges.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
            <DateRange sx={{ color: '#7B809A' }} />
          </Stack>
        </Paper>

        {/* Summary Cards */}
        <Box display="grid" gridTemplateColumns="repeat(auto-fit, minmax(200px, 1fr))" gap={3} mb={4}>
          <Box>
            <Card sx={{ borderRadius: 3, boxShadow: 3, bgcolor: 'linear-gradient(135deg, #1A73E8 0%, #49A3F1 100%)' }}>
              <CardContent sx={{ textAlign: 'center', color: 'white' }}>
                <Person sx={{ fontSize: 40, mb: 1 }} />
                <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 1 }}>
                  {totalStats.totalResources}
                </Typography>
                <Typography variant="body2">
                  Total Resources
                </Typography>
              </CardContent>
            </Card>
          </Box>
          
          <Box>
            <Card sx={{ borderRadius: 3, boxShadow: 3, bgcolor: '#4CAF50', color: 'white' }}>
              <CardContent sx={{ textAlign: 'center' }}>
                <TrendingUp sx={{ fontSize: 40, mb: 1 }} />
                <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 1 }}>
                  {totalStats.openResources}
                </Typography>
                <Typography variant="body2">
                  Open Resources
                </Typography>
              </CardContent>
            </Card>
          </Box>
          
          <Box>
            <Card sx={{ borderRadius: 3, boxShadow: 3, bgcolor: '#FF9800', color: 'white' }}>
              <CardContent sx={{ textAlign: 'center' }}>
                <Schedule sx={{ fontSize: 40, mb: 1 }} />
                <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 1 }}>
                  {totalStats.inProgressResources}
                </Typography>
                <Typography variant="body2">
                  In Progress
                </Typography>
              </CardContent>
            </Card>
          </Box>
          
          <Box>
            <Card sx={{ borderRadius: 3, boxShadow: 3, bgcolor: '#757575', color: 'white' }}>
              <CardContent sx={{ textAlign: 'center' }}>
                <BarChart sx={{ fontSize: 40, mb: 1 }} />
                <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 1 }}>
                  {totalStats.closedResources}
                </Typography>
                <Typography variant="body2">
                  Closed Resources
                </Typography>
              </CardContent>
            </Card>
          </Box>
          
          <Box>
            <Card sx={{ borderRadius: 3, boxShadow: 3, bgcolor: '#F44336', color: 'white' }}>
              <CardContent sx={{ textAlign: 'center' }}>
                <PieChart sx={{ fontSize: 40, mb: 1 }} />
                <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 1 }}>
                  {totalStats.urgentResources}
                </Typography>
                <Typography variant="body2">
                  Urgent Cases
                </Typography>
              </CardContent>
            </Card>
          </Box>
          
          <Box>
            <Card sx={{ borderRadius: 3, boxShadow: 3, bgcolor: 'linear-gradient(135deg, #49A3F1 0%, #1A73E8 100%)', color: 'white' }}>
              <CardContent sx={{ textAlign: 'center' }}>
                <Business sx={{ fontSize: 40, mb: 1 }} />
                <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 1 }}>
                  ${totalStats.avgRate}
                </Typography>
                <Typography variant="body2">
                  Avg Rate
                </Typography>
              </CardContent>
            </Card>
          </Box>
        </Box>

        <Box display="flex" gap={3} flexWrap="wrap">
          {/* Department Analysis */}
          <Box flex="2" minWidth="300px">
            <Paper sx={{ p: 4, borderRadius: 3, boxShadow: 3 }}>
              <Typography variant="h6" sx={{ color: '#344767', fontWeight: 'bold', mb: 3 }}>
                Department Analysis
              </Typography>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow sx={{ backgroundColor: '#F8F9FA' }}>
                      <TableCell sx={{ fontWeight: 'bold', color: '#344767' }}>Department</TableCell>
                      <TableCell sx={{ fontWeight: 'bold', color: '#344767' }}>Total</TableCell>
                      <TableCell sx={{ fontWeight: 'bold', color: '#344767' }}>Open</TableCell>
                      <TableCell sx={{ fontWeight: 'bold', color: '#344767' }}>In Progress</TableCell>
                      <TableCell sx={{ fontWeight: 'bold', color: '#344767' }}>Closed</TableCell>
                      <TableCell sx={{ fontWeight: 'bold', color: '#344767' }}>Avg Rate</TableCell>
                      <TableCell sx={{ fontWeight: 'bold', color: '#344767' }}>Urgent</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {mockDepartmentStats.map((dept) => (
                      <TableRow key={dept.department} hover>
                        <TableCell sx={{ fontWeight: 'medium' }}>{dept.department}</TableCell>
                        <TableCell>{dept.totalResources}</TableCell>
                        <TableCell>
                          <Chip 
                            label={dept.openResources} 
                            size="small"
                            sx={{ backgroundColor: '#4CAF50', color: 'white' }}
                          />
                        </TableCell>
                        <TableCell>
                          <Chip 
                            label={dept.inProgressResources} 
                            size="small"
                            sx={{ backgroundColor: '#FF9800', color: 'white' }}
                          />
                        </TableCell>
                        <TableCell>
                          <Chip 
                            label={dept.closedResources} 
                            size="small"
                            sx={{ backgroundColor: '#757575', color: 'white' }}
                          />
                        </TableCell>
                        <TableCell>${dept.averageRate.toLocaleString()}</TableCell>
                        <TableCell>
                          {dept.urgentResources > 0 && (
                            <Chip 
                              label={dept.urgentResources}
                              size="small"
                              sx={{ backgroundColor: '#F44336', color: 'white' }}
                            />
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          </Box>

          {/* Monthly Trends */}
          <Box flex="1" minWidth="300px">
            <Paper sx={{ p: 4, borderRadius: 3, boxShadow: 3 }}>
              <Typography variant="h6" sx={{ color: '#344767', fontWeight: 'bold', mb: 3 }}>
                Monthly Trends
              </Typography>
              <Stack spacing={2}>
                {mockMonthlyTrends.slice(-4).map((trend) => (
                  <Box key={trend.month}>
                    <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                      <Typography variant="body2" sx={{ fontWeight: 'medium' }}>
                        {trend.month}
                      </Typography>
                      <Chip 
                        label={`${trend.utilization}%`}
                        size="small"
                        sx={{ 
                          backgroundColor: getUtilizationColor(trend.utilization),
                          color: 'white'
                        }}
                      />
                    </Box>
                    <Box display="flex" justifyContent="space-between" mb={2}>
                      <Typography variant="caption" sx={{ color: '#4CAF50' }}>
                        New: {trend.newResources}
                      </Typography>
                      <Typography variant="caption" sx={{ color: '#757575' }}>
                        Closed: {trend.closedResources}
                      </Typography>
                    </Box>
                    <Box 
                      sx={{ 
                        height: 8, 
                        backgroundColor: '#E9ECEF', 
                        borderRadius: 4,
                        overflow: 'hidden'
                      }}
                    >
                      <Box 
                        sx={{ 
                          height: '100%', 
                          width: `${trend.utilization}%`,
                          backgroundColor: getUtilizationColor(trend.utilization),
                          borderRadius: 4
                        }}
                      />
                    </Box>
                  </Box>
                ))}
              </Stack>
            </Paper>
          </Box>
        </Box>
      </Box>
    </DashboardLayout>
  );
}