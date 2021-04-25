import { Router } from 'express';

const router = Router();

// dummy route to be replaced with frontend
router.get("/login", (req, res) => {
    res.send("login page");
});

router.post("/login", (req, res) => {
    res.send(req.body);
});

export { router };
