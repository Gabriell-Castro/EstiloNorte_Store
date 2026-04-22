import { resolve } from 'path';
import bcrypt from 'bcryptjs';
import { nanoid } from 'nanoid';
import { readJson, writeJson } from '../utils/fileDb.js';

const usersPath = resolve('src/data/users.json');

export async function getAllUsers() {
  return readJson(usersPath);
}

export async function findUserByEmail(email) {
  const users = await getAllUsers();
  return users.find((user) => user.email.toLowerCase() === email.toLowerCase());
}

export async function createUser({ name, email, password }) {
  const users = await getAllUsers();
  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = {
    id: nanoid(8),
    name,
    email,
    password: hashedPassword,
    role: 'customer'
  };

  users.push(newUser);
  await writeJson(usersPath, users);

  const { password: _, ...safeUser } = newUser;
  return safeUser;
}

export async function validatePassword(password, hashedPassword) {
  if (!hashedPassword.startsWith('$2')) {
    return password === hashedPassword;
  }

  return bcrypt.compare(password, hashedPassword);
}
