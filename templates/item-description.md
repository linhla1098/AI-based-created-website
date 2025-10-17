| Item ID | Item Name    | Item Type     | I/O | Data Type | Init Value | Required Input or Not | Length | Item Description                       |
|---------|--------------|--------------|-----|-----------|------------|----------------------|--------|----------------------------------------|
| 01      | Username     | Textbox      | I   | String    | blank      | Yes                  | 50     | Trường nhập tên đăng nhập              |
| 02      | Password     | Password Box | I   | String    | blank      | Yes                  | 20     | Trường nhập mật khẩu                   |
| 03      | LoginButton  | Button       | I   | -         | -          | No                   | -      | Nút bấm để thực hiện đăng nhập         |
| 04      | RememberMe   | Checkbox     | I   | Boolean   | False      | No                   | -      | Chọn nếu muốn lưu thông tin đăng nhập  |
| 05      | ErrorMessage | Label        | O   | String    | blank      | No                   | 100    | Hiển thị thông báo lỗi đăng nhập       |