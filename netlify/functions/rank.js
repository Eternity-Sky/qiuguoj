const pool = require('./db');

exports.handler = async function(event, context) {
  if (event.httpMethod === 'GET') {
    // 查询用户通过题数和总分排行
    const [rows] = await pool.query(`
      SELECT u.id, u.username, u.nickname, COUNT(DISTINCT s.problem_id) AS solved, SUM(s.score) AS total_score
      FROM users u
      LEFT JOIN submissions s ON u.id = s.user_id AND s.status = 'Accepted'
      GROUP BY u.id
      ORDER BY solved DESC, total_score DESC
      LIMIT 50
    `);
    return { statusCode: 200, body: JSON.stringify(rows) };
  }
  return { statusCode: 405, body: '仅支持GET' };
}; 