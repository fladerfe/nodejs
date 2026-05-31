import cors from "cors";
import express from "express";
import { initRoutes } from "./routes/routes.js";
import { errorMiddleware } from "./middlewares/error.middleware.js"

import "./config/db.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(errorMiddleware);

initRoutes(app);

app.use("/", express.static("./client/dist"));

const port = 3333;
app.listen(port, () => {});

export { app };
