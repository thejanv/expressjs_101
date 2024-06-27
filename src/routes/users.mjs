import { Router } from "express";
import {
  query,
  validationResult,
  checkSchema,
  matchedData,
} from "express-validator";
import { mockUsers } from "../utils/constants.mjs";
import { createUserValidationSchema } from "../utils/validationSchemas.mjs";
import { resolveIndexById } from "../utils/middlewares.mjs";

const router = Router();

router.get(
  "",
  //   query("filter")
  //     .notEmpty()
  //     .isLength({ min: 3, max: 10 })
  //     .withMessage("Must be at least 3-10 characters"),
  (req, res) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.status(400).send({ errors: result.array() });
    }
    const {
      query: { filter, value },
    } = req;
    if (filter && value) {
      return res.send(mockUsers.filter((user) => user[filter].includes(value)));
    }
    return res.send(mockUsers);
  }
);

// Get given id user
router.get("/:id", resolveIndexById, (req, res) => {
  const { findUserIndex } = req;
  const foundUser = mockUsers[findUserIndex];
  return res.send(foundUser);
});

// Create a user
router.post("", checkSchema(createUserValidationSchema), (req, res) => {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    return res.status(400).send({ errors: result.array() });
  }
  const data = matchedData(req);
  const newUser = {
    id: mockUsers[mockUsers.length - 1].id + 1,
    ...data,
  };
  mockUsers.push(newUser);
  return res.status(201).send(newUser);
});

// Update a user complete record
router.put("/:id", resolveIndexById, (req, res) => {
  const { body, findUserIndex } = req;
  mockUsers[findUserIndex] = { id: mockUsers[findUserIndex].id, ...body };
  return res.sendStatus(200);
});

// Update a user partial data
router.patch("/:id", resolveIndexById, (req, res) => {
  const { body, findUserIndex } = req;
  mockUsers[findUserIndex] = { ...mockUsers[findUserIndex], ...body };
  return res.sendStatus(200);
});

// Delete a user
router.delete("/:id", resolveIndexById, (req, res) => {
  const { findUserIndex } = req;
  mockUsers.splice(findUserIndex, 1);
  return res.sendStatus(200);
});

export default router;
