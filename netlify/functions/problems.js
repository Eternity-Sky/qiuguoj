const pool = require('./db');

exports.handler = async function(event, context) {
  const { httpMethod, queryStringParameters } = event;
  if (httpMethod === 'GET') {
    const { id } = queryStringParameters || {};
    if (id) {
      // 查询题目详情
      const [rows] = await pool.query('SELECT * FROM problems WHERE id = ?', [id]);
      if (rows.length === 0) return { statusCode: 404, body: '题目不存在' };
      return { statusCode: 200, body: JSON.stringify(rows[0]) };
    } else {
      // 查询题目列表
      const [rows] = await pool.query('SELECT id, title, difficulty FROM problems ORDER BY id DESC LIMIT 100');
      return { statusCode: 200, body: JSON.stringify(rows) };
    }
  }
  return { statusCode: 405, body: '仅支持GET' };
}; 