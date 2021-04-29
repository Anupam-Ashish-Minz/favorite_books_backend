import express from 'express';
import session from 'express-session';
import { router as loginRouter } from './routes/login';
import { router as favoritesRouter } from './routes/favorites';
import passport from 'passport';
import { passportConf } from './misc/passportConf';

const app = express();
const port = 4000;

app.use(express.json());
app.use(express.urlencoded());
app.use(session({saveUninitialized: true, secret: "random"}));

app.use(passport.initialize());
app.use(passport.session());

passportConf();

passport.serializeUser((email, password, done) => {
    done(null, email);
});

passport.deserializeUser((email, password, done) => {
    done(null, email);
});

app.use("/", loginRouter);
app.use("/api/favorites", favoritesRouter);

app.get("/", (req, res) => {
    res.send("the server is running");
});

app.listen(port, ()=>console.log(`the server is running on http:://localhost:${port}`));
