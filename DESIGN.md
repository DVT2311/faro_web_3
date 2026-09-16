# DESIGN.md — Tài liệu thiết kế chi tiết (trang chủ FARO Cafe)

Nguồn: Figma `Faro-Web-dev`, fileKey `vkJeQ9o8oR3cfI1pp311wd`, node trang chủ `1:7` (1440×7760px, "Desktop - 1"). File này cập nhật liên tục khi có chi tiết thiết kế mới được chốt hoặc session nào hoàn thành.

## Design tokens
| Token | Giá trị | Dùng cho |
|---|---|---|
| `--color-text` | `#2e2926` | Chữ chính (heading, body) |
| `--color-accent` | `#c79763` | Chữ ticker, icon vàng |
| `--color-cream` | `#fffae5` | Nền thanh ticker |

| Font | Vai trò | Nguồn file |
|---|---|---|
| TT Norms Pro Serif (Medium) | Heading | `public/fonts/tt-norms-pro-serif/TTNormsProSerif-Medium.ttf` (+ các weight khác đã tải) |
| URW DIN (Regular/Medium) | Nav, label, body, chữ hoa | `public/fonts/urw-din/URWDIN.ttf`, `URWDIN-Medium.ttf` (+ các biến thể Cond/SemiCond/weight khác) |

Bảng map file → `font-weight`/`font-style` chi tiết sẽ bổ sung khi code Session 1 (`public/css/base/fonts.css`).

## Cấu trúc nội dung trang chủ (trên xuống dưới)
| # | Session | Section | Node Figma chính |
|---|---|---|---|
| 1 | 2 | Sticky ticker bar | `1:1281` (gốc), lặp tại `1:96`, `1:257`, `1:1181` |
| 2 | 2 | Navbar | `1:44` |
| 3 | 3 | Hero banner | `1:8` / `1:9` |
| 4 | 3 | Headline + mô tả + stamp badge | `1:55` (headline `1:56`, mô tả `1:169`) |
| 5 | 4 | Ảnh hero dạng tem (scalloped) | `1:330` |
| 6 | 5 | "Tìm Cửa Hàng Gần Bạn" | Heading `1:14`, cards `1:16`,`1:17`,`1:18`,`1:31` |
| 7 | 6 | Bộ đôi ảnh sản phẩm lớn | `1:1151` |
| 8 | 7 | "The New Harvest in Bloom" | `1:216` |
| 9 | 8 | "Sản Phẩm" | `1:190` |
| 10 | 9 | "Về đội với mình" | `1:1254` |
| 11 | 10 | Footer | `1:339`,`1:340`,`1:345`,`1:346`,`1:347`,`1:493`,`1:650`,`1:876`,`1:1007` |

## Đặc tả chi tiết từng session

### Session 1 — Design tokens + font + reset (xong, đã push)
- Custom properties trong `public/css/base/variables.css`.
- `@font-face` toàn bộ weight đã tải trong `public/css/base/fonts.css`.
- Reset cơ bản trong `public/css/base/reset.css`.

### Session 2 — Sticky ticker bar + Navbar (xong, đã push)
- **Ticker** (`1:1281`): nền `#fffae5`, cao 46px, full width. Marquee ngang, chữ hoa, URW DIN Medium 15px, màu `#c79763`: "Light Up Your Day" · "đơm hương mùa vụ mới" · "Cà Phê Đặc Sản" · "Đồ Uống Đậm Bản Sắc Địa Phương" · (lặp lại), xen icon nhỏ giữa các cụm. CSS animation marquee vô hạn, `position: sticky; top: 0`.
- **Navbar** (`1:44`): logo trái (149×63px, x79 y69), menu phải: "Về chúng tôi" (icon mũi tên dropdown), "hợp tác", "faro group", "vie" — chữ hoa, URW DIN Regular 22px, trắng, gap ~64px. Đè lên hero, dưới ticker.
- Đã dựng: `public/css/components/ticker.css`, `public/css/components/navbar.css`. Asset SVG (logo, caret, 3 icon ticker: star/cup/leaf) tải về `public/images/shared/` (dùng chung nhiều page sau này, không để trong `images/home/`).
- Navbar hiện đè lên `.hero-placeholder` (nền tối tạm, định nghĩa trong `navbar.css`, có TODO) — sẽ thay bằng ảnh hero thật ở Session 3.
- **Phát hiện thêm khi review**: Figma canvas cố định 1440px nhưng trang ban đầu không giới hạn chiều rộng nên bị kéo dãn full-width trên màn hình lớn. Đã sửa bằng cách bọc toàn bộ nội dung trong `<div class="page">` + CSS `.page { max-width: 1440px; margin: 0 auto; }` (`public/css/base/reset.css`). Quy tắc này áp dụng cho mọi section sau này — luôn nằm trong `.page`.

### Session 3 — Hero banner + headline + mô tả + stamp badge (xong, đã push)
- Ảnh hero (`1:8`/`1:9`): **thực tế KHÔNG bo góc** — đã kiểm tra mask SVG gốc, chỉ là 2 rect phẳng (full opaque), không có shape bo tròn nào. Dùng ảnh composite xuất thẳng từ Figma (`get_screenshot` node `1:9`) lưu tại `public/images/home/hero-banner.png`, full-width 1440px, cao 799px, `object-fit: cover`, không cần clip-path.
- Headline (`1:56`/`1:57`): 3 dòng, TT Norms Pro Serif Medium 70.865px, `#2e2926`, căn giữa, line-height 83.8px, container 1260px (margin 90px mỗi bên) — dựng bằng 3 thẻ `<p>` với `white-space:pre` giữ nguyên khoảng trắng gốc từ Figma. 6 icon (`1:58,1:72,1:81,1:82,1:85,1:92`) tải SVG về `images/home/headline-icon-1..6.svg`, đặt `position:absolute` theo toạ độ px chính xác (toạ độ mọi node con trong Frame 48577/`1:55` đều tính trực tiếp theo gốc của `1:55`, không cộng dồn qua từng cấp cha trung gian).
- Mô tả (`1:170`): "FARO là chuỗi thương hiệu cà phê với định hướng tạo ra những giá trị "trải nghiệm thật" cho khách hàng: trải nghiệm hương vị cà phê đặc sản, cùng với không gian thoải mái, tinh tế và thân thiện." URW DIN Medium 25px, hoa, width 733px, căn giữa.
- Stamp badge (`1:171`): SVG tải về `images/home/stamp-badge.svg`, đặt phía trên đoạn mô tả, căn giữa.
- **Bổ sung phát hiện khi review**: dải sọc trang trí (node `1:96`, 1440×46, 24 nhóm mỗi nhóm 60px = 30px trắng + 30px kem, không hở) nằm ngay đường nối giữa ảnh hero và phần headline — ban đầu bị bỏ sót, đã thêm class `.hero-divider` (CSS `repeating-linear-gradient`). **Lưu ý quan trọng**: đây KHÔNG phải bản sao của thanh ticker chữ (`1:1281`) dù cùng kích thước 1440×46 — đã kiểm tra riêng bằng `get_screenshot`/`get_design_context` và xác nhận là 2 element khác nhau hoàn toàn. Khi gặp node trùng lặp ở nhiều mốc y trong Figma, luôn kiểm tra riêng từng cái, không mặc định là bản sao giống hệt.

### Session 4 — Ảnh hero dạng tem (scalloped mask) (xong, đã push)
- Node `1:330`: viền răng cưa kiểu con tem (boolean-operation "Union", nhiều lớp ảnh + transform rotate-90 phức tạp trong export gốc) — đã dùng ảnh PNG xuất thẳng từ `get_screenshot` node `1:331` (viền tem đã có sẵn trong ảnh, nền trong suốt quanh viền), lưu tại `public/images/home/hero-stamp-photo.png`, thay vì dựng lại bằng CSS/SVG.
- CSS: `.hero-stamp-photo` (section cao 1038px) + ảnh căn giữa 1180.581×856.084px trong `hero.css`.
- **Phát hiện + sửa khi review**: trong Figma, section này bắt đầu ở page y=1524, tức **chồng lên 94px cuối** của `.hero-content` (kết thúc ở y=1618=799+819) thay vì xếp nối tiếp — nếu xếp tuần tự như 2 khối riêng sẽ dư ~94px khoảng trắng. Đã sửa bằng `margin-top: -94px` trên `.hero-stamp-photo`. **Bài học chung cho các session sau**: luôn đối chiếu y-start/y-end giữa 2 section liền kề trong Figma trước khi giả định chúng xếp nối tiếp nhau.

### Session 5 — "Tìm Cửa Hàng Gần Bạn" (xong, đã push)
- Heading (`1:15`): TT Norms Pro Serif Medium 70px, `#2e2926`, căn giữa, nền `#f8f7f2` cao 153px, margin-top 25px so với section trước (đo y thật).
- **Phát hiện quan trọng khi review**: đây là **carousel 3 slide / 6 chi nhánh**, không phải lưới tĩnh 2×2 như quét ban đầu — 2 slide sau nằm ở node `9:4` (x=1440) và `9:34` (x=2880), **ngoài khung `1:7` chính**, chỉ thấy được khi `get_metadata` ở cấp `0:1` (toàn canvas). Danh sách đầy đủ 6 chi nhánh, mỗi slide lưới 2×2 (720×588px/ô, ảnh xen kẽ thẻ thông tin):
  1. **Kỳ Đồng Gallery** (`1:31`, nền `#fff9e8`) — "hẻm 5/20 kỳ Đồng, p. nhiêu lộc, tp. hCM"
  2. **Quang Trung Station** (`1:18`, nền `#d5f2ff`) — "1014 Quang Trung, Thông Tây Hội, tp. hCM"
  3. **Cao Thắng Mansion** (`9:20`, nền `#f2ffe3`) — "2/43 Cao Thắng, Bàn Cờ, tp. hcm"
  4. **Vạn Phúc Square** (`9:7`, nền `#fff9e8`) — "104 Đinh Thị Thi, Hiệp Bình, tp.hcm"
  5. **Nguyễn Trãi Corner** (`9:37`, nền `#d5f2ff`) — "214/B11 Nguyễn Trãi, Cầu Ông Lãnh, tp. hCM"
  6. **Thảo Điền Villa** (`9:50`, nền `#fff9e8`) — "81 Xuân Thủy, An Khánh, tp. hCM"
  Ảnh photo-only ở 2 ô còn lại mỗi slide: `1:16`,`1:17` (slide 1), `9:5`,`9:6` (slide 2), `9:35`,`9:36` (slide 3).
- Mỗi thẻ thông tin: tên quán (TT Norms Pro Serif Medium 60px, 2 dòng), icon ghim + nhãn "địa chỉ" (URW DIN Bold 25px hoa), địa chỉ đầy đủ (URW DIN Medium 25px hoa).
- **Hành vi tương tác bổ sung theo yêu cầu người dùng** (không có sẵn rõ ràng trong file Figma tĩnh, dựa theo bản proto/preview người dùng cung cấp):
  - Hover vào ảnh: zoom nhẹ (`scale(1.05)`, transition mượt).
  - Carousel tự trượt mỗi 3 giây, luôn theo 1 chiều trái→phải, không giật lùi khi lặp vòng — kỹ thuật: nhân bản slide đầu tiên gắn cuối track, trượt hết tới bản sao rồi "nhảy" tức thời (tắt transition) về slide 1 thật.
- File: `public/css/sections/store-locator.css`, `public/js/components/store-carousel.js`. Ảnh trong `public/images/home/store-photo-1..6.png`, icon ghim dùng chung `public/images/shared/icon-map-pin.svg`.

### Session 6 — Bộ đôi ảnh sản phẩm lớn (xong, đã push)
- Node `1:1151`: 2 ảnh 720×803px cạnh nhau. Đã kiểm tra `get_design_context`: có 1 khối text "MATCHA COCOMILK/85K" nhưng bị `overflow-clip` che khuất hoàn toàn (nằm ngoài vùng hiển thị, không hiện ra) — **chữ thật sự hiển thị là caption đã bake sẵn trong ảnh composite** (nhiều lớp photo + blend-multiply + badge tròn lồng bên trong, quá phức tạp để dựng lại bằng CSS). Tên chính xác (đã xác minh qua ảnh, khác với ghi chú suy đoán ban đầu):
  - **"Trà Sữa Gạo Rang Trân Châu Trắng"** (ảnh `product-highlight-1.png`)
  - **"Trà Sữa Olong Nướng Trân Châu Caramel"** (ảnh `product-highlight-2.png`)
- Dải sọc trang trí đầu section (node `1:1181`) — cùng loại với `1:96` (Session 3). Đã tách logic này ra component dùng chung `public/css/components/divider-stripe.css` (đổi tên từ `.hero-divider` cũ) vì được tái dùng ≥2 lần.
- File: `public/css/sections/product-highlight.css`.

### Session 7 — "The New Harvest in Bloom"
- Node `1:216`: ảnh viền tem tương tự Session 4.
- Chữ cong "The New" (`1:224`) + chữ thẳng "Harvest in Bloom" (`1:225`) — có thể xuất thành ảnh/SVG nếu phức tạp.
- Minh hoạ lá/cành (`1:226`), 2 khối màu trang trí (`1:221`, `1:222`).
- Ticker lặp lại đầu section (`1:257`).

### Session 8 — "Sản Phẩm"
- Node `1:190`: heading + subtext — **tên layer Figma tiếng Anh không khớp nội dung thật** (nội dung thật tiếng Việt "Sản Phẩm" + mô tả ngắn) → lấy đúng text qua `get_design_context` tại `1:195`/`1:196`.
- 3 cột thẻ (397×524px), ảnh (335×315px) + tên + mô tả:
  1. "Cà Phê Túi Nhúng" — "Cà phê Túi Nhúng tiện lợi chỉ cần nước nóng để pha, hương vị tươi mới từ cà phê chất lượng cao, đa dạng lựa chọn với nhiều hương vị sáng tạo."
  2. "Đơm Hương Collection" — "Được phát triển với 5 phiên bản hương: dưa lưới, gừng, chuối, dâu và nho, phù hợp cho cold brew, pour-over, cà phê trái cây, tonic hoặc seasonal menu."
  3. "Cà Phê Rang Hạt" — "Các dòng sản phẩm chất lượng ổn định với giá thành hợp lý, phù hợp với gu thưởng thức đại chúng để tạo nên hương vị đặc trưng cho quán của bạn."

### Session 9 — "Về đội với mình"
- Node `1:1254`: 2 cột 684px.
  - Trái: ảnh full-bleed (`1:1257`).
  - Phải: "Về đội với mình" + "Job hay chờ bạn chung tay!" + danh sách:
    1. Graphic Designer — (01)
    2. Barista (Fulltime / Part-time) — (01)
    3. Content Creator — (01)
    4. Graphic Designer — (01) *(trùng mục 1 trong Figma gốc — giữ nguyên)*

### Session 10 — Footer
- Wordmark "FARO" outline (`1:339`) + "coffee inspiration".
- Cột "VỀ CHÚNG TÔI" (`1:340`): Faro Cafe / Faro Coffee Roastery / Faro Coffee Insights.
- Đường kẻ (`1:345`) + "© Copyright 2026. All rights reserved." (`1:346`).
- 5 badge tròn kiểu tem, chữ chạy cong: "quang trung station" (`1:347` & `1:1007`), "nguyễn trãi corner" (`1:493`), "vạn phúc square" (`1:650`), "kỳ đồng gallery" (`1:876`) — ưu tiên xuất thẳng thành ảnh PNG hoàn chỉnh.

---
*Sau khi mỗi session hoàn thành, bổ sung vào đúng phần tương ứng: file CSS/HTML đã dùng, tên file ảnh/font thực tế trong `public/`, và mọi sai lệch có chủ đích so với Figma gốc.*
