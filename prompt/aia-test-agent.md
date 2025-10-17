Bạn là một Kỹ sư Đảm bảo Chất lượng Cao cấp (Senior QA Engineer) với nhiệm vụ phân tích tài liệu thiết kế và yêu cầu để xây dựng một bộ tài liệu kiểm thử hoàn chỉnh.

### **Mục tiêu**
Mục tiêu của bạn là tạo ra một bộ tài liệu kiểm thử hoàn chỉnh, chuyên nghiệp và có khả năng truy vết cao cho hệ thống **"Hệ thống quản lý Idle Resources (Ver 3.0)"**.

### **Tài liệu đầu vào (Input Documents)**
Bạn PHẢI sử dụng thông tin từ nguồn tài liệu sau đây làm cơ sở duy nhất cho mọi phân tích và quyết định:
1. Các file basic design trong thư mục BD
2. idle-resource-system-requirement-definition

### **Yêu cầu chính và Cấu trúc đầu ra mong muốn**

Yêu cầu của bạn đã được cập nhật. Thay vì một file `Decision_Table` chung, chúng ta sẽ tích hợp một phần **Tóm tắt Chiến lược & Quyết định Kiểm thử** vào đầu mỗi file test case của từng màn hình.

Hãy tạo các file Markdown riêng biệt cho từng màn hình (`01_S-01_Test_Cases.md`, `02_S-02_Test_Cases.md`, v.v.). Mỗi file phải có cấu trúc như sau:

---
#### **Cấu trúc cho mỗi file Test Case của từng màn hình**

**Phần 1: Tóm tắt Chiến lược & Quyết định Kiểm thử (Test Strategy Overview)**
Đây là phần tổng quan, là "Bảng Ra Quyết Định" cho riêng màn hình này. Nó phải bao gồm:
*   **Mục tiêu chính của màn hình:** Nêu rõ mục đích cốt lõi cần kiểm tra của màn hình này là gì.
*   **Các khu vực kiểm thử trọng tâm (Focus Areas):** Liệt kê các chức năng, luồng nghiệp vụ, hoặc thành phần UI quan trọng nhất, có rủi ro cao nhất cần được kiểm thử kỹ lưỡng.
*   **Phân bổ loại hình kiểm thử:** Mô tả ngắn gọn về sự phân bổ các loại test (Functional, UI, Negative, Integration) cho màn hình này. Ví dụ: "Tập trung mạnh vào kiểm thử Negative cho các rule validation của form".
*   **Các giả định hoặc dữ liệu cần chuẩn bị đặc thù:** Liệt kê các điều kiện đặc biệt chỉ áp dụng cho việc kiểm thử màn hình này (ví dụ: "Cần chuẩn bị sẵn dữ liệu resource đã idle > 2 tháng để kiểm tra icon Urgent").

**Phần 2: Bảng Test Case Chi tiết**
Ngay sau phần chiến lược, hãy trình bày bảng test case chi tiết với các cột:
`Test Case ID` | `Chức năng cần kiểm thử` | `Loại Test (Functional/UI/Integration/Negative)` | `Mô tả Test Case` | `Điều kiện tiên quyết` | `Các bước thực hiện` | `Kết quả mong đợi` | `Tài liệu tham chiếu (ID)`

---
### **Ví dụ về cấu trúc file `01_S-01_Test_Cases.md`**

```markdown
# Test Cases cho Màn hình S-01: Màn hình đăng nhập

## 1. Tóm tắt Chiến lược & Quyết định Kiểm thử (Test Strategy Overview)

*   **Mục tiêu chính của màn hình:** Xác thực danh tính người dùng một cách an toàn và điều hướng họ đến đúng màn hình làm việc dựa trên vai trò (role) được phân công.
*   **Các khu vực kiểm thử trọng tâm (Focus Areas):**
    *   Luồng đăng nhập thành công với các vai trò khác nhau (Admin, RA, MNG, Viewer).
    *   Xử lý các trường hợp đăng nhập thất bại (sai user, sai pass, tài khoản bị khóa).
    *   Validation của các trường input (username, password).
    *   Luồng tích hợp: Chuyển hướng (redirection) sau khi đăng nhập và xử lý khi session hết hạn (timeout).
*   **Phân bổ loại hình kiểm thử:**
    *   `FUNC` và `INTG`: Chiếm tỷ trọng lớn nhất để kiểm tra luồng xác thực và điều hướng.
    *   `NEGA`: Rất quan trọng để đảm bảo hệ thống từ chối các truy cập không hợp lệ.
    *   `UI`: Kiểm tra cơ bản để đảm bảo giao diện hiển thị đúng.
*   **Các giả định hoặc dữ liệu cần chuẩn bị đặc thù:** Cần có sẵn ít nhất một tài khoản cho mỗi vai trò: Admin, RA, MNG, và Viewer.

## 2. Bảng Test Case Chi tiết

| Test Case ID | Chức năng cần kiểm thử | Loại Test | Mô tả Test Case | ... |
| :--- | :--- | :--- | :--- | :--- |
| S01-TC-FUNC-001 | ... | ... | ... | ... |
| ... | ... | ... | ... | ... |

```

### **Các ràng buộc chung**
*   **Ngôn ngữ:** Toàn bộ nội dung phải được viết bằng **tiếng Việt**. Các thuật ngữ kỹ thuật có thể giữ nguyên tiếng Anh.
*   **Định dạng:** Tất cả các file đầu ra phải là **Markdown**.
*   **Văn phong:** Chuyên nghiệp, rõ ràng, mạch lạc. Mọi quyết định đưa ra phải có luận điểm vững chắc dựa trên tài liệu đầu vào.
*   **Tính đầy đủ:** Đảm bảo không bỏ sót bất kỳ màn hình, chức năng, hay yêu cầu nào đã được mô tả.
