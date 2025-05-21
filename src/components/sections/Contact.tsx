"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ContactSchema, ContactData } from "@lib/types/contact";
import { Calendar, Clock, User, Mail, MessageSquare } from "lucide-react";

export default function Contact() {
  const t = useTranslations("home.contact");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"success" | "error" | null>(
    null
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactData>({
    resolver: zodResolver(ContactSchema),
    defaultValues: {
      name: "",
      email: "",
      date: new Date().toISOString().split("T")[0],
      time: "10:00",
      message: "",
    },
  });

  const onSubmit = async (data: ContactData) => {
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setSubmitStatus("success");
        reset();
      } else {
        setSubmitStatus("error");
      }
    } catch (error) {
      setSubmitStatus("error");
      console.error("Error sending message:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-14 b-14 md:py-16 bg-white">
      <div className="container mx-auto px-4 max-w-[1000px]">
        <div className="flex justify-center mb-4">
          <span className="bg-gray-100 text-gray-800 px-4 py-1 rounded-full text-sm font-semibold">
            {t("title")}
          </span>
        </div>

        <h2 className="text-3xl md:text-4xl font-display text-center font-medium mb-2 text-black">
          {t("subtitle")}
        </h2>

        <p className="text-center text-gray-500 mb-6 md:mb-8 max-w-2xl mx-auto">
          {t("description")}
        </p>

        <div className="grid md:grid-cols-5 gap-6 md:gap-1">
          {/* Agent Information */}
          <div className="flex flex-col items-center md:col-span-2">
            <div className="w-full max-w-[270px] mx-auto overflow-hidden rounded-lg mb-2">
              <Image
                src="https://res.cloudinary.com/dcuapqoii/image/upload/v1747842317/rufycastor_yjf0as.jpg"
                alt="Real Estate Agent"
                width={300}
                height={300}
                className="object-cover w-full h-auto aspect-square"
                priority
              />
            </div>

            <h3 className="text-xl font-medium text-gray-900">Rufy Castor</h3>

            <a
              href="tel:+18092995767"
              className="text-secondary hover:text-secondary-dark mt-1 hover:underline transition-colors"
            >
              (809) 299-5767
            </a>
          </div>

          {/* Contact Form */}
          <div className="md:col-span-3">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                {/* Name Input */}
                <div>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-gray-400">
                      <User size={18} aria-hidden="true" />
                    </div>
                    <input
                      type="text"
                      {...register("name")}
                      placeholder={t("name")}
                      autoComplete="name"
                      className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50 text-gray-700 placeholder:text-gray-400"
                      aria-invalid={errors.name ? "true" : "false"}
                    />
                  </div>
                  {errors.name && (
                    <p className="text-red-500 text-sm mt-1" role="alert">
                      {t("nameTooShort")}
                    </p>
                  )}
                </div>

                {/* Email Input */}
                <div>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-gray-400">
                      <Mail size={18} aria-hidden="true" />
                    </div>
                    <input
                      type="email"
                      {...register("email")}
                      placeholder={t("email")}
                      autoComplete="email"
                      className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50 text-gray-700 placeholder:text-gray-400"
                      aria-invalid={errors.email ? "true" : "false"}
                    />
                  </div>
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1" role="alert">
                      {t("emailInvalid")}
                    </p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                {/* Date Input */}
                <div>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-gray-400 z-10">
                      <Calendar size={18} aria-hidden="true" />
                    </div>
                    <input
                      type="date"
                      {...register("date")}
                      className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50 text-gray-700"
                      aria-invalid={errors.date ? "true" : "false"}
                    />
                  </div>
                  {errors.date && (
                    <p className="text-red-500 text-sm mt-1" role="alert">
                      {t("dateRequired")}
                    </p>
                  )}
                </div>

                {/* Time Input */}
                <div>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-gray-400 z-10">
                      <Clock size={18} aria-hidden="true" />
                    </div>
                    <select
                      {...register("time")}
                      className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50 text-gray-700 appearance-none"
                      aria-invalid={errors.time ? "true" : "false"}
                    >
                      {[...Array(11)].map((_, i) => {
                        const hour = i + 9;
                        return (
                          <option key={hour} value={`${hour}:00`}>
                            {`${hour}:00`}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                  {errors.time && (
                    <p className="text-red-500 text-sm mt-1" role="alert">
                      {t("timeRequired")}
                    </p>
                  )}
                </div>
              </div>

              {/* Message Input */}
              <div className="mb-4">
                <div className="relative">
                  <div className="absolute top-3 left-0 flex items-start pl-4 pointer-events-none text-gray-400">
                    <MessageSquare size={18} aria-hidden="true" />
                  </div>
                  <textarea
                    {...register("message")}
                    rows={5}
                    placeholder={t("message")}
                    className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50 text-gray-700 placeholder:text-gray-400 resize-none"
                    aria-invalid={errors.message ? "true" : "false"}
                  ></textarea>
                </div>
                {errors.message && (
                  <p className="text-red-500 text-sm mt-1" role="alert">
                    {t("messageTooShort")}
                  </p>
                )}
              </div>

              <div className="flex flex-col items-start">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-secondary hover:bg-secondary-dark disabled:bg-secondary/70 text-white px-6 sm:px-8 py-3 rounded-md font-medium uppercase text-sm tracking-wider transition-colors w-full sm:w-auto min-w-[200px]"
                  aria-busy={isSubmitting}
                >
                  {isSubmitting ? t("sending") : t("submit")}
                </button>

                {submitStatus === "success" && (
                  <div
                    className="bg-green-100 text-green-800 p-3 rounded-md mt-4 w-full"
                    role="alert"
                  >
                    {t("success")}
                  </div>
                )}

                {submitStatus === "error" && (
                  <div
                    className="bg-red-100 text-red-800 p-3 rounded-md mt-4 w-full"
                    role="alert"
                  >
                    {t("error")}
                  </div>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
