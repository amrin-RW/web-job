// server.js
// server.js

// const express = require('express');
// const app = express();
// const path = require('path');
// const port = 3001; // Choose any port you prefer

// // Serve static files from the 'public' directory
// app.use(express.static(path.join(__dirname, 'doctor')));

// // Start the server
// app.listen(port, () => {
//   console.log(`Server is running on http://localhost:${port}`);
// });

const express = require('express');
const path = require('path');

const app = express();
const port = 3001;

// Serve static files from multiple directories
app.use(express.static(path.join(__dirname, 'chef')));
app.use(express.static(path.join(__dirname, 'doctor')));

// Define routes to serve HTML files
app.get('/index/:role', (req, res) => {
    const role = req.params.role;
    res.sendFile(path.join(__dirname, role, 'index.html'));
    // if (role === 'chef') {
    // } else if (role === 'doctor') {
    //     res.sendFile(path.join(__dirname, 'doctor', 'index.html'));
    // } else {
    //     res.status(404).send('Page not found');
    // }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
