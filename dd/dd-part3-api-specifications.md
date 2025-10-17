# Detail Design Document - Part 3: API Specifications

## 3.1 API Overview

### 3.1.1 Base URL Structure
- Development: `http://localhost:3000/api/v1`
- Production: `https://api.irms.example.com/v1`

### 3.1.2 Authentication
All API endpoints (except /auth) require JWT token in Authorization header:
```
Authorization: Bearer <jwt_token>
```

### 3.1.3 Common Response Format
```typescript
interface ApiResponse<T> {
    success: boolean;
    data?: T;
    error?: {
        code: string;
        message: string;
        details?: any;
    };
    meta?: {
        page?: number;
        pageSize?: number;
        total?: number;
    };
}
```

## 3.2 API Endpoints

### 3.2.1 Authentication APIs

#### POST /auth/login
Login to the system
```typescript
Request:
{
    username: string;
    password: string;
}

Response:
{
    success: true,
    data: {
        token: string;
        user: {
            id: number;
            username: string;
            role: string;
            permissions: string[];
        }
    }
}
```

#### POST /auth/logout
Logout from the system
```typescript
Request: {}

Response:
{
    success: true
}
```

### 3.2.2 Resource Management APIs

#### GET /resources
Get list of idle resources with filtering
```typescript
Request Query Parameters:
{
    page?: number;
    pageSize?: number;
    sortBy?: string;
    sortDir?: 'asc' | 'desc';
    department?: number;
    status?: string;
    idleFrom?: string;
    idleTo?: string;
    search?: string;
}

Response:
{
    success: true,
    data: IdleResource[],
    meta: {
        page: number;
        pageSize: number;
        total: number;
    }
}
```

#### POST /resources
Create new idle resource
```typescript
Request:
{
    name: string;
    departmentId: number;
    skills: string[];
    rate: number;
    status: string;
    idleFrom: string;
    idleTo?: string;
    processNotes?: string;
}

Response:
{
    success: true,
    data: IdleResource
}
```

#### PUT /resources/:id
Update existing idle resource
```typescript
Request:
{
    name?: string;
    departmentId?: number;
    skills?: string[];
    rate?: number;
    status?: string;
    idleFrom?: string;
    idleTo?: string;
    processNotes?: string;
}

Response:
{
    success: true,
    data: IdleResource
}
```

#### DELETE /resources/:id
Delete idle resource
```typescript
Response:
{
    success: true
}
```

### 3.2.3 File Management APIs

#### POST /resources/:id/cv
Upload CV file
```typescript
Request:
FormData with:
- file: File (PDF/DOC/DOCX)

Response:
{
    success: true,
    data: {
        id: number;
        fileName: string;
        fileUrl: string;
    }
}
```

#### GET /resources/:id/cv
Download CV file
```typescript
Response:
Binary file stream with appropriate Content-Type
```

### 3.2.4 Report APIs

#### GET /reports/dashboard
Get dashboard statistics
```typescript
Request Query Parameters:
{
    department?: number;
    period?: string;
}

Response:
{
    success: true,
    data: {
        totalIdle: number;
        urgentCases: number;
        byDepartment: {
            departmentId: number;
            count: number;
        }[];
        byStatus: {
            status: string;
            count: number;
        }[];
        trend: {
            date: string;
            count: number;
        }[];
    }
}
```

## 3.3 Error Handling

### 3.3.1 HTTP Status Codes
- 200: Success
- 400: Bad Request
- 401: Unauthorized
- 403: Forbidden
- 404: Not Found
- 422: Validation Error
- 500: Server Error

### 3.3.2 Error Response Format
```typescript
{
    success: false,
    error: {
        code: string;
        message: string;
        details?: {
            field: string;
            message: string;
        }[];
    }
}
```

### 3.3.3 Common Error Codes
```typescript
const ErrorCodes = {
    INVALID_CREDENTIALS: 'AUTH001',
    SESSION_EXPIRED: 'AUTH002',
    INVALID_TOKEN: 'AUTH003',
    PERMISSION_DENIED: 'AUTH004',
    VALIDATION_ERROR: 'VAL001',
    RESOURCE_NOT_FOUND: 'RES001',
    FILE_TOO_LARGE: 'FILE001',
    INVALID_FILE_TYPE: 'FILE002',
    DATABASE_ERROR: 'DB001',
    INTERNAL_ERROR: 'SYS001'
};
```
