"use server";

import sgMail from "@sendgrid/mail";
import { ContactFormData } from "@/lib/utils";

sgMail.setApiKey(process.env.SENDGRID_API_KEY as string);

export async function sendEmailAction(formData: ContactFormData) {
  const userMsg = {
    to: formData.email,
    from: "ashley@ashleyhylton.com",
    templateId: "d-8b520a4d4ab1427c988f9d41ecf01b12",
    dynamicTemplateData: {
      name: formData.name,
    },
  };
  const notificationMsg = {
    to: "ashleyhylton91@gmail.com",
    from: "ashley@ashleyhylton.com",
    templateId: "d-4c1466dbb2724d90b8dd68ac9b1398c8",
    dynamicTemplateData: {
      name: formData.name,
      email: formData.email,
      message: formData.message,
    },
  };

  try {
    await sgMail.send(userMsg);

    await sgMail.send(notificationMsg);

    return { success: true };
  } catch (error) {
    console.error("Error sending email:", error);
    return { success: false, error: "Failed to send email" };
  }
}
