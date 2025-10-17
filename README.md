# Hệ thống Quản lý Nguồn lực Nhàn rỗi (Idle Resource Management System)

Dự án này là một hệ thống web hoàn chỉnh, bao gồm cả Frontend (Giao diện người dùng) và Backend (Hệ thống máy chủ). Hệ thống được xây dựng nhằm mục đích quản lý, theo dõi và tối ưu hóa việc sử dụng các nguồn lực nhân sự đang trong trạng thái nhàn rỗi (idle) tại FJP.

## ✨ Tính năng chính

Hệ thống cung cấp các chức năng mạnh mẽ được phân chia theo vai trò người dùng:

*   **Bảo mật & Đăng nhập:** Tích hợp cơ chế đăng nhập an toàn và tự động hết hạn phiên làm việc (session timeout) để bảo vệ dữ liệu.
*   **Phân quyền người dùng chi tiết:**
    *   **Admin:** Quản lý và cấp quyền cho các vai trò khác.
    *   **RA (Resource Assurance):** Chịu trách nhiệm chính trong việc cập nhật dữ liệu (Input/Import/Export/Update).
    *   **Manager (MNG):** Theo dõi tình hình nhân sự idle và trạng thái xử lý của bộ phận mình.
    *   **Viewer:** Xem danh sách tổng quan (thông tin bị hạn chế).
*   **Quản lý Idle Resource:** Giao diện quản lý mạnh mẽ, cho phép import/export dữ liệu qua file, cập nhật thông tin và theo dõi lịch sử thay đổi.
*   **Kiến trúc tách biệt:** Frontend và Backend được phát triển độc lập, dễ dàng bảo trì và mở rộng trong tương lai.

## 🚀 Công nghệ sử dụng

*(Vui lòng cập nhật lại cho đúng với công nghệ thực tế của dự án)*

| Phần      | Công nghệ                                                              |
| :-------- | :--------------------------------------------------------------------- |
| **Frontend**  | `React.js`, `HTML5`, `CSS3`, `JavaScript (ES6+)` |
| **Backend**   | `Node.js`, `Express.js`, `MongoDB`                  |
| **Công cụ** | `Git`, `npm`, `Visual Studio Code`                                     |

## 🛠️ Cài đặt và Khởi chạy

Để chạy dự án này trên máy của bạn, hãy làm theo các bước sau:

### Yêu cầu
*   [Node.js](https://nodejs.org/) (phiên bản 16.x trở lên)
*   [Git](https://git-scm.com/)
*   Cơ sở dữ liệu [MongoDB](https://www.mongodb.com/) (hoặc cơ sở dữ liệu bạn dùng) đã được cài đặt và đang chạy.

### Các bước cài đặt

1.  **Clone repository về máy:**
    ```sh
    git clone https://github.com/linhla1098/AI-based-created-website.git
    ```

2.  **Di chuyển vào thư mục dự án:**
    ```sh
    cd AI-based-created-website
    ```

3.  **Cài đặt cho Backend:**
    ```sh
    # Di chuyển vào thư mục backend
    cd backend

    # Cài đặt các package cần thiết
    npm install

    # Tạo file .env và cấu hình các biến môi trường
    # Ví dụ: PORT=5000, MONGODB_URI=...
    ```

4.  **Cài đặt cho Frontend:**
    ```sh
    # Di chuyển vào thư mục frontend
    cd ../frontend

    # Cài đặt các package cần thiết
    npm install
    ```

### Khởi chạy dự án

Bạn cần mở 2 cửa sổ Terminal riêng biệt để chạy song song Backend và Frontend.

*   **Chạy Backend Server:**
    ```sh
    # Từ thư mục /backend
    npm start
    ```
    > Máy chủ Backend sẽ chạy tại `http://localhost:5000` (hoặc cổng bạn đã cấu hình).

*   **Chạy Frontend Application:**
    ```sh
    # Từ thư mục /frontend
    npm start
    ```
    > Ứng dụng Frontend sẽ chạy tại `http://localhost:3000`.

## 🤝 Đóng góp

Mọi ý kiến đóng góp đều được chào đón! Nếu bạn có ý tưởng để cải thiện dự án, vui lòng tạo một `fork` và gửi `pull request`.

---
_Dự án được phát triển bởi linhla98 - 2025_
