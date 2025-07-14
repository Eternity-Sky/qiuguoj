const pool = require('./db');

exports.handler = async function(event, context) {
  const { httpMethod, queryStringParameters } = event;
  if (httpMethod === 'GET') {
    const { user_id } = queryStringParameters || {};
    if (!user_id) return { statusCode: 400, body: '缺少user_id' };
    const [rows] = await pool.query('SELECT * FROM submissions WHERE user_id = ? ORDER BY id DESC LIMIT 100', [user_id]);
    return { statusCode: 200, body: JSON.stringify(rows) };
  }
  return { statusCode: 405, body: '仅支持GET' };
}; 