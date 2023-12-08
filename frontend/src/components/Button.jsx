import React from "react";
import { Link } from "react-router-dom";
function Button({ text }) {
  return (
    <Link
      to="/generateImage"
      className="text-white self-start bg-gradient-to-r from-[#00a0de] via-purple-500 to-[#ffa648] hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-slate-400 font-medium rounded-lg text-[.7rem] md:text-sm dark:focus:ring-2 px-4 py-2 text-center dark:bg-blue-600 transition-all hover:shadow-[#100e1454] shadow-xl dark:focus:ring-slate-600"
    >
      {text}
    </Link>
  );
}

export default Button;
