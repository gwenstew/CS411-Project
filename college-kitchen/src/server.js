const express = require('express');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const PORT = process.env.PORT || 5000;

// Create or connect to SQLite database
const db = new sqlite3.Database('mydatabase.db');

// Create users table if not exists
db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL
)`);

// Create pantry_items table if not exists
db.run(`CREATE TABLE IF NOT EXISTS pantry_items (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    quantity INTEGER,
    unit TEXT,
    user_id INTEGER,
    FOREIGN KEY (user_id) REFERENCES users(id)
)`);

// Define API endpoint to fetch users
app.get('/api/users', (req, res) => {
    db.all('SELECT * FROM users', (err, rows) => {
        if (err) {
            console.error(err.message);
            res.status(500).json({ error: 'Server error' });
        } else {
            res.json(rows);
        }
    });
});

// Define API endpoint to fetch pantry items
app.get('/api/pantryItems', (req, res) => {
    db.all('SELECT * FROM pantry_items', (err, rows) => {
        if (err) {
            console.error(err.message);
            res.status(500).json({ error: 'Server error' });
        } else {
            res.json(rows);
        }
    });
});

// Start the server