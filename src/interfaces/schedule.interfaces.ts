import { z } from "zod";
import { createSchedulesSchema, returnScheduleSchema } from "../schemas";

type CreateSchedule = z.infer<typeof createSchedulesSchema>;

type ReturnSchedule = z.infer<typeof returnScheduleSchema>;

export { CreateSchedule, ReturnSchedule };
