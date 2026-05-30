# khoindvn.io.vn — phiên bản Astro

Đây là bản chuyển từ site HTML tĩnh sang **Astro**. Giao diện, nội dung và quảng cáo giữ nguyên 100%; chỉ tổ chức lại code cho gọn và dễ bảo trì.

## Có gì khác so với bản HTML cũ

- **Navbar & Footer dùng chung**: tách thành `src/components/Navbar.astro` và `Footer.astro`. Sửa 1 lần → áp dụng cho cả 5 trang (trước đây phải sửa tay từng file).
- **Khung trang dùng chung**: `src/layouts/BaseLayout.astro` lo phần `<head>`, theme bootstrap, nạp `styles.css`, `ui.js` và quảng cáo. Mỗi trang chỉ khai báo tiêu đề/mô tả và bật/tắt quảng cáo qua props.
- **Dữ liệu chứng chỉ tách riêng**: toàn bộ danh sách ESign/KSign nằm trong `src/data/certs.js`. Sửa ở đây là xong, không cần đụng giao diện.
- **Danh sách cert render lúc build**: component `CertList.astro` dựng sẵn các dòng cert thành HTML tĩnh ngay khi build — không còn cần `app.js` chạy ở trình duyệt để vẽ danh sách.

## Cấu trúc

```
src/
├── components/
│   ├── Navbar.astro      # thanh điều hướng dùng chung
│   ├── Footer.astro      # footer dùng chung
│   └── CertList.astro    # render danh sách cert (build-time)
├── layouts/
│   └── BaseLayout.astro  # khung <head> + ads + script chung
├── data/
│   └── certs.js          # DỮ LIỆU chứng chỉ ESign/KSign (sửa ở đây)
├── pages/
│   ├── index.astro       # trang chủ
│   ├── install.astro     # trang tải iPA  -> /install/
│   ├── tos/index.astro   # -> /tos/
│   ├── tnc/index.astro   # -> /tnc/
│   └── privacy/index.astro # -> /privacy/
├── scripts/
│   └── ui.js             # JS client: theme, lang, nav, typing, tab, GA
└── styles/
    ├── styles.css        # stylesheet chính (giữ nguyên bản gốc)
    └── app.css           # style cho danh sách cert

public/                   # file phục vụ nguyên trạng tại gốc /
├── img/, document/       # ảnh, mobileconfig, zip cert
├── ui.js, app.css        # bản copy để nạp qua đường dẫn /ui.js, /app.css
├── ads.txt, robots.txt, sitemap.xml, llms.txt
└── CNAME                 # domain khoindvn.io.vn cho GitHub Pages
```

> Lưu ý: `ui.js` và `app.css` có 2 bản — bản nguồn trong `src/` và bản phục vụ trong `public/`. Nếu sửa logic client hoặc style cert, nhớ cập nhật bản trong `public/` (hoặc copy lại từ `src/`).

## Chạy local

```bash
npm install
npm run dev        # mở http://localhost:4321
```

## Build

```bash
npm run build      # xuất ra thư mục dist/
npm run preview    # xem thử bản đã build
```

## Deploy lên GitHub Pages

Khác với bản tĩnh (đẩy file là xong), bản Astro cần **build** trước. Đã cấu hình sẵn GitHub Actions:

1. Push code lên nhánh `main`.
2. Vào **Settings → Pages → Build and deployment → Source** chọn **GitHub Actions**.
3. Mỗi lần push, workflow `.github/workflows/deploy.yml` tự build và xuất bản.

Domain `khoindvn.io.vn` được giữ qua file `public/CNAME`.

## Ghi chú

- Quảng cáo giữ nguyên: AdSense + Adsterra Popunder + Social Bar. Trang chủ/install dùng social bar domain `suspectedmilitary.com`; các trang pháp lý dùng `ministercheckingpeering.com` (đúng như bản gốc).
- Google Analytics (`G-CLK70W4PDR`) nạp trong `ui.js`, không có cookie-consent gate.
- Không đặt CSP (giống trạng thái hiện tại của site). Nếu muốn bật lại, thêm header ở server hoặc thẻ meta trong `BaseLayout.astro`.
