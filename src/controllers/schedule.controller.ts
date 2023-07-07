import { Request, Response } from "express";
import { schedulesServices } from "../services";

const createSchedule = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const userId: number = Number(res.locals.decoded.sub);

  const schedule: Object = await schedulesServices.createScheduleService(
    req.body,
    userId
  );
  return res.status(201).json(schedule);
};
const readSchedule = async (req: Request, res: Response): Promise<Response> => {
  const id: number = Number(req.params.id);
  const schedule = await schedulesServices.readSchedulesService(id);

  return res.status(200).json(schedule);
};

export default { createSchedule, readSchedule };
