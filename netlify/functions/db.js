// 数据库连接模块
const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: 'mysql-393a17f4-qiugu.e.aivencloud.com',
  port: 21239,
  user: 'avnadmin',
  password: 'AVNS_CEEdM-Y3_9hUMruXVF0',
  database: 'defaultdb',
  ssl: { rejectUnauthorized: true }
});

module.exports = pool; 