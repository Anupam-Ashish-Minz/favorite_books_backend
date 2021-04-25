import { Router } from 'express';
import passport from 'passport';

const router = Router();

// dummy route to be replaced with frontend
router.get("/login", (req, res) => {
    res.send("login page");
});

router.post("/login", passport.authenticate('local', { failureRedirect: "/login" }), (req, res) => {
    res.send(true);
});

export { router };
