import express from "express";

const app = express();

const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.status(201).send({ msg: "Hello" });
});

app.get("/api/users", (req, res) => {
  res.send([
    {
      id: 101,
      username: "jack",
      displayname: "Jack",
    },
    {
      id: 102,
      username: "jil",
      displayname: "Jil",
    },
    {
      id: 103,
      username: "ando",
      displayname: "Ando",
    },
  ]);
});

app.get("/api/products", (req, res) => {
  res.send([
    {
      id: 1001,
      username: "chicken",
      displayname: "Chicken",
    },
    {
      id: 1002,
      username: "pork",
      displayname: "Pork",
    },
  ]);
});

app.listen(port, () => {
  console.info(`Running on port ${port}`);
});
