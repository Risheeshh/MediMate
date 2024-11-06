const express = require('express');
const fs = require('fs');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const getUsers = () => {
    const data = fs.readFileSync('users.json', 'utf-8');
    return JSON.parse(data);
};

const saveUser = (user) => {
    const users = getUsers();
    users.push(user);
    fs.writeFileSync('users.json', JSON.stringify(users, null, 2));
};

app.post('/api/auth', (req, res) => {
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

module.exports = app;
