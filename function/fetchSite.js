const axios = require('axios');

exports.handler = async function(event, context) {
  const url = 'https://example.com';  // 開きたい外部サイトのURL

  try {
    const response = await axios.get(url);  // 外部サイトのHTMLを取得
    const html = response.data;  // HTMLを取得
    return {
      statusCode: 200,
      body: html,  // クライアントにHTMLを返す
      headers: {
        'Content-Type': 'text/html',
      }
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: 'Error fetching site',
    };
  }
};
