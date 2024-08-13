import { Router } from 'express';
import logger from '../utils/logger.js';
const router = Router();

router.get('/', (req,res) => {
    try {
        logger.silly('log silly');
        logger.debug('log debug');
        logger.verbose('log verbose');
        logger.info('log info');
        logger.http('log http');
        logger.warn('log warn');
        logger.error('log error');
        res.json({
            message: "Se imprimen por consola los distintos niveles soportados por este logger"
        });
        
    } catch (error) {
        res.status(500).json({ message: 'Error al registrar los mensajes' });
    }
});

export default router;
