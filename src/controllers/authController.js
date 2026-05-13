import * as authService from '../services/authService.js';

// Controller de cadastro
export async function register(req, res) {
  try {
    const { name, email, password } = req.body;

    const result = await authService.register(name, email, password);

    res.json(result);

  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

// Controller de login
export async function login(req, res) {
  try {
    const { email, password } = req.body;

    const result = await authService.login(email, password);

    res.json(result);

  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

