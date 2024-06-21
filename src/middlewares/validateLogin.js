export const validateLogin = (req, res, next) => {
    console.log(req.session);
    console.log("asd");
    console.log(req.user);
    //if(req.session.info && req.session.info.loggedIn) next();
    if(req.user) next();
        else res.send('no estas autorizado')
};