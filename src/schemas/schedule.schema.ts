import { z } from "zod";
import { realEstateSchema } from "./realEstate.schema";
import { userSchema } from "./user.schema";

const schedulesSchema = z.object({
  id: z.number().positive(),
  date: z.string(),
  hour: z.string(),
  realEstateId: z.number().positive(),
  userId: z.number().positive(),
});

const createSchedulesSchema = schedulesSchema
  .omit({ id: true })
  .extend({ userId: z.number().optional() });

const returnScheduleSchema = schedulesSchema
  .omit({ realEstateId: true, userId: true })
  .extend({
    user: userSchema.omit({
      id: true,
      createdAt: true,
      updatedAt: true,
      deletedAt: true,
    }),
  });

export { schedulesSchema, createSchedulesSchema, returnScheduleSchema };
