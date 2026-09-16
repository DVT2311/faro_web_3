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
│   └── images/
│       ├── shared/         # asset dùng chung nhiều trang/section (logo, icon ticker...)
│       └── home/           # ảnh riêng cho từng section của trang chủ
├── server/                 # placeholder cho Express (app.js, routes/, controllers/)
├── CLAUDE.md               # file này
├── DESIGN.md                # chi tiết thiết kế (design tokens, node Figma, đặc tả từng session)
├── PROGRESS.md               # trạng thái từng session
└── task_context.md            # đã làm gì / đang dang dở gì / bước tiếp theo — tự cập nhật sau mỗi session
```
Thêm trang mới sau này: thêm 1 file trong `css/sections/`, 1 dòng `@import` trong `main.css`, 1 file `.html` mới trong `public/`.

## Font
Nguồn gốc: `C:\Users\dinhv\Downloads\FARO BRANDING FONT\` (`TTNormsProSerif\` + `URDIN\`). Đã copy vào `public/fonts/tt-norms-pro-serif/` và `public/fonts/urw-din/` (tên file URW DIN đã đổi từ `URW++ - URW DIN ...` sang dạng `URWDIN-...` cho gọn). Khai báo `@font-face` tại `public/css/base/fonts.css` (Session 1).

## Đọc toạ độ từ Figma metadata
Khi dùng `get_metadata`/toạ độ x,y thô từ Figma cho các node con sâu nhiều cấp: toạ độ mỗi node **tính trực tiếp theo gốc của node cha gần nhất có ý nghĩa layout** (thường là section cha lớn, vd `1:55`), **không cộng dồn qua từng cấp cha trung gian**. Luôn đối chiếu lại bằng `inset` phần trăm trong `get_design_context` (nhân % với kích thước container nghi ngờ) để xác nhận đúng container tham chiếu trước khi dùng số liệu, tránh đặt sai vị trí.

Khi Figma có nhiều node trông giống nhau lặp lại ở nhiều mốc y (vd để mô phỏng phần tử sticky khi cuộn): **không mặc định đó là bản sao y hệt** — kiểm tra riêng từng node bằng `get_screenshot`/`get_design_context` trước khi tái dùng component, vì có thể là 2 element khác nhau hoàn toàn (từng xảy ra ở Session 3: dải sọc trang trí `1:96` bị nhầm là ticker `1:1281`).

## Layout
Figma thiết kế ở canvas cố định 1440px. Toàn bộ nội dung trang phải nằm trong `<div class="page">` (CSS ở `public/css/base/reset.css`: `max-width: 1440px; margin: 0 auto;`) để không bị kéo dãn full-width trên màn hình lớn hơn 1440px — mọi section thêm sau này đều đặt bên trong `.page`.

## Quy tắc làm việc theo session (bắt buộc)
- Xây **từng session một** theo đúng thứ tự trong `DESIGN.md`, không gộp/nhảy cóc.
- Xong 1 session → dừng lại, đối chiếu với Figma, **chờ người dùng xác nhận khớp thiết kế** mới qua session kế tiếp. Có sai lệch thì sửa ngay trong session đó.
- Sau khi 1 session được xác nhận đúng: **hỏi người dùng có muốn commit + push git hay không** trước khi tiếp tục. Không tự ý push.
- Ảnh chỉ tải về từ Figma khi thực sự code tới section đó.
- Hiệu ứng đặc thù (viền tem, chữ chạy cong, badge tròn...) ưu tiên CSS viết tay; được phép dùng ảnh xuất thẳng từ Figma (kể cả có chữ bake sẵn) nếu nhanh/đúng hơn — xác nhận theo từng trường hợp lúc code. Thư viện hỗ trợ hiệu ứng đặc thù (nếu cần) chỉ cài khi người dùng chỉ định cụ thể.
- Mỗi khi xong 1 session, thêm thiết kế mới, hoặc đổi 1 quy ước (cấu trúc thư mục, component dùng chung, cách đặt tên asset...): **cập nhật lại `CLAUDE.md`/`DESIGN.md`/`PROGRESS.md`/`task_context.md` ngay trong lần đó** — không để đến session sau mới cập nhật.
- **Luôn đọc `CLAUDE.md` + `task_context.md` + `DESIGN.md` + `PROGRESS.md` trước khi bắt đầu bất kỳ session nào.** Đọc `task_context.md` trước tiên để nắm nhanh đã làm được gì, đang dang dở gì, bước tiếp theo là gì — rồi tra chi tiết thiết kế ở `DESIGN.md` và trạng thái từng session ở `PROGRESS.md` khi cần. CLAUDE.md không lặp lại chi tiết thiết kế đã có trong `DESIGN.md`.
- **`task_context.md` là tài liệu tự cập nhật liên tục** (không chỉ tạo 1 lần) — sau mỗi session (dù xác nhận xong hay dừng giữa chừng) và sau mỗi quyết định mới, phải cập nhật lại 3 mục "Đã làm được gì" / "Còn dang dở" / "Bước tiếp theo" trong đó cho khớp trạng thái thực tế, để phiên làm việc mới đọc vào là hiểu ngay không cần hỏi lại người dùng.

## Git — quy tắc push (bắt buộc, đọc kỹ)
- Remote `origin` → `https://github.com/DVT2311/faro_web_3.git`, nhánh `main`.
- **Mọi lần `git push`, không ngoại lệ, dù lớn hay nhỏ (kể cả chỉ sửa 1 dòng trong `PROGRESS.md`/`task_context.md`), đều phải hỏi lại người dùng bằng một câu hỏi rõ ràng và chờ câu trả lời đồng ý rõ ràng trước khi push.**
- **Không được suy diễn sự đồng ý** từ các câu nói chung chung như "tiếp tục", "làm tiếp đi", "chuyển qua session tiếp theo", "ok" (trả lời cho câu hỏi khác)... Những câu đó KHÔNG phải là đồng ý push. Chỉ coi là đồng ý khi người dùng trả lời thẳng vào đúng câu hỏi push (vd "push đi", "ok push", "có, push luôn", hoặc xác nhận trực tiếp câu hỏi "có muốn push không?").
- Nếu không chắc câu trả lời của người dùng có phải là đồng ý push hay không, phải hỏi lại cho rõ, không được push.
- `git commit` (chưa push) thì không cần hỏi — chỉ áp dụng quy tắc hỏi trước khi thực hiện `git push`.
