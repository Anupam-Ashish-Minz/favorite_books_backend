import { Router } from 'express';
import passport from 'passport';

const router = Router();

router.get("/login", (req, res) => {
    res.send("login - dummy route to be replaced with frontend");
});

router.post("/login", passport.authenticate('local', { failureRedirect: "/login" }), (req, res) => {
    res.redirect("/profile");
});

router.get("/api/loginStatus", (req, res) => {
    res.send(req.isAuthenticated());
});

router.post("/api/logout", (req, res) => {
    req.logout();
    res.redirect("/");
});

router.get("/profile", (req, res) => {
    res.send("profile - dummy route to be replaced with frontend");
});

router.get("/api/loginUser", (req, res) => {
    if (!req.user) 
        res.redirect("/login");
    res.json(req.user);
});

export { router };
