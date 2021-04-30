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

router.post("/add_book", isLoggedIn, async (req, res) => {
    const query = `INSERT INTO books values ( '${req.user}', '${req.body.book_id}' );`
    try {
        await execQuery(query);
        console.log("insert successful");
    } catch(e) {
        console.log(e);
        res.status(400);
        if (e.code.trim() == 'ER_DUP_ENTRY') {
            res.status(400);
            res.send(`database already containes ${req.user}-${req.body.book_id}`);
        }
    }
    res.send();
});

export { router };
