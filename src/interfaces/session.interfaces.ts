import { z } from "zod";
import { loginSchema } from "../schemas";

type CreateSession = z.infer<typeof loginSchema>;

type SessionReturn = {
  token: string;
};

export { CreateSession, SessionReturn };
