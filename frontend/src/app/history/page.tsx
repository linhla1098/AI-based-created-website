'use client';

import { useState } from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Chip,
  Stack,
  TextField,
  MenuItem,
  InputAdornment,
  Avatar,
  Pagination
} from '@mui/material';
import { 
  Search, 
  Person,
  History
} from '@mui/icons-material';
import DashboardLayout from '@/components/DashboardLayout';

interface UpdateHistoryRecord {
  id: number;
  resourceId: number;
  employeeName: string;
  employeeId: string;
  action: string;
  changedField: string;
  oldValue: string;
  newValue: string;
  updatedBy: string;
  updatedAt: string;
  reason?: string;
}

const mockHistory: UpdateHistoryRecord[] = [
  {
    id: 1,
    resourceId: 1,
    employeeName: 'Takeshi Yamamoto',
    employeeId: 'EMP001',
    action: 'Updated',
    changedField: 'status',
    oldValue: 'Open',
    newValue: 'In Progress',
    updatedBy: 'manager_it',
    updatedAt: '2024-02-01T10:30:00Z',
    reason: 'Assigned to new project - Frontend development for e-commerce platform'
  },
  {
    id: 2,
    resourceId: 1,
    employeeName: 'Takeshi Yamamoto',
    employeeId: 'EMP001',
    action: 'Updated',
    changedField: 'processNote',
    oldValue: 'Available for frontend development project.',
    newValue: 'Available for frontend development project. Has expertise in React and modern JavaScript frameworks.',
    updatedBy: 'ra_user1',
    updatedAt: '2024-01-28T14:15:00Z',
    reason: 'Added additional skill information'
  },
  {
    id: 3,
    resourceId: 2,
    employeeName: 'Sarah Johnson',
    employeeId: 'EMP002',
    action: 'Created',
    changedField: 'record',
    oldValue: '',
    newValue: 'New resource added',
    updatedBy: 'admin',
    updatedAt: '2024-01-20T09:00:00Z',
    reason: 'Initial resource registration'
  },
  {
    id: 4,
    resourceId: 3,
    employeeName: 'David Chen',
    employeeId: 'EMP003',
    action: 'Updated',
    changedField: 'rate',
    oldValue: '5000.00',
    newValue: '5200.00',
    updatedBy: 'manager_finance',
    updatedAt: '2024-01-30T16:45:00Z',
    reason: 'Rate adjustment based on market analysis'
  },
  {
    id: 5,
    resourceId: 4,
    employeeName: 'Maria Garcia',
    employeeId: 'EMP004',
    action: 'Updated',
    changedField: 'status',
    oldValue: 'In Progress',
    newValue: 'Closed',
    updatedBy: 'manager_hr',
    updatedAt: '2024-02-05T11:20:00Z',
    reason: 'Successfully placed in new role - HR Specialist position'
  },
  {
    id: 6,
    resourceId: 1,
    employeeName: 'Takeshi Yamamoto',
    employeeId: 'EMP001',
    action: 'Updated',
    changedField: 'isUrgent',
    oldValue: 'false',
    newValue: 'true',
    updatedBy: 'manager_it',
    updatedAt: '2024-01-25T08:30:00Z',
    reason: 'High priority project requirement'
  },
];

const actionOptions = ['All', 'Created', 'Updated', 'Deleted'];
const fieldOptions = ['All', 'status', 'processNote', 'rate', 'skills', 'isUrgent', 'department'];

export default function HistoryPage() {
  const [history] = useState<UpdateHistoryRecord[]>(mockHistory);
  const [searchTerm, setSearchTerm] = useState('');
  const [actionFilter, setActionFilter] = useState('All');
  const [fieldFilter, setFieldFilter] = useState('All');
  const [page, setPage] = useState(1);
  const itemsPerPage = 10;

  const filteredHistory = history.filter(record => {
    const matchesSearch = record.employeeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         record.employeeId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         record.updatedBy.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (record.reason && record.reason.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesAction = actionFilter === 'All' || record.action === actionFilter;
    const matchesField = fieldFilter === 'All' || record.changedField === fieldFilter;
    
    return matchesSearch && matchesAction && matchesField;
  });

  const paginatedHistory = filteredHistory.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  const totalPages = Math.ceil(filteredHistory.length / itemsPerPage);

  const getActionColor = (action: string) => {
    switch (action) {
      case 'Created': return '#4CAF50';
      case 'Updated': return '#FF9800';
      case 'Deleted': return '#F44336';
      default: return '#757575';
    }
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString);
    return {
      date: date.toLocaleDateString(),
      time: date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
  };

  return (
    <DashboardLayout>
      <Box>
        {/* Header */}
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
          <Stack direction="row" spacing={2} alignItems="center">
            <History sx={{ color: '#1A73E8', fontSize: 32 }} />
            <Typography variant="h4" sx={{ color: '#344767', fontWeight: 'bold' }}>
              Update History
            </Typography>
          </Stack>
        </Box>

        {/* Filters */}
        <Paper sx={{ p: 3, mb: 3, borderRadius: 3, boxShadow: 2 }}>
          <Stack direction="row" spacing={3} alignItems="center">
            <Box flex={1}>
              <TextField
                fullWidth
                placeholder="Search by employee name, ID, updated by, or reason..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search sx={{ color: '#7B809A' }} />
                    </InputAdornment>
                  ),
                }}
                sx={{ backgroundColor: '#F8F9FA' }}
              />
            </Box>
            <TextField
              select
              label="Action"
              value={actionFilter}
              onChange={(e) => setActionFilter(e.target.value)}
              sx={{ minWidth: 120 }}
            >
              {actionOptions.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              select
              label="Field"
              value={fieldFilter}
              onChange={(e) => setFieldFilter(e.target.value)}
              sx={{ minWidth: 150 }}
            >
              {fieldOptions.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
          </Stack>
        </Paper>

        {/* Results Summary */}
        <Box mb={2}>
          <Typography variant="body2" sx={{ color: '#7B809A' }}>
            Showing {paginatedHistory.length} of {filteredHistory.length} history records
          </Typography>
        </Box>

        {/* History Table */}
        <Paper sx={{ borderRadius: 3, boxShadow: 3 }}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: '#F8F9FA' }}>
                  <TableCell sx={{ fontWeight: 'bold', color: '#344767' }}>Date & Time</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', color: '#344767' }}>Employee</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', color: '#344767' }}>Action</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', color: '#344767' }}>Field</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', color: '#344767' }}>Changes</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', color: '#344767' }}>Updated By</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', color: '#344767' }}>Reason</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {paginatedHistory.map((record) => {
                  const dateTime = formatDateTime(record.updatedAt);
                  return (
                    <TableRow key={record.id} hover>
                      <TableCell>
                        <Box>
                          <Typography variant="body2" sx={{ fontWeight: 'medium' }}>
                            {dateTime.date}
                          </Typography>
                          <Typography variant="caption" sx={{ color: '#7B809A' }}>
                            {dateTime.time}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Box display="flex" alignItems="center">
                          <Avatar 
                            sx={{ 
                              width: 32, 
                              height: 32, 
                              backgroundColor: '#1A73E8',
                              fontSize: '0.875rem',
                              mr: 2
                            }}
                          >
                            {getInitials(record.employeeName)}
                          </Avatar>
                          <Box>
                            <Typography variant="body2" sx={{ fontWeight: 'medium' }}>
                              {record.employeeName}
                            </Typography>
                            <Typography variant="caption" sx={{ color: '#7B809A' }}>
                              {record.employeeId}
                            </Typography>
                          </Box>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Chip 
                          label={record.action} 
                          size="small"
                          sx={{ 
                            backgroundColor: getActionColor(record.action),
                            color: 'white',
                            fontWeight: 'medium'
                          }}
                        />
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2" sx={{ 
                          backgroundColor: '#F8F9FA',
                          padding: '4px 8px',
                          borderRadius: 1,
                          fontFamily: 'monospace',
                          fontSize: '0.75rem'
                        }}>
                          {record.changedField}
                        </Typography>
                      </TableCell>
                      <TableCell sx={{ maxWidth: 300 }}>
                        {record.action !== 'Created' && (
                          <Box>
                            <Typography variant="caption" sx={{ color: '#F44336' }}>
                              From: {record.oldValue || 'Empty'}
                            </Typography>
                            <br />
                            <Typography variant="caption" sx={{ color: '#4CAF50' }}>
                              To: {record.newValue}
                            </Typography>
                          </Box>
                        )}
                        {record.action === 'Created' && (
                          <Typography variant="body2" sx={{ color: '#4CAF50' }}>
                            {record.newValue}
                          </Typography>
                        )}
                      </TableCell>
                      <TableCell>
                        <Box display="flex" alignItems="center">
                          <Person sx={{ color: '#7B809A', fontSize: 16, mr: 1 }} />
                          <Typography variant="body2">
                            {record.updatedBy}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell sx={{ maxWidth: 250 }}>
                        {record.reason && (
                          <Typography variant="body2" sx={{ 
                            color: '#7B809A',
                            fontStyle: 'italic'
                          }}>
                            {record.reason}
                          </Typography>
                        )}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>

        {/* Pagination */}
        {totalPages > 1 && (
          <Box display="flex" justifyContent="center" mt={3}>
            <Pagination
              count={totalPages}
              page={page}
              onChange={(_, newPage) => setPage(newPage)}
              color="primary"
              size="large"
            />
          </Box>
        )}
      </Box>
    </DashboardLayout>
  );
}