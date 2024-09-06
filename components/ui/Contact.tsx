"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { sendEmailAction } from "@/app/actions/sendEmail"; // Import server action
import MagicButton from "../MagicButton";
import { ContactFormSchema, ContactFormData } from "@/lib/utils"; // Zod schema for validation

export const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(ContactFormSchema),
  });

  // Handle form submission using the server action
  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    setSuccessMessage(null);

    try {
      const result = await sendEmailAction(data); // Use server action directly
      if (result.success) {
        setSuccessMessage("Your message has been sent successfully!");
        reset(); // Reset form fields after successful submission
      } else {
        setSuccessMessage("Failed to send your message. Please try again.");
      }
    } catch (error) {
      console.error("Error sending email:", error);
      setSuccessMessage("Failed to send your message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className="form relative z-10" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col md:flex-row justify-between gap-5">
        <div className="w-full">
          <input
            type="text"
            placeholder="Your Name"
            className="bg-slate-900 text-white focus:outline-none focus:ring-2 focus:ring-purple-400 px-5 py-2 rounded-lg text-sm w-full"
            {...register("name")}
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
          )}
        </div>
        <div className="w-full">
          <input
            type="email"
            placeholder="Your email address"
            className="bg-slate-900 text-white focus:outline-none focus:ring-2 focus:ring-purple-400 px-5 py-2 rounded-lg text-sm w-full"
            {...register("email")}
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>
      </div>
      <div>
        <textarea
          placeholder="Your Message"
          rows={10}
          className="bg-slate-900 text-white focus:outline-none focus:ring-2 focus:ring-purple-400 px-5 mt-4 py-2 rounded-lg text-sm w-full"
          {...register("message")}
        />
        {errors.message && (
          <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>
        )}
      </div>

      <div className="mt-4 flex justify-center">
        <MagicButton
          title={isSubmitting ? "Submitting..." : "Submit"}
          icon={null}
          position="right"
          handleClick={handleSubmit(onSubmit)}
          disabled={isSubmitting} // Disable button while submitting
        />
      </div>

      {successMessage && (
        <p
          className={`text-center mt-4 ${
            successMessage.startsWith("Your")
              ? "text-green-500"
              : "text-red-500"
          }`}
        >
          {successMessage}
        </p>
      )}
    </form>
  );
};
