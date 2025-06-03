import { z } from "zod";

// Schema with optional message
export const ContactSchema = z.object({
  name: z.string().min(2, "nameTooShort"),
  email: z.string().email("emailInvalid"),
  date: z.string().min(1, "dateRequired"),
  time: z.string().min(1, "timeRequired"),
  message: z.string().optional(),
});

// Form data type (matches schema exactly)
export type ContactFormData = z.infer<typeof ContactSchema>;

// API data type (message is required)
export type ContactData = {
  name: string;
  email: string;
  date: string;
  time: string;
  message: string;
};

// Transform function
export const transformContactData = (
  formData: ContactFormData
): ContactData => ({
  ...formData,
  message: formData.message || "",
});
