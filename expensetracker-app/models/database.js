const mysql = require('mysql2');

const db = mysql.createConnection({
  host: 'localhost',
  user: '****',
  password: '****',
  database: 'node_complete',
});

const createTableQuery = `
CREATE TABLE IF NOT EXISTS expenses (
  id INT AUTO_INCREMENT PRIMARY KEY,
  sellingPrice DECIMAL(10, 2) NOT NULL,
  productName VARCHAR(255) NOT NULL,
  category VARCHAR(255) NOT NULL
);
`;

db.query(createTableQuery, (err) => {
  if (err) {
    console.error('Error creating expenses table:', err);
  } else {
    console.log('Expenses table created or already exists');
  }
});

module.exports = db;
