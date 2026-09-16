# task_context.md — Tóm tắt tiến trình & quyết định

## Trạng thái hiện tại
**Session 0, 1, 2, 3 đã xong, đã xác nhận khớp thiết kế và đã push lên `origin/main`.** Toàn bộ 7 session còn lại (4 → 10) trong `PROGRESS.md` vẫn ở trạng thái ⬜ Chưa làm. Trang `public/index.html` hiện có: ticker sticky + navbar + ảnh hero + dải sọc divider + headline/icon + mô tả/stamp badge. Sẵn sàng bắt đầu **Session 4 — Ảnh hero dạng tem (scalloped mask)**.

## Bước tiếp theo
Bắt đầu **Session 4** (node `1:330`): ảnh lớn viền răng cưa kiểu con tem (boolean-operation "Union" thật sự lần này, khác với Session 3 vốn hoá ra không bo góc). Ưu tiên SVG `clip-path` (xuất path từ Figma), hoặc dùng ảnh PNG viền sẵn nếu nhanh/đúng hơn. Xong thì dừng lại chờ xác nhận khớp thiết kế, rồi hỏi rõ ràng trước khi push git.

## Đã làm được gì

### Session 3 — Hero banner + headline + mô tả + stamp badge (xong, đã push)
- `public/css/sections/hero.css` mới: `.hero-banner` (ảnh full-width, KHÔNG bo góc — đã kiểm tra mask gốc chỉ là rect phẳng), `.hero-content`/`.hero-headline` (3 dòng + 6 icon toạ độ tuyệt đối), `.hero-description` (mô tả + stamp badge).
- Ảnh/icon tải về `public/images/home/`: `hero-banner.png`, `headline-icon-1..6.svg`, `stamp-badge.svg`.
- **Phát hiện + sửa khi review**: thiếu dải sọc trang trí (node `1:96`, 30px trắng + 30px kem xen kẽ) ở đường nối hero/headline — đã bổ sung `.hero-divider`. Ban đầu code sai tỉ lệ (60/60 thay vì 30/30), đã sửa lại đúng theo `get_design_context` thực tế của node `1:96`.
- Rút kinh nghiệm: node trùng lặp theo y trong Figma không mặc định là bản sao giống hệt — đã ghi vào `CLAUDE.md`.

### Session 2 — Sticky ticker bar + Navbar (xong, đã push)
- `public/css/components/ticker.css` + `navbar.css`. Asset SVG (logo, caret, 3 icon ticker) tải về `public/images/shared/` (dùng chung nhiều trang, tách khỏi `images/home/`).
- Navbar tạm đè lên `.hero-placeholder` (nền tối) chờ ảnh hero thật ở Session 3.
- **Sửa lỗi phát hiện khi review**: trang bị kéo dãn full-width trên màn hình lớn do chưa giới hạn theo canvas Figma 1440px. Thêm `<div class="page">` + CSS `.page { max-width: 1440px; margin: 0 auto; }` — quy ước này áp dụng cho mọi section về sau.

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
│   ├── index.html             # .page > ticker + navbar + hero banner/divider/headline/mô tả — chưa có section từ "Tìm Cửa Hàng Gần Bạn" trở xuống
│   ├── font-test.html          # trang test font (Session 1)
│   ├── css/
│   │   ├── main.css             # @import vendor → base → components → sections
│   │   ├── vendor/bootstrap.min.css
│   │   ├── base/                 # reset.css (+.page container), fonts.css, variables.css
│   │   ├── components/            # ticker.css, navbar.css (Session 2)
│   │   └── sections/               # hero.css (Session 3)
│   ├── js/main.js                 # placeholder
│   ├── fonts/tt-norms-pro-serif/, urw-din/   # đã copy đủ file .ttf
│   └── images/
│       ├── shared/                 # logo, icon ticker/caret (Session 2)
│       └── home/                    # hero-banner.png, headline-icon-1..6.svg, stamp-badge.svg (Session 3)
├── server/.gitkeep
├── CLAUDE.md
├── DESIGN.md
├── PROGRESS.md
└── task_context.md              # file này
```
