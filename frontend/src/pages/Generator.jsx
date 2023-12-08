import axios from "axios";
import React, { useState } from "react";
import { MdDownload } from "react-icons/md";
import LoadingBox from "../components/LoadingBox";
import { IoCloseCircle } from "react-icons/io5";
import { BiSolidArrowToTop } from "react-icons/bi";
import LoadingBar from 'react-top-loading-bar'

function Generator() {
  const [ImageUrls, setImageUrls] = useState([
    "90b4da26-6bc5-4e66-bdae-430e5634a0ad",
    "e2b37ecf-e271-44a0-963e-9207aacccf80",
    "533440da-16f9-46aa-a48a-2e77af0d2c9e",
    "a2ac5a90-4d02-4739-9bee-77bd3c0347a3",
    "bc3cab4c-b253-4962-89f3-5a4a2cb25146",
    "e5af52b5-b9b8-4d8f-91a8-63eab27b01f1",
    "3fa3a334-7df5-417e-acf7-db945f87cce5",
    "596b687d-8934-4f47-a697-773649863d51",
    "5867829e-a223-4fa1-aa47-be5a55ed4784",
    "53297de8-0e57-4fb8-9182-dc19da63f55c",
    "45da8330-6adf-49a9-955b-b1d652a34259",
    "3974a07c-2529-4c36-be1a-caaba28aeba0",
  ]);
  const [ParamSearch, setParamSearch] = useState({
    search: "",
    quantity: "",
  });

  const [IsLoading, setIsLoading] = useState(false);

  const HandleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    const response = await axios.post(
      "http://localhost:1000/generateImage",
      ParamSearch
    );
    if (response.data) {
      setIsLoading(false);
    }
    setImageUrls(response.data.images);
  };

  const popUpImage = (e) => {
    const popUpImage = document.getElementById("popUpImage");
    popUpImage.src = e.target.src;
    document.getElementById("popUp").style.display = "flex";
    document
      .getElementById("downloadBtn")
      .setAttribute("data-url", e.target.alt);
  };

  const HandleDownloadImage = async (url) => {
    const data = await fetch(
      "https://image.lexica.art/full_webp/" + url.toString()
    );
    const blob = await data.blob();
    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    link.download = new Date().getTime() + "ImageByGigaFoto" + ".jpeg";
    link.click();
  };

  return (
    <div className="overflow-y-auto h-full bar flex flex-col">
        <LoadingBar color='#c500f9'  progress={100}/>
      <div className="flex mt-10 items-center flex-col gap-2">
        <h3
          id="generator"
          className="text-4xl text-gray-700 dark:text-gray-100 font-semibold"
        >
          GigaFoto
        </h3>
        <p className="text-gray-500">Generate unlimited free image</p>
        <form
          className="flex items-center m-2 flex-col md:flex-row gap-3 md:gap-3 sticky top-28"
          onSubmit={HandleSubmit}
        >
          <div className="relative w-full">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 21 21"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M11.15 5.6h.01m3.337 1.913h.01m-6.979 0h.01M5.541 11h.01M15 15h2.706a1.957 1.957 0 0 0 1.883-1.325A9 9 0 1 0 2.043 11.89 9.1 9.1 0 0 0 7.2 19.1a8.62 8.62 0 0 0 3.769.9A2.013 2.013 0 0 0 13 18v-.857A2.034 2.034 0 0 1 15 15Z"
                />
              </svg>
            </div>
            <input
              type="text"
              id="voice-search"
              className="bg-gray-50 border outline-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full ps-10 p-2.5  dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-purple-500 dark:focus:border-purple-500"
              placeholder="Enter a prompt here..."
              required
              onChange={(e) =>
                setParamSearch({ ...ParamSearch, search: e.target.value })
              }
            />
          </div>
          <div className="relative w-full">
            <select
              class="bg-gray-50 border outline-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full  p-2.5  dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-purple-500 dark:focus:border-purple-500"
              onChange={(e) =>
                setParamSearch({ ...ParamSearch, quantity: e.target.value })
              }
              required
            >
              <option selected>Choose Image quantity</option>
              <option value="50-100">50-100</option>
              <option value="100-150">100-150</option>
              <option value="200-300">200-300</option>
              <option value="300-500">300-500</option>
            </select>
          </div>
          <button
            type="submit"
            className="inline-flex items-center py-2 px-2.5 ms-2 text-[.8rem] md:text-sm dark:focus:ring-2 font-medium text-white bg-gradient-to-r from-purple-600 via-blue-600 to-[#00a0de] rounded-lg border border-purple-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-purple-300 dark:bg-purple-600 dark:hover:bg-blue-700 dark:focus:ring-purple-800 transition-all hover:shadow-[#100e1454] shadow-xl"
          >
            Generate
          </button>
        </form>
      </div>
      {IsLoading ? <LoadingBox /> : null}
      <div className="h-fit flex-wrap justify-center flex gap-4 mt-10 mb-52">
        <div className="flex flex-col">
          {ImageUrls.slice(0, Math.ceil(ImageUrls.length / 4)).map(
            (url, index) => (
              <img
                key={index}
                className="rounded-lg w-32 sm:w-56 md:w-64 lg:w-72 xl:w-80 shadow-xl dark:shadow-gray-800 hover:scale-105 transition-all mb-4"
                onClick={popUpImage}
                src={"https://image.lexica.art/sm2_webp/" + url}
                alt={url}
                loading="lazy"
              />
            )
          )}
        </div>
        <div className="flex flex-col">
          {ImageUrls.slice(
            Math.ceil(ImageUrls.length / 4),
            2 * Math.ceil(ImageUrls.length / 4)
          ).map((url, index) => (
            <img
              key={index}
              className="rounded-lg w-32 sm:w-56 md:w-64 lg:w-72 xl:w-80 shadow-xl dark:shadow-gray-800 hover:scale-105 transition-all mb-4"
              onClick={popUpImage}
              src={"https://image.lexica.art/sm2_webp/" + url}
              alt={url}
              loading="lazy"
            />
          ))}
        </div>
        <div className="flex flex-col">
          {ImageUrls.slice(
            2 * Math.ceil(ImageUrls.length / 4),
            3 * Math.ceil(ImageUrls.length / 4)
          ).map((url, index) => (
            <img
              key={index}
              className="rounded-lg w-32 sm:w-56 md:w-64 lg:w-72 xl:w-80 shadow-xl dark:shadow-gray-800 hover:scale-105 transition-all mb-4"
              onClick={popUpImage}
              src={"https://image.lexica.art/sm2_webp/" + url}
              alt={url}
              loading="lazy"
            />
          ))}
        </div>
        <div className="flex flex-col">
          {ImageUrls.slice(3 * Math.ceil(ImageUrls.length / 4)).map(
            (url, index) => (
              <img
                key={index}
                className="rounded-lg w-32 sm:w-56 md:w-64 lg:w-72 xl:w-80 shadow-xl dark:shadow-gray-800 hover:scale-105 transition-all mb-4"
                onClick={popUpImage}
                src={"https://image.lexica.art/sm2_webp/" + url}
                alt={url}
                loading="lazy"
              />
            )
          )}
        </div>
      </div>
      <div
        id="popUp"
        className="h-screen hidden p-5 flex-col gap-5 w-screen dark:bg-slate-900/70 bg-gray-100/30  backdrop-blur-xl fixed z-20 top-0 left-0 justify-center items-center"
      >
        <h4 className="text-gray-500 text-[.8rem] md:text-sm font-semibold border-2 border-gray-200 dark:border-gray-700 bg-slate-50 p-2 rounded-md dark:text-slate-200 dark:bg-gray-800">
          Get High Quality for Download 🎉
        </h4>
        <img
          id="popUpImage"
          className="rounded-2xl h-96 md:w-fit md:h-[40pc]"
          alt=""
        />
        <div className="flex gap-2 justify-between">
          <button
            id="downloadBtn"
            onClick={(e) => HandleDownloadImage(e.target.dataset.url)}
            className="text-white flex gap-3 items-center bg-gradient-to-r from-[#00a0de] via-purple-500 to-[#ffa648] hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-slate-400 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 transition-all hover:shadow-[#100e1454] shadow-xl dark:focus:ring-gray-600"
          >
            <MdDownload /> Download
          </button>

          <button
            onClick={() =>
              (document.getElementById("popUp").style.display = "none")
            }
            className="text-white flex gap-3 items-center bg-gradient-to-r from-[#00a0de] via-purple-500 to-[#ffa648] hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-slate-400 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 transition-all hover:shadow-[#100e1454] shadow-xl dark:focus:ring-gray-600"
          >
            <IoCloseCircle /> Close
          </button>
        </div>
      </div>
      <div className="fixed -bottom-20 w-full h-40 left-0 blur-xl bg-[#fff] dark:bg-[#303f55]"></div>
      <div className="fixed -bottom-20 w-full h-40 left-0 flex items-top justify-center">
        <span className="cursor-pointer text-gray-600 md:text-sm text-[0.7rem]  dark:text-white/80 border border-gray-300 dark:border-gray-600 border-1 rounded-md h-min p-2 bg-gray-50/80 dark:bg-gray-800/50 backdrop-blur-sm">
          Scroll Down
        </span>
      </div>
      <div
        onClick={() =>
          document
            .getElementById("generator")
            .scrollIntoView({ behavior: "smooth", block: "start" })
        }
        className="fixed md:text-xl text-[1rem] border-[1px] cursor-pointer text-gray-500 dark:text-white bottom-5 left-2 md:w-12 md:h-12 flex items-center dark:border-gray-600/90 rounded-full justify-center p-2 bg-[#fff] dark:bg-gray-800/60 backdrop-blur-sm hover:rounded-xl transition-all  dark:active:bg-gray-700  active:bg-gray-300"
      >
        <BiSolidArrowToTop />
      </div>
    </div>
  );
}

export default Generator;
