# task_context.md — Tóm tắt tiến trình & quyết định

## Trạng thái hiện tại
**Toàn bộ 11 session (0-10) của trang chủ đã hoàn tất, khớp thiết kế Figma.** Đã bổ sung thêm 2 tính năng ngoài phạm vi Figma tĩnh: nút **back-to-top** và **dropdown "Về chúng tôi"** ở navbar.

## Bước tiếp theo
Chưa có chỉ định cụ thể — chờ người dùng quyết định bước kế tiếp: thêm trang mới, làm responsive tablet/mobile, hay bắt đầu backend Express (xem `CLAUDE.md` phần Stack). Khi có việc mới, tạo session tiếp theo trong `PROGRESS.md`/`DESIGN.md` theo đúng quy trình đã thiết lập (làm từng session, xác nhận khớp thiết kế, hỏi rõ trước khi push).

## Đã làm được gì

### Bổ sung ngoài Figma — Dropdown "Về chúng tôi" ở navbar (xong, đã push)
- Không có trong file Figma (thiết kế gốc chỉ tĩnh) — làm theo yêu cầu trực tiếp của người dùng.
- Mục "Về chúng tôi" trong navbar đổi từ `<li>` tĩnh sang `<button>` toggle, bấm vào xổ xuống danh sách 3 link giống cột footer: Faro Cafe / Faro Coffee Roastery / Faro Coffee Insights.
- Caret xoay 180° khi mở; đóng khi click ra ngoài hoặc nhấn Esc. Hover đổi màu chữ sang `--color-accent` cho cả navbar item chính lẫn từng item trong dropdown.
- File: `public/css/components/navbar.css` (thêm rule `.navbar__item--dropdown`, `.navbar__dropdown*`), `public/js/components/navbar-dropdown.js` (mới), markup dropdown trong `public/index.html`.

### Bổ sung ngoài Figma — Nút back-to-top (xong, đã push)
- Không có trong file Figma (không thuộc session nào trong `DESIGN.md`) — làm theo yêu cầu trực tiếp của người dùng.
- Nút tròn cố định góc dưới-phải (`position: fixed`), ẩn mặc định, hiện khi `window.scrollY > 600px`, bấm sẽ `scrollTo({top:0, behavior:'smooth'})`.
- Style theo design token sẵn có: nền `--color-text`, hover đổi `--color-accent`, icon mũi tên SVG inline (không cần tải asset).
- File: `public/css/components/back-to-top.css` (component dùng chung, import trong `main.css`), `public/js/components/back-to-top.js`, markup thêm cuối `public/index.html` trước thẻ script.

### Session 10 — Footer (xong, đã push) — **session cuối cùng của trang chủ**
- Wordmark FARO (SVG) + cột "VỀ CHÚNG TÔI" + copyright + 5 badge tem vị trí cửa hàng.
- **Chuỗi sự cố + bài học lớn nhất dự án** (badge bị xoay):
  1. Ảnh `get_screenshot` ban đầu bị nền trắng đục thay vì trong suốt (che mất chữ FARO khi đè lên) — thử nhiều lần xử lý chroma-key bằng code (PowerShell/System.Drawing) đều phải đánh đổi giữa viền răng cưa và nhạt màu, không hoàn hảo. **Giải pháp cuối: nhờ người dùng export PNG 3x trực tiếp từ Figma** (giữ alpha thật) — dùng thẳng, không xử lý gì thêm.
  2. Vị trí 4/5 badge bị xoay liên tục sai dù đã tính toán nhiều lần bằng toạ độ API. Người dùng cung cấp số liệu thật từ panel Inspect của Figma (X/Y/W/H/góc xoay) — phát hiện đây là **toạ độ LOCAL (trước khi xoay)**, khác hệ với bounding-box-sau-khi-xoay mà API trả về. Thử công thức "xoay quanh tâm hình học" để quy đổi nhưng **không khớp thực tế** (kiểm chứng bằng số, sai không theo quy luật). Cuối cùng: **người dùng tự khoanh vùng đúng/sai trên ảnh chụp trình duyệt, rồi tự tay tinh chỉnh giá trị cuối trong `footer.css`**.
- Bài học: với nội dung Figma phức tạp (xoay, alpha thật), đôi khi **hợp tác trực tiếp với người dùng (họ xem Figma thật) hiệu quả hơn nhiều so với cố suy ngược bằng API/công thức**. Đã ghi vào `CLAUDE.md`.
- File: `public/css/sections/footer.css`, `public/js/` không đổi, ảnh `footer-badge-*.png` (bản export 3x của người dùng) + `footer-wordmark.svg`.

### Session 9 — "Về đội với mình" (xong, đã push)
- 2 cột flex: ảnh (`get_screenshot` đúng kích thước hiển thị) + heading/danh sách 4 vị trí, nền `#edce90`.
- **Sự cố + bài học**: đường kẻ phân cách ban đầu (1.12px solid black theo đúng số liệu Figma) hiển thị mờ không đều giữa 3 đường — do các giá trị thập phân lẻ (`gap: 22.5px`, `line-height: 23.62px`) cộng dồn khiến mỗi đường rơi vào vị trí pixel khác nhau. Thử sai 2 lần (làm nhạt màu → sai hướng, người dùng chỉ ra thiết kế gốc đậm hơn; rồi mới tìm đúng nguyên nhân là do số lẻ) trước khi sửa đúng: làm tròn số nguyên (`gap:22px`, `line-height:24px`) + tăng độ dày `2px` đen đặc. Đã ghi quy tắc chung vào `CLAUDE.md`.
- **Việc cần làm lại sau**: danh sách tuyển dụng hiện tĩnh — khi có tính năng tuyển dụng thật (dynamic) sẽ quay lại chỉnh, theo yêu cầu người dùng.
- File: `public/css/sections/careers.css`, ảnh `careers-photo.png`.

### Session 8 — "Sản Phẩm" (xong, đã push)
- Lấy đúng text thật qua `get_design_context` (`1:195`/`1:196`), không dùng tên layer tiếng Anh sai. Nền section `#fffdf1` (ban đầu bỏ sót, người dùng chỉ ra thiếu màu nền, đã sửa). Hover zoom ảnh (`scale(1.05)`) theo yêu cầu.
- **Phát hiện quan trọng**: URL ảnh trực tiếp từ `get_design_context` (image fill) là ảnh GỐC siêu to (gặp 3277×4096px, 9-12MB/ảnh) — đã đổi sang `get_screenshot` trên đúng node hiển thị để có ảnh đúng kích thước (335×315px, ~100-190KB). Đã ghi bài học này vào `CLAUDE.md`.
- File: `public/css/sections/products.css`, ảnh `product-card-1..3.png`.

### Session 7 — "The New Harvest in Bloom" (xong, đã push)
- Xuất nguyên section thành 1 ảnh phẳng (`harvest-section.png`, 1440×825px) — chữ chạy cong "The New" (text-path) hoàn toàn không xuất được qua `get_design_context`, chỉ đúng khi chụp ảnh; dải sọc trang trí đầu section cũng đã nằm sẵn trong ảnh.
- CSS tối giản (`harvest.css`, chỉ 1 rule).

### Session 6 — Bộ đôi ảnh sản phẩm lớn (xong, đã push)
- Đã kiểm tra `get_design_context` node `1:1151`: có text "MATCHA COCOMILK/85K" nhưng bị `overflow-clip` che khuất hoàn toàn — chữ thật hiển thị ("Trà Sữa Gạo Rang Trân Châu Trắng" / "Trà Sữa Olong Nướng Trân Châu Caramel") đã bake sẵn trong ảnh composite phức tạp (blend-multiply, badge tròn lồng bên trong) → xuất ảnh phẳng, không dựng lại CSS.
- **Refactor nhỏ**: tách `.hero-divider` (Session 3) thành component dùng chung `public/css/components/divider-stripe.css` vì section này cũng cần đúng dải sọc đó.
- File: `public/css/sections/product-highlight.css`, ảnh `product-highlight-1.png`/`-2.png`.

### Session 5 — "Tìm Cửa Hàng Gần Bạn" (xong, đã push)
- **Phát hiện quan trọng**: đây là carousel 3 slide/6 chi nhánh, không phải lưới tĩnh 2×2 — 2 slide sau (Cao Thắng Mansion/Vạn Phúc Square, Nguyễn Trãi Corner/Thảo Điền Villa) nằm ở node `9:4`/`9:34`, **ngoài khung `1:7` chính** (x=1440, x=2880), chỉ phát hiện được khi quét `get_metadata` ở cấp `0:1` (toàn canvas) theo yêu cầu người dùng chỉ ra thiếu nội dung. Đã ghi bài học này vào `CLAUDE.md`.
- Dựng carousel: `.store-carousel` + `.store-carousel__track` (3 `.store-grid`), JS `store-carousel.js` tự trượt 3s/lần, luôn 1 chiều (nhân bản slide đầu gắn cuối track để loop không giật lùi).
- Hover zoom nhẹ trên ảnh (`scale(1.05)`).
- File: `public/css/sections/store-locator.css`, `public/js/components/store-carousel.js`, ảnh `store-photo-1..6.png`, icon `images/shared/icon-map-pin.svg`.

### Session 4 — Ảnh hero dạng tem (scalloped mask) (xong, đã push)
- Ảnh PNG xuất thẳng từ Figma (`get_screenshot` node `1:331`, viền tem có sẵn trong ảnh) lưu tại `public/images/home/hero-stamp-photo.png` — không dựng lại bằng CSS/SVG vì mask gốc quá phức tạp (nhiều lớp ảnh + rotate-90).
- Thêm `.hero-stamp-photo` vào `hero.css`.
- **Phát hiện + sửa khi review**: section này chồng lên 94px cuối của `.hero-content` trong Figma (không xếp nối tiếp) — sửa bằng `margin-top: -94px`. Đã ghi bài học này vào `CLAUDE.md` (luôn đối chiếu y-start/y-end giữa các section liền kề).

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
- Trang chủ đã hoàn tất toàn bộ — không còn section nào dang dở. Việc cần làm lại sau: "Về đội với mình" (Session 9) hiện là danh sách tĩnh, sẽ chỉnh khi có tính năng tuyển dụng thật.
- Chưa từng cần dùng đến thư viện hỗ trợ hiệu ứng đặc thù (quyết định #8) — mọi hiệu ứng phức tạp (chữ chạy cong, viền tem, badge xoay) đều giải quyết bằng ảnh xuất thẳng từ Figma, không cần cài thêm gì vào `package.json`.
- Responsive tablet/mobile: chưa làm (đúng phạm vi đã chốt — quyết định #4), sẽ làm khi có yêu cầu và/hoặc thiết kế Figma cho các kích thước đó.

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
├── public/                     # HOÀN TẤT — trang chủ đầy đủ ticker → footer
│   ├── index.html               # .page > ticker, navbar, hero, store-locator, product-highlight,
│   │                             # harvest, products, careers, footer — đúng thứ tự Figma
│   ├── font-test.html            # trang test font (Session 1)
│   ├── css/
│   │   ├── main.css               # @import vendor → base → components → sections (thứ tự đúng)
│   │   ├── vendor/bootstrap.min.css
│   │   ├── base/                   # reset.css (+.page container), fonts.css, variables.css
│   │   ├── components/              # ticker.css, navbar.css, divider-stripe.css (dùng chung nhiều section)
│   │   └── sections/                 # hero, store-locator, product-highlight, harvest,
│   │                                   # products, careers, footer — 1 file/session
│   ├── js/
│   │   ├── main.js
│   │   └── components/store-carousel.js
│   ├── fonts/tt-norms-pro-serif/, urw-din/   # đã copy đủ file .ttf
│   └── images/
│       ├── shared/                 # logo, icon ticker/caret, icon-map-pin, footer-wordmark.svg
│       └── home/                    # hero-banner.png, headline-icon-1..6.svg, stamp-badge.svg,
│                                     # hero-stamp-photo.png, store-photo-1..6.png,
│                                     # product-highlight-1..2.png, harvest-section.png,
│                                     # product-card-1..3.png, careers-photo.png, footer-badge-*.png
├── server/.gitkeep
├── CLAUDE.md
├── DESIGN.md
├── PROGRESS.md
└── task_context.md              # file này
```
