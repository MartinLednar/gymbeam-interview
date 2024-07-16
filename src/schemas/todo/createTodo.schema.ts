import { z } from "zod";

export const createTodoSchema = z.object({
  listId: z.string({ required_error: "List id must be defined" }),
  title: z
    .string({ required_error: "Title is required" })
    .min(1, { message: "Title is required" }),
  priority: z.enum(["Low", "Medium", "High"]),
  dueDate: z.string(),
  description: z.string(),
});

export type TCreateTodo = z.infer<typeof createTodoSchema>;

export type TUpdateTodo = z.infer<typeof createTodoSchema>;
