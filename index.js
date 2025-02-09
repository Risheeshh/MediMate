import { dirname } from 'path';
import { fileURLToPath } from 'url';
import express from 'express';
import fs from 'fs';
import cors from 'cors'; // Import CORS
import bodyParser from "body-parser";

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = 3003;

app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // Middleware to parse JSON bodies
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.sendFile(__dirname +'/views/index.html');
  });
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
app.post("/login", (req, res) => {
    const { email, password } = req.body;
    const users = getUsers();
    console.log(password);

    const existingUser = users.find(user => user.email === email);

    if (existingUser) {
        if (existingUser.password === password) {
            res.sendFile(__dirname + '/main_medimate/index.html');
        } else {
            res.send(`<script>alert("Wrong password"); window.location.href = "/";</script>`);
        }
    } else {
        res.send(`<script>alert("Welcome New User!! Please login"); window.location.href = "/";</script>`);
        const newUser = { email, password };
        saveUser(newUser);
        res.json({ message: 'Account created' });
    }
});

app.get("/about.html", (req, res) => {
    res.sendFile(__dirname + '/main_medimate/about.html');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
