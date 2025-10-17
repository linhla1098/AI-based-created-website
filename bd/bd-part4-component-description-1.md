# Basic Design Document - Part 4: UI Component Description

## S-01-01: Login Screen Components

| Item ID | Item Name | Item Type | I/O | Data Type | Initial Value | Required | Max Length | Validation Rules | Item Description |
|---------|-----------|-----------|-----|-----------|---------------|----------|------------|------------------|------------------|
| S01-ITM-01 | Username Input | TextField | I | string | Empty | Yes | 50 | - Not empty\n- Alphanumeric | User's login ID |
| S01-ITM-02 | Password Input | Password | I | string | Empty | Yes | 50 | - Not empty\n- Min 8 chars\n- Must contain letters and numbers | User's password |
| S01-ITM-03 | Login Button | Button | - | - | - | - | - | - Enabled only if both fields filled | Triggers login process |
| S01-ITM-04 | Error Message | Label | O | string | Empty | - | - | - | Displays authentication errors |

## S-04-01: Idle Resource List Components

| Item ID | Item Name | Item Type | I/O | Data Type | Initial Value | Required | Max Length | Validation Rules | Item Description |
|---------|-----------|-----------|-----|-----------|---------------|----------|------------|------------------|------------------|
| S04-ITM-01 | Search Bar | TextField | I | string | Empty | No | 100 | - | Search across all columns |
| S04-ITM-02 | Department Filter | Dropdown | I | string | "All" | No | - | - Valid department | Filter by department |
| S04-ITM-03 | Status Filter | Dropdown | I | string | "All" | No | - | - Valid status | Filter by status |
| S04-ITM-04 | Date Range | DateRangePicker | I | date | Current month | No | - | - Valid date range | Filter by idle period |
| S04-ITM-05 | Resource Grid | DataGrid | O | array | Empty | - | - | - | Display idle resources |
| S04-ITM-06 | Add Button | Button | - | - | - | - | - | - Admin/RA only | Add new resource |
| S04-ITM-07 | Import Button | Button | - | - | - | - | - | - Admin/RA only | Import from Excel |
| S04-ITM-08 | Export Button | Button | - | - | - | - | - | - | Export to Excel |
| S04-ITM-09 | Bulk Actions | ButtonGroup | - | - | - | - | - | - Admin/RA only | Multiple item actions |

## S-04-02: Idle Resource Detail Components

| Item ID | Item Name | Item Type | I/O | Data Type | Initial Value | Required | Max Length | Validation Rules | Item Description |
|---------|-----------|-----------|-----|-----------|---------------|----------|------------|------------------|------------------|
| S42-ITM-01 | Name | TextField | I/O | string | - | Yes | 100 | - Not empty | Resource name |
| S42-ITM-02 | Department | Dropdown | I/O | string | - | Yes | - | - Valid department | Resource department |
| S42-ITM-03 | Skills | TagInput | I/O | array | - | Yes | - | - At least one skill | Technical skills |
| S42-ITM-04 | Rate | NumberField | I/O | number | 0 | Yes | - | - ≥ 0 | Resource rate |
| S42-ITM-05 | Status | Dropdown | I/O | string | "Active" | Yes | - | - Valid status | Current status |
| S42-ITM-06 | IdleFrom | DatePicker | I/O | date | - | Yes | - | - Valid date | Idle start date |
| S42-ITM-07 | IdleTo | DatePicker | I/O | date | - | No | - | - ≥ IdleFrom | Expected end date |
| S42-ITM-08 | CV Upload | FileUpload | I | file | - | No | 10MB | - PDF/DOC/DOCX | Upload CV file |
| S42-ITM-09 | Process Notes | TextArea | I/O | string | - | No | 1000 | - | Processing notes |
| S42-ITM-10 | Save Button | Button | - | - | - | - | - | - All required fields filled | Save changes |
