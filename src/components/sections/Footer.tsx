"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { Link } from "@i18n/navigation";
import {
  Facebook,
  Instagram,
  Mail,
  MapPin,
  Phone,
  Clock,
  Calendar,
} from "lucide-react";
import Image from "next/image";
import { useScrollTo } from "@hooks/useScrollTo";

export default function Footer() {
  const footerT = useTranslations("common.footer");
  const navT = useTranslations("common.nav");
  const currentYear = new Date().getFullYear();
  const scrollToSection = useScrollTo();

  // Navigation items for quick links
  const navItems = ["models", "gallery", "location", "contact"];

  const handleNavClick = (
    item: string,
    e: React.MouseEvent<HTMLAnchorElement>
  ) => {
    scrollToSection(item, e);
  };

  return (
    <footer className="relative text-white">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://res.cloudinary.com/dcuapqoii/image/upload/v1748404986/1_xwydtj.png"
          alt="Background"
          fill
          className="object-cover object-center"
          priority
        />
        <div className="absolute inset-0 bg-primary/90" />
      </div>

      {/* Event Banner
      <div className="relative z-10 bg-secondary py-4">
        <div className="container mx-auto px-4 max-w-[1300px]">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-10">
            <div className="flex items-center">
              <Calendar className="mr-2 h-5 w-5" />
              <span className="font-medium">{footerT("event.dates")}</span>
            </div>
            <div className="flex items-center">
              <Clock className="mr-2 h-5 w-5" />
              <span className="font-medium">{footerT("event.hours")}</span>
            </div>
          </div>
        </div>
      </div> */}

      {/* Main Footer */}
      <div className="relative z-10 container mx-auto px-4 max-w-[1300px] py-12">
        {/* Use flexbox for simpler, even distribution */}
        <div className="flex flex-col md:flex-row md:justify-evenly gap-10">
          {/* Logo and Description */}
          <div className="max-w-sm">
            <div className="mb-4">
              <Image
                src="https://res.cloudinary.com/dcuapqoii/image/upload/v1748058821/blanco_u184gq.png"
                alt="Riviera del Este"
                width={200}
                height={200}
              />
            </div>
            <p className="text-white/80 text-sm mb-5">
              {footerT("description")}
            </p>

            {/* Social Media Icons */}
            <div className="flex space-x-3 mt-6">
              <a
                href="https://www.facebook.com/casalinainmobiliaria"
                target="_blank"
                className="bg-white/10 hover:bg-secondary p-2 rounded transition-colors"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="https://www.instagram.com/casalinasrl/"
                target="_blank"
                className="bg-white/10 hover:bg-secondary p-2 rounded transition-colors"
              >
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Contact Info */}
          <div className="md:w-64">
            <h3 className="text-lg font-medium mb-5">
              {footerT("contactTitle")}
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 mr-3 text-secondary mt-0.5 flex-shrink-0" />
                <span className="text-white/80 text-sm">
                  {footerT("address")}
                </span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 mr-3 text-secondary flex-shrink-0" />
                <a
                  href="tel:+18092995767"
                  className="text-white/80 text-sm hover:text-white transition-colors"
                >
                  +1 (809) 299-5767
                </a>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 mr-3 text-secondary flex-shrink-0" />
                <a
                  href="mailto:info@casalinainmobiliaria.com"
                  className="text-white/80 text-sm hover:text-white transition-colors"
                >
                  info@casalinainmobiliaria.com
                </a>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div className="md:w-48">
            <h3 className="text-lg font-medium mb-5">
              {footerT("quickLinks")}
            </h3>
            <div className="flex flex-col space-y-3">
              {navItems.map((item) => (
                <a
                  key={item}
                  href={`#${item}`}
                  onClick={(e) => handleNavClick(item, e)}
                  className="text-white/80 text-sm hover:text-white transition-colors"
                >
                  {navT(item)}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Divider - Center aligned */}
        <div className="mx-auto">
          <div className="border-t border-white/10 mt-10 pt-8">
            <div className="flex flex-col sm:flex-row justify-between items-center">
              <p className="text-white/70 text-sm mb-4 sm:mb-0">
                © {currentYear} {footerT("rights")}
              </p>
              <div className="flex space-x-6">
                <Link
                  href="#"
                  className="text-white/70 text-sm hover:text-white transition-colors"
                >
                  {footerT("privacy")}
                </Link>
                <Link
                  href="#"
                  className="text-white/70 text-sm hover:text-white transition-colors"
                >
                  {footerT("terms")}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
