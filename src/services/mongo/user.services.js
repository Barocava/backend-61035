import UserDao from "../../daos/mongodb/user.dao.js";
import { UserModel } from "../../daos/mongodb/models/user.model.js";
const userDao = new UserDao(UserModel);


export const login = async (email, password) => {
    try {
      const user = await userDao.login(email, password);
      return user ? "ok" : null;
    } catch (error) {
      throw new Error(error);
    }
  };
  
export const register = async (body) => {
    try {
      let usuario = {...body}
      if (body.email === "adminCoder@coder.com" && body.password === "adminCod3r123") usuario = {...usuario,  role: "admin"};
      const user = await userDao.register(usuario);
      return user ? "ok" : null ; //Si es null, ya existe
    }
    catch (error) {
      throw new Error(error);
    }
};
  
export const visit = (info) => {
    return info ? "aumenta" : "primera";
};
  
export const infoSession = (req) => {
    console.log(req);
    return {
        session: req.session,
        sessionId: req.sessionID,
        cookies: req.cookies,
    }
};
  
export const logout = (req) => {
    try {
        req.session.destroy();
    } catch (error) {
        throw new Error(error);
    }
};

export const loginResponse = async (req) => {
  try {
    return await userDao.getById(req.session.passport.user);
  } catch (error) {
    throw new Error(error);
}
};