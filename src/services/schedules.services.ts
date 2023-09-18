import { DeepPartial } from "typeorm";
import { RealEstate, Schedule, User } from "../entities";
import { errorsErrors } from "../errors";
import { CreateSchedule, ReturnSchedule } from "../interfaces";
import {
  realEstateRepository,
  scheduleReposity,
  userRepository,
} from "../repositories";
import { returnScheduleSchema } from "../schemas";

const createScheduleService = async (
  payload: CreateSchedule,
  userId: number
): Promise<Object> => {
  const user: User | null = await userRepository.findOneBy({
    id: Number(userId),
  });
  if (!user) {
    throw new errorsErrors.NotFound("User not found", 404);
  }
  let realEstate: RealEstate | null;
  if (payload.realEstateId) {
    realEstate = await realEstateRepository.findOneBy({
      id: Number(payload.realEstateId),
    });
    if (!realEstate) {
      throw new errorsErrors.NotFound("RealEstate not found", 404);
    }
  }
  const where = await scheduleReposity.findOneBy({
    date: payload.date,
    hour: payload.hour,
    realEstate: {
      id: payload.realEstateId,
    },
  });
  if (where) {
    throw new errorsErrors.AppError(
      "Schedule to this real estate at this date and time already exists",
      409
    );
  }
  const existingSchedule = await scheduleReposity.findOneBy({
    date: payload.date,
    hour: payload.hour,
  });
  if (existingSchedule) {
    throw new errorsErrors.AppError(
      "User schedule to this real estate at this date and time already exists",
      409
    );
  }

  const appointmentTime = new Date(payload.date + " " + payload.hour);
  const startHour = new Date(payload.date + " 08:00");
  const endHour = new Date(payload.date + " 18:00");
  if (appointmentTime < startHour || appointmentTime > endHour) {
    throw new errorsErrors.AppError(
      "Invalid hour, available times are 8AM to 18PM",
      400
    );
  }

  const appointmentDay = new Date(payload.date).getDay();
  if (appointmentDay === 0 || appointmentDay === 6) {
    throw new errorsErrors.AppError(
      "Invalid date, work days are monday to friday",
      400
    );
  }

  const createSchedule: Schedule = scheduleReposity.create({
    ...payload,
    realEstate: realEstate!,
    user: user!,
  } as DeepPartial<Schedule>);

  await scheduleReposity.save(createSchedule);

  return { message: "Schedule created" };
};

const readSchedulesService = async (id: number): Promise<Object> => {
  const schedule: ReturnSchedule | null = await scheduleReposity.findOne({
    where: { id: id },
    relations: { user: true },
  });

  if (!schedule) {
    throw new errorsErrors.NotFound("RealEstate not found", 404);
  }

  return schedule;
};

export default { createScheduleService, readSchedulesService };
