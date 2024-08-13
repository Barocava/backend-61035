import winston, { format } from 'winston';

const { combine, colorize, printf, timestamp } = format;

const logConfigDev = {
    //level: 'info', //Lo toma por default si no hay level definido en el transporter
    format: combine(
        timestamp({
            format: 'MM-DD-YYYY HH:mm:ss'
        }),
        colorize(),
        printf((info) => `${info.level}  |  ${info.timestamp}  |  ${info.message}`)
    ),
    transports: [ 
        new winston.transports.Console({ level: 'debug' }),
    ]
};

const logConfigProd = {
    //level: 'info',
    format: combine(
        timestamp({
            format: 'MM-DD-YYYY HH:mm:ss'
        }),
        colorize(),
        printf((info) => `${info.level}  |  ${info.timestamp}  |  ${info.message}`)
    ),
    transports: [ 
        new winston.transports.Console({ level: 'info' }),
        new winston.transports.File({ 
            filename: './logs/errors.log',
            level: 'error'
        }),
    ]
};

let logger;
if(process.env.ENV == "prod") { logger = winston.createLogger(logConfigProd);}
else { logger = winston.createLogger(logConfigDev);}

export const addLogger = (req, res, next) => {
    req.logger = logger;
    req.logger.http(`${req.method} en ${req.url} - [${new Date().toLocaleTimeString()}]`);
    next();
}

export default logger;