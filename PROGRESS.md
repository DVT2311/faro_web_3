# Tiến độ dự án FARO Web

Cập nhật lần cuối: 2026-09-15

## Bảng session
| # | Session | Trạng thái | Node Figma | Ghi chú | Đã push git |
|---|---|---|---|---|---|
| 0 | Scaffold & tooling | ✅ Xong | — | Cấu trúc thư mục, Bootstrap+serve qua npm, font đã copy, index.html/main.css skeleton, CLAUDE.md/DESIGN.md/PROGRESS.md/task_context.md/README.md đã tạo. `npm run dev` test OK (HTTP 200). | ✅ (commit `42bb506`) |
| 1 | Design tokens + font + reset | ✅ Xong | — | variables.css, fonts.css (12 TT Norms + 48 URW DIN), reset.css, font-test.html đối chiếu OK | ✅ (commit `a47f791`) |
| 2 | Ticker + Navbar | ✅ Xong | 1:1281, 1:44 | ticker.css (marquee sticky), navbar.css (logo/menu trắng đè hero-placeholder tạm), asset SVG trong images/shared/. Đã sửa `.page{max-width:1440px}` để không bị kéo dãn full-width. | ✅ |
| 3 | Hero + headline + mô tả | 🔄 Đang làm | 1:8, 1:56, 1:170 | | |
| 4 | Ảnh hero dạng tem | ⬜ Chưa làm | 1:330 | | |
| 5 | Store locator | ⬜ Chưa làm | 1:15, 1:16-31 | | |
| 6 | Bộ đôi ảnh sản phẩm | ⬜ Chưa làm | 1:1151 | | |
| 7 | Harvest in Bloom | ⬜ Chưa làm | 1:216 | | |
| 8 | Sản Phẩm (3 thẻ) | ⬜ Chưa làm | 1:190 | | |
| 9 | Về đội với mình | ⬜ Chưa làm | 1:1254 | | |
| 10 | Footer | ⬜ Chưa làm | 1:339... | | |

## Việc đang dang dở / cần lưu ý khi vào lại
- Session 0, 1, 2 đã xác nhận xong và đã push. Đang bắt đầu Session 3 — Hero banner + headline + mô tả + stamp badge.
- `.hero-placeholder` (nền tối tạm trong `public/css/components/navbar.css`) sẽ được thay bằng ảnh hero thật ở Session 3 — nhớ xoá class/CSS placeholder khi xong.
