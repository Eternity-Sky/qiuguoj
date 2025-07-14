const pool = require('./db');
const axios = require('axios');

exports.handler = async function(event, context) {
  const { httpMethod, body } = event;
  if (httpMethod === 'POST') {
    const { user_id, problem_id, code, language } = JSON.parse(body);
    if (!user_id || !problem_id || !code || !language) {
      return { statusCode: 400, body: '参数不完整' };
    }
    // 新建提交
    const [result] = await pool.query(
      'INSERT INTO submissions (user_id, problem_id, code, language, status) VALUES (?, ?, ?, ?, ?)',
      [user_id, problem_id, code, language, 'Pending']
    );
    const submission_id = result.insertId;
    // 调用第三方评测API（此处为伪代码，需替换为真实API）
    try {
      const judgeRes = await axios.post('https://thirdparty-judge-api/submit', {
        code, language, problem_id
      });
      // 假设返回格式 { status, score, result }
      const { status, score, result } = judgeRes.data;
      await pool.query(
        'UPDATE submissions SET status=?, score=?, result=? WHERE id=?',
        [status, score, JSON.stringify(result), submission_id]
      );
      return { statusCode: 200, body: JSON.stringify({ submission_id, status, score, result }) };
    } catch (e) {
      await pool.query('UPDATE submissions SET status=? WHERE id=?', ['Judging', submission_id]);
      return { statusCode: 500, body: '评测服务异常' };
    }
  }
  return { statusCode: 405, body: '仅支持POST' };
}; 