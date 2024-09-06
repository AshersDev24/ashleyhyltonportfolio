import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { z } from "zod";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const ContactFormSchema = z.object({
  name: z.string().min(1, { message: "Name is required." }),
  email: z
    .string()
    .min(1, { message: "Email is required." })
    .email({ message: "Invalid email address." }),
  message: z.string().min(1, { message: "Message is required." }),
});

export type ContactFormData = z.infer<typeof ContactFormSchema>;

// export async function sendEmail(data: ContactFormData) {
//   const msg = {
//     to: data.email, // Recipient's email
//     from: "ashley@ashleyhylton.com", // Replace with a verified email from SendGrid
//     templateId: "your_template_id", // Your SendGrid email template ID
//     dynamicTemplateData: {
//       name: data.name,
//     },
//   };

//   try {
//     await sgMail.send(msg);
//     return { success: true };
//   } catch (error) {
//     console.error("Error sending email:", error);
//     return { success: false, error };
//   }
// }
