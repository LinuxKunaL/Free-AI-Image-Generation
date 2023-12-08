import React from "react";
import logo from "../assets/images/logo.jpg";
import { Link } from "react-router-dom";
import Button from "../components/Button";
function Navbar() {
  return (
    <nav className="bg-white dark:bg-gray-800 z-20 top-0 sticky start-0 border-b border-gray-200 dark:border-gray-600 rounded-b-2xl">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link
          to="/"
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <img
            src={logo}
            className=" h-9 md:h-12"
            alt="Logo"
            style={{ borderRadius: ".6pc" }}
          />
          <span className="self-center text-xl md:text-2xl font-semibold whitespace-nowrap dark:text-white ">
            GigaFoto
          </span>
        </Link>
        <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
          <Button text="Generate Foto" />
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
