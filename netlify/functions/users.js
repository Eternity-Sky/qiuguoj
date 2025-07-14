const pool = require('./db');
const bcrypt = require('bcryptjs');

exports.handler = async function(event, context) {
  const { httpMethod, body } = event;
  if (httpMethod === 'POST') {
    // 注册或登录
    const { username, password, type } = JSON.parse(body);
    if (!username || !password) {
      return { statusCode: 400, body: '用户名和密码不能为空' };
    }
    if (type === 'register') {
      // 注册
      const hash = await bcrypt.hash(password, 10);
      try {
        const [rows] = await pool.query('INSERT INTO users (username, password) VALUES (?, ?)', [username, hash]);
        return { statusCode: 200, body: JSON.stringify({ id: rows.insertId, username }) };
      } catch (e) {
        return { statusCode: 400, body: '用户名已存在' };
      }
    } else if (type === 'login') {
      // 登录
      const [rows] = await pool.query('SELECT * FROM users WHERE username = ?', [username]);
      if (rows.length === 0) return { statusCode: 400, body: '用户不存在' };
      const user = rows[0];
      const match = await bcrypt.compare(password, user.password);
      if (!match) return { statusCode: 400, body: '密码错误' };
      // 这里可生成JWT，简化返回用户信息
      return { statusCode: 200, body: JSON.stringify({ id: user.id, username: user.username, nickname: user.nickname }) };
    }
    return { statusCode: 400, body: 'type参数错误' };
  }
  return { statusCode: 405, body: '仅支持POST' };
}; 