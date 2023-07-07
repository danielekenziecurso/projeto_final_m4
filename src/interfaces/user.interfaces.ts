import { z } from "zod";
import { userCreateSchema, userReadSchema, userReturnSchema } from "../schemas";
import { DeepPartial, Repository } from "typeorm";
import { User } from "../entities";

type UserCreate = z.infer<typeof userCreateSchema>;

type UserRead = z.infer<typeof userReadSchema>;

type UserUpdate = DeepPartial<UserReturn>;

type UserReturn = z.infer<typeof userReturnSchema>;

type UserRepo = Repository<User>;

export { UserCreate, UserRead, UserUpdate, UserReturn, UserRepo };
