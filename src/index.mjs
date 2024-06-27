import express from "express";

const app = express();

app.use(express.json());

const port = process.env.PORT || 3000;

// UserId resovlve middleware
const resolveIndexById = (req, res, next) => {
  const {
    body,
    params: { id },
  } = req;

  const parseID = parseInt(id);

  if (isNaN(parseID)) return res.sendStatus(400);

  const findUserIndex = mockUsers.findIndex((user) => user.id === parseID);
  console.log(findUserIndex);
  if (findUserIndex === -1) return res.sendStatus(404);
  req.findUserIndex = findUserIndex;
  next();
};

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

// Base URL for API
app.get("/", (req, res) => {
  res.status(201).send({ msg: "Hello" });
});

// Get all users
app.get("/api/users", (req, res) => {
  const {
    query: { filter, value },
  } = req;

  if (filter && value) {
    return res.send(mockUsers.filter((user) => user[filter].includes(value)));
  }
  return res.send(mockUsers);
});

// Get given id user
app.get("/api/users/:id", resolveIndexById, (req, res) => {
  const { findUserIndex } = req;
  const foundUser = mockUsers[findUserIndex];
  return res.send(foundUser);
});

// Create a user
app.post("/api/users", (req, res) => {
  console.log(req.body);
  const newUser = {
    id: mockUsers[mockUsers.length - 1] + 1,
    ...req.body,
  };
  mockUsers.push(newUser);
  return res.status(201).send(newUser);
});

// Update a user complete record
app.put("/api/users/:id", resolveIndexById, (req, res) => {
  const { body, findUserIndex } = req;
  mockUsers[findUserIndex] = { id: mockUsers[findUserIndex].id, ...body };
  return res.sendStatus(200);
});

// Update a user partial data
app.patch("/api/users/:id", resolveIndexById, (req, res) => {
  const { body, findUserIndex } = req;
  mockUsers[findUserIndex] = { ...mockUsers[findUserIndex], ...body };
  return res.sendStatus(200);
});

// Delete a user
app.delete("/api/users/:id", resolveIndexById, (req, res) => {
  const { findUserIndex } = req;
  mockUsers.splice(findUserIndex, 1);
  return res.sendStatus(200);
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
