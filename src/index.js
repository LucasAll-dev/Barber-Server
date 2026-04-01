import express from 'express';
import https from 'https';
import fs from 'fs';
import dotenv from 'dotenv';
//import de Rotas
import serviceRoutes from './routes/serviceRouter.js';
import authRoutes from './routes/authRoutes.js';
//import do banco, cirar as tabelas se nao existirem
import { createUserTable } from './config/db.js';
//import de log
import { httpLogger } from './middlewares/loggerMiddleware.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const SSL_KEY = process.env.SSL_KEY;
const SSL_CERT = process.env.SSL_CERT;

const options = {
    key: fs.readFileSync(SSL_KEY),
    cert: fs.readFileSync(SSL_CERT)
};

// Middleware para JSON
app.use(express.json());

// Middleware de log HTTP
app.use(httpLogger);

// Rotas
app.use('/auth', authRoutes);
// rota de serviços
app.use('/services', serviceRoutes);



// Inicializa banco
createUserTable();

// Sobe servidor HTTPS
https.createServer(options, 
    app).listen(PORT, () => {
        console.log(`Servidor escutando em https://localhost:${PORT}`);
    }
);