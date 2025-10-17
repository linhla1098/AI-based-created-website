# Basic Design Document - Part 4: UI Component Description (Continued)

## S-05-01: Update History Components

| Item ID | Item Name | Item Type | I/O | Data Type | Initial Value | Required | Max Length | Validation Rules | Item Description |
|---------|-----------|-----------|-----|-----------|---------------|----------|------------|------------------|------------------|
| S05-ITM-01 | Resource Select | Dropdown | I | string | - | No | - | - Valid resource | Select resource |
| S05-ITM-02 | Date Range | DateRangePicker | I | date | Last 30 days | No | - | - Valid range | Filter by date |
| S05-ITM-03 | History Grid | DataGrid | O | array | - | - | - | - | Display history |
| S05-ITM-04 | Export Button | Button | - | - | - | - | - | - | Export history |

## S-06-01: Reports Components

| Item ID | Item Name | Item Type | I/O | Data Type | Initial Value | Required | Max Length | Validation Rules | Item Description |
|---------|-----------|-----------|-----|-----------|---------------|----------|------------|------------------|------------------|
| S06-ITM-01 | Dept Filter | Dropdown | I | string | "All" | No | - | - Valid department | Filter by department |
| S06-ITM-02 | Date Range | DateRangePicker | I | date | Current month | Yes | - | - Valid range | Report period |
| S06-ITM-03 | Dept Chart | BarChart | O | array | - | - | - | - | Department comparison |
| S06-ITM-04 | Status Chart | PieChart | O | array | - | - | - | - | Status distribution |
| S06-ITM-05 | Trend Chart | LineChart | O | array | - | - | - | - | Trend analysis |
| S06-ITM-06 | Export PDF | Button | - | - | - | - | - | - | Export as PDF |
| S06-ITM-07 | Export Excel | Button | - | - | - | - | - | - | Export as Excel |

## Common Components (Available on all screens)

| Item ID | Item Name | Item Type | I/O | Data Type | Initial Value | Required | Max Length | Validation Rules | Item Description |
|---------|-----------|-----------|-----|-----------|---------------|----------|------------|------------------|------------------|
| COM-ITM-01 | Header Logo | Image | O | - | Logo.png | - | - | - | Company logo |
| COM-ITM-02 | User Menu | Dropdown | O | - | - | - | - | - | User options menu |
| COM-ITM-03 | Left Menu | Navigation | I/O | - | - | - | - | - | Main navigation |
| COM-ITM-04 | Notification | Badge | O | number | 0 | - | - | - | Show notifications |
| COM-ITM-05 | Loading | Spinner | O | - | Hidden | - | - | - | Loading indicator |
| COM-ITM-06 | Error Alert | Alert | O | string | - | - | - | - | Error messages |
| COM-ITM-07 | Success Alert | Alert | O | string | - | - | - | - | Success messages |
