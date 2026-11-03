import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().trim().min(1, "Name is required"),
  email: z.email("Enter a valid email address"),
  message: z.string().trim().min(10, "Write at least 10 characters"),
});

export type ContactValues = z.infer<typeof contactSchema>;
