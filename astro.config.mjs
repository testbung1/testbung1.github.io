import { defineConfig } from 'astro/config';

// https://astro.build
// Site dùng custom domain khoindvn.io.vn nên 'site' đặt là domain đó,
// 'base' để mặc định '/' (không cần prefix tên repo vì có domain riêng).
export default defineConfig({
  site: 'https://khoindvn.io.vn',
  output: 'static',
  build: {
    // Giữ URL kiểu /tos/ thay vì /tos.html cho khớp cấu trúc cũ
    format: 'directory',
  },
  // Không inline stylesheet để giữ styles.css tải riêng như bản gốc
  vite: {
    build: {
      assetsInlineLimit: 0,
    },
  },
});
