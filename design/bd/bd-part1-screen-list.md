# Basic Design Document - Part 1: Screen List

## Screen List và Phân cấp Menu

| Screen ID | Screen Name | Role Access | Menu Hierarchy | Main Features |
|-----------|-------------|-------------|----------------|---------------|
| S-01-01 | Login Screen | All Users | - | - FR-01: Đăng nhập hệ thống\n- FR-02: Kiểm tra session timeout |
| S-02-01 | Top Screen (Dashboard) | All Users | Home | - Hiển thị dashboard\n- Left menu navigation\n- Quick statistics |
| S-03-01 | User Management | Admin | System Management > User | - FR-03: Phân quyền người dùng\n- CRUD operations cho user\n- Role assignment |
| S-04-01 | Idle Resource List | All Users | Resource Management | - FR-04: Quản lý danh sách Idle\n- FR-05: Import data\n- FR-06: Export data\n- FR-07: Upload/Download CV\n- FR-08: Highlight idle resource |
| S-04-02 | Idle Resource Detail | Admin, RA, MNG | Resource Management > Detail | - Xem/Chỉnh sửa thông tin chi tiết\n- Upload/Download CV\n- Process note management |
| S-05-01 | Update History | Admin, RA, MNG | Resource Management > History | - FR-09: Quản lý lịch sử cập nhật\n- View update logs\n- Filter history |
| S-06-01 | Reports & Analytics | All Users | Reports | - FR-10: Dashboard reports\n- Department-wise analytics\n- Trend analysis |

## Menu Structure

```
├── Home (Dashboard)
├── Resource Management
│   ├── Idle Resource List
│   ├── Idle Resource Detail
│   └── Update History
├── Reports
│   ├── Dashboard Reports
│   └── Analytics
└── System Management (Admin Only)
    ├── User Management
    └── Role Management
```
