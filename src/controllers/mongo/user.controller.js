import * as service from "../../services/mongo/user.services.js";

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await service.login(email, password);
    if (!user) res.status(401).json({ msg: "No estas autorizado" });
    else {
      req.session.info = {
        loggedIn: true,
        contador: 1
    };
      req.session.email = email;
      req.session.password = password;
      res.redirect("/profile");
    }
  } catch (error) {
    throw new Error(error);
  }
};

export const register = async (req, res) => {
  try {
    const user = await service.register(req.body);
    console.log("hola");
    user ? res.redirect("/login") : res.status(401).json({ msg: "user exist!" });
  } catch (error) {
    throw new Error(error);
  }
};

export const visit = (req, res) => {
  try {
    const visita = service.visit(req.session.info);
    if(visita === "aumenta"){
      req.session.info.contador++;
      res.json({
        msg: `${req.session.email} ha visitado el sitio ${req.session.info.contador} veces`,
      });
    } else if(visita==="primera"){
      res.json({
        msg: `Bienvenido, esta es tu primera visita`,
      });
    } else {
      res.json({
        msg: `Algo ha pasado`,
      });
    }

  } catch (error) {
    throw new Error(error);
  }
};

export const infoSession = (req, res) => {
  try {
    const informacion = service.infoSession(req);
    res.json({informacion});
  } catch (error) {
    throw new Error(error);
  }

};

export const logout = (req, res) => {
  try {
    service.logout(req);
    res.send("session destroy");
  } catch (error) {
    throw new Error(error);
  }
};

export const registerResponse = (req, res, next)=>{
    try {
        res.json({
            msg: 'Register OK',
            session: req.session    // --> passport.user: id mongo
        })
    } catch (error) {
        next(error);
    }
};

export const loginResponse = async(req, res, next)=>{
    try {
        const user = await service.loginResponse(req);
        const { first_name, last_name, email, age, role } = user;
        res.json({
            msg: 'Login OK',
            session: req.session,
            userData: {
                first_name,
                last_name,
                email,
                age,
                role
            }
        })
    } catch (error) {
        next(error);
    }
};

export const githubResponse = async(req, res, next)=>{
    try {
        const { first_name, last_name, email, isGithub } = req.user;
        res.json({
            msg: 'Register/Login Github OK',
            session: req.session,
            userData: {
                first_name,
                last_name,
                email,
                isGithub
            }
        })
    } catch (error) {
        next(error);
    }
};