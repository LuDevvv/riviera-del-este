"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ContactSchema, ContactData } from "@lib/types/contact";
import {
  Calendar,
  Clock,
  User,
  Mail,
  MessageSquare,
  ChevronDown,
} from "lucide-react";
import AnimatedSection from "@components/ui/AnimatedSection";
import { useLocale } from "next-intl";

// Simple Calendar Component
interface SimpleCalendarProps {
  onDateSelect: (date: Date) => void;
  selectedDate?: Date;
  locale: string;
}

function SimpleCalendar({
  onDateSelect,
  selectedDate,
  locale,
}: SimpleCalendarProps) {
  const now = new Date();
  const [currentMonth, setCurrentMonth] = useState(now.getMonth());
  const [currentYear, setCurrentYear] = useState(now.getFullYear());

  // Nombres de meses
  const monthNames =
    locale === "es"
      ? [
          "Enero",
          "Febrero",
          "Marzo",
          "Abril",
          "Mayo",
          "Junio",
          "Julio",
          "Agosto",
          "Septiembre",
          "Octubre",
          "Noviembre",
          "Diciembre",
        ]
      : [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
          "August",
          "September",
          "October",
          "November",
          "December",
        ];

  // Nombres de días
  const dayNames =
    locale === "es"
      ? ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"]
      : ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  // Obtener primer día del mes y días en el mes
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1);
  const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0);
  const daysInMonth = lastDayOfMonth.getDate();
  const startingDayOfWeek = firstDayOfMonth.getDay();

  // Generar días del calendario
  const calendarDays = [];

  // Días vacíos al inicio
  for (let i = 0; i < startingDayOfWeek; i++) {
    calendarDays.push(null);
  }

  // Días del mes
  for (let day = 1; day <= daysInMonth; day++) {
    calendarDays.push(day);
  }

  const handleDayClick = (day: number) => {
    const date = new Date(currentYear, currentMonth, day);
    const dayOfWeek = date.getDay();

    // No permitir domingos (0) ni fechas pasadas
    if (
      dayOfWeek === 0 ||
      date < new Date(now.getFullYear(), now.getMonth(), now.getDate())
    ) {
      return;
    }

    onDateSelect(date);
  };

  const goToPreviousMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const goToNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  // Verificar si podemos ir al mes anterior (no antes del mes actual)
  const canGoPrevious = () => {
    return (
      currentYear > now.getFullYear() ||
      (currentYear === now.getFullYear() && currentMonth > now.getMonth())
    );
  };

  const isToday = (day: number) => {
    return (
      day === now.getDate() &&
      currentMonth === now.getMonth() &&
      currentYear === now.getFullYear()
    );
  };

  const isSelected = (day: number) => {
    if (!selectedDate) return false;
    return (
      day === selectedDate.getDate() &&
      currentMonth === selectedDate.getMonth() &&
      currentYear === selectedDate.getFullYear()
    );
  };

  const isDisabled = (day: number) => {
    const date = new Date(currentYear, currentMonth, day);
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    return date < today;
  };

  const isSunday = (day: number) => {
    const date = new Date(currentYear, currentMonth, day);
    return date.getDay() === 0;
  };

  return (
    <div className="simple-calendar">
      <div className="calendar-header">
        <button
          type="button"
          onClick={goToPreviousMonth}
          disabled={!canGoPrevious()}
          className="calendar-nav-button"
        >
          ←
        </button>
        <span>{monthNames[currentMonth]}</span>
        <button
          type="button"
          onClick={goToNextMonth}
          className="calendar-nav-button"
        >
          →
        </button>
      </div>

      <div className="calendar-grid">
        {/* Headers de días */}
        {dayNames.map((day) => (
          <div key={day} className="calendar-day-header">
            {day}
          </div>
        ))}

        {/* Días del calendario */}
        {calendarDays.map((day, index) => (
          <button
            key={index}
            type="button"
            className={`calendar-day ${day === null ? "other-month" : ""} ${
              day && isToday(day) ? "today" : ""
            } ${day && isSelected(day) ? "selected" : ""} ${
              day && isDisabled(day) ? "disabled" : ""
            } ${day && isSunday(day) ? "sunday" : ""}`}
            onClick={() => day && handleDayClick(day)}
            disabled={!day || isDisabled(day) || isSunday(day)}
          >
            {day}
          </button>
        ))}
      </div>
    </div>
  );
}

export default function Contact() {
  const t = useTranslations("home.contact");
  const locale = useLocale();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"success" | "error" | null>(
    null
  );
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const calendarRef = useRef<HTMLDivElement>(null);

  // Available time slots (10:00 AM - 5:00 PM) - cada hora
  const timeSlots = [
    "10:00",
    "11:00",
    "12:00",
    "13:00",
    "14:00",
    "15:00",
    "16:00",
    "17:00",
  ];

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<ContactData>({
    resolver: zodResolver(ContactSchema),
    defaultValues: {
      name: "",
      email: "",
      date: "",
      time: "10:00",
      message: "",
    },
  });

  // Close calendar when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        calendarRef.current &&
        !calendarRef.current.contains(event.target as Node)
      ) {
        setIsCalendarOpen(false);
      }
    }

    if (isCalendarOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isCalendarOpen]);

  // Format date for display - más corto para una línea
  const formatDateForDisplay = (date: Date) => {
    const day = date.getDate();
    const monthNames =
      locale === "es"
        ? [
            "Ene",
            "Feb",
            "Mar",
            "Abr",
            "May",
            "Jun",
            "Jul",
            "Ago",
            "Sep",
            "Oct",
            "Nov",
            "Dic",
          ]
        : [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
          ];

    const dayNames =
      locale === "es"
        ? ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"]
        : ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    const dayName = dayNames[date.getDay()];
    const monthName = monthNames[date.getMonth()];

    return `${dayName}, ${day} ${monthName}`;
  };

  // Format time for display
  const formatTimeForDisplay = (time: string) => {
    const [hour] = time.split(":");
    const hourNum = parseInt(hour);
    if (hourNum >= 13) {
      return `${hourNum - 12}:00 PM`;
    } else if (hourNum === 12) {
      return `${time} PM`;
    } else {
      return `${time} AM`;
    }
  };

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
    setValue("date", date.toISOString().split("T")[0]);
    setIsCalendarOpen(false);
  };

  const onSubmit = async (data: ContactData) => {
    setIsSubmitting(true);
    setSubmitStatus(null);
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
        setSelectedDate(undefined);
        setTimeout(() => setSubmitStatus(null), 5000);
      } else {
        setSubmitStatus("error");
        setTimeout(() => setSubmitStatus(null), 8000);
      }
    } catch (error) {
      setSubmitStatus("error");
      console.error("Error sending message:", error);
      setTimeout(() => setSubmitStatus(null), 8000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-12 bg-white">
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
                {/* Date Picker */}
                <div className="relative" ref={calendarRef}>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-gray-400 z-10">
                      <Calendar size={18} aria-hidden="true" />
                    </div>
                    <button
                      type="button"
                      onClick={() => setIsCalendarOpen(!isCalendarOpen)}
                      className="w-full pl-11 pr-10 py-3 bg-gray-50 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50 text-gray-700 text-left transition-all duration-200 hover:bg-gray-100"
                      aria-invalid={errors.date ? "true" : "false"}
                    >
                      {selectedDate
                        ? formatDateForDisplay(selectedDate)
                        : t("selectDate") || "Seleccionar fecha"}
                    </button>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
                      <ChevronDown
                        size={18}
                        className={`text-gray-400 transition-transform duration-200 ${isCalendarOpen ? "rotate-180" : ""}`}
                      />
                    </div>
                  </div>

                  {/* Calendar Dropdown */}
                  {isCalendarOpen && (
                    <div className="absolute top-full left-0 z-50 mt-2">
                      <SimpleCalendar
                        onDateSelect={handleDateSelect}
                        selectedDate={selectedDate}
                        locale={locale}
                      />
                    </div>
                  )}

                  {/* Hidden input for form */}
                  <input type="hidden" {...register("date")} />

                  {errors.date && (
                    <p className="text-red-500 text-sm mt-1" role="alert">
                      {t("dateRequired")}
                    </p>
                  )}
                </div>

                {/* Time Select */}
                <div>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-gray-400 z-10">
                      <Clock size={18} aria-hidden="true" />
                    </div>
                    <select
                      {...register("time")}
                      className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50 text-gray-700 appearance-none cursor-pointer hover:bg-gray-100 transition-colors duration-200"
                      aria-invalid={errors.time ? "true" : "false"}
                    >
                      {timeSlots.map((time) => (
                        <option key={time} value={time}>
                          {formatTimeForDisplay(time)}
                        </option>
                      ))}
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
                      <ChevronDown size={18} className="text-gray-400" />
                    </div>
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
                    className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50 text-gray-700 placeholder:text-gray-400 resize-none hover:bg-gray-100 transition-colors duration-200"
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
