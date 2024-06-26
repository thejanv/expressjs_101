import express from "express";
import routes from "./routes/index.mjs";
import cookieParser from "cookie-parser";
import session from "express-session";
import passport from "passport";
import mongoose from "mongoose";
import "./auth/local-strategy.mjs";

const app = express();

mongoose
  .connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.saf9bhx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
  )
  .then(() => console.info("Connected to db"))
  .catch((err) => console.error(err));
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

app.use(passport.initialize());
app.use(passport.session());

app.use("/api", routes);

app.get("/", (req, res) => {
  req.session.visited = true;
  res.cookie("hello", "world", { maxAge: 10000, signed: true }).sendStatus(200);
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.info(`Running on port ${port}`);
});

app.post("/api/auth", passport.authenticate("local"), (req, res) => {
  return res.sendStatus(200);
});

app.get("/api/auth/status", (req, res) => {
  return req.user ? res.status(200).send(req.user) : res.sendStatus(401);
});

app.post("/api/auth/logout", (req, res) => {
  if (!req.user) return res.sendStatus(401);

  req.logout((err) => {
    if (err) res.sendStatus(400);
    return res.sendStatus(200);
  });
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
