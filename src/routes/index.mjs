import { Router } from "express";
import usersRouter from "./users.mjs";
import productsRouter from "./products.mjs";

const router = Router();

router.use("/users", usersRouter);
router.use("/products", productsRouter);

export default router;
