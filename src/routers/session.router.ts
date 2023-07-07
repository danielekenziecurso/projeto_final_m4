import { Router } from "express";
import { sessionController } from "../controllers";

const clienteSession: Router = Router();

clienteSession.post("", sessionController.createUser);

export default clienteSession;