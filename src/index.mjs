import express from "express";
import routes from "./routes/index.mjs";

const app = express();

app.use(express.json());
app.use("/api", routes);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.info(`Running on port ${port}`);
});
