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
| 8 | Sản Phẩm (3 thẻ) | 🔄 Đang làm | 1:190 | | |
| 9 | Về đội với mình | ⬜ Chưa làm | 1:1254 | | |
| 10 | Footer | ⬜ Chưa làm | 1:339... | | |

## Việc đang dang dở / cần lưu ý khi vào lại
- Session 0-7 đã xác nhận xong và đã push. Đang bắt đầu Session 8 — "Sản Phẩm" 3 thẻ sản phẩm (node `1:190`).
- **Lưu ý quan trọng cho Session 8**: tên layer trong Figma tại node `1:190` là tiếng Anh "[H2]--The Website You Want Without The Dev Time." (sót từ template gốc) — PHẢI gọi `get_design_context` lấy đúng text thật tại `1:195`/`1:196`, không dùng tên layer.
- Lưu ý phát hiện ở Session 3: node trùng lặp trong Figma (ticker/dải sọc lặp ở nhiều mốc y) không phải lúc nào cũng là "component giống hệt tái dùng". Cần double-check bằng screenshot/get_design_context riêng cho từng node trùng lặp, không mặc định giống nhau.
- Lưu ý phát hiện ở Session 4: các section trong Figma có thể **chồng lên nhau** theo toạ độ y tuyệt đối thay vì luôn xếp nối tiếp — luôn đối chiếu y-start/y-end giữa các section liền kề trước khi giả định margin/spacing.
- **Lưu ý quan trọng phát hiện ở Session 5**: Figma có thể có **frame nằm ngoài khung 1440px chính** (vd carousel/slider states) không nằm trong cây `1:7` — phải quét `get_metadata` ở cấp `0:1` (toàn page/canvas) chứ không chỉ trong `1:7`, để không bỏ sót nội dung như đã xảy ra (bỏ sót 2/3 số chi nhánh của store locator).
