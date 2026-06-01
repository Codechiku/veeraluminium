import { z } from "zod";

export const leadSchema = z.object({
  name: z.string().min(2, "Please enter your name").max(80),
  phone: z
    .string()
    .min(7, "Please enter a valid phone number")
    .max(20)
    .regex(/^[0-9+\-\s()]+$/, "Invalid phone number"),
  email: z
    .string()
    .email("Please enter a valid email")
    .optional()
    .or(z.literal("")),
  projectType: z.string().optional(),
  message: z.string().max(2000).optional().or(z.literal("")),
  estimatedCost: z.number().optional(),
  source: z.string().optional(),
  details: z.any().optional(),
});

export type LeadInput = z.infer<typeof leadSchema>;

export const contactSchema = leadSchema.extend({
  message: z.string().min(5, "Please tell us a little about your project").max(2000),
});

export type ContactInput = z.infer<typeof contactSchema>;
