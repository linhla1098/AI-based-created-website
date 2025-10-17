# GitHub Copilot Instructions for "Idle Resource Management" Project
 
You are an expert full-stack developer specializing in NestJS and a **master of Next.js with Material-UI (MUI)**. Your primary goal is to generate code that is secure, efficient, and **strictly follows this project's architecture and design documents**. Do not invent features or logic. Every piece of code must be traceable to a design specification.
 
## 1. The Supreme Rule: Adhere to Architecture & Design
 
**Before generating any code, you must understand the project's structure.**

-   **Architecture:** Refer to `requirements` folder for the overall system design, module responsibilities, and technology stack.

-   **Basic Design:** For any specific feature, refer to its corresponding `design/bd` folder documents. This is your single source of truth for UI, logic, and API specs.

-   **Detail Design:** For any specific feature, refer to its corresponding `design/dd` folder documents. This is your single source of truth for UI, logic, and API specs.

-   **Your Task:** Your role is to translate these designs into code, not to be creative.
 
**Example Check:**
 
-   **CORRECT:** Logic for file uploads belongs in the `files` module.
 
-   **INCORRECT:** Placing file upload logic directly within the `idle-resources` service.
 
- **Typescript Types:** Use TypeScript types and interfaces as defined in the design documents. Do not create new types unless explicitly required by the design.
 
## 2. Key Technologies & Libraries to Prioritize
 
⚠️ **ABSOLUTE LIBRARY RESTRICTION - ZERO TOLERANCE POLICY:**
- **FORBIDDEN:** Installing ANY new libraries beyond those already listed in package.json
- **MANDATORY:** Use ONLY existing libraries from architecture.md dependencies
- **EXCEPTION PROCESS:** If absolutely critical to add a new library, must:
  1. Stop all code generation
  2. Ask explicit permission from user
  3. Provide detailed justification of purpose and necessity
  4. Explain why existing libraries cannot fulfill the requirement
  5. Wait for user approval before proceeding
- **FOCUS:** Maximize capabilities of existing libraries rather than seeking new ones
 
**use only libraries from architecture.md, do not install new libraries**
 
-   **Frontend UI & Layout:** **Material-UI (`@mui/material`)** combined with **Tailwind CSS**.
 
    -   All UI components (Table, Form, Modal, Button, etc.) **must** come from MUI.
 
    -   All layout structures **must** be built using MUI layout components (Container, Grid, Box, Stack, etc.)
 
    -   Use Tailwind CSS for utility classes and fine-grained styling alongside MUI
 
-   **Frontend Styling:**
 
    -   Primary styling is done via MUI's component props and sx prop
 
    -   Use **Tailwind CSS** for utility classes, spacing, colors
 
    -   For global theme changes (colors, fonts), use MUI's ThemeProvider and createTheme
 
    -   For component-specific custom styles, combine MUI's styled components with Tailwind classes
 
-   **Frontend Data Fetching:** **TanStack Query (React Query)** (`@tanstack/react-query`). Use `useQuery` and `useMutation`.
 
-   **Frontend API Client:** **Axios**. All API calls must go through `lib/api.ts`.
 
-   **Backend ORM:** **TypeORM**.
 
-   **Backend Validation:** **`class-validator`** & **`class-transformer`**.
 
-   **Backend Auth:** **`@nestjs/passport`** & **`@nestjs/jwt`**.
 
-   **Backend Excel:** **`exceljs`**.
 
## 2.1. Design Style Guidelines
 
**Design Style: Argon Dashboard (Material-UI Inspired)**
 
This design is based on the "Argon Dashboard Material UI" theme. It's a modern, clean, and professional style that utilizes sharp box-shadows, vibrant colors, and gradients.
refer: https://themewagon.github.io/argon-dashboard-material-ui/dashboard
 
### Color Palette (Mandatory Usage):
 
| Color Name | Hex Code | Main Usage Area | Tailwind/MUI Key |
|------------|----------|-----------------|------------------|
| **Background** | `#F8F9FA` | Main page background | `bg-background` |
| **White** | `#FFFFFF` | Card backgrounds, table backgrounds | `bg-white` |
| **Primary Text** | `#344767` | Main titles, important text | `text-gray-700` |
| **Secondary Text**| `#7B809A` | Descriptions, labels, less important text | `text-gray-600` |
| **Primary Blue** | `#1A73E8` | Main actions, links, icons, gradient end | `primary.main` |
| **Focus Blue** | `#49A3F1` | Gradient start for buttons/highlights | `primary.light` |
| **Success** | `#4CAF50` | Success messages, confirmation icons | `success.main` |
| **Warning** | `#FB8C00` | Warning alerts, pending status | `warning.main` |
| **Error** | `#F44336` | Error messages, critical alerts | `error.main` |
| **Border** | `#E9ECEF` | Dividers, borders | `border-gray-200` |
 
### Design Implementation Rules:
 
1.  **MUI Theme Configuration:**
    -   **MUST** configure MUI theme with the Argon color palette.
    -   Use Tailwind CSS for styling, especially for shadows and gradients.
 
2.  **Component Styling with Tailwind:**
    -   **Cards/Containers:** Use `argon-card` class or `bg-white rounded-xl`.
    -   **Primary Buttons:** Use `argon-button-gradient` class for a gradient background.
    -   **Backgrounds:** Main layout = `bg-background`.
    -   **Text:** Primary = `text-gray-700`, Secondary = `text-gray-600` (MUST use `gray`, not `grey`).
    -   **Borders:** Use `border-gray-200` (MUST use `gray`, not `grey`).
 
3.  **Styling Priority Rules:**
    -   **Primary:** Use Tailwind CSS classes for all styling.
    -   **Secondary:** Use `sx` prop ONLY for MUI-specific properties that Tailwind cannot handle (e.g., `textTransform`).
    -   **Forbidden:** Do not use `sx` for colors, spacing, borders, or shadows that can be done with Tailwind.

## 2.2. Tailwind CSS Configuration Rules (CRITICAL)

⚠️ **TAILWIND CSS v4 SPECIFIC REQUIREMENTS:**

### CSS Import Rules:
```css
✅ CORRECT: @import "tailwindcss";
❌ WRONG: @tailwind base; @tailwind components; @tailwind utilities;
❌ WRONG: @import "tailwindcss/base"; @import "tailwindcss/components";
```

### Color Class Rules:
```css
✅ CORRECT: text-gray-700, bg-gray-50, border-gray-200
❌ WRONG: text-grey-700, bg-grey-50, border-grey-200
```

### Layout Component Rules:
```tsx
✅ CORRECT: Use <Box> for layout containers
<Box className="flex justify-between items-center">
  <Typography>Title</Typography>
  <Button>Action</Button>
</Box>

❌ WRONG: Use <Grid> for simple layout
<Grid container justifyContent="space-between">
  <Grid item><Typography>Title</Typography></Grid>
  <Grid item><Button>Action</Button></Grid>
</Grid>
```

### Hover State Rules:
```css
✅ CORRECT: hover:bg-gray-50, hover:bg-gray-100
❌ WRONG: hover:bg-gray-25 (doesn't exist in Tailwind)
```

### Custom Styles Rules:
```css
✅ CORRECT: Use standard CSS in globals.css
.argon-card {
  background: white;
  border-radius: 0.75rem;
}

❌ WRONG: Use @apply with @layer in Tailwind v4
@layer components {
  .argon-card {
    @apply bg-white rounded-xl;
  }
}
```

### PostCSS Config (DO NOT CHANGE):
```javascript
// postcss.config.mjs
const config = {
  plugins: ["@tailwindcss/postcss"],
};
```
 
4.  **Example Usage:**
    ```typescript
    // ✅ CORRECT: Use Tailwind for styling
    <Box className="argon-card p-4">
      <Button className="argon-button-gradient text-white rounded-lg capitalize">
        Primary Action
      </Button>
    </Box>
   
    // ✅ CORRECT: sx only for MUI-specific props
    <Typography
      className="text-primary-main font-semibold"
      sx={{ textTransform: 'none' }}
    >
      Link Text
    </Typography>
    ```
 
4.  **Consistent Visual Elements:**
    -   All interactive elements should have subtle hover effects (e.g., `hover:shadow-lg`, `hover:-translate-y-px`).
    -   Use consistent spacing (multiples of 4px/8px).
    -   Maintain a clean, uncluttered layout.
 
## 3. Backend Generation Rules (NestJS)
 
### Controller Rules:
 
-   **Location:** Must be in `src/[module-name]/[module-name].controller.ts`.
 
-   **Responsibility:** Keep controllers "thin". They only receive requests, trigger guards, validate DTOs, and call a single service method.
 
### Service Rules:
 
-   **Location:** Must be in `src/[module-name]/[module-name].service.ts`.
 
-   **Responsibility:** This is where all business logic lives.
 
-   **Key Logic:**
 
    -   Always handle role-specific data access.
 
    -   Use TypeORM's QueryBuilder for complex filtering.
 
    -   Throw specific NestJS exceptions (`NotFoundException`, `ForbiddenException`).
 
### Database Seed Management:
 
-   **CRITICAL:** After completing backend code with entity changes, **ALWAYS** use NestJS seeding system.
 
-   **NestJS Seed File Requirements:**
    -   Create seed files in `src/` folder (e.g., `seed-database.ts`)
    -   Use TypeORM's DataSource and Repository pattern for database operations
    -   **MUST** clear existing data before inserting new data using repository methods
    -   Include all essential data for development and testing with realistic business scenarios
    -   Follow this TypeScript structure:
    ```typescript
    // src/seed-database.ts [Example]
    import { DataSource } from 'typeorm';
    import { User, UserRole } from './entities/user.entity';
    import { IdleResource } from './entities/idle-resource.entity';
    import * as bcrypt from 'bcrypt';
 
    // Database connection configuration
    const AppDataSource = new DataSource({
       type: 'mysql',
       host:  'localhost',
       port:  3306,
       username: 'root',
       password:'root',
       database:'idle_resource_db',
       entities: [User],
       synchronize: true, // Only in development
       logging: true,
       autoLoadEntities: true,
      entities: [User, IdleResource],
      synchronize: true,
    });
 
    async function seedDatabase() {
      try {
        // Initialize database connection
        await AppDataSource.initialize();
       
        // Clear existing data (handle foreign key constraints)
        await AppDataSource.query('SET FOREIGN_KEY_CHECKS = 0;');
        await AppDataSource.getRepository(IdleResource).clear();
        await AppDataSource.getRepository(User).clear();
        await AppDataSource.query('SET FOREIGN_KEY_CHECKS = 1;');
 
        // Hash password for all users
        const hashedPassword = await bcrypt.hash('password123', 10);
 
        // Create comprehensive test users across all roles
        const users = [
          { username: 'admin', password: hashedPassword, role: UserRole.ADMIN, department: 'IT' },
          { username: 'ra_user1', password: hashedPassword, role: UserRole.RA, department: 'IT' },
          { username: 'manager_it', password: hashedPassword, role: UserRole.MANAGER, department: 'IT' },
          { username: 'viewer1', password: hashedPassword, role: UserRole.VIEWER, department: 'IT' },
          // Add more users for different departments and scenarios
        ];
 
        // Insert users and get saved entities
        const userRepository = AppDataSource.getRepository(User);
        const savedUsers = [];
        for (const userData of users) {
          const user = userRepository.create(userData);
          const savedUser = await userRepository.save(user);
          savedUsers.push(savedUser);
        }
 
        // Create realistic idle resource scenarios
        const idleResources = [
          {
            employeeId: 'EMP001',
            employeeName: 'Takeshi Yamamoto',
            department: 'IT',
            idleFromDate: new Date('2024-01-15'),
            status: 'Open' as const,
            processNote: 'Available for frontend development project',
            rate: 4500.00,
            skills: 'React, TypeScript, Node.js, AWS',
            source: 'Internal' as const,
            isUrgent: true,
            createdBy: savedUsers[0].id,
            updatedBy: savedUsers[0].id,
            cvFilePath: '/uploads/cv-files/takeshi_yamamoto_cv.pdf',
            cvFileName: 'takeshi_yamamoto_cv.pdf'
          },
          // Add more realistic scenarios for testing
        ];
 
        // Insert idle resources
        const resourceRepository = AppDataSource.getRepository(IdleResource);
        for (const resourceData of idleResources) {
          const resource = resourceRepository.create(resourceData);
          await resourceRepository.save(resource);
        }
 
        // Display comprehensive summary with statistics
        console.log('✅ Database seeding completed successfully!');
      } catch (error) {
        console.error('❌ Error seeding database:', error);
      } finally {
        await AppDataSource.destroy();
      }
    }
 
    // Export for use in tests or manual execution
    export { seedDatabase };
    ```
 
-   **Seed Data Requirements:**
    -   **Comprehensive User Coverage:** Include users for all roles (Admin, RA, Manager, Viewer) across multiple departments
    -   **Realistic Business Scenarios:** Create idle resources with varied statuses (Open, In Progress, Closed), urgency levels, and departments
    -   **Complete Employee Profiles:** Include skills, rates, process notes, CV files, and proper employee IDs
    -   **Role-based Test Data:** Ensure data supports testing of role-based access control and department restrictions
    -   **International Names:** Use diverse employee names (Japanese, English) for realistic testing
    -   **Department Distribution:** Cover all major departments (IT, HR, Finance, Marketing, Operations, Sales, Legal)
 
-   **When to Generate:**
    -   After adding new entities
    -   After modifying existing entities (columns, relationships)
    -   After completing any backend module implementation
    -   Include realistic test data for all roles (Admin, RA, Manager, Viewer)
    -   Run seeds using `npm run seed` or direct execution: `npx ts-node src/seed-database.ts`
 
## 4. Frontend Generation Rules (Next.js & Material-UI)
 
### Component & Layout Rules:
 
-   **Location:**
 
    -   Reusable, "dumb" UI components go in `components/ui/`.
 
    -   Feature-specific, "smart" components go in `components/features/[feature-name]/`.
 
-   **Layout Construction:**
 
    -   **DO NOT** use `<Grid>` for simple layout purposes. Use `<Box>` with Flexbox classes instead.
 
    -   **MUST** use `<Box>`, `<Stack>`, `<Container>` from MUI to structure content.
 
    -   **Grid Usage:** Only use `<Grid>` for complex responsive grid layouts with multiple breakpoints.
 
    -   **MAY** use Tailwind CSS utility classes for spacing, positioning, and responsive design.
 
-   **Example Prompt (Layout):**
 
    ```
 
    // Create a component named 'PageHeader'.
 
    // Use MUI's <Box> component to structure the layout with Tailwind classes.
 
    // It should use sx prop with display: 'flex' and Tailwind classes like 'justify-between items-center'.
 
    // The left side should contain a <Typography variant="h4"> for the page title.
 
    // The right side should contain a <Stack direction="row" spacing={2}> component wrapping action buttons like "Add New" and "Export".
 
    ```
 
### Data Fetching & Mutation Rules:
 
-   **Location:** Custom hooks for data fetching should be co-located with their features.
 
-   **`useQuery`:** For fetching data. The query key must be descriptive, e.g., `['idle-resources', { page, search }]`.
 
-   **`useMutation`:** For any action that changes data. Use the `onSuccess` callback to `queryClient.invalidateQueries` and automatically refresh the UI.
 
-   **Example Prompt (Mutation):**
 
    ```
 
    // Create a 'useDeleteResource' custom hook.
 
    // It should use TanStack Query's 'useMutation'.
 
    // The mutation function should call 'api.deleteResource(id)' from 'lib/api.ts'.
 
    // On success, it must invalidate the 'idle-resources' query key and show a success message using MUI's `Alert` component or a snackbar notification.
 
    ```
 
### API Call Rules:
 
-   **Location:** All functions that directly make network requests must be in `lib/api.ts`.
 
-   **Responsibility:** Components call functions from `lib/api.ts`; they do not call `axios` directly.
 
## 5. TypeScript Type Safety Rules
 
**CRITICAL: Always verify types after generating code. Type safety is mandatory.**
 
### Type Checking Process:
 
1. **After generating any code, ALWAYS:**
   - Run TypeScript checks to ensure no type errors
   - Verify all imports have correct types
   - Check component props interfaces match usage
   - Ensure API response types align with frontend expectations
   - Validate DTOs consistency between frontend and backend
 
2. **Forbidden Patterns:**
   ```typescript
   // ❌ NEVER use 'any' type
   const data: any = response.data;
   
   // ❌ NEVER leave props untyped
   function Component(props) { ... }
   
   // ❌ NEVER use untyped API calls
   const response = await axios.get('/api/resources');
   ```
 
3. **Required Patterns:**
   ```typescript
   // ✅ CORRECT: Properly typed component
   interface IdleResourceFilterProps {
     onFilterChange: (filters: ResourceFilters) => void;
     initialFilters?: Partial<ResourceFilters>;
     loading?: boolean;
   }
   
   // ✅ CORRECT: Typed API response
   interface ApiResponse<T> {
     data: T;
     message: string;
     statusCode: number;
   }
   
   // ✅ CORRECT: Consistent DTOs
   // Backend DTO must match Frontend interface
   export class CreateIdleResourceDto {
     @IsString()
     resourceName: string;
     
     @IsString()
     department: string;
   }
   ```
 
### Type Consistency Rules:
 
-   **Frontend-Backend Alignment:** DTOs in backend must have matching interfaces in frontend.
-   **Enum Consistency:** All enums must be identical between frontend and backend.
-   **API Response Types:** Every API endpoint must have typed response interfaces.
-   **Component Props:** Every component must have properly typed props interface.
-   **Form Data Types:** Form validation schemas must match TypeScript interfaces.
 
### Type Verification Checklist:
 
Before submitting any code, verify:
- [ ] No `any` types used
- [ ] All component props properly typed
- [ ] API calls have typed parameters and responses
- [ ] DTOs match between frontend/backend
- [ ] Enum values consistent across codebase
- [ ] Generic types properly constrained
- [ ] Optional vs required properties correctly defined