const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const cors = require('cors'); // Import CORS module

const app = express();
const port = 5000;

app.use(bodyParser.json());
app.use(cors()); // Enable CORS for all routes

const connection = mysql.createConnection({
  host: 'localhost',
  port: '3306',
  user: 'root',
  password: 'password',
  database: 'dairy_farm_management'
});

connection.connect(err => {
  if (err) throw err;
  console.log('Connected to MySQL database');
});
// User login endpoint
app.post('/login', (req, res) => {
  const { email, password } = req.body;
  connection.query('SELECT * FROM users WHERE email = ? AND password = ?', [email, password], (err, results) => {
    if (err) throw err;
    if (results.length > 0) {
      res.json({ success: true, userId: results[0].id });
    } else {
      res.json({ success: false, message: 'Invalid email or password' });
    }
  });
});

// Endpoint to add farm records
app.post('/addRecord', (req, res) => {
  const { userId, date, cowCount, buffaloCount, milkProduced, foodConsumed } = req.body;
  connection.query('INSERT INTO farm_records (userId, date, cowCount, buffaloCount, milkProduced, foodConsumed) VALUES (?, ?, ?, ?, ?, ?)',
    [userId, date, cowCount, buffaloCount, milkProduced, foodConsumed], (err, results) => {
      if (err) throw err;
      res.json({ success: true, message: 'Record added successfully' });
    });
});

// Endpoint to retrieve farm records for a specific date
app.get('/getRecord/:date', (req, res) => {
  const { date } = req.params;
  connection.query('SELECT * FROM farm_records WHERE date = ?', [date], (err, results) => {
    if (err) throw err;
    if (results.length > 0) {
      res.json({ success: true, data: results });
    } else {
      res.json({ success: false, message: 'No data found for this date' });
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

