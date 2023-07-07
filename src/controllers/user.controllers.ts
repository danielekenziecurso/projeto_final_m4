import { Request, Response } from "express";
import { User } from "../entities";
import { userServices } from "../services";
import { UserRead, UserReturn, UserUpdate } from "../interfaces";
import { userRepository } from "../repositories";

const createUser = async (req: Request, res: Response): Promise<Response> => {
  const user: UserReturn = await userServices.createUser(req.body);
  return res.status(201).json(user);
};
const readUser = async (req: Request, res: Response): Promise<Response> => {
  const users: UserRead = await userServices.readUser();
  return res.status(200).json(users);
};
const updateuser = async (req: Request, res: Response): Promise<Response> => {
  const foundUser: User = res.locals.user;
  const payload: UserUpdate = req.body;

  const updatedUser = await userServices.updateuser(foundUser, payload);
  const userWithoutPassword = {
    ...updatedUser,
    password: undefined,
  };

  return res.status(200).json(userWithoutPassword);
};

const updateUser = async (user: User, payload: UserUpdate): Promise<User> => {
  return await userRepository.save({ ...user, ...payload });
};

const destroyUser = async (req: Request, res: Response): Promise<Response> => {
  await userServices.destroyUser(res.locals.user);
  return res.status(204).json();
};

export default { createUser, readUser, updateuser, destroyUser };
