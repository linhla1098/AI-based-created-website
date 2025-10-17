[Bối cảnh & Vai trò]
Bạn là System Architect chuyên thiết kế ứng dụng web cho hackathon. Tạo kiến trúc hệ thống Quản Lý Idle Resource hoàn thành trong 3 tiếng.

[Nguồn thông tin]
- Requirement: requirements folder
- BasicDesign: design/bd folder
- DetailDesign: design/dd folder

[Nhiệm vụ]
Tạo architecture.md cho hệ thống quản lý idle resource trong folder `AI Copilot S`

[Công nghệ & Ràng buộc]

**Stack:**
- Frontend: Next.js 15 + Material-UI + Tailwind CSS(đc enable trong hệ thống Nextjs nên không cần thêm dependency) + TanStack Query
- Backend: NestJS + TypeORM  
- Database: MySQL 8.0
- Package: yarn

**Design System & Tailwind Config:**

- design layout rõ ràng, bên trái là menu navigation, bên phải là main theo đúng phong cách **Argon Dashboard (Material-UI Inspired)**

This design is based on the "Argon Dashboard Material UI" theme. It's a modern, clean, and professional style that utilizes sharp box-shadows, vibrant colors, and gradients.
refer: https://themewagon.github.io/argon-dashboard-material-ui/dashboard 

⚠️ **TAILWIND CSS v4 CRITICAL SETUP RULES:**

### CSS Import (MANDATORY):
```css
/* globals.css - ONLY this import for Tailwind v4 */
@import "tailwindcss";

/* Custom Argon styles using standard CSS (NOT @apply) */
.argon-card {
  background: white;
  border-radius: 0.75rem;
  box-shadow: 0rem 0.25rem 0.375rem -0.0625rem rgba(0, 0, 0, 0.1);
}

.argon-button-gradient {
  background: linear-gradient(135deg, #49A3F1 0%, #1A73E8 100%);
  color: white !important;
  border: none;
  font-weight: 500;
  padding: 8px 16px;
  border-radius: 0.5rem;
  transition: all 0.2s ease;
}
```

### PostCSS Config (DO NOT CHANGE):
```javascript
// postcss.config.mjs
const config = {
  plugins: ["@tailwindcss/postcss"],
};
```

### Color Classes (MANDATORY):
```css
✅ CORRECT: text-gray-700, bg-gray-50, border-gray-200, hover:bg-gray-100
❌ WRONG: text-grey-700, bg-grey-50, border-grey-200, hover:bg-gray-25
```

### Layout Components:
```tsx
✅ CORRECT: Use <Box> for simple layouts
<Box className="flex justify-between items-center">

❌ WRONG: Use <Grid> for simple layouts  
<Grid container justifyContent="space-between">
```

- refer: https://mui.com/material-ui/integrations/tailwindcss/tailwindcss-v4/ để cấu hình MUI và tailwindss

cấu hình các màu chủ đạo (Tailwind v4 - simplified):
```javascript
// tailwind.config.ts
const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'argon-blue': '#1A73E8',
        'argon-blue-light': '#49A3F1',
        'background-gray': '#F8F9FA',
      },
    },
  },
};
```

**Authentication Setup:**
```typescript
// JWT Strategy implementation for NestJS
// lib/api.ts with axios interceptors for token management
// Role-based access control: Admin, RA, Manager, Viewer
// Department-based data filtering
```

**Middleware Configuration (NextAuth):**
```typescript
// src/middleware.ts - Route protection and role-based redirects (EXAMPLE)
import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

export default withAuth(
  function middleware(req) {}

export const config = {
  matcher: ['/', '/login', '/dashboard/:path*'],
};
```

**Chiến lược Hackathon:**
- NO SSO/external systems - chỉ Username/Password
- Phase 1 only: S-01 đến S-06
- tránh cài nhiều thư viện không cần thiết
- vì là cuộc thi cho nên hãy fix cứng giá trị chứ không cần thiết tạo file env  ví dụ:
  type: 'mysql',
  host:  'localhost',
  port:  3306,
  password:'root',
  database:'idle_resource_db',
  entities: [User],
  synchronize: true, // Only in development
  logging: true,
  autoLoadEntities: true,
- loại bỏ các test tự động để giảm thời gian gen code
- Sử dụng seed db của hệ thông nestjs & typeorm
- tính năng đa ngôn ngữ gây tốn thời gian nên tạm thời bỏ qua, khi nào có thì sẽ yêu cầu

**Dependencies:**
- Frontend:
    "@emotion/react": "^11.14.0",
    "@emotion/styled": "^11.14.1",
    "@hookform/resolvers": "^5.2.1",
    "@mui/icons-material": "^7.2.0",
    "@mui/material": "^7.2.0",
    "@tanstack/react-query": "^5.84.1",
    "@tanstack/react-query-devtools": "^5.84.1",
    "axios": "^1.11.0",
    "next": "15.4.5",
    "next-auth": "^4.24.11",
    "react": "19.1.0",
    "react-dom": "19.1.0",
    "react-hook-form": "^7.61.1",
    "zod": "^4.0.14"
    
- DevDependencies:
    "@tailwindcss/postcss": "^4",
    "tailwindcss": "^4",
    
**React Query Setup:**
```typescript
// app/layout.tsx - MUST wrap with QueryClientProvider
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

export default function RootLayout({ children }) {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
}
```
- Backend: 
    "@nestjs/common": "^11.0.1",
    "@nestjs/core": "^11.0.1",
    "@nestjs/platform-express": "^11.0.1",
    "@nestjs/typeorm": "^11.0.0",
    "bcrypt": "^5.1.0",
    "exceljs": "^4.4.0",
    "mysql2": "^3.6.0",
    "reflect-metadata": "^0.2.2",
    "rxjs": "^7.8.1",
    "typeorm": "^0.3.25"

- **TUYỆT ĐỐI KHÔNG SỬ DỤNG THÊM BẤT KỲ THƯ VIỆN NÀO NGOÀI NHỮNG THƯ VIỆN ĐÃ LIỆT KÊ BẰNG CÁC DEPENDENCIES Ở TRÊN, NẾU CẦN HÃY NÊU LÝ DO RÕ RÀNG**


[Yêu cầu Output]
Tạo file Markdown với các phần:

1. **Sơ đồ Kiến trúc**: Mermaid graph - Next.js → NestJS → MySQL
2. **Technology Stack**: Dependencies + lý do chọn
3. **Frontend Structure**: App router, middleware, hooks, MUI
4. **Backend Structure**: Modules, entities, guards, DTOs 
5. **Database**: TypeORM entities, migrations, relationships
6. **Authentication**: NextAuth.js + JWT flow + Middleware protection
7. **File Management**: Upload/download với multer + dropzone
8. **I18n Setup**: next-i18next cho EN/JP
9. **Dashboard**: recharts + data aggregation
10. **Development**: docker-compose (MySQL only với root/root, db: idle_resource_db) chỉ sử dụng Mysql 8.0 và KHÔNG THÊM một service nào khác kể cả phpadmin hay bất kì một service nào, đồng thời cũng không tạo những thứ không cần thiết vì mục tiêu là sử dụng db với root/root.

[Lưu ý]
- Tối ưu MUI + Tailwind CSS integration
- Strict role permissions  
- react-hook-form + zod validation
- CSV với papaparse
- TypeORM change tracking
- frontend port 3001
- backend port 3000

**CRITICAL AUTH & SETUP CONFIG:**

**QueryClient Setup (MANDATORY):**
```tsx
// app/layout.tsx - MUST wrap with QueryClientProvider
'use client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
}
```

**Auth Implementation:**
- Backend: NestJS Guards + JWT tokens
- Frontend: Simple token storage (localStorage/sessionStorage)
- NO NextAuth complexity for hackathon speed
- Role-based access