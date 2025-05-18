import { z } from "zod";

export const ContactSchema = z.object({
  name: z.string().min(2, "nameTooShort"),
  email: z.string().email("emailInvalid"),
  date: z.string().min(1, "dateRequired"),
  time: z.string().min(1, "timeRequired"),
  message: z.string().min(10, "messageTooShort"),
});

export type ContactData = z.infer<typeof ContactSchema>;
