import { Router } from "express";

const router = Router();

router.get("", (req, res) => {
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

export default router;
