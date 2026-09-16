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
│   │   ├── components/    # ticker, navbar, divider-stripe, footer, card, button... (dùng chung nhiều trang)
│   │   └── sections/      # css riêng từng section của trang chủ (hero, store-locator, product-highlight...)
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

Các section (frame con trực tiếp của `1:7`) **có thể chồng lên nhau** theo toạ độ y tuyệt đối thay vì luôn xếp nối tiếp — luôn lấy y-start của section sau trừ y-end (y+height) của section trước để biết có overlap hay không, trước khi dựng layout theo kiểu xếp khối tuần tự mặc định (từng xảy ra ở Session 4: ảnh tem `1:330` chồng lên 94px cuối của `.hero-content`, phải sửa bằng margin âm).

**Luôn quét `get_metadata` ở cấp `0:1` (toàn canvas/page), không chỉ trong `1:7`** trước khi kết luận một section chỉ có bấy nhiêu nội dung — Figma có thể đặt thêm frame (vd các state khác của carousel/slider) nằm ngoài khung 1440px chính, x lớn hơn 1440 (vd x=1440, x=2880...). Từng bỏ sót 4/6 chi nhánh của store locator ở Session 5 vì chỉ quét trong `1:7`.

**Lấy ảnh sản phẩm/card qua `get_screenshot` trên đúng node container đã hiển thị (đã bo góc/crop), không lấy thẳng URL ảnh từ `get_design_context`** — URL đó trỏ tới ảnh GỐC chưa xử lý, có thể siêu to (từng gặp 3277×4096px, 9-12MB/ảnh ở Session 8) dù kích thước hiển thị thật chỉ vài trăm px.

**Đường kẻ/viền mảnh (1-2px) nên dùng số nguyên cho các giá trị ảnh hưởng vị trí của nó** (`gap`, `line-height`, `padding` của các phần tử phía trên nó trong luồng) — số thập phân lẻ từ Figma (vd `22.5px`, `23.62px`) cộng dồn qua nhiều phần tử có thể khiến đường kẻ rơi vào vị trí nửa pixel, browser anti-alias làm mờ không đều giữa các đường kẻ giống hệt nhau về CSS (từng xảy ra ở Session 9, người dùng phát hiện qua so sánh trực quan).

**Ảnh cần alpha (trong suốt) thật, đặc biệt khi sẽ đè lên nội dung khác** (vd badge đè lên logo): `get_screenshot` của MCP Figma luôn render đè lên nền trắng đục, không giữ alpha thật. Cố tái tạo alpha bằng xử lý ảnh (chroma-key/xoá pixel trắng) luôn phải đánh đổi giữa viền răng cưa (nếu cắt cứng) và nhạt màu nét vẽ (nếu làm mượt/gradient) — không có cách nào hoàn hảo. **Giải pháp tốt nhất: nhờ người dùng tự export PNG trực tiếp từ Figma (scale ≥3x, giữ alpha thật)** và gửi file, dùng thẳng không xử lý gì thêm.

**Với Figma group bị xoay (rotation≠0)**: toạ độ X/Y/W/H trong panel Inspect của Figma là kích thước **LOCAL (trước khi xoay)**, khác với bounding box sau khi xoay mà API `absoluteBoundingBox`/`get_screenshot` trả về. Công thức "xoay quanh tâm hình học" tiêu chuẩn để quy đổi giữa 2 hệ toạ độ này **đã kiểm chứng KHÔNG khớp thực tế** (sai lệch không theo quy luật đơn giản, có thể do Figma dùng ma trận transform nội bộ khác cho các group/instance phức tạp). Với các phần tử bị xoay khó định vị chính xác bằng công thức: **nhờ người dùng so sánh trực tiếp với Figma (khoanh vùng đúng/sai trên ảnh chụp trình duyệt) rồi chỉnh tay** — hiệu quả hơn nhiều so với tiếp tục suy ngược toạ độ.

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
