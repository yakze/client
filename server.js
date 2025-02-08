const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const cors = require('cors');
const app = express();

// CORS設定
app.use(cors());

// 静的ファイルを提供（index.htmlなど）
app.use(express.static('public'));

// 逆プロキシ設定
app.use('/proxy', createProxyMiddleware({
  target: '', // ここでターゲットURLを指定
  changeOrigin: true,
  selfHandleResponse: true,
  onProxyReq: (proxyReq, req) => {
    const targetUrl = req.query.url;  // URLパラメータからターゲットURLを取得
    if (targetUrl) {
      proxyReq.path = new URL(targetUrl).pathname + req._parsedUrl.search;
      proxyReq.setHeader('Host', new URL(targetUrl).host);
    }
  },
  onProxyRes: (proxyRes, req, res) => {
    let data = '';
    proxyRes.on('data', chunk => {
      data += chunk;
    });
    proxyRes.on('end', () => {
      // 必要に応じてレスポンスの加工
      res.send(data);
    });
  }
}));

// サーバー起動
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
