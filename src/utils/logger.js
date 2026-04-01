import winston from 'winston';

// criando logger personalizado
export const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    transports: [
        //salva logs de erro
        new winston.transports.File({ filename: 'error.log', level: 'error' }),
        //salva todos os logs
        new winston.transports.File({ filename: 'combined.log' }),

        //mostra no console
        new winston.transports.Console({
            format: winston.format.simple()
        })
    ]
})