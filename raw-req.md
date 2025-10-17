# Danh sách chức năng và mô tả

## 📊 CHỨC NĂNG VÀ ĐỘ ƯU TIÊN HỆ THỐNG**

| Mục | Chức năng mong muốn | Độ ưu tiên |
|-----|-------------------|------------|
| **1. Chức năng đăng nhập** | | |
| | Đăng nhập hệ thống | 2 |
| | Kiểm tra bảo mật và session timeout | 1 |
| **2. Phân quyền người dùng** | | |
| | Admin có thể cấp quyền cho các role: RA, MNG, Viewer | 2 |
| | RA có thể Input/Import/Export/Update thông tin idle resource | 2 |
| | RA All và RA bộ phận | 2 |
| | MNG có thể xem thông tin idle và tình trạng xử lý | 2 |
| | Viewer có thể xem danh sách idle toàn FJP (không thấy trạng thái xử lý) | 3 |
| **3. Màn hình quản lý danh sách Idle** | | |
| | Bố cục phù hợp, font chữ ok, các trường dữ liệu đảm bảo view được thông tin đầy đủ (incase trường dữ liệu dài....) | 2 |
| | Design map với yêu cầu về các trường dữ liệu, Mandatory filed ex: Text, Dropdownlist, get data from excel | 2 |
| | Addnew Idle resource | 3 |
| | Có thể update 1 idle resource | 3 |
| | Có thể Update nhiều idle resource đang được hiển thị trong grid cùng lúc | 3 |
| | Delete 1 | 3 |
| | Delete nhiều lựa chọn cùng lúc | 3 |
| | Tìm kiếm thông tin cho tùy chỉnh trên header | 3 |
| | Tìm kiếm thông tin trên Title | 3 |
| | Cho phép ẩn/hiện column và cố định column trong grid hiển thị list resouce management | 3 |
| | Import data Idle | 2 |
| | Export data Idle theo tùy chỉnh | 2 |
| | Upload CV với các định dạng khác nhau: Doc, PDF, Excel… | 3 |
| | Download 1 Curriculum Vitae (CV) | 3 |
| | Download nhiều Curriculum Vitae (CV) cùng lúc | 1 |
| | Highlight màu vàng các resouce đang bị idle được tính từ ngày Idle From + colums filter | 1 |
| | Hiển thị các case có Idle date ≥ 2 tháng và được highligh bằng icon Urgent | 2 |
| | Lưu lịch sử cập nhật mỗi khi update thông tin liên quan đến resouce | 3 |
| **4. Quyền Manager** | | |
| | Xem thông tin idle của bộ phận mình | 2 |
| | Cập nhật hoặc thêm nhân sự idle mới | 2 |
| **5. Quyền Viewer** | | |
| | Xem danh sách idle toàn FJP trừ những thông tin: Các case có trạng thái "Not Yet Open", Cột Process note, Thông tin về Rate | 3 |
| **6. Báo cáo (Report)** | | |
| | Cho phép export data report | 3 |
| | Dashboard report tình hình idle theo bộ phận filter by Source | 2 |
| | Dashboard report tình hình idle theo bộ phận baseline data compare với tuần trước đó filter by Source | 2 |

# Yêu cầu về luồng thao tác màn hình cho từng role
## Admin
Login -> Top Screen (có bao gồm Left Menu, có hiển thị Dashboard) -> Màn hình quản lý người dùng và phân quyền
Login -> Top Screen (có bao gồm Left Menu, có hiển thị Dashboard) -> Màn hình quản lý danh sách Idle Resources -> Màn hình chi tiết/chỉnh sửa Idle Resource
Login -> Top Screen (có bao gồm Left Menu, có hiển thị Dashboard)  -> Màn hình lịch sử cập nhật Idle Resource

## RA
Login -> Top Screen (có bao gồm Left Menu, có hiển thị Dashboard) -> Màn hình quản lý danh sách Idle Resources -> Màn hình chi tiết/chỉnh sửa Idle Resource
Login -> Top Screen (có bao gồm Left Menu, có hiển thị Dashboard)  -> Màn hình lịch sử cập nhật Idle Resource

## Manager
Login -> Top Screen (có bao gồm Left Menu, có hiển thị Dashboard) -> Màn hình quản lý danh sách Idle Resources -> Màn hình chi tiết/chỉnh sửa Idle Resource
Login -> Top Screen (có bao gồm Left Menu, có hiển thị Dashboard)  -> Màn hình lịch sử cập nhật Idle Resource

## Viewer
Login -> Top Screen (có bao gồm Left Menu, có hiển thị Dashboard) -> Màn hình quản lý danh sách Idle Resources


