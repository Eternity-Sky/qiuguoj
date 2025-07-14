-- 用户表
CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(32) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  nickname VARCHAR(32),
  avatar VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 题目表
CREATE TABLE IF NOT EXISTS problems (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(128) NOT NULL,
  description TEXT NOT NULL,
  input_desc TEXT,
  output_desc TEXT,
  sample_input TEXT,
  sample_output TEXT,
  hint TEXT,
  difficulty ENUM('入门','普及','提高','省选','NOI') DEFAULT '入门',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 提交表
CREATE TABLE IF NOT EXISTS submissions (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  problem_id INT NOT NULL,
  code TEXT NOT NULL,
  language VARCHAR(32) NOT NULL,
  status ENUM('Pending','Judging','Accepted','Wrong Answer','Time Limit Exceeded','Runtime Error','Compile Error') DEFAULT 'Pending',
  score INT DEFAULT 0,
  result TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (problem_id) REFERENCES problems(id)
);

-- 评测结果表
CREATE TABLE IF NOT EXISTS judgings (
  id INT AUTO_INCREMENT PRIMARY KEY,
  submission_id INT NOT NULL,
  testcase_num INT,
  status ENUM('Accepted','Wrong Answer','Time Limit Exceeded','Runtime Error','Compile Error') DEFAULT 'Accepted',
  time_used INT,
  memory_used INT,
  info TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (submission_id) REFERENCES submissions(id)
); 