const fs = require('fs');
const bcrypt = require('bcryptjs');

const getUsers = () => {
  const data = fs.readFileSync('users.json', 'utf-8');
  return JSON.parse(data);
};

const saveUser = (user) => {
  const users = getUsers();
  users.push(user);
  fs.writeFileSync('users.json', JSON.stringify(users, null, 2));
};

const findUserByEmail = (email) => {
  const users = getUsers();
  return users.find((user) => user.email === email);
};

const registerUser = async (email, password) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = { email, password: hashedPassword };
  saveUser(newUser);
};

module.exports = { getUsers, saveUser, findUserByEmail, registerUser };
