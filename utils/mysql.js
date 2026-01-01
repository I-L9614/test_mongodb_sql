import mysql from 'mysql2/promise';

let connection;

export async function initSqlDb() {
  const conn = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root'
  });

  await conn.query('CREATE DATABASE IF NOT EXISTS massages');
  await conn.query('USE ecommerce');

  await conn.query(`
    CREATE TABLE IF NOT EXISTS orders (
      id INT PRIMARY KEY AUTO_INCREMENT,
      username VARCHAR(24) NOT NULL,
      cipher_type VARCHAR(30) NOT NULL,
      encrypted_text VARCHAR(255) NOT NULL,
      inserted_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  connection = conn;
}

export function getMysqlConnection() {
  return connection;
}
