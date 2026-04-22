import { createToken } from '../services/tokenService.js';
import { createUser, findUserByEmail, validatePassword } from '../services/userService.js';

export async function register(req, res) {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Nome, email e senha são obrigatórios.' });
  }

  const existingUser = await findUserByEmail(email);
  if (existingUser) {
    return res.status(409).json({ message: 'Já existe um usuário com este email.' });
  }

  const user = await createUser({ name, email, password });
  const token = createToken(user);

  return res.status(201).json({ user, token });
}

export async function login(req, res) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email e senha são obrigatórios.' });
  }

  const user = await findUserByEmail(email);
  if (!user) {
    return res.status(401).json({ message: 'Credenciais inválidas.' });
  }

  const validPassword = await validatePassword(password, user.password);
  if (!validPassword) {
    return res.status(401).json({ message: 'Credenciais inválidas.' });
  }

  const { password: _, ...safeUser } = user;
  const token = createToken(safeUser);

  return res.json({ user: safeUser, token });
}

export async function profile(req, res) {
  return res.json({ user: req.user });
}
