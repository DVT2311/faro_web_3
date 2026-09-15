# CLAUDE.md — Nguyên tắc chung của dự án

## Bối cảnh
Website FARO Cafe, dựng từ Figma file `Faro-Web-dev` (fileKey `vkJeQ9o8oR3cfI1pp311wd`), trang chủ = node `1:7`. Hiện tại đây là frame duy nhất trong file Figma; dự án sẽ mở rộng thêm trang và gắn backend sau này.

## Stack
- HTML/CSS/JS thuần + **Bootstrap** (qua npm, không dùng Tailwind).
- Không có bước build CSS/JS — code viết trực tiếp trong `public/`, mở/serve là chạy.
- Backend tương lai: **Express (Node.js)**, đặt trong `server/`. `public/` sẽ là static root khi thêm Express (`express.static('public')`).

## Cấu trúc thư mục
```
FARO WEB 3/
├── package.json
├── public/                # code trực tiếp — html, css, js, fonts, images
│   ├── index.html
│   ├── css/
│   │   ├── main.css       # entry, @import theo thứ tự: vendor → base → components → sections
│   │   ├── vendor/        # bootstrap.min.css
│   │   ├── base/          # reset, fonts (@font-face), variables (design tokens)
│   │   ├── components/    # ticker, navbar, footer, card, button... (dùng chung nhiều trang)
│   │   └── sections/      # css riêng từng section của trang chủ
│   ├── js/
│   ├── fonts/              # tt-norms-pro-serif/, urw-din/
│   └── images/home/
├── server/                 # placeholder cho Express (app.js, routes/, controllers/)
├── CLAUDE.md               # file này
├── DESIGN.md                # chi tiết thiết kế (design tokens, node Figma, đặc tả từng session)
├── PROGRESS.md               # trạng thái từng session
└── task_context.md            # đã làm gì / đang dang dở gì / bước tiếp theo — tự cập nhật sau mỗi session
```
Thêm trang mới sau này: thêm 1 file trong `css/sections/`, 1 dòng `@import` trong `main.css`, 1 file `.html` mới trong `public/`.

## Font
Nguồn gốc: `C:\Users\dinhv\Downloads\FARO BRANDING FONT\` (`TTNormsProSerif\` + `URDIN\`). Đã copy vào `public/fonts/tt-norms-pro-serif/` và `public/fonts/urw-din/` (tên file URW DIN đã đổi từ `URW++ - URW DIN ...` sang dạng `URWDIN-...` cho gọn). Khai báo `@font-face` tại `public/css/base/fonts.css` (Session 1).

## Quy tắc làm việc theo session (bắt buộc)
- Xây **từng session một** theo đúng thứ tự trong `DESIGN.md`, không gộp/nhảy cóc.
- Xong 1 session → dừng lại, đối chiếu với Figma, **chờ người dùng xác nhận khớp thiết kế** mới qua session kế tiếp. Có sai lệch thì sửa ngay trong session đó.
- Sau khi 1 session được xác nhận đúng: **hỏi người dùng có muốn commit + push git hay không** trước khi tiếp tục. Không tự ý push.
- Ảnh chỉ tải về từ Figma khi thực sự code tới section đó.
- Hiệu ứng đặc thù (viền tem, chữ chạy cong, badge tròn...) ưu tiên CSS viết tay; được phép dùng ảnh xuất thẳng từ Figma (kể cả có chữ bake sẵn) nếu nhanh/đúng hơn — xác nhận theo từng trường hợp lúc code. Thư viện hỗ trợ hiệu ứng đặc thù (nếu cần) chỉ cài khi người dùng chỉ định cụ thể.
- Mỗi khi xong 1 session, thêm thiết kế mới, hoặc đổi 1 quy ước (cấu trúc thư mục, component dùng chung, cách đặt tên asset...): **cập nhật lại `CLAUDE.md`/`DESIGN.md`/`PROGRESS.md`/`task_context.md` ngay trong lần đó** — không để đến session sau mới cập nhật.
- **Luôn đọc `CLAUDE.md` + `task_context.md` + `DESIGN.md` + `PROGRESS.md` trước khi bắt đầu bất kỳ session nào.** Đọc `task_context.md` trước tiên để nắm nhanh đã làm được gì, đang dang dở gì, bước tiếp theo là gì — rồi tra chi tiết thiết kế ở `DESIGN.md` và trạng thái từng session ở `PROGRESS.md` khi cần. CLAUDE.md không lặp lại chi tiết thiết kế đã có trong `DESIGN.md`.
- **`task_context.md` là tài liệu tự cập nhật liên tục** (không chỉ tạo 1 lần) — sau mỗi session (dù xác nhận xong hay dừng giữa chừng) và sau mỗi quyết định mới, phải cập nhật lại 3 mục "Đã làm được gì" / "Còn dang dở" / "Bước tiếp theo" trong đó cho khớp trạng thái thực tế, để phiên làm việc mới đọc vào là hiểu ngay không cần hỏi lại người dùng.

## Git
- Remote `origin` → `https://github.com/DVT2311/faro_web_3.git`, nhánh `main`.
- Chỉ push khi người dùng đồng ý ở từng lần, không tự động push.
