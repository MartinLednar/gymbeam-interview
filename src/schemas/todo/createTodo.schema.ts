import { z } from "zod";

export const createTodoSchema = z.object({
  listId: z.string({ required_error: "List id must be defined" }),
  title: z.string({ required_error: "Title is required" }),
});

export type TCreateTodo = z.infer<typeof createTodoSchema>;
