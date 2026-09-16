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

### Session 4 — Ảnh hero dạng tem (scalloped mask)
- Node `1:330`: viền răng cưa kiểu con tem (boolean-operation "Union"). Ưu tiên SVG `clip-path`; dùng ảnh PNG viền sẵn nếu nhanh hơn.

### Session 5 — "Tìm Cửa Hàng Gần Bạn"
- Heading (`1:15`): TT Norms Pro Serif Medium 70px, `#2e2926`, căn giữa.
- Lưới 2×2, mỗi ô 720×588px:
  - Trên-trái (`1:16`): ảnh nội thất (không chữ).
  - Trên-phải (`1:31`): "Faro Cafe Kỳ Đồng Gallery" + "địa chỉ" + "hẻm 5/20 kỳ Đồng, p. nhiêu lộc, tp. hCM".
  - Dưới-trái (`1:18`): "Faro Cafe Quang Trung Station" + "địa chỉ" + "1014 Quang Trung, Thông Tây Hội, tp. hCM".
  - Dưới-phải (`1:17`): ảnh cây xanh/không gian (không chữ).

### Session 6 — Bộ đôi ảnh sản phẩm lớn
- Node `1:1151`: 2 ảnh ~737×803px ("IG 2", "IG 3") — "Gạo Rang Trần Châu Trắng" / "Olong Nướng Trần Châu Caramel". Cần xác nhận qua `get_design_context` lúc code: chữ là text thật hay bake trong ảnh.
- Ticker lặp lại đầu section (`1:1181`) — tái dùng component Session 2.

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
