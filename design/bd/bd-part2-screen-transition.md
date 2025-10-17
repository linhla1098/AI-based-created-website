# Basic Design Document - Part 2: Screen Transition Diagram

## Screen Transition Flow

```mermaid
flowchart TD
    S0101[S-01-01: Login Screen] -->|Login Success| S0201[S-02-01: Top Screen]
    S0101 -->|Login Failed| S0101
    
    subgraph Main Navigation
        S0201 -->|Admin| S0301[S-03-01: User Management]
        S0201 -->|All Users| S0401[S-04-01: Idle Resource List]
        S0201 -->|All Users| S0601[S-06-01: Reports & Analytics]
    end
    
    subgraph Resource Management
        S0401 -->|View/Edit| S0402[S-04-02: Idle Resource Detail]
        S0401 -->|View History| S0501[S-05-01: Update History]
        S0402 -->|Save| S0401
        S0402 -->|Cancel| S0401
    end
    
    subgraph User Management
        S0301 -->|Add User| S0301
        S0301 -->|Edit User| S0301
        S0301 -->|Assign Role| S0301
    end
    
    subgraph Reports
        S0601 -->|Filter| S0601
        S0601 -->|Export| S0601
    end
```

## Transition Rules

1. **Login Flow (S-01-01)**
   - Initial screen for all users
   - Redirects to Top Screen on successful login
   - Stays on Login screen with error message on failure

2. **Top Screen Flow (S-02-01)**
   - Central navigation hub
   - Access controlled by user role
   - Quick access to main features

3. **Resource Management Flow (S-04-XX)**
   - List view is the main entry point
   - Detail view accessible from list
   - History view accessible from list
   - All changes return to list view

4. **User Management Flow (S-03-01)**
   - Admin only access
   - Self-contained CRUD operations
   - Role management integrated

5. **Reports Flow (S-06-01)**
   - Accessible by all users
   - Interactive filtering
   - Export functionality
