# Basic Design Document - Part 6: Data Structure Definition

## 1. User Interface Data Structures

### 1.1 User Authentication
```typescript
interface UserCredentials {
    username: string;     // Required, max 50 chars
    password: string;     // Required, max 50 chars
}

interface UserSession {
    token: string;       // JWT token
    expiresIn: number;   // Expiration in seconds
    permissions: string[]; // User permissions
}
```

### 1.2 Idle Resource Data
```typescript
interface IdleResource {
    id: number;          // Primary key
    name: string;        // Required, max 100 chars
    departmentId: number; // Required, FK to Department
    skills: string[];    // Required, array of skill strings
    rate: number;        // Required, decimal
    status: IdleStatus;  // Required, enum
    idleFrom: Date;      // Required, ISO date
    idleTo?: Date;       // Optional, ISO date
    cvPath?: string;     // Optional, file path
    processNotes: string; // Optional, max 1000 chars
    createdAt: Date;     // System generated
    updatedAt: Date;     // System generated
    createdBy: number;   // FK to User
    updatedBy: number;   // FK to User
}

enum IdleStatus {
    ACTIVE = 'ACTIVE',
    ASSIGNED = 'ASSIGNED',
    TRAINING = 'TRAINING',
    NOT_YET_OPEN = 'NOT_YET_OPEN'
}
```

### 1.3 Grid Data Structures
```typescript
interface GridState {
    pageSize: number;    // Items per page
    page: number;        // Current page
    sortBy: string;      // Sort column
    sortDir: 'asc' | 'desc'; // Sort direction
    filters: GridFilter[]; // Active filters
}

interface GridFilter {
    field: string;       // Field name
    operator: string;    // Filter operator
    value: any;         // Filter value
}

interface GridResponse<T> {
    items: T[];         // Array of items
    total: number;      // Total count
    page: number;       // Current page
    pageSize: number;   // Items per page
}
```

### 1.4 Report Data Structures
```typescript
interface DepartmentReport {
    departmentId: number;
    departmentName: string;
    totalIdle: number;
    activeIdle: number;
    urgentCases: number; // ≥2 months
    avgIdleDuration: number;
}

interface TrendData {
    date: Date;
    totalIdle: number;
    byDepartment: {
        [deptId: number]: number;
    };
    byStatus: {
        [status: string]: number;
    };
}
```

### 1.5 Update History
```typescript
interface UpdateHistory {
    id: number;
    resourceId: number;
    fieldName: string;
    oldValue: string;
    newValue: string;
    updatedAt: Date;
    updatedBy: number;
    updatedByName: string;
}
```

## 2. Form Validation Rules

### 2.1 Login Form
```typescript
const LoginValidation = {
    username: {
        required: true,
        maxLength: 50,
        pattern: /^[a-zA-Z0-9_]+$/
    },
    password: {
        required: true,
        maxLength: 50,
        minLength: 8,
        pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/
    }
};
```

### 2.2 Idle Resource Form
```typescript
const IdleResourceValidation = {
    name: {
        required: true,
        maxLength: 100
    },
    departmentId: {
        required: true,
        type: 'number'
    },
    skills: {
        required: true,
        minItems: 1
    },
    rate: {
        required: true,
        min: 0,
        type: 'number'
    },
    status: {
        required: true,
        enum: Object.values(IdleStatus)
    },
    idleFrom: {
        required: true,
        type: 'date'
    },
    idleTo: {
        type: 'date',
        min: 'idleFrom'
    },
    processNotes: {
        maxLength: 1000
    }
};
```

### 2.3 File Upload Rules
```typescript
const FileUploadRules = {
    cv: {
        maxSize: 10 * 1024 * 1024, // 10MB
        allowedTypes: ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']
    },
    excel: {
        maxSize: 10 * 1024 * 1024, // 10MB
        allowedTypes: ['application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet']
    }
};
```
