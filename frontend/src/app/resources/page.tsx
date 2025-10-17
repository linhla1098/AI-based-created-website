'use client';

import { useState } from 'react';
import { 
  Box, 
  Typography, 
  Button, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Paper, 
  Chip,
  IconButton,
  Stack,
  TextField,
  InputAdornment,
  MenuItem,
  Pagination
} from '@mui/material';
import { 
  Search, 
  Add, 
  FileUpload, 
  FileDownload, 
  Edit, 
  Visibility,
  FilterList
} from '@mui/icons-material';
import DashboardLayout from '@/components/DashboardLayout';
import { useRouter } from 'next/navigation';

interface IdleResource {
  id: number;
  employeeId: string;
  employeeName: string;
  department: string;
  idleFromDate: string;
  status: string;
  rate: number;
  skills: string;
  isUrgent: boolean;
  cvFileName?: string;
}

const mockResources: IdleResource[] = [
  {
    id: 1,
    employeeId: 'EMP001',
    employeeName: 'Takeshi Yamamoto',
    department: 'IT',
    idleFromDate: '2024-01-15',
    status: 'Open',
    rate: 4500.00,
    skills: 'React, TypeScript, Node.js',
    isUrgent: true,
    cvFileName: 'takeshi_yamamoto_cv.pdf'
  },
  {
    id: 2,
    employeeId: 'EMP002',
    employeeName: 'Sarah Johnson',
    department: 'Marketing',
    idleFromDate: '2024-01-20',
    status: 'In Progress',
    rate: 3800.00,
    skills: 'Digital Marketing, SEO, Analytics',
    isUrgent: false,
    cvFileName: 'sarah_johnson_cv.pdf'
  },
  {
    id: 3,
    employeeId: 'EMP003',
    employeeName: 'David Chen',
    department: 'Finance',
    idleFromDate: '2024-01-25',
    status: 'Open',
    rate: 5200.00,
    skills: 'Financial Analysis, Excel, SAP',
    isUrgent: true,
    cvFileName: 'david_chen_cv.pdf'
  },
  {
    id: 4,
    employeeId: 'EMP004',
    employeeName: 'Maria Garcia',
    department: 'HR',
    idleFromDate: '2024-02-01',
    status: 'Closed',
    rate: 4000.00,
    skills: 'Recruitment, Training, HRIS',
    isUrgent: false,
    cvFileName: 'maria_garcia_cv.pdf'
  },
];

const statusOptions = ['All', 'Open', 'In Progress', 'Closed'];
const departmentOptions = ['All', 'IT', 'Marketing', 'Finance', 'HR', 'Operations', 'Sales', 'Legal'];

export default function ResourcesPage() {
  const router = useRouter();
  const [resources] = useState<IdleResource[]>(mockResources);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [departmentFilter, setDepartmentFilter] = useState('All');
  const [page, setPage] = useState(1);
  const itemsPerPage = 10;

  const filteredResources = resources.filter(resource => {
    const matchesSearch = resource.employeeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resource.employeeId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resource.skills.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || resource.status === statusFilter;
    const matchesDepartment = departmentFilter === 'All' || resource.department === departmentFilter;
    
    return matchesSearch && matchesStatus && matchesDepartment;
  });

  const paginatedResources = filteredResources.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  const totalPages = Math.ceil(filteredResources.length / itemsPerPage);

  const handleViewResource = (id: number) => {
    router.push(`/resources/${id}`);
  };

  const handleEditResource = (id: number) => {
    router.push(`/resources/${id}/edit`);
  };

  const handleImportExcel = () => {
    // Trigger file input
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.xlsx,.xls';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        console.log('Importing Excel file:', file.name);
        // TODO: Implement Excel import logic
      }
    };
    input.click();
  };

  const handleExportExcel = () => {
    console.log('Exporting to Excel...');
    // TODO: Implement Excel export logic
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Open': return '#4CAF50';
      case 'In Progress': return '#FF9800';
      case 'Closed': return '#757575';
      default: return '#757575';
    }
  };

  return (
    <DashboardLayout>
      <Box>
        {/* Header */}
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
          <Typography variant="h4" sx={{ color: '#344767', fontWeight: 'bold' }}>
            Idle Resources
          </Typography>
          <Stack direction="row" spacing={2}>
            <Button
              variant="outlined"
              startIcon={<FileUpload />}
              onClick={handleImportExcel}
              sx={{ borderColor: '#1A73E8', color: '#1A73E8' }}
            >
              Import Excel
            </Button>
            <Button
              variant="outlined"
              startIcon={<FileDownload />}
              onClick={handleExportExcel}
              sx={{ borderColor: '#1A73E8', color: '#1A73E8' }}
            >
              Export Excel
            </Button>
            <Button
              variant="contained"
              startIcon={<Add />}
              onClick={() => router.push('/resources/new')}
              sx={{
                background: 'linear-gradient(135deg, #49A3F1 0%, #1A73E8 100%)',
                borderRadius: 2,
                textTransform: 'none',
              }}
            >
              Add Resource
            </Button>
          </Stack>
        </Box>

        {/* Filters */}
        <Paper sx={{ p: 3, mb: 3, borderRadius: 3, boxShadow: 2 }}>
          <Stack direction="row" spacing={3} alignItems="center">
            <Box flex={1}>
              <TextField
                fullWidth
                placeholder="Search by name, ID, or skills..."
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
              label="Status"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              sx={{ minWidth: 150 }}
            >
              {statusOptions.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              select
              label="Department"
              value={departmentFilter}
              onChange={(e) => setDepartmentFilter(e.target.value)}
              sx={{ minWidth: 150 }}
            >
              {departmentOptions.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
            <IconButton sx={{ color: '#1A73E8' }}>
              <FilterList />
            </IconButton>
          </Stack>
        </Paper>

        {/* Results Summary */}
        <Box mb={2}>
          <Typography variant="body2" sx={{ color: '#7B809A' }}>
            Showing {paginatedResources.length} of {filteredResources.length} resources
          </Typography>
        </Box>

        {/* Table */}
        <Paper sx={{ borderRadius: 3, boxShadow: 3 }}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: '#F8F9FA' }}>
                  <TableCell sx={{ fontWeight: 'bold', color: '#344767' }}>Employee ID</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', color: '#344767' }}>Name</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', color: '#344767' }}>Department</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', color: '#344767' }}>Idle From</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', color: '#344767' }}>Status</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', color: '#344767' }}>Rate</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', color: '#344767' }}>Skills</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', color: '#344767' }}>Urgent</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', color: '#344767' }}>CV</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', color: '#344767' }}>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {paginatedResources.map((resource) => (
                  <TableRow key={resource.id} hover>
                    <TableCell sx={{ fontWeight: 'medium' }}>{resource.employeeId}</TableCell>
                    <TableCell sx={{ fontWeight: 'medium' }}>{resource.employeeName}</TableCell>
                    <TableCell>{resource.department}</TableCell>
                    <TableCell>{resource.idleFromDate}</TableCell>
                    <TableCell>
                      <Chip 
                        label={resource.status} 
                        size="small"
                        sx={{ 
                          backgroundColor: getStatusColor(resource.status),
                          color: 'white',
                          fontWeight: 'medium'
                        }}
                      />
                    </TableCell>
                    <TableCell>${resource.rate.toLocaleString()}</TableCell>
                    <TableCell sx={{ maxWidth: 200 }}>
                      <Typography variant="body2" noWrap>
                        {resource.skills}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      {resource.isUrgent && (
                        <Chip 
                          label="Urgent" 
                          size="small"
                          sx={{ backgroundColor: '#F44336', color: 'white' }}
                        />
                      )}
                    </TableCell>
                    <TableCell>
                      {resource.cvFileName && (
                        <Button
                          size="small"
                          variant="text"
                          sx={{ color: '#1A73E8', textTransform: 'none' }}
                        >
                          View CV
                        </Button>
                      )}
                    </TableCell>
                    <TableCell>
                      <IconButton 
                        size="small" 
                        onClick={() => handleViewResource(resource.id)}
                        sx={{ color: '#1A73E8', mr: 1 }}
                      >
                        <Visibility />
                      </IconButton>
                      <IconButton 
                        size="small" 
                        onClick={() => handleEditResource(resource.id)}
                        sx={{ color: '#FF9800' }}
                      >
                        <Edit />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
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