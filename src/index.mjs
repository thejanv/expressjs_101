import express from "express";

const app = express();

const port = process.env.PORT || 3000;

const mockUsers = [
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
];

app.get("/", (req, res) => {
  res.status(201).send({ msg: "Hello" });
});

app.get("/api/users", (req, res) => {
  res.send(mockUsers);
});

app.get("/api/users/:id", (req, res) => {
  const parseID = parseInt(req.params.id);
  console.log(parseID);
  if (isNaN(parseID)) {
    return res.status(400).send({ msg: "Bad request invalid Id" });
  }
  const foundUser = mockUsers.find((user) => user.id === parseID);
  console.log(foundUser);
  if (!foundUser) {
    return res.sendStatus(404);
  }
  return res.send(foundUser);
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
