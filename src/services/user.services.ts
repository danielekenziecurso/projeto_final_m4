import { AppDataSource } from "../data-source";
import { User } from "../entities";
import {
  UserCreate,
  UserRead,
  UserRepo,
  UserReturn,
  UserUpdate,
} from "../interfaces";
import { userRepository } from "../repositories";
import { userReadSchema, userReturnSchema } from "../schemas";

const createUser = async (payload: UserCreate): Promise<UserReturn> => {
  const user: User = userRepository.create(payload);
  await userRepository.save(user);

  return userReturnSchema.parse(user);
};
const readUser = async (): Promise<UserRead> => {
  return userReadSchema.parse(await userRepository.find());
};
const updateuser = async (user: User, payload: UserUpdate): Promise<User> => {
  return await userRepository.save({ ...user, ...payload });
};
const destroyUser = async (user: User): Promise<void> => {
  await userRepository.softRemove(user);
};

export default { createUser, readUser, updateuser, destroyUser };
