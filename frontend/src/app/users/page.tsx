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
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  MenuItem
} from '@mui/material';
import { Add, Edit, Delete } from '@mui/icons-material';
import DashboardLayout from '@/components/DashboardLayout';
import { useForm } from 'react-hook-form';

interface User {
  id: number;
  username: string;
  role: string;
  department: string;
  createdAt: string;
}

interface UserFormData {
  username: string;
  role: string;
  department: string;
}

const mockUsers: User[] = [
  { id: 1, username: 'admin', role: 'admin', department: 'IT', createdAt: '2024-01-15' },
  { id: 2, username: 'ra_user1', role: 'ra', department: 'IT', createdAt: '2024-01-16' },
  { id: 3, username: 'manager_it', role: 'manager', department: 'IT', createdAt: '2024-01-17' },
  { id: 4, username: 'viewer1', role: 'viewer', department: 'HR', createdAt: '2024-01-18' },
];

const roles = [
  { value: 'admin', label: 'Admin' },
  { value: 'ra', label: 'RA' },
  { value: 'manager', label: 'Manager' },
  { value: 'viewer', label: 'Viewer' },
];

const departments = [
  'IT', 'HR', 'Finance', 'Marketing', 'Operations', 'Sales', 'Legal'
];

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [open, setOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const { register, handleSubmit, reset, setValue } = useForm<UserFormData>();

  const handleAddUser = () => {
    setEditingUser(null);
    reset();
    setOpen(true);
  };

  const handleEditUser = (user: User) => {
    setEditingUser(user);
    setValue('username', user.username);
    setValue('role', user.role);
    setValue('department', user.department);
    setOpen(true);
  };

  const handleDeleteUser = (id: number) => {
    setUsers(users.filter(user => user.id !== id));
  };

  const onSubmit = (data: UserFormData) => {
    if (editingUser) {
      // Update user
      setUsers(users.map(user => 
        user.id === editingUser.id 
          ? { ...user, ...data }
          : user
      ));
    } else {
      // Add new user
      const newUser: User = {
        id: Math.max(...users.map(u => u.id)) + 1,
        ...data,
        createdAt: new Date().toISOString().split('T')[0]
      };
      setUsers([...users, newUser]);
    }
    setOpen(false);
    reset();
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin': return '#F44336';
      case 'ra': return '#FF9800';
      case 'manager': return '#4CAF50';
      case 'viewer': return '#2196F3';
      default: return '#757575';
    }
  };

  return (
    <DashboardLayout>
      <Box>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
          <Typography variant="h4" sx={{ color: '#344767', fontWeight: 'bold' }}>
            User Management
          </Typography>
          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={handleAddUser}
            sx={{
              background: 'linear-gradient(135deg, #49A3F1 0%, #1A73E8 100%)',
              borderRadius: 2,
              textTransform: 'none',
            }}
          >
            Add New User
          </Button>
        </Box>

        <Paper sx={{ borderRadius: 3, boxShadow: 3 }}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: '#F8F9FA' }}>
                  <TableCell sx={{ fontWeight: 'bold', color: '#344767' }}>ID</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', color: '#344767' }}>Username</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', color: '#344767' }}>Role</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', color: '#344767' }}>Department</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', color: '#344767' }}>Created At</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', color: '#344767' }}>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user.id} hover>
                    <TableCell>{user.id}</TableCell>
                    <TableCell sx={{ fontWeight: 'medium' }}>{user.username}</TableCell>
                    <TableCell>
                      <Chip 
                        label={user.role.toUpperCase()} 
                        size="small"
                        sx={{ 
                          backgroundColor: getRoleColor(user.role),
                          color: 'white',
                          fontWeight: 'medium'
                        }}
                      />
                    </TableCell>
                    <TableCell>{user.department}</TableCell>
                    <TableCell>{user.createdAt}</TableCell>
                    <TableCell>
                      <IconButton 
                        size="small" 
                        onClick={() => handleEditUser(user)}
                        sx={{ color: '#1A73E8', mr: 1 }}
                      >
                        <Edit />
                      </IconButton>
                      <IconButton 
                        size="small" 
                        onClick={() => handleDeleteUser(user.id)}
                        sx={{ color: '#F44336' }}
                      >
                        <Delete />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>

        {/* Add/Edit User Dialog */}
        <Dialog open={open} onClose={() => setOpen(false)} maxWidth="sm" fullWidth>
          <DialogTitle sx={{ color: '#344767', fontWeight: 'bold' }}>
            {editingUser ? 'Edit User' : 'Add New User'}
          </DialogTitle>
          <form onSubmit={handleSubmit(onSubmit)}>
            <DialogContent sx={{ pt: 2 }}>
              <TextField
                {...register('username', { required: true })}
                label="Username"
                fullWidth
                margin="normal"
              />
              <TextField
                {...register('role', { required: true })}
                label="Role"
                fullWidth
                select
                margin="normal"
              >
                {roles.map((role) => (
                  <MenuItem key={role.value} value={role.value}>
                    {role.label}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                {...register('department', { required: true })}
                label="Department"
                fullWidth
                select
                margin="normal"
              >
                {departments.map((dept) => (
                  <MenuItem key={dept} value={dept}>
                    {dept}
                  </MenuItem>
                ))}
              </TextField>
            </DialogContent>
            <DialogActions sx={{ p: 3 }}>
              <Button onClick={() => setOpen(false)} sx={{ color: '#7B809A' }}>
                Cancel
              </Button>
              <Button 
                type="submit" 
                variant="contained"
                sx={{
                  background: 'linear-gradient(135deg, #49A3F1 0%, #1A73E8 100%)',
                  borderRadius: 2,
                }}
              >
                {editingUser ? 'Update' : 'Add'}
              </Button>
            </DialogActions>
          </form>
        </Dialog>
      </Box>
    </DashboardLayout>
  );
}