import "reflect-metadata";
import "express-async-errors";
import express from "express";
import {
  clientCategories,
  clientRealEstate,
  clientSchedules,
  clientUser,
  clienteSession,
} from "./routers";
import middlewares from "./middlewares";

const app = express();
app.use(express.json());

app.use("/users", clientUser);

app.use("/login", clienteSession);

app.use("/categories", clientCategories);

app.use("/realEstate", clientRealEstate);

app.use("/schedules", clientSchedules);

app.use(middlewares.handleErrorMiddleware);

export default app;
