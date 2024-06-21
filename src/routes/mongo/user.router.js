import { Router } from "express";
//import * as controller from "../../controllers/mongo/user.controller.js";
//import { validateLogin } from "../../middlewares/validateLogin.js";

import passport from 'passport';
import { registerResponse, loginResponse, githubResponse } from '../../controllers/mongo/user.controller.js';

const router = Router();


/*
router.post("/login", controller.login);
router.post('/register', controller.register)
router.get("/info", validateLogin, controller.infoSession);
router.get("/secret-endpoint", validateLogin, controller.visit);
router.post("/logout", controller.logout);
*/

router.post('/register', passport.authenticate('register'), registerResponse);

router.post('/login', passport.authenticate('login'), loginResponse);

/* ------------------------------------ - ----------------------------------- */

//esto es lo que se pone en el boton que te va a llevar a github.
router.get('/register-github', passport.authenticate('github', { scope: [ 'user:email' ] }))  

router.get('/profile', passport.authenticate( 'github' , {
    failureRedirect: '/login', 
    successRedirect: '/profile-github', 
    passReqToCallback: true
}), githubResponse);

router.get('/logout', (req, res) => {
    req.logout((err) => {
        if (err) res.send(err);
        res.redirect('/login'); 
      });
});

export default router;