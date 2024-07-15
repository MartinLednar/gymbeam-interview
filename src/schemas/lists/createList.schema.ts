import { z } from "zod";

export const createListSchema = z.object({
  createdAt: z
    .string({ required_error: "Required!" })
    .min(1, { message: "Creation date has to be defined" }),
  title: z.string({ required_error: "Required!" }),
});

export type TCreateList = z.infer<typeof createListSchema>;

export const updateListSchema = createListSchema.pick({ title: true });

export type TUpdateList = z.infer<typeof updateListSchema>;
