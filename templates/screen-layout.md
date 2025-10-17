graph TD
    Screen["S-02: Danh sách Sản phẩm"]
    Screen --> Header["Header (Tiêu đề, User Info)"]
    Screen --> FilterArea["Khu vực Lọc"]
    Screen --> ActionBar["Thanh hành động (Import, Export)"]
    Screen --> DataTable["Bảng dữ liệu sản phẩm"]
    Screen --> Pagination["Phân trang"]

    FilterArea --> SearchInput["Input tìm kiếm theo Tên/Mã SP"]
    FilterArea --> DepartmentSelect["Dropdown lọc theo Category"]
    FilterArea --> StatusSelect["Dropdown lọc theo Trạng thái"]