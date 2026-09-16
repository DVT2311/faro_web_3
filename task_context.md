# task_context.md — Tóm tắt tiến trình & quyết định

## Trạng thái hiện tại
**Session 0 và Session 1 đã xong, đã xác nhận khớp thiết kế và đã push lên `origin/main`.** Toàn bộ 9 session còn lại (2 → 10) trong `PROGRESS.md` vẫn ở trạng thái ⬜ Chưa làm — trang `public/index.html` hiện chưa có bất kỳ section nội dung thật nào, chỉ là khung rỗng có link tới `css/main.css`. Sẵn sàng bắt đầu **Session 2 — Sticky ticker bar + Navbar**.

## Bước tiếp theo
Bắt đầu **Session 2** (node `1:1281`, `1:44`): dựng thanh ticker sticky (marquee CSS) + navbar (logo + menu) đè lên hero, theo đặc tả ở `DESIGN.md`. Lấy asset logo/icon qua `get_design_context` lúc code (link asset Figma cũ đã hết hạn, phải tải lại). Xong thì dừng lại chờ xác nhận khớp thiết kế, rồi hỏi rõ ràng trước khi push git (xem quy tắc push ở `CLAUDE.md`).

## Đã làm được gì

### Session 1 — Design tokens + font + reset (xong, đã push)
- `public/css/base/variables.css`: design tokens (`--color-text: #2e2926`, `--color-accent: #c79763`, `--color-cream: #fffae5`, biến font-family).
- `public/css/base/fonts.css`: `@font-face` đầy đủ cho 12 file TT Norms Pro Serif + 48 file URW DIN (3 family theo độ rộng: `URW DIN`, `URW DIN Condensed`, `URW DIN SemiCondensed`, weight 100–900).
- `public/css/base/reset.css`: reset cơ bản.
- `public/font-test.html`: trang test hiển thị mẫu chữ — người dùng đã xác nhận khớp thiết kế.
- Đã commit + push lên `origin/main`, cùng với cập nhật quy tắc push trong `CLAUDE.md` (mục "Git — quy tắc push").

### Session 0 — Scaffold dự án & tooling (xong, đã push)
- Khởi tạo `package.json`, cài `bootstrap` + `serve` qua npm (không có bước build CSS/JS — xem quyết định #3 bên dưới).
- Copy `bootstrap.min.css` vào `public/css/vendor/`.
- Copy toàn bộ font `TT Norms Pro Serif` (12 file) và `URW DIN` (48 file, gồm Cond/SemiCond) từ `C:\Users\dinhv\Downloads\FARO BRANDING FONT\` vào `public/fonts/`; đổi tên file URW DIN cho gọn (`URW++ - URW DIN ...` → `URWDIN-...`).
- Dựng khung thư mục `public/css/{vendor,base,components,sections}`, `public/js/components`, `public/images/home`, `server/` (placeholder Express).
- Tạo `public/index.html` + `public/css/main.css` skeleton.
- Tạo 4 file tài liệu dự án (`CLAUDE.md`, `DESIGN.md`, `PROGRESS.md`, file này) + cập nhật `README.md`.
- Đã commit + push lên `origin/main`.

## Còn dang dở / cần lưu ý
- Chưa có bất kỳ ảnh nào tải về `public/images/home/` (đúng chủ đích — chỉ tải khi vào session cần dùng, xem quyết định #8).
- Chưa quyết định/cài thư viện hỗ trợ hiệu ứng đặc thù (chữ chạy cong...) — để ngỏ, chờ chỉ định khi tới Session 4/7/10.
- `public/index.html` chưa có section nội dung thật nào — sẽ thêm dần từ Session 2 trở đi.

## Các quyết định đã chốt
1. Nguồn thiết kế: Figma `Faro-Web-dev`, fileKey `vkJeQ9o8oR3cfI1pp311wd`, trang chủ = node `1:7` (1440×7760px) — hiện là frame duy nhất trong file.
2. Font: `TT Norms Pro Serif` (heading) và `URW DIN` (nav/body), nguồn tại `C:\Users\dinhv\Downloads\FARO BRANDING FONT\`, đã copy vào `public/fonts/`.
3. Tooling: npm project, chỉ dùng **Bootstrap** (đã cân nhắc Tailwind rồi bỏ vì dễ xung đột reset/class, không cần thiết cho thiết kế tuỳ biến cao này). Không có bước build CSS/JS — code trực tiếp trong `public/`.
4. Phạm vi: làm đúng bản desktop (1440px) trước, responsive tablet/mobile bổ sung sau.
5. Cấu trúc thư mục: `public/` là nơi viết code (đồng thời static root cho Express sau này), `server/` để trống sẵn chỗ cho backend Express.
6. Quy trình làm việc: xây **từng session một** theo đúng thứ tự 11 section, mỗi session xong phải dừng lại đối chiếu Figma và chờ xác nhận khớp thiết kế mới qua session tiếp theo.
7. 3 file tài liệu sống: `CLAUDE.md` (nguyên tắc chung), `DESIGN.md` (chi tiết thiết kế), `PROGRESS.md` (trạng thái session), `task_context.md` (file này) — đều cập nhật liên tục, không để sót.
8. Ảnh chỉ tải về từ Figma khi thực sự code tới section đó. Hiệu ứng đặc thù (viền tem, chữ chạy cong, badge tròn...) ưu tiên CSS viết tay nhưng được phép dùng ảnh xuất thẳng từ Figma (kể cả có chữ bake sẵn) nếu nhanh/đúng hơn — xác nhận theo từng trường hợp lúc code. Thư viện hỗ trợ hiệu ứng đặc thù (nếu cần) chỉ cài khi người dùng chỉ định cụ thể ở đúng session liên quan.
9. **Git push**: mọi lần push, không ngoại lệ, phải hỏi rõ ràng và chờ người dùng đồng ý trực tiếp — không suy diễn từ các câu chung chung ("tiếp tục", "làm tiếp đi"...). Chi tiết ở `CLAUDE.md` mục "Git — quy tắc push".

## Cấu trúc dự án hiện tại
```
FARO WEB 3/
├── package.json              # bootstrap + serve, script "dev": "serve public"
├── .gitignore
├── public/
│   ├── index.html             # skeleton, chưa có section thật
│   ├── font-test.html          # trang test font (Session 1)
│   ├── css/
│   │   ├── main.css             # @import vendor → base
│   │   ├── vendor/bootstrap.min.css
│   │   └── base/                 # reset.css, fonts.css, variables.css — ĐÃ có nội dung thật (Session 1)
│   ├── js/main.js                 # placeholder
│   ├── fonts/tt-norms-pro-serif/, urw-din/   # đã copy đủ file .ttf
│   └── images/home/                 # trống, tải dần theo session
├── server/.gitkeep
├── CLAUDE.md
├── DESIGN.md
├── PROGRESS.md
└── task_context.md              # file này
```
