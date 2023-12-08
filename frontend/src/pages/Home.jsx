import React from "react";
import { RiVerifiedBadgeFill } from "react-icons/ri";
import GroupImages from "../assets/images/GroupImages.png";
import Button from "../components/Button";
import LoadingBar from "react-top-loading-bar";

function Home() {
  return (
    <div className="main">
      <div className="section-1 mt-16 mb-16 flex max-md:flex-col ml-5 mr-5">
        <div className="w-screen-xl flex flex-col gap-4 flex-1 justify-center">
          <LoadingBar color="#c500f9" progress={100} />
          <div
            style={{
              // background: "linear-gradient(90deg, #1d2837 0%, #1d2837a1 50%)",
              borderRadius: "1pc",
            }}
            className="p-2 self-start border-2 text-[0.7rem] md:text-sm dark:border-[#495463] bg-gradient-to-r from-[#e9edf2bf] to-[#95959540] border-gray-200 dark:text-gray-200 text-gray-500 font-semibold dark:bg-gradient-to-r dark:from-[#1d2837] dark:to-[#1d2837a1]"
          >
            Lexica Aperture v3.5
          </div>{" "}
          <h1 className="text-5xl md:text-7xl leading-tight md:leading-tight font-semibold dark:text-gray-200 text-gray-800">
            Generate{" "}
            <b
              style={{ filter: "drop-shadow(0px 5px 15px #1d2837b9)" }}
              className="font-semibold filter bg-clip-text dark: text-transparent bg-gradient-to-r from-[#00a0de] via- to-pink-500"
            >
              image
            </b>{" "}
            with{" "}
            <b
              style={{ filter: "drop-shadow(1px 5px 5px #1d2837b9)" }}
              className="font-semibold bg-clip-text text-transparent bg-gradient-to-r from-[#debd00] via- to-pink-500"
            >
              AI
            </b>{" "}
            instantly <br /> and{" "}
            <b
              style={{ filter: "drop-shadow(0px 5px 5px #1d2837b9)" }}
              className="font-semibold bg-clip-text text-transparent bg-gradient-to-r from-[#00a0de] via- to-pink-500"
            >
              free
            </b>{" "}
          </h1>
          <p className=" dark:text-gray-400 text-gray-700">
            a free AI-powered image generation application built using React.js,
            Node.js, Tailwind CSS, and a custom scraping algorithm. Explore a
            {/* <br className="hidden md:flex" /> */}
            world of unique images sourced from lexica.art, bringing creativity
            and innovation to the art of image generation.
          </p>
          <div className="flex flex-row gap-4 flex-wrap justify-start md:justify-start">
            <span className="dark:text-gray-200 text-slate-600 flex gap-2 items-center">
              <RiVerifiedBadgeFill style={{ color: "#00e098" }} /> High quality
            </span>
            <span className="dark:text-gray-200 text-slate-600 flex gap-2 items-center">
              <RiVerifiedBadgeFill style={{ color: "#00e098" }} /> Royalty free
            </span>
            <span className="dark:text-gray-200 text-slate-600 flex gap-2 items-center">
              <RiVerifiedBadgeFill style={{ color: "#00e098" }} /> Full unique
            </span>
          </div>
          <Button text="Generate Foto" />
        </div>
        <div className="flex-1 flex items-end justify-end mt-20 md:mt-0">
          <img src={GroupImages} alt="" />
        </div>
      </div>
    </div>
  );
}

export default Home;
