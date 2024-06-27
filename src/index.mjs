import express from "express";
import routes from "./routes/index.mjs";
import cookieParser from "cookie-parser";
import session from "express-session";
import { mockUsers } from "./utils/constants.mjs";

const app = express();

app.use(express.json());
app.use(cookieParser("helloworld"));
app.use(
  session({
    secret: "dev dev",
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 60000 * 60,
    },
  })
);
app.use("/api", routes);

app.get("/", (req, res) => {
  req.session.visited = true;
  console.log(req.session);
  console.log(req.sessionID);
  res.cookie("hello", "world", { maxAge: 10000, signed: true }).sendStatus(200);
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.info(`Running on port ${port}`);
});

app.post("/api/auth", (req, res) => {
  const {
    body: { username, password },
  } = req;
  const findUser = mockUsers.find((user) => user.username === username);
  if (!findUser || findUser.password !== password) return res.sendStatus(401);
  req.session.user = findUser;
  return res.status(200).send(findUser);
});

app.get("/api/auth/status", (req, res) => {
  return req.session.user
    ? res.status(200).send(req.session.user)
    : res.sendStatus(401);
});

app.post("/api/cart", (req, res) => {
  if (!req.session.user) return res.sendStatus(401);
  const { body: item } = req;
  const { cart } = req.session;

  if (cart) {
    cart.push(item);
  } else {
    req.session.cart = [item];
  }
  return res.status(200).send(item);
});

app.get("/api/cart", (req, res) => {
  if (req.session.use) return res.sendStatus(401);
  return res.status(200).send(req.session.cart ?? []);
});
