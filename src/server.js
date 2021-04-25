import express from 'express';
import { router as loginRouter } from './routes/login';

const app = express();
const port = 4000;

app.use(express.json());
app.use(express.urlencoded());

app.use("/", loginRouter);

app.get("/", (req, res) => {
    res.send("the server is running");
});

app.listen(port, ()=>console.log(`the server is running on http:://localhost:${port}`));
