# Ong Thị Đức - Portfolio backup

Bản tải về từ website https://onggduc04.io.vn/, phiên bản 12.
Bao gồm đầy đủ HTML, CSS, JavaScript, Three.js, font, ảnh, video, PDF và ảnh xem trước khi chia sẻ.

## Deploy tự động bằng GitHub Actions

Workflow `.github/workflows/pages.yml` kiểm tra chuyển động, nội dung và toàn bộ đường dẫn tài nguyên trước khi deploy thư mục `dist` lên GitHub Pages. Workflow chạy khi push vào `main` hoặc chạy thủ công bằng `workflow_dispatch`.

Trong Settings > Pages, nguồn deploy là **GitHub Actions**. Kết quả deploy và URL bản backup xuất hiện trong tab Actions và environment `github-pages`.

Bản backup không khai báo CNAME; domain chính vẫn là `onggduc04.io.vn`. Đường dẫn runtime đều tương đối nên website chạy được dưới đường dẫn repo trên GitHub Pages. Metadata chia sẻ và canonical tiếp tục tham chiếu domain chính.

## Chạy nhanh trên Windows

1. Giải nén toàn bộ file ZIP vào một thư mục trên máy. Không chạy bên trong cửa sổ ZIP.
2. Máy cần có Node.js (từ phiên bản 18). Nếu chưa có, cài tại https://nodejs.org/.
3. Nhấp đúp `START-WINDOWS.bat`. Trình duyệt sẽ mở website tại http://127.0.0.1:8080/.
4. Giữ cửa sổ dòng lệnh đang mở khi xem web. Nhấn Ctrl+C để dừng.

Không cần chạy `npm install`, không cần build và không cần tài khoản hosting.
Không mở trực tiếp `dist/index.html`: các module JavaScript cần được tải qua server local.

## Mac / Linux hoặc chạy bằng terminal

Mở terminal tại thư mục đã giải nén và chạy:

```sh
node serve.mjs --open
```

Hoặc dùng `npm start`. Trên macOS có thể mở `START-MAC-LINUX.command` nếu hệ thống cho phép.
Nếu cổng 8080 đang bận, chạy `node serve.mjs 8081 --open`, rồi mở http://127.0.0.1:8081/.

Server có hỗ trợ yêu cầu byte-range để video có thể tua và phát đúng trên trình duyệt.

## Các file để chỉnh sửa

- `dist/index.html`: bố cục, tiêu đề, nội dung trang và thông tin chia sẻ link.
- `dist/portfolio.css`, `dist/style.css`: giao diện và bố cục responsive.
- `dist/app.js`: điều khiển scroll, dự án, video và cửa sổ xem tài liệu.
- `dist/portal-motion.js`: vòng xoáy và chuyển động phóng chữ.
- `dist/film-motion.js`, `dist/practice-motion.js`: chuyển động video và minh chứng.
- `dist/profile-data.js`: thông tin cá nhân và nội dung công việc.
- `dist/portfolio-data.js`: danh sách ảnh, video, tài liệu và dự án.
- `dist/media/`: ảnh, video đầy đủ, ảnh nhỏ và video preview.
- `dist/documents/`: tài liệu PDF của website.
- `dist/assets/`: hình trang trí, font và ảnh chia sẻ.
- `dist/vendor/`: Three.js và giấy phép đi kèm.
- `tests/`: kiểm tra hình học, chuyển động, đường dẫn tài nguyên và nội dung.
- `content/`: dữ liệu đối chiếu nội dung và danh mục file gốc.
- `docs/DEVELOPMENT-HISTORY.md`: ghi chú phát triển các phiên bản trước.

Có thể chạy `npm test` để kiểm tra mã nguồn, không cần cài thư viện ngoài.
`CHECKSUMS.sha256` liệt kê dấu kiểm tra của các file trong gói.

## Sử dụng offline và đưa lên hosting khác

Ảnh, video, PDF, font và thư viện cần cho giao diện đều nằm trong gói này.
Các nút mở file gốc trên Google Drive vẫn trỏ về Drive; chức năng gửi email dùng ứng dụng email trên máy.
Các file ảnh/video là phiên bản website đang sử dụng, không phải toàn bộ file thiết kế và video gốc chưa tối ưu trên Drive.

Nếu đưa lên hosting khác, dùng toàn bộ thư mục `dist` làm thư mục public.
Cập nhật các URL trong thẻ canonical, Open Graph và Twitter ở `dist/index.html` theo domain mới.
Địa chỉ 127.0.0.1 chỉ hoạt động trên máy đang chạy server; để người khác xem, dùng website đã public hoặc tự triển khai hosting.

Gói này không chứa thông tin đăng nhập, token triển khai hay lịch sử Git. Việc xuất gói không thay đổi website đang chạy.
