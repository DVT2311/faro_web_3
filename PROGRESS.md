# Tiến độ dự án FARO Web

Cập nhật lần cuối: 2026-09-15

## Bảng session
| # | Session | Trạng thái | Node Figma | Ghi chú | Đã push git |
|---|---|---|---|---|---|
| 0 | Scaffold & tooling | ✅ Xong | — | Cấu trúc thư mục, Bootstrap+serve qua npm, font đã copy, index.html/main.css skeleton, CLAUDE.md/DESIGN.md/PROGRESS.md/task_context.md/README.md đã tạo. `npm run dev` test OK (HTTP 200). | ✅ (commit `42bb506`) |
| 1 | Design tokens + font + reset | ✅ Xong | — | variables.css, fonts.css (12 TT Norms + 48 URW DIN), reset.css, font-test.html đối chiếu OK | ✅ (commit `a47f791`) |
| 2 | Ticker + Navbar | ✅ Xong | 1:1281, 1:44 | ticker.css (marquee sticky), navbar.css (logo/menu trắng đè hero-placeholder tạm), asset SVG trong images/shared/. Đã sửa `.page{max-width:1440px}` để không bị kéo dãn full-width. | ✅ |
| 3 | Hero + headline + mô tả | ✅ Xong | 1:8, 1:56, 1:170 | hero.css (banner, headline+6 icon, mô tả+badge, dải sọc divider node 1:96 bổ sung khi review). Ảnh/icon trong images/home/. | ✅ |
| 4 | Ảnh hero dạng tem | ✅ Xong | 1:330 | Ảnh PNG xuất thẳng từ Figma (viền tem có sẵn trong ảnh), thêm `.hero-stamp-photo` vào hero.css. Sửa `margin-top:-94px` để khớp khoảng cách thật (section chồng lên .hero-content trong Figma, không nối tiếp). | ✅ |
| 5 | Store locator | ✅ Xong | 1:15, 1:16-31, 9:4, 9:34 | Carousel 3 slide/6 chi nhánh (phát hiện thêm 2 nhóm frame nằm ngoài khung 1440px chính trong Figma khi review — không chỉ 2 chi nhánh như quét ban đầu). Hover zoom ảnh, tự trượt 3s 1 chiều (clone slide đầu để loop mượt). store-locator.css + js/components/store-carousel.js. | ✅ |
| 6 | Bộ đôi ảnh sản phẩm | ✅ Xong | 1:1151 | Ảnh xuất thẳng từ Figma (composite phức tạp, chữ caption đã bake sẵn). Tách `.hero-divider` thành component dùng chung `divider-stripe.css`. | ✅ |
| 7 | Harvest in Bloom | ✅ Xong | 1:216 | Xuất nguyên section thành 1 ảnh phẳng (chữ chạy cong "The New" không xuất được qua code, chỉ đúng khi chụp ảnh). Ảnh đã có sẵn dải sọc trang trí ở trên cùng. | ✅ |
| 8 | Sản Phẩm (3 thẻ) | ✅ Xong | 1:190 | Text thật lấy đúng qua get_design_context (không dùng tên layer sai). Nền `#fffdf1`, hover zoom ảnh. Sửa lỗi dùng nhầm ảnh gốc siêu to (3277×4096, 9-12MB) từ image fill URL → đổi sang get_screenshot đúng kích thước hiển thị (335×315, ~100-190KB). | ✅ |
| 9 | Về đội với mình | ✅ Xong | 1:1254 | 2 cột: ảnh + heading/danh sách 4 vị trí, nền `#edce90`. Sửa đường kẻ phân cách bị mờ không đều do số thập phân (gap/line-height lẻ) → làm tròn số nguyên, đậm 2px. Ghi chú: sẽ chỉnh lại phần này khi làm tính năng tuyển dụng thật (dynamic). | ✅ |
| 10 | Footer | ✅ Xong | 1:339... | Wordmark + nav + copyright + 5 badge tem. Vị trí 4 badge bị xoay cuối cùng do người dùng tự tinh chỉnh tay trực tiếp trong `footer.css` (không dùng công thức toán xoay-quanh-tâm vì không khớp cách Figma lưu toạ độ nhóm xoay). Ảnh badge dùng bản export PNG 3x thật từ Figma (người dùng cung cấp) thay vì `get_screenshot` (không giữ alpha thật). **Đây là session cuối cùng của trang chủ — toàn bộ 11 session (0-10) đã hoàn tất.** | ✅ |

## Việc đang dang dở / cần lưu ý khi vào lại
- **Toàn bộ 11 session (0-10) của trang chủ đã hoàn tất, xác nhận khớp thiết kế và đã push.** `public/index.html` đầy đủ từ ticker đến footer.
- **Việc cần làm lại sau** (theo yêu cầu người dùng): section "Về đội với mình" hiện là danh sách tĩnh — khi làm tính năng tuyển dụng thật (dynamic, có thể từ backend Express sau này), quay lại chỉnh sửa phần này.
- **Bước tiếp theo cho dự án**: trang chủ đã xong — việc kế tiếp (thêm trang mới, làm responsive, bắt đầu backend Express...) sẽ theo chỉ định của người dùng.

### Các bài học quan trọng đã rút ra (áp dụng cho công việc sau này)
- Node trùng lặp ở nhiều mốc y trong Figma không phải lúc nào cũng là bản sao giống hệt — luôn kiểm tra riêng từng cái (Session 3).
- Các section có thể **chồng lên nhau** theo toạ độ y tuyệt đối thay vì xếp nối tiếp — luôn đối chiếu y-start/y-end (Session 4).
- Figma có thể có **frame nằm ngoài khung 1440px chính** (vd carousel/slider states) — phải quét `get_metadata` ở cấp `0:1` (toàn canvas), không chỉ trong khung chính (Session 5).
- URL ảnh từ `get_design_context` (image fill) có thể là ảnh GỐC siêu to — dùng `get_screenshot` trên đúng node hiển thị để lấy ảnh đúng kích thước (Session 8).
- Giá trị số thập phân lẻ từ Figma cộng dồn có thể khiến đường kẻ mảnh (1-2px) rơi vào vị trí nửa pixel, browser anti-alias mờ không đều — làm tròn số nguyên cho các giá trị ảnh hưởng viền/đường kẻ mảnh (Session 9).
- **Với group bị xoay (rotation≠0)**: toạ độ X/Y/W/H trong panel Inspect của Figma là kích thước LOCAL (trước khi xoay), không phải bounding box sau khi xoay mà API/`get_screenshot` trả về — công thức "xoay quanh tâm" tiêu chuẩn để quy đổi **không khớp thực tế** (đã kiểm chứng, sai không theo quy luật dự đoán được). Cách hiệu quả nhất: để người dùng so sánh trực tiếp với Figma và khoanh vùng đúng/sai trên ảnh chụp, chỉnh theo đó thay vì suy ngược bằng công thức (Session 10).
- **Ảnh cần alpha (trong suốt) thật**: `get_screenshot` luôn render đè lên nền trắng đục, không giữ alpha — với ảnh cần trong suốt thật, tốt nhất nhờ người dùng export trực tiếp từ Figma (PNG, scale ≥3x) thay vì tái tạo bằng xử lý ảnh/chroma-key (Session 10).
