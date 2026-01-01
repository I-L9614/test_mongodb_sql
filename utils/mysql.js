import mysql from 'mysql2/promise';

let connection;

export async function initSqlDb() {
  const conn = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database:'messagesdb'
  });

  await conn.query('CREATE DATABASE IF NOT EXISTS messagesdb');
  await conn.query('USE messagesdb');

  await conn.query(`
    CREATE TABLE IF NOT EXISTS messages (
      id INT PRIMARY KEY AUTO_INCREMENT,
      username VARCHAR(24) NOT NULL,
      cipher_type VARCHAR(30) NOT NULL,
      encrypted_text VARCHAR(255) NOT NULL,
      inserted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);

  connection = conn;
}

export function getMysqlConnection() {
  return connection;
}
