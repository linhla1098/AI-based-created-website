import axios from 'axios';

// API base configuration
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', {
      url: error.config?.url,
      method: error.config?.method,
      status: error.response?.status,
      data: error.response?.data,
      message: error.message,
    });

    if (error.response?.status === 401) {
      // Remove token and redirect to login
      localStorage.removeItem('access_token');
      localStorage.removeItem('user');
      if (window.location.pathname !== '/login') {
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

// Types
export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  access_token: string;
  user: User;
}

export interface User {
  id: number;
  username: string;
  role: 'ADMIN' | 'RA' | 'MANAGER' | 'VIEWER';
  department: string;
  createdAt: string;
  updatedAt: string;
}

export interface IdleResource {
  id: number;
  employeeId: string;
  employeeName: string;
  department: string;
  idleFromDate: string;
  status: 'Open' | 'In Progress' | 'Closed';
  processNote: string;
  rate: number;
  skills: string;
  source: 'Internal' | 'External' | 'Referral';
  isUrgent: boolean;
  cvFilePath?: string;
  cvFileName?: string;
  createdAt: string;
  updatedAt: string;
  createdBy: User;
  updatedBy: User;
}

export interface ResourceFilters {
  search?: string;
  department?: string;
  status?: 'Open' | 'In Progress' | 'Closed';
  source?: 'Internal' | 'External' | 'Referral';
  isUrgent?: boolean;
  dateFrom?: string;
  dateTo?: string;
  page?: number;
  limit?: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface DashboardStats {
  overview: {
    totalResources: number;
    openResources: number;
    inProgressResources: number;
    closedResources: number;
    urgentResources: number;
  };
  departmentStats: Array<{
    department: string;
    count: number;
  }>;
  monthlyStats: Array<{
    month: string;
    status: string;
    count: number;
  }>;
}

// Auth API calls
export const authApi = {
  login: async (credentials: LoginRequest): Promise<LoginResponse> => {
    const response = await api.post<LoginResponse>('/auth/login', credentials);
    return response.data;
  },

  getProfile: async (): Promise<User> => {
    const response = await api.get<User>('/auth/profile');
    return response.data;
  },
};

// Idle Resources API calls
export const resourcesApi = {
  getAll: async (filters: ResourceFilters = {}): Promise<PaginatedResponse<IdleResource>> => {
    const response = await api.get<PaginatedResponse<IdleResource>>('/idle-resources', {
      params: filters,
    });
    return response.data;
  },

  getById: async (id: number): Promise<IdleResource> => {
    const response = await api.get<IdleResource>(`/idle-resources/${id}`);
    return response.data;
  },

  create: async (resource: Partial<IdleResource>): Promise<IdleResource> => {
    const response = await api.post<IdleResource>('/idle-resources', resource);
    return response.data;
  },

  update: async (id: number, resource: Partial<IdleResource>): Promise<IdleResource> => {
    const response = await api.patch<IdleResource>(`/idle-resources/${id}`, resource);
    return response.data;
  },

  delete: async (id: number): Promise<void> => {
    await api.delete(`/idle-resources/${id}`);
  },

  getDashboardStats: async (): Promise<DashboardStats> => {
    const response = await api.get<DashboardStats>('/idle-resources/dashboard-stats');
    return response.data;
  },
};

export default api;