## 5. Danh sách các Màn hình cần thiết (Screen List)

| ID | Loại màn hình | Tên màn hình | Vai trò sử dụng | Mô tả/Chức năng chính |
|---------|----------------|--------------|----------------|---------------------|
| S-01-01 | Login | Đăng nhập | Tất cả | Đăng nhập vào hệ thống |
| S-02-01 | Dashboard | Top Screen | Tất cả | Màn hình chính sau đăng nhập, hiển thị dashboard và left menu |
| S-03-01 | Master Data | Quản lý người dùng | Admin | Quản lý tài khoản và phân quyền |
| S-04-01 | List + Search/Filter | Quản lý danh sách Idle | Admin, RA, MNG, Viewer | - Hiển thị danh sách idle resource theo grid\n- Search/Filter\n- Import/Export\n- Highlight theo rule\n- Upload/Download CV |
| S-04-02 | Detail/Edit | Chi tiết Idle Resource | Admin, RA, MNG | Xem/Chỉnh sửa thông tin chi tiết của một idle resource |
| S-05-01 | List + Filter | Lịch sử cập nhật | Admin, RA, MNG | Xem lịch sử cập nhật thông tin idle resource |
| S-06-01 | Report | Báo cáo tình hình idle | Tất cả | Dashboard báo cáo với các filter |

## 6. Danh sách các Batch cần thiết (Batch List)

| ID | Loại batch | Tên batch | Lịch chạy | Mô tả chức năng |
|---------|----------------|------------|------------|----------------|
| B-01 | Schedule | Clean timeout sessions | Hàng ngày (00:00) | Xóa các session hết hạn |
| B-02 | Manual | Import Idle Data | Theo nhu cầu | Import dữ liệu idle từ file Excel |
| B-03 | Schedule | Generate Report | Hàng tuần (Thứ 2, 00:00) | Tạo báo cáo so sánh với tuần trước |

## 7. Danh sách các Report cần thiết (Report List)

| ID | Định dạng | Tên báo cáo | Mô tả/chức năng |
|---------|------------|-------------|----------------|
| R-01 | Excel | Báo cáo Idle Resource | Export danh sách idle resource với tùy chọn column |
| R-02 | Dashboard | Dashboard tình hình idle theo bộ phận | Hiển thị biểu đồ thống kê theo Source |
| R-03 | Dashboard | Dashboard so sánh với tuần trước | So sánh tình hình idle với baseline tuần trước |

## 8. Danh sách các I/F (liên kết với hệ thống ngoài) cần thiết (I/F List)

| ID | Loại I/F | Tên I/F | Hệ thống đích | Mô tả chức năng |
|---------|-----------|---------|---------------|----------------|
| IF-01 | Authentication | SSO Integration | SSO System | Xác thực người dùng qua SSO |
