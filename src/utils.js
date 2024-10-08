import {dirname} from 'path';
import { fileURLToPath } from 'url';
export const __dirname = dirname(fileURLToPath(import.meta.url));

/* ------------------------------------ - ----------------------------------- */

import bcryptjs from 'bcryptjs';

/**
 * funcion que realiza el encriptado de contraseña a través de bcryptjs con el método hashSync. 
 * Recibe password sin encriptar,
 * retorna password encriptada
 * @param password tipo string
 * @returns password encriptada/hasheada
 */
export const createHash = password => bcryptjs.hashSync(password, bcryptjs.genSaltSync(10));

/**
 * 
 * @param {*} password contraseña proporcionada por el usuario, sin encriptar.
 * @param {*} user usuario encontrado en base de datos.
 * @returns boolean
 */
export const isValidPassword = (password, user) => bcryptjs.compareSync(password, user.password);

/* ------------------------------------ - ----------------------------------- */

export const createResponse = (res, statusCode, data) => {
        return res.status(statusCode).json({data})
};

/**
 * Recibe la fecha de la ultima conexion y retorna un true si pasaron mas del tiempo estimado
 * @param {*} lastConnectionDate usuario encontrado en base de datos.
 * @returns boolean
 */
export const hasBeenMoreThanXTime = (lastConnectionDate, timeLimit) =>{
        const dateNow = new Date()
        const diffMs = dateNow - lastConnectionDate
        //const hours48Ms = 48 * 60 * 60 * 1000;
        const minutesToMs = timeLimit * 60 * 1000;
        //const minMs = 60 * 1000
    
        //return diffMs > hours48Ms;
        return diffMs > minutesToMs;
    };