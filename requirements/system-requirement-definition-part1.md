# Thiết kế cơ bản hệ thống quản lý Idle Resource

## 1. Tên hệ thống
Hệ thống quản lý Idle Resource (Idle Resource Management System - IRMS)

## 2. Mục tiêu hệ thống
- Quản lý hiệu quả thông tin về các nhân sự đang trong trạng thái idle trong công ty
- Cung cấp công cụ cho RA (Resource Administrator) để quản lý và cập nhật thông tin idle resource
- Hỗ trợ Manager theo dõi và quản lý tình trạng idle của nhân sự trong bộ phận
- Cung cấp dashboard và báo cáo để theo dõi tình hình idle resource theo thời gian
- Đảm bảo tính bảo mật và phân quyền trong việc truy cập thông tin

## 3. Vai trò người dùng
1. **Admin**
   - Quản lý người dùng và phân quyền
   - Có toàn quyền truy cập và quản lý hệ thống
   - Quản lý danh sách idle resource
   
2. **RA (Resource Administrator)**
   - **RA All**: Quản lý idle resource toàn công ty
   - **RA bộ phận**: Quản lý idle resource của bộ phận được phân công
   - Có quyền Input/Import/Export/Update thông tin idle resource

3. **Manager (MNG)**
   - Xem thông tin idle và tình trạng xử lý của bộ phận mình
   - Cập nhật hoặc thêm nhân sự idle mới trong bộ phận

4. **Viewer**
   - Chỉ có quyền xem danh sách idle toàn FJP
   - Không thấy được trạng thái xử lý và một số thông tin hạn chế

## 4. Danh sách chức năng

| Mã chức năng | Mô tả | Đầu vào | Đầu ra | Actor | Độ ưu tiên | Ràng buộc/Điều kiện |
|--------------|-------|---------|--------|-------|------------|-------------------|
| FR-01 | Đăng nhập hệ thống | Username, Password | Token xác thực, thông tin user | Tất cả user | 2 | Tài khoản phải tồn tại và active |
| FR-02 | Kiểm tra bảo mật và session timeout | Session token | Trạng thái session | Tất cả user | 1 | Session phải còn hiệu lực |
| FR-03 | Phân quyền người dùng | User ID, Role | Quyền được cập nhật | Admin | 2 | Admin mới có quyền thực hiện |
| FR-04 | Quản lý danh sách Idle Resource | Thông tin resource | Danh sách được cập nhật | RA, Manager | 2 | Theo phân quyền |
| FR-05 | Import data Idle | File Excel | Dữ liệu được import | RA | 2 | File đúng format |
| FR-06 | Export data Idle | Lựa chọn export | File Excel | RA, Manager | 2 | Theo phân quyền |
| FR-07 | Upload/Download CV | File CV | File được up/download | RA, Manager | 3 | Định dạng Doc, PDF, Excel |
| FR-08 | Highlight idle resource | Ngày Idle From | Danh sách highlight | Tất cả user | 1 | Theo rule highlight |
| FR-09 | Quản lý lịch sử cập nhật | Thông tin cập nhật | Log lịch sử | System | 3 | Tự động ghi log |
| FR-10 | Xem báo cáo (Dashboard) | Lựa chọn filter | Dashboard data | Tất cả user | 2 | Theo phân quyền |
