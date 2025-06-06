"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, Close, Search, Person } from "@mui/icons-material";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="w-full bg-white shadow-md sticky top-0 z-50">
      <div className="flex justify-between items-center p-4 px-8 mx-auto">
        {/* Logo */}
        <Link href={"/"} className="flex items-center cursor-pointer outline-none">
          <Image src="/logo.png" alt="Logo" width={120} height={40} />
        </Link>

        {/* Navigation Links (Desktop Only) */}
        <nav className="hidden md:flex space-x-6 text-gray-700 font-medium">
          {["Makeup", "Skin", "Hair", "Bath & Body", "Fragrance"].map((item) => (
            <Link href={item === 'Makeup' ? '/products' : item === 'Skin' ? '/collection' : '/'} key={item} className="hover:text-blue-500">
              {item}
            </Link>
          ))}
        </nav>

        {/* Search Bar (Desktop Only) */}
        <div className="hidden md:flex relative w-1/3">
          <input
            type="text"
            placeholder="Search for Product, Brands and More..."
            className="w-full p-2 pl-4 pr-10 border border-gray-300 text-black rounded-full focus:outline-none"
          />
          <Search className="absolute right-3 top-2 text-gray-500 cursor-pointer" />
        </div>

        {/* User Icon & Login/Signup (Desktop) */}
        <div className="hidden md:flex items-center space-x-2 font-medium cursor-pointer">
          <Person className="w-6 h-6 text-[#FB4546]" fontSize="large" />
          {/* <span className="text-slate-600">Login/Signup</span> */}
        </div>

        {/* Mobile Icons */}
        <div className="flex items-center space-x-4 md:hidden">
          <Person className="w-6 h-6 text-gray-700 cursor-pointer" />
          <Menu
            className="w-8 h-8 text-gray-700 cursor-pointer"
            onClick={() => setIsOpen(true)}
          />
        </div>
      </div>

      {/* Mobile Sidebar */}
      <div
        className={`fixed top-0 left-0 w-96 h-full bg-white shadow-lg transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center p-4 bg-white border-b-2">
          <Image src="/logo.png" alt="Logo" width={100} height={30} />
          <div className="flex items-center justify-center space-x-1">
          <Person className="w-6 h-6 text-[#FB4546] cursor-pointer" />
          <span className="text-slate-700 text-lg">Login/Signup</span>
          </div>
          <Close
            className="w-6 h-6 text-black cursor-pointer"
            onClick={() => setIsOpen(false)}
          />
        </div>

        <nav className="flex flex-col p-4 space-y-4 text-gray-700 font-medium text-lg">
          {["Makeup", "Skin", "Hair", "Bath & Body", "Fragrance"].map((item) => (
            <Link href="#" key={item} className="hover:text-blue-500">
              {item}
            </Link>
          ))}
        </nav>

        {/* Login/Signup (Mobile) */}
      </div>

      {isOpen && (
        <div
          className="fixed inset-0 bg-white opacity-10"
          onClick={() => setIsOpen(false)}
        />
      )}
    </header>
  );
};

export default Header;
