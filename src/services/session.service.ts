import { compare } from "bcryptjs";
import { User } from "../entities";
import { errorsErrors } from "../errors";
import { CreateSession, SessionReturn } from "../interfaces/session.interfaces";
import { userRepository } from "../repositories";
import { sign } from "jsonwebtoken";

const createSession = async ({
  email,
  password,
}: CreateSession): Promise<SessionReturn> => {
  const foundUser: User | null = await userRepository.findOneBy({ email });
  if (!foundUser)
    throw new errorsErrors.Unauthorized("Invalid credentials", 401);

  const samePwd: boolean = await compare(password, foundUser.password);
  if (!samePwd)
    throw new errorsErrors.Unauthorized("Invalid credentials", 401);

  const token: string = sign(
    { admin: foundUser.admin },
    process.env.SECRET_KEY!,
    { subject: foundUser.id.toString(), expiresIn: process.env.EXPIRES_IN! }
  );

  return { token };
};

export default { createSession };
