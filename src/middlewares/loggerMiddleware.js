import morgan from 'morgan';

// Middleware de log de requisição HTTP
export const httpLogger = morgan('dev');