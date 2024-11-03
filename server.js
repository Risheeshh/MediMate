const express = require('express');
const fs = require('fs');
const cors = require('cors'); // Import CORS

const app = express();
const PORT = 3003;

app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // Middleware to parse JSON bodies

const getUsers = () => {
    // Read the users from users.json file
    const data = fs.readFileSync('users.json', 'utf-8');
    return JSON.parse(data);
};

const saveUser = (user) => {
    // Save a new user to users.json file
    const users = getUsers();
    users.push(user);
    fs.writeFileSync('users.json', JSON.stringify(users, null, 2));
};

// Authentication endpoint
app.post('/auth', (req, res) => {
    const { email, password } = req.body;
    const users = getUsers();

    const existingUser = users.find(user => user.email === email);

    if (existingUser) {
        res.json({ message: 'Successful login' });
    } else {
        const newUser = { email, password };
        saveUser(newUser);
        res.json({ message: 'Account created' });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
