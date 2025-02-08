const fetch = require('node-fetch');

exports.handler = async (event, context) => {
  const url = event.queryStringParameters.url;
  if (!url) {
    return {
      statusCode: 400,
      body: 'URL query parameter is required.',
    };
  }

  try {
    const response = await fetch(url);
    const data = await response.text();

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'text/html',
      },
      body: data,
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: `Error fetching the URL: ${error.message}`,
    };
  }
};
