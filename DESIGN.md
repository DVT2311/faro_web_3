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

### Session 1 — Design tokens + font + reset
- Custom properties trong `public/css/base/variables.css`.
- `@font-face` toàn bộ weight đã tải trong `public/css/base/fonts.css`.
- Reset cơ bản trong `public/css/base/reset.css`.

### Session 2 — Sticky ticker bar + Navbar
- **Ticker** (`1:1281`): nền `#fffae5`, cao 46px, full width. Marquee ngang, chữ hoa, URW DIN Medium 15px, màu `#c79763`: "Light Up Your Day" · "đơm hương mùa vụ mới" · "Cà Phê Đặc Sản" · "Đồ Uống Đậm Bản Sắc Địa Phương" · (lặp lại), xen icon nhỏ giữa các cụm. CSS animation marquee vô hạn, `position: sticky; top: 0`.
- **Navbar** (`1:44`): logo trái (149×63px, x79 y69), menu phải: "Về chúng tôi" (icon mũi tên dropdown), "hợp tác", "faro group", "vie" — chữ hoa, URW DIN Regular 22px, trắng, gap ~64px. Đè lên hero, dưới ticker.

### Session 3 — Hero banner + headline + mô tả + stamp badge
- Ảnh hero (`1:8`/`1:9`): full-width 1440px, cao ~799px, bo góc dưới.
- Headline (`1:56`/`1:57`): 3 dòng, TT Norms Pro Serif Medium 70.865px, `#2e2926`, căn giữa, line-height 83.8px: "Cà phê sáng tạo [icon cốc] đồ uống đậm bản sắc [icon ly] địa phương, không gian [icon] thân thiện [icon ghim vị trí], tinh tế và, [icon lấp lánh] thoải mái".
- Mô tả (`1:170`): "FARO là chuỗi thương hiệu cà phê với định hướng tạo ra những giá trị "trải nghiệm thật" cho khách hàng: trải nghiệm hương vị cà phê đặc sản, cùng với không gian thoải mái, tinh tế và thân thiện."
- Stamp badge (`1:171`).

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
