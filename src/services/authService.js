import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { connectDB } from '../config/db.js';
import { logger } from '../utils/logger.js';

const secretKey = 'super_secreto'; // Em produção, use uma variável de ambiente

//cadastro
export async function register(name,email, password) {
    const db = await connectDB();

    // criar hash da senha
    const hashedPasssword = await bcrypt.hash(password, 10);

    try {
        await db.run('INSERT INTO users (name, email, password) VALUES (?, ?, ?)', [name, email, hashedPasssword]);

        logger.info(`Usuario ${email} registrado com sucesso`);
        return { menssage: "usuario criado cmo sucesso"};
    } catch (error) {
        logger.error(`Erro ao registrar o usuario ${email}: ${error.message}`);
        throw new Error("Erro ao registrar o usuario");
    }
}

//login
export async function login(email, password) {
    const db = await connectDB();

    const user = await db.get('SELECT * FROM users WHERE email = ?', [email]);

    if (!user) {
        logger.warn(`Login falhou (usuario nao encontrado): ${email}`);
        throw new Error("Usuario nao encontrado");
    };

    // comparar senha
    const valid = await bcrypt.compare(password, user.password);

    if (!valid) {
        logger.warn(`Login falhou (senha incorreta): ${email}`);
        throw new Error("Senha incorreta");
    }

    // gerar token JWT
    const token = jwt.sign(
        { id: user.id, email: user.email },
        secretKey,
        { expiresIn: "1h"}
    )

    logger.info(`Usuario ${email} logado com sucesso`);
    return { token };
}