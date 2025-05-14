import { z } from "zod";

export const ContactSchema = z.object({
  name: z.string().min(2, "Nombre debe tener al menos 2 caracteres"),
  email: z.string().email("Email inválido"),
  phone: z
    .string()
    .regex(
      /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/,
      "Teléfono inválido"
    ),
  message: z.string().min(10, "Mensaje debe tener al menos 10 caracteres"),
});

export type ContactData = z.infer<typeof ContactSchema>;
