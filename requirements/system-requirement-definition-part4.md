## 11. Luồng nghiệp vụ chính (Main Flows)

### 1. Quản lý người dùng (Admin)
1. Admin đăng nhập vào hệ thống
2. Truy cập màn hình quản lý người dùng
3. Thực hiện các thao tác:
   - Tạo mới tài khoản
   - Phân quyền cho user (RA, MNG, Viewer)
   - Kích hoạt/vô hiệu hóa tài khoản

### 2. Quản lý Idle Resource (RA)
1. RA đăng nhập vào hệ thống
2. Truy cập màn hình quản lý danh sách Idle
3. Thực hiện các thao tác:
   - Thêm mới idle resource
   - Import/Export danh sách
   - Upload/Download CV
   - Cập nhật thông tin idle resource
   - Theo dõi trạng thái xử lý

### 3. Quản lý bộ phận (Manager)
1. Manager đăng nhập vào hệ thống
2. Xem danh sách idle resource của bộ phận
3. Thực hiện các thao tác:
   - Cập nhật thông tin idle resource
   - Thêm nhân sự idle mới
   - Theo dõi báo cáo

### 4. Xem thông tin (Viewer)
1. Viewer đăng nhập vào hệ thống
2. Xem danh sách idle toàn FJP (trừ thông tin hạn chế)
3. Xem báo cáo tổng quan

## 12. Use Case Diagram Description

### Actor chính:
1. **Admin**
   - Quản lý người dùng
   - Phân quyền
   - Quản lý toàn bộ hệ thống

2. **RA (Resource Administrator)**
   - Quản lý thông tin idle resource
   - Import/Export data
   - Upload/Download CV

3. **Manager**
   - Quản lý idle resource bộ phận
   - Xem báo cáo bộ phận

4. **Viewer**
   - Xem danh sách idle
   - Xem báo cáo tổng quan

### Use Cases chính:
1. **Quản lý người dùng**
   - Tạo tài khoản mới
   - Phân quyền
   - Kích hoạt/vô hiệu hóa tài khoản

2. **Quản lý Idle Resource**
   - Thêm/Sửa/Xóa idle resource
   - Import/Export danh sách
   - Upload/Download CV
   - Highlight theo rule
   - Lưu lịch sử cập nhật

3. **Báo cáo**
   - Xem dashboard
   - Export báo cáo
   - So sánh với baseline

## 13. Yêu cầu phi chức năng (Non-functional Requirements)

### 1. Hiệu năng (Performance)
- Thời gian phản hồi: < 3 giây cho các thao tác thông thường
- Xử lý đồng thời: Hỗ trợ tối thiểu 100 người dùng
- Import/Export: Xử lý file dữ liệu lên đến 10MB

### 2. Bảo mật (Security)
- Xác thực người dùng qua SSO
- Mã hóa dữ liệu nhạy cảm
- Session timeout sau 30 phút không hoạt động
- Ghi log mọi thao tác cập nhật

### 3. Độ tin cậy (Reliability)
- Uptime: 99.9%
- Backup dữ liệu hàng ngày
- Khôi phục dữ liệu trong vòng 4 giờ

### 4. Khả năng mở rộng (Scalability)
- Hỗ trợ mở rộng số lượng người dùng
- Dễ dàng thêm tính năng mới
- Tối ưu hóa hiệu suất database

## 14. Checklist Đánh giá đáp ứng tiêu chuẩn IPA Guideline

### 1. Định nghĩa yêu cầu
- [x] OK: Mô tả đầy đủ mục tiêu hệ thống
- [x] OK: Phân tích rõ vai trò người dùng
- [x] OK: Liệt kê đầy đủ chức năng theo độ ưu tiên
- [ ] NG: Thiếu chi tiết về quy trình nghiệp vụ cụ thể

### 2. Thiết kế màn hình
- [x] OK: Danh sách màn hình đầy đủ và phân loại rõ ràng
- [x] OK: Mô tả chi tiết chức năng từng màn hình
- [ ] NG: Cần bổ sung mockup cho các màn hình chính

### 3. Thiết kế dữ liệu
- [x] OK: ER diagram rõ ràng, đầy đủ relationship
- [x] OK: Mô tả đầy đủ các entity và thuộc tính
- [ ] NG: Cần bổ sung chi tiết các ràng buộc dữ liệu

### 4. Phi chức năng
- [x] OK: Đầy đủ các yêu cầu về hiệu năng, bảo mật
- [x] OK: Có các chỉ số đo lường cụ thể
- [ ] NG: Cần bổ sung kế hoạch test phi chức năng
