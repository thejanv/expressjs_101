import express from "express";

const app = express();

app.use(express.json());

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
  {
    id: 104,
    username: "jason",
    displayname: "Jason",
  },
];

app.get("/", (req, res) => {
  res.status(201).send({ msg: "Hello" });
});

app.get("/api/users", (req, res) => {
  const {
    query: { filter, value },
  } = req;

  if (filter && value) {
    return res.send(mockUsers.filter((user) => user[filter].includes(value)));
  }
  return res.send(mockUsers);
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

app.post("/api/users", (req, res) => {
  console.log(req.body);
  const newUser = {
    id: mockUsers[mockUsers.length - 1] + 1,
    ...req.body,
  };
  mockUsers.push(newUser);
  return res.status(201).send(newUser);
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
