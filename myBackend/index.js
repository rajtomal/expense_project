const express = require('express');
const cors = require('cors');
const db = require('./db');
const port = 3000

const app = express()
// Middleware
app.use(cors()); // Enable CORS
app.use(express.json());
// const router = express.Router();

app.get('/app', (req, res) => {
    const sql = 'SELECT * FROM users';
    db.query(sql, (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send('Internal Server Error');
        } else {
            res.send(result);
        }
    });
})

app.post('/userLogin', (req, res) => {
    const {
        userEmail,
        userPassword
    } = req.body;

    if (!userEmail || !userPassword) {
        return res.status(400).json({
            error: 'Email and password are required.'
        });
    }

    const sql = 'SELECT * FROM `users` WHERE userEmail = ? AND userPassword = ?';

    db.query(sql, [userEmail, userPassword], (err, result) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).json({
                error: 'Internal Server Error'
            });
        }
        user = result[0];
        if (result.length > 0) {
            // User found
            res.json({
                id: user.userId,
                name: user.userName,
                email: user.userEmail
            });
        } else {
            // User not found
            res.status(404).json({
                message: 'Invalid email or password.'
            });
        }
    });
});

// Registration route
app.post('/register', (req, res) => {
    const {
        userName,
        userImg,
        userEmail,
        userPassword
    } = req.body;

    // Validate required fields
    if (!userName || !userEmail || !userPassword) {
        return res.status(400).json({
            success: false,
            message: 'userName, userEmail, and userPassword are required fields.'
        });
    }

    // SQL query to insert user
    const sql = 'INSERT INTO users (userName, userImg, userEmail, userPassword) VALUES (?, ?, ?, ?)';
    const userProfileValue = userImg || null;

    db.query(sql, [userName, userProfileValue, userEmail, userPassword], (err, results) => {
        if (err) {
            if (err.code === 'ER_DUP_ENTRY') {
                return res.status(400).json({
                    success: false,
                    message: 'Email already exists. Please use a different email.'
                });
            }

            console.error('Internal server error:', err);
            return res.status(500).json({
                success: false,
                message: 'Internal server error.'
            });
        }

        res.json({
            success: true,
            message: 'User registered successfully.'
        });
    });
});


// expense route
// get expense by userId
app.post('/getExpenseById', (req, res) => {
    const sql = 'SELECT * FROM expense WHERE userId = ?';
    db.query(sql, [req.body.userId], (err, results) => {
        if (err) {
            console.error('Error fetching data:', err);
            res.status(500).send('Error fetching data');
        } else {
            res.json(results);
        }
    });
});


// post expense by userId
app.post('/postExpense', (req, res) => {
    const {
        userId,
        expenseName,
        amount,
        date
    } = req.body;
    if (!userId || !expenseName || !amount || !date) {
        return res.status(400).json({
            success: false,
            message: 'Please provide all the required fields (userId, expenseName, amount, date).'
        });
    }
    const sql = 'INSERT INTO expense (userId, expenseName, amount, date) VALUES (?, ?, ?, ?)';
    db.query(sql, [userId, expenseName, amount, date], (err, results) => {
        if (err) {
            console.error('Error fetching data:', err);
            res.status(500).send('Error fetching data');
        } else {
            res.json({
                success: true,
                message: 'Expense added successfully.'
            });
        }
    });
});


// update expense by userId
app.put('/putExpense/:id', (req, res) => {
    const id = req.params.id;
    const {
        userId,
        expenseName,
        amount,
        date
    } = req.body;
    if (!userId || !expenseName || !amount || !date) {
        return res.status(400).json({
            success: false,
            message: 'Please provide all the required fields (userId, expenseName, amount, date).'
        });
    }
    if (amount <= 0) {
        return res.status(400).json({
            success: false,
            message: 'Amount must be a positive number.'
        });
    }
    const sql = 'UPDATE expense SET userId = ?, expenseName = ?, amount = ?, date = ? WHERE id = ?';
    db.query(sql, [userId, expenseName, amount, date, id], (err, results) => {
        if (err) {
            console.error('internal server error:', err);
            res.status(500).send('internal server error');
        } else {
            res.json({
                success: true,
                message: 'Expense added successfully.'
            });
        }
    });
});

// delete expense
app.delete('/deleteExpense/:id', (req, res) => {
    const id = req.params.id;
    if (!req.params.id || isNaN(id) || req.params.id == undefined) {
        return res.status(400).json({
            success: false,
            message: 'Please provide an id.'
        });
    }
    const sql = 'DELETE FROM expense WHERE id = ?';
    db.query(sql, [id], (err, results) => {
        if (err) {
            console.error('internal server error:', err);
            res.status(500).send('internal server error');
        } else {
            res.json({
                success: true,
                message: 'Expense deleted successfully.'
            });
        }
    });
});



app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})