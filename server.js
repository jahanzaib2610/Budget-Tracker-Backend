const express = require('express');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');
const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// In-memory data store
let transactions = [
  {
    id: "1",
    title: "Salary",
    amount: 3000.00, 
    category: "Income",
    type: "income",
    date: "2024-04-01T10:00:00.000Z"
  },
  {
    id: "2",
    title: "Rent",
    amount: 1200.00,
    category: "Housing",
    type: "expense",
    date: "2024-04-05T09:30:00.000Z"
  },
  {
    id: "3",
    title: "Grocery Shopping",
    amount: 150.00,
    category: "Food",
    type: "expense",
    date: "2024-04-10T14:20:00.000Z"
  },
  {
    id: "4",
    title: "Freelance Work",
    amount: 500.00,
    category: "Income",
    type: "income",
    date: "2024-04-12T16:45:00.000Z"
  },
  {
    id: "5",
    title: "Dining Out",
    amount: 85.00,
    category: "Food",
    type: "expense",
    date: "2024-04-14T19:30:00.000Z"
  }
];

app.get('/', (req, res) => {
  res.send("Welcome...!!!");
});
// GET all transactions
app.get('/api/transactions', (req, res) => {
  res.json(transactions);
});

// POST new transaction
app.post('/api/transactions', (req, res) => {
  const { title, amount, category, type } = req.body;
  
  const newTransaction = {
    id: uuidv4(),
    title,
    amount: parseFloat(amount),
    category,
    type,
    date: new Date().toISOString()
  };
  
  transactions.unshift(newTransaction);
  res.status(201).json(newTransaction);
});

// DELETE transaction
app.delete('/api/transactions/:id', (req, res) => {
  const { id } = req.params;
  const initialLength = transactions.length;
  
  transactions = transactions.filter(transaction => transaction.id !== id);
  
  if (transactions.length === initialLength) {
    return res.status(404).json({ error: 'Transaction not found' });
  }
  
  res.json({ message: 'Transaction deleted successfully' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});