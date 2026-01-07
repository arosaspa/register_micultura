const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

// 1. DATABASE MOCK: Data to check against
// In a real application, use a database
const users = [
    { username: 'admin', password: 'secret123' },
];

// 2. MIDDLEWARE: To parse JSON bodies
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// 3. STATIC FILES: This tells Express where to find the CSS file 
// Serve the whole parent Scheme folder (CSS, HTML, Pictures, etc.) as static
app.use('/', express.static(path.join(__dirname, '..')));

// 4. ROUTES: Send the login.html file when the user accesses the root URL
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../HTML/login.html'));
});

// 5. LOGIN HANDLER: Handle login form submissions
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    console.log(`Login attempt: ${username}`);

    const foundUser = users.find(user => user.username === username && user.password === password);
    if (foundUser) {
        console.log("Login successful, redirecting...");
        res.redirect('/selection');
    } else {
        res.status(401).send('Invalid credentials. <a href="/">Try again</a>');
    }
});

// 6. SELECTION PAGE: Simple selection page after login
app.get('/selection', (req, res) => {
    res.sendFile(path.join(__dirname, '../HTML/selection.html'));
});

// 7. START SERVER
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});