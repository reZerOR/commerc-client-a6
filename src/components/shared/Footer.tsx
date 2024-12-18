import logotext from "@/assets/brand-text.png";
import Link from "next/link";
import Image from "next/image";
import { Mail, MapPin, Phone } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();
  const socialLinks = [
    {
      name: "Instagram",
      url: "https://www.facebook.com/MRK012?mibextid=ZbWKwL",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="lucide lucide-facebook"
        >
          <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
        </svg>
      ),
    },
  ];
  const menu = [
    {
      name: "Products",
      to: "/products",
    },
    {
      name: "T-Shirt",
      to: "/products?category=T-Shirt",
    },
    {
      name: "Sneakers",
      to: "/products?category=Sneakers",
    },
  ];

  const contacts = [
    {
      text: "01303164505",
      icon: <Phone size={16} />,
    },
    {
      text: "spiralcom@gmail.com",
      icon: <Mail size={16} />,
    },
    {
      text: "Chittagong, Bangladesh",
      icon: <MapPin size={16} />,
    },
  ];
  return (
    <footer className="bg-gray-200 z-[-1] py-8 overflow-hidden">
      <div className="container relative mx-auto px-4">
        <div className="absolute -bottom-1/2 z-0 -right-1/4 w-2/3 h-full bg-white rounded-full opacity-50 transform rotate-45"></div>
        <div className="flex flex-wrap z-10 items-center justify-between relative">
          <div className="w-full md:w-auto mb-6 md:mb-0">
            <div className="transform -rotate-3 bg-white p-3 rounded-lg shadow-lg inline-block">
              <div className="flex gap-1">
                <Image
                  src={"/logo.svg"}
                  alt="Company Logo"
                  width={120}
                  height={60}
                  className="w-auto h-12"
                />
              </div>
            </div>
          </div>
          <div className="w-full md:w-auto mb-6 md:mb-0">
            <nav className="flex flex-wrap font-semibold tracking-wide justify-center md:justify-end gap-x-6 gap-y-2">
              {menu.map((item, idx) => (
                <Link
                  key={idx}
                  href={item.to}
                  className="hover:text-orange-600 transition-colors"
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
        </div>
        <div className="mt-8 flex flex-wrap z-10 items-center justify-between relative">
          <div className="w-full md:w-auto mb-4 md:mb-0">
            <p className="font-semibold font-popins">Spiralcom</p>
            {contacts.map((item, i) => (
              <div key={i} className="flex items-center gap-2">
                {item.icon}
                <p>{item.text}</p>
              </div>
            ))}
          </div>
          <div className="flex flex-col-reverse gap-2 items-center">
            <div className="w-full md:w-auto text-sm">
              <p>&copy; {currentYear} Spiralcom. All rights reserved.</p>
            </div>
            <div className="w-full md:w-auto mt-4 md:mt-0 flex gap-4">
              {socialLinks.map((link) => (
                <a
                  key={link.url}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-orange-600 transition-colors"
                >
                  {link.icon}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
