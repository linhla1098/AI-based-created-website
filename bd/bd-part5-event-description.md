# Basic Design Document - Part 5: Event Description

## S-01-01: Login Screen Events

| Event ID | Event Name | Input Information | Validation Rules | Event Process Description | Output Data | Next Screen ID |
|----------|------------|------------------|------------------|-------------------------|-------------|----------------|
| S01-EVT-01 | Login Button Click | - Username\n- Password | - Both fields required\n- Username format valid\n- Password format valid | 1. Validate input fields\n2. Call authentication API\n3. Store session token\n4. Load user permissions | - Success: User data\n- Error: Error message | Success: S-02-01\nError: S-01-01 |

## S-04-01: Idle Resource List Events

| Event ID | Event Name | Input Information | Validation Rules | Event Process Description | Output Data | Next Screen ID |
|----------|------------|------------------|------------------|-------------------------|-------------|----------------|
| S04-EVT-01 | Search/Filter | - Search text\n- Filter criteria | - Valid date range if specified | 1. Combine all filter criteria\n2. Apply filters to grid\n3. Update URL params | Filtered grid data | - |
| S04-EVT-02 | Add Resource | - | - User has permission | 1. Initialize new resource form\n2. Set default values | Empty form | S-04-02 |
| S04-EVT-03 | Import Excel | - Excel file | - File format (.xlsx, .xls)\n- File size ≤ 10MB\n- Required columns present | 1. Validate file format\n2. Parse Excel data\n3. Validate data rows\n4. Batch insert/update | - Success message\n- Error list\n- Updated grid | - |
| S04-EVT-04 | Export Excel | - Filter criteria | - | 1. Apply current filters\n2. Generate Excel\n3. Format data | Excel file download | - |
| S04-EVT-05 | Bulk Update | - Selected rows\n- Update data | - At least one row selected\n- Valid update data | 1. Validate selection\n2. Validate update data\n3. Batch update\n4. Refresh grid | - Success message\n- Updated grid | - |

## S-04-02: Idle Resource Detail Events

| Event ID | Event Name | Input Information | Validation Rules | Event Process Description | Output Data | Next Screen ID |
|----------|------------|------------------|------------------|-------------------------|-------------|----------------|
| S42-EVT-01 | Save Resource | All form fields | - Required fields filled\n- Valid data formats\n- Date range valid | 1. Validate all inputs\n2. Format data\n3. Save to backend\n4. Update history | - Success message\n- Updated data | S-04-01 |
| S42-EVT-02 | Upload CV | CV file | - File type valid\n- Size ≤ 10MB | 1. Validate file\n2. Upload to storage\n3. Update resource record | - Success message\n- File link | - |
| S42-EVT-03 | Download CV | - | - CV exists | 1. Get file link\n2. Trigger download | File download | - |
| S42-EVT-04 | Add Note | - Note text | - Not empty\n- Length ≤ 1000 | 1. Validate text\n2. Add timestamp\n3. Save note | - Updated notes\n- Success message | - |

## S-05-01: Update History Events

| Event ID | Event Name | Input Information | Validation Rules | Event Process Description | Output Data | Next Screen ID |
|----------|------------|------------------|------------------|-------------------------|-------------|----------------|
| S05-EVT-01 | Filter History | - Resource\n- Date range | - Valid date range | 1. Apply filters\n2. Load history\n3. Update grid | Filtered history data | - |
| S05-EVT-02 | Export History | - Current filters | - | 1. Apply filters\n2. Generate Excel\n3. Format data | Excel file download | - |

## S-06-01: Reports Events

| Event ID | Event Name | Input Information | Validation Rules | Event Process Description | Output Data | Next Screen ID |
|----------|------------|------------------|------------------|-------------------------|-------------|----------------|
| S06-EVT-01 | Generate Report | - Department\n- Period | - Valid period | 1. Load raw data\n2. Process metrics\n3. Generate charts | Updated dashboard | - |
| S06-EVT-02 | Export Report | - Report type\n- Current filters | - Valid export type | 1. Generate report file\n2. Format data\n3. Add metadata | PDF/Excel download | - |
| S06-EVT-03 | Compare Period | - Current period\n- Previous period | - Valid date ranges | 1. Load both periods\n2. Calculate changes\n3. Update charts | Comparison data | - |
