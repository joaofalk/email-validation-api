import express, { Express, Request, Response } from "express";
import { cleanEmail } from "./cleanEmailService";

const app: Express = express();
const port = 3333;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Hello");
});

app.post("/", (req: Request, res: Response) => {
  const { email } = req.body;
  return res.send(cleanEmail(email));
});

app.listen(port, () => {
  console.log("Rodando");
});
