const db = require('../models/database');

const createExpense = (req, res) => {
  const { sellingPrice, productName, category } = req.body;
  const sql = 'INSERT INTO expenses (sellingPrice, productName, category) VALUES (?, ?, ?)';
  db.query(sql, [sellingPrice, productName, category], (err, result) => {
    if (err) {
      console.error('Error creating expense:', err);
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ id: result.insertId, sellingPrice, productName, category });
    
  });
};

const getAllExpenses = (req, res) => {
  const sql = 'SELECT * FROM expenses';
  db.query(sql, (err, results) => {
    if (err) {
      console.error('Error fetching expenses:', err);
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(results);
  });
};

const deleteExpense = (req, res) => {
  const { id } = req.params;
  const sql = 'DELETE FROM expenses WHERE id = ?';
  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error('Error deleting expense:', err);
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ id, message: 'Expense deleted successfully' });
  });
};

const updateExpense = (req, res) => {
  const { id } = req.params;
  const { sellingPrice, productName, category } = req.body;
  const sql = 'UPDATE expenses SET sellingPrice = ?, productName = ?, category = ? WHERE id = ?';
  db.query(sql, [sellingPrice, productName, category, id], (err, result) => {
    if (err) {
      console.error('Error updating expense:', err);
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ id, sellingPrice, productName, category });
  });
};

module.exports = {
  createExpense,
  getAllExpenses,
  deleteExpense,
  updateExpense,
};
