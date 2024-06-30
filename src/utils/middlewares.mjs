import { mockUsers } from "./constants.mjs";

export const resolveIndexById = (req, res, next) => {
  const {
    params: { id },
  } = req;

  const parseID = parseInt(id);

  if (isNaN(parseID)) return res.sendStatus(400);

  const findUserIndex = mockUsers.findIndex((user) => user.id === parseID);
  if (findUserIndex === -1) return res.sendStatus(404);
  req.findUserIndex = findUserIndex;
  next();
};
