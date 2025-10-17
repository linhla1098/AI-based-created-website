## 9. Danh sách các Entity cần thiết và ER diagram

```mermaid
erDiagram
    Users {
        int user_id PK
        string username
        string password_hash
        string email
        int role_id FK
        datetime created_at
        datetime updated_at
        boolean is_active
    }

    Roles {
        int role_id PK
        string role_name
        string description
        datetime created_at
    }

    Departments {
        int dept_id PK
        string dept_name
        string description
        int manager_id FK
    }

    IdleResources {
        int resource_id PK
        int user_id FK
        int dept_id FK
        date idle_from
        date idle_to
        string status
        string process_note
        float rate
        string skills
        string cv_path
        datetime created_at
        datetime updated_at
        int created_by FK
        int updated_by FK
    }

    UpdateHistory {
        int history_id PK
        int resource_id FK
        string field_name
        string old_value
        string new_value
        datetime updated_at
        int updated_by FK
    }

    Users ||--o{ IdleResources : "manages"
    Roles ||--o{ Users : "has"
    Departments ||--o{ IdleResources : "contains"
    Users ||--o{ UpdateHistory : "updates"
    IdleResources ||--o{ UpdateHistory : "tracks"
```

## 10. Sơ đồ di chuyển chức năng trong hệ thống

```mermaid
flowchart TD
    Login[Login Screen] --> Auth{Authentication}
    Auth -->|Success| Top[Top Screen]
    Auth -->|Fail| Login
    
    Top -->|Admin| UserMgmt[User Management]
    Top -->|All Users| IdleList[Idle Resource List]
    Top -->|All Users| Report[Reports/Dashboard]
    
    UserMgmt -->|Add/Edit User| UserDetail[User Detail]
    UserMgmt -->|Assign Role| RoleAssign[Role Assignment]
    
    IdleList -->|View/Edit| IdleDetail[Idle Resource Detail]
    IdleList -->|Import| ImportIdle[Import Idle Data]
    IdleList -->|Export| ExportIdle[Export Idle Data]
    IdleList -->|Upload CV| CVUpload[CV Upload]
    
    IdleDetail -->|Save| IdleList
    IdleDetail -->|Cancel| IdleList
    
    Report -->|Filter| Report
    Report -->|Export| ExportReport[Export Report]
