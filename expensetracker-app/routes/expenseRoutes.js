const express = require('express');
const router = express.Router();
const expenseController = require('../controllers/expenseController');

router.post('/', (req, res) => {
    console.log('POST request to /api/expenses');
    expenseController.createExpense(req, res);
  });
router.get('/', expenseController.getAllExpenses);
router.delete('/:id', expenseController.deleteExpense);
router.put('/:id', expenseController.updateExpense);

module.exports = router;

