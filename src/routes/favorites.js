import { Router } from 'express';
import { isLoggedIn } from '../misc/passportConf';
import { execQuery } from '../misc/dbFunc';

const router = Router();

router.get("/", isLoggedIn, async (req, res) => {
    const user = req.user;
    const query = `SELECT book_id FROM books WHERE user_email = "${user}";`
    if (user) {
        const data = await execQuery(query);
        res.send({ "user": user, "books": data });
    } else {
        res.status(400);
        res.send();
    }
});

export { router };
