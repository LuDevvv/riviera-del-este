"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ContactSchema, ContactData } from "@lib/types/contact";
import { Calendar, Clock, User, Mail, MessageSquare } from "lucide-react";
import AnimatedSection from "@components/ui/AnimatedSection";

export default function Contact() {
  const t = useTranslations("home.contact");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"success" | "error" | null>(
    null
  );

  // Event dates (June 6-8, 2025)
  const eventDates = [
    { value: "2025-06-06", label: "Viernes 6 de Junio, 2025" },
    { value: "2025-06-07", label: "Sábado 7 de Junio, 2025" },
    { value: "2025-06-08", label: "Domingo 8 de Junio, 2025" },
  ];

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
      date: "2025-06-06", // Default to first event day
      time: "10:00",
      message: "",
    },
  });

  const onSubmit = async (data: ContactData) => {
    setIsSubmitting(true);
    setSubmitStatus(null); // Reset status
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
        // Auto-hide success message after 5 seconds
        setTimeout(() => setSubmitStatus(null), 5000);
      } else {
        setSubmitStatus("error");
        // Auto-hide error message after 8 seconds
        setTimeout(() => setSubmitStatus(null), 8000);
      }
    } catch (error) {
      setSubmitStatus("error");
      console.error("Error sending message:", error);
      // Auto-hide error message after 8 seconds
      setTimeout(() => setSubmitStatus(null), 8000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-14 b-14 md:py-16 bg-white">
      <div className="container mx-auto px-4 max-w-[1000px]">
        {/* Header Section */}
        <AnimatedSection animation="fadeIn" threshold={0.3}>
          <div className="flex justify-center mb-4">
            <span className="bg-gray-100 text-gray-800 px-4 py-1 rounded-full text-sm font-semibold">
              {t("title")}
            </span>
          </div>
        </AnimatedSection>

        <AnimatedSection animation="slideUp" delay={200} threshold={0.3}>
          <h2 className="text-3xl md:text-4xl font-display text-center font-medium mb-2 text-black">
            {t("subtitle")}
          </h2>
        </AnimatedSection>

        <AnimatedSection animation="slideUp" delay={400} threshold={0.3}>
          <p className="text-center text-gray-500 mb-6 md:mb-8 max-w-2xl mx-auto">
            {t("description")}
          </p>
        </AnimatedSection>

        <div className="grid md:grid-cols-5 gap-6 md:gap-1">
          {/* Agent Information */}
          <AnimatedSection
            animation="slideIn"
            delay={600}
            threshold={0.2}
            className="flex flex-col items-center md:col-span-2"
          >
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
          </AnimatedSection>

          {/* Contact Form */}
          <AnimatedSection
            animation="slideIn"
            delay={800}
            threshold={0.2}
            className="md:col-span-3"
          >
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
                {/* Date Select */}
                <div>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-gray-400 z-10">
                      <Calendar size={18} aria-hidden="true" />
                    </div>
                    <select
                      {...register("date")}
                      className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50 text-gray-700 appearance-none"
                      aria-invalid={errors.date ? "true" : "false"}
                    >
                      {eventDates.map((date) => (
                        <option key={date.value} value={date.value}>
                          {date.label}
                        </option>
                      ))}
                    </select>
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
                      {[...Array(9)].map((_, i) => {
                        const hour = i + 10; // 10 AM to 6 PM
                        return (
                          <option key={hour} value={`${hour}:00`}>
                            {hour > 12 ? `${hour - 12}:00 PM` : `${hour}:00 AM`}
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
                  className="relative bg-secondary hover:bg-secondary-dark disabled:bg-secondary/70 text-white px-6 sm:px-8 py-3 rounded-md font-medium uppercase text-sm tracking-wider transition-all duration-300 w-full sm:w-auto min-w-[200px] overflow-hidden"
                  aria-busy={isSubmitting}
                >
                  <span
                    className={`transition-all duration-300 ${isSubmitting ? "opacity-0 translate-y-2" : "opacity-100 translate-y-0"}`}
                  >
                    {t("submit")}
                  </span>

                  {isSubmitting && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="flex items-center space-x-2">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span className="text-white text-sm animate-pulse">
                          {t("sending")}
                        </span>
                      </div>
                    </div>
                  )}
                </button>

                {/* Status Messages */}
                {submitStatus === "success" && (
                  <div
                    className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 text-green-800 p-4 rounded-lg mt-4 w-full shadow-sm"
                    role="alert"
                  >
                    <div className="flex items-center space-x-2">
                      <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                        <svg
                          className="w-3 h-3 text-white"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                      <div>
                        <p className="font-medium">{t("success")}</p>
                        <p className="text-sm text-green-600 mt-1">
                          Te contactaremos pronto
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {submitStatus === "error" && (
                  <div
                    className="bg-gradient-to-r from-red-50 to-rose-50 border border-red-200 text-red-800 p-4 rounded-lg mt-4 w-full shadow-sm"
                    role="alert"
                  >
                    <div className="flex items-center space-x-2">
                      <div className="w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
                        <svg
                          className="w-3 h-3 text-white"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                      <div>
                        <p className="font-medium">{t("error")}</p>
                        <p className="text-sm text-red-600 mt-1">
                          Intenta nuevamente en unos momentos
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </form>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
