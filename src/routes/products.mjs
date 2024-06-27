import { Router } from "express";

const router = Router();

router.get("", (req, res) => {
  if (req.signedCookies && req.signedCookies.hello === "world") {
    return res.send([
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
  }
  return res.sendStatus(401);
});

export default router;
