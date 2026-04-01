import jwt from 'jsonwebtoken';

const SECRET = "super_secreto";

// Middleware de autenticação
export function authMiddleware(req, res, next) {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ error: "Token não enviado" });
    }

    const token = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(token, SECRET);

        // adiciona usuário na requisição
        req.user = decoded;

        next();

    } catch (error) {
        return res.status(401).json({ error: "Token inválido" });
    }
}