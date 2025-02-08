const fetch = require('node-fetch');

exports.handler = async (event, context) => {
  const url = event.queryStringParameters.url;
  console.log('Requested URL:', url);

  if (!url) {
    return {
      statusCode: 400,
      body: 'URL parameter is missing.',
    };
  }

  try {
    const response = await fetch(url);
    const data = await response.text();

    console.log('Fetched data:', data);

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'text/html',
        'Access-Control-Allow-Origin': '*',  // CORSを許可
        'Cache-Control': 'no-cache',          // キャッシュを無効化
      },
      body: data,
    };
  } catch (error) {
    console.error('Error fetching the URL:', error);

    return {
      statusCode: 500,
      body: `Error: ${error.message}`,
    };
  }
};
