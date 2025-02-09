export default async function handler(req, res) {
  const { url } = req.query;
  if (!url) {
    return res.status(400).json({ error: "URL is required" });
  }

  try {
    const targetUrl = `https://${url}`;
    const response = await fetch(targetUrl);
    let body = await response.text();

    // **広告を削除**
    body = body.replace(/<script.*?ads.*?<\/script>/g, ""); // 広告スクリプト削除
    body = body.replace(/<div class="ad-banner">.*?<\/div>/g, ""); // バナー広告削除

    // **カスタムスクリプトを追加**
    body = body.replace(
      "</body>",
      `<script>
        console.log('カスタムスクリプト適用完了');
        // ここに追加の処理を書く
      </script></body>`
    );

    res.setHeader("Content-Type", "text/html; charset=utf-8");
    return res.send(body);
  } catch (error) {
    return res.status(500).json({ error: "Failed to load page" });
  }
}
