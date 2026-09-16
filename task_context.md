# task_context.md — Tóm tắt tiến trình & quyết định

## Trạng thái hiện tại
**Session 0 — Scaffold dự án & tooling đã xong và đã push lên git** (commit `42bb506`, nhánh `main`). Toàn bộ 11 session còn lại (1 → 10) trong `PROGRESS.md` vẫn ở trạng thái ⬜ Chưa làm — trang `public/index.html` hiện chưa có bất kỳ section nội dung thật nào, chỉ là khung rỗng. Sẵn sàng bắt đầu Session 1.

## Đã làm được gì (Session 0)
- Khởi tạo `package.json`, cài `bootstrap` + `serve` qua npm (không có bước build CSS/JS nào — xem lý do ở mục quyết định #3 bên dưới).
- Copy `node_modules/bootstrap/dist/css/bootstrap.min.css` vào `public/css/vendor/`.
- Copy toàn bộ font `TT Norms Pro Serif` (12 file weight) và `URW DIN` (44 file, gồm cả biến thể Cond/SemiCond) từ `C:\Users\dinhv\Downloads\FARO BRANDING FONT\` vào `public/fonts/`; đổi tên file URW DIN từ `URW++ - URW DIN ...` sang `URWDIN-...` cho gọn, dễ khai báo `@font-face`.
- Dựng khung thư mục `public/css/{vendor,base,components,sections}`, `public/js/components`, `public/images/home`, `server/` (placeholder Express) đúng theo `DESIGN.md`/`CLAUDE.md`.
- Tạo `public/index.html` + `public/css/main.css` (chỉ `@import` vendor + 3 file base rỗng) — **chưa có HTML/CSS thật của bất kỳ section nào**, vì nội dung từng section chỉ được thêm khi tới đúng session của nó (Session 2 trở đi).
- Tạo 4 file tài liệu dự án (`CLAUDE.md`, `DESIGN.md`, `PROGRESS.md`, file này) + cập nhật `README.md`.
- Đã test `npm run dev` (chạy `serve public`) — server lên được, `index.html` và `css/main.css` trả HTTP 200.
- Đã commit + push lên `origin/main` (commit `42bb506`), theo đúng quy tắc chỉ push sau khi người dùng đồng ý.

## Còn dang dở / cần lưu ý khi đọc `DESIGN.md` + `PROGRESS.md`
- `public/css/base/reset.css`, `fonts.css`, `variables.css` hiện là **file rỗng có comment placeholder** — nội dung thật (design tokens, `@font-face`, reset) là việc của Session 1, chưa làm.
- Chưa có bất kỳ ảnh nào được tải về `public/images/home/` (đúng chủ đích — chỉ tải khi vào session cần dùng).
- Chưa quyết định/cài thư viện hỗ trợ hiệu ứng đặc thù (chữ chạy cong...) — để ngỏ, chờ chỉ định khi tới Session 4/7/10.

## Bước tiếp theo
Bắt đầu **Session 1 — Design tokens + font + reset**: điền nội dung thật cho 3 file `public/css/base/*.css` theo đặc tả ở `DESIGN.md` (mục "Session 1"), dựng 1 trang test hiển thị chữ mẫu 2 font để đối chiếu Figma. Xong thì dừng lại chờ xác nhận trước khi hỏi push git.

## Các quyết định đã chốt
1. Nguồn thiết kế: Figma `Faro-Web-dev`, fileKey `vkJeQ9o8oR3cfI1pp311wd`, trang chủ = node `1:7` (1440×7760px) — hiện là frame duy nhất trong file.
2. Font: `TT Norms Pro Serif` (heading) và `URW DIN` (nav/body), nguồn tại `C:\Users\dinhv\Downloads\FARO BRANDING FONT\`, đã copy vào `public/fonts/`.
3. Tooling: npm project, chỉ dùng **Bootstrap** (đã cân nhắc Tailwind rồi bỏ vì dễ xung đột reset/class, không cần thiết cho thiết kế tuỳ biến cao này). Không có bước build CSS/JS — code trực tiếp trong `public/`.
4. Phạm vi: làm đúng bản desktop (1440px) trước, responsive tablet/mobile bổ sung sau.
5. Cấu trúc thư mục: `public/` là nơi viết code (đồng thời static root cho Express sau này), `server/` để trống sẵn chỗ cho backend Express.
6. Quy trình làm việc: xây **từng session một** theo đúng thứ tự 11 section, mỗi session xong phải dừng lại đối chiếu Figma và chờ xác nhận khớp thiết kế mới qua session tiếp theo; sau khi xác nhận, phải hỏi có muốn push git hay không.
7. 3 file tài liệu sống: `CLAUDE.md` (nguyên tắc chung), `DESIGN.md` (chi tiết thiết kế), `PROGRESS.md` (trạng thái session) — đều cập nhật liên tục.
8. Ảnh chỉ tải về từ Figma khi thực sự code tới section đó. Hiệu ứng đặc thù (viền tem, chữ chạy cong, badge tròn...) ưu tiên CSS viết tay nhưng được phép dùng ảnh xuất thẳng từ Figma (kể cả có chữ bake sẵn) nếu nhanh/đúng hơn — xác nhận theo từng trường hợp lúc code. Thư viện hỗ trợ hiệu ứng đặc thù (nếu cần, vd chữ chạy cong) chỉ cài khi người dùng chỉ định cụ thể ở đúng session liên quan (dự kiến Session 4/7/10); nếu không dùng tới thì gỡ khỏi `package.json`.

## Cấu trúc dự án hiện tại
```
FARO WEB 3/
├── package.json          # bootstrap + serve, script "dev": "serve public"
├── .gitignore
├── public/
│   ├── index.html         # skeleton, chưa có section thật
│   ├── css/
│   │   ├── main.css        # @import vendor/base
│   │   ├── vendor/bootstrap.min.css
│   │   └── base/           # reset.css, fonts.css, variables.css (placeholder, chờ Session 1)
│   ├── js/main.js           # placeholder
│   ├── fonts/tt-norms-pro-serif/, urw-din/   # đã copy đủ file .ttf
│   └── images/home/          # trống, tải dần theo session
├── server/.gitkeep
├── CLAUDE.md
├── DESIGN.md
├── PROGRESS.md
└── task_context.md          # file này
```

## Kế hoạch đang dở
Session 0 đã hoàn tất, `npm run dev` (`serve public`) đã test chạy được (HTTP 200 cho `index.html` và `css/main.css`). Đang chờ người dùng xác nhận trước khi hỏi push git và bắt đầu Session 1 (design tokens + `@font-face` + reset trong `public/css/base/`).
