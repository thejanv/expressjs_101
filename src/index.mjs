import express from "express";
import routes from "./routes/index.mjs";
import cookieParser from "cookie-parser";

const app = express();

app.use(express.json());
app.use(cookieParser("helloworld"));
app.use("/api", routes);

app.get("/", (req, res) => {
  res.cookie("hello", "world", { maxAge: 10000, signed: true }).sendStatus(200);
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.info(`Running on port ${port}`);
});
