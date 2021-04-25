import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import util from 'util';
import { mysqlConnect } from '../misc/dbFunc';

function passportConf() {
    passport.use(new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password'
    }, async (email, password, done)=>{
        const query = "select * from users where email=\""+email+"\";";
        const promisedUser = util.promisify(mysqlConnect);
        const user = await promisedUser(query);
        if (user[0]?.email == email && user[0]?.password == password) {
            return done(null, email);
        } else {
            return done(null, false);
        }
    }));

    passport.serializeUser((email, done) => {
        return done(null, email);
    });

    passport.deserializeUser((email, done) => {
        return done(null, email)
    });
}

function isLoggedIn (req, res, next) {
    if (req.isAuthenticated()) {
        next();
    } else {
        res.redirect("/login");
    }
}

export { passportConf, isLoggedIn };

