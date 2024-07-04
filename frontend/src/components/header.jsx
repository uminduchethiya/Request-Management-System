// eslint-disable-next-line no-unused-vars
import React from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";
import bellIcon from "../assets/img/bell.png";
import themechange from "../assets/img/themeChange.png";
import home from "../assets/img/Icon.png";
import feedbacks from "../assets/img/feedbacks.png";
import reports from "../assets/img/reports.png";
import patient from "../assets/img/user.png";
import settings from "../assets/img/settings.png";

function header() {
  return (
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Document</title>
      </head>
      <body>
        <header className=" fixed  z-20 flex items-center w-full bg-white header md:mb-4 lg:h-20 md:h-20">
          <div className=" bg-[#830823] w-full h-24">
            <div className="flex items-center justify-between py-2">
              <div className="flex items-center justify-between p-2 gap-x-8 md:mt-2 text-white font-bold  text-xl">
                {/* Logo */}
                e-hospital
              </div>

              {/* menu */}
              <div className=" flex gap-10">
                <div></div>
                <div className="navigation flex items-center text-white text-md font-bold">
                  <img
                    src={home}
                    className="w-6 h-6 mr-2"
                    alt="Settings Icon"
                  />{" "}
                  {/* Settings Icon */}
                  Dashboard
                </div>
                <div className="navigation flex items-center text-white text-md font-bold">
                  <img
                    src={home}
                    className="w-6 h-6 mr-2"
                    alt="Settings Icon"
                  />{" "}
                  {/* Settings Icon */}
                  Requests
                </div>
                <div className="navigation flex items-center text-white text-sm font-bold">
                  <img
                    src={feedbacks}
                    className="w-6 h-6 mr-2"
                    alt="Settings Icon"
                  />{" "}
                  {/* Settings Icon */}
                  Feedbacks
                </div>
                <div className="navigation flex items-center text-white text-sm font-bold">
                  <img
                    src={reports}
                    className="w-6 h-6 mr-2"
                    alt="Settings Icon"
                  />{" "}
                  {/* Settings Icon */}
                  Reports
                </div>
                <div className="navigation flex items-center text-white text-sm font-bold">
                  <img
                    src={patient}
                    className="w-6 h-6 mr-2"
                    alt="Settings Icon"
                  />{" "}
                  {/* Settings Icon */}
                  Patient
                </div>
                <div className="navigation flex items-center text-white text-sm font-bold">
                  <img
                    src={settings}
                    className="w-6 h-6 mr-2"
                    alt="Settings Icon"
                  />{" "}
                  {/* Settings Icon */}
                  Settings
                </div>
              </div>

              {/* themse and notifiaction */}
              <div className="">
                <a href="#" className="text-gray-800">
                  <div className="flex justify-center items-center gap-4 mr-10 mt-4">
                    {" "}
                    {/* Increased gap-4 */}
                    <div className="relative md:mb-4 mb-4">
                      <img
                        src={themechange} // Use the imported image
                        className="w-10 h-10 justify-between"
                        alt="Bell Icon"
                      />
                    </div>
                    <div className="relative md:mb-4 mb-4">
                      <div className="bottom-4 absolute left-6">
                        <p className="flex h-1 w-1 items-center justify-center rounded-full bg-[#FB1018] p-3 text-xs text-white">
                          0
                        </p>
                      </div>
                      <img
                        src={bellIcon} // Use the imported image
                        className="w-6 h-6"
                        alt="Bell Icon"
                      />
                    </div>
                  </div>
                </a>
              </div>

              {/* nav-right */}
              <div className="flex items-center h-20 justify-center mr-3">
                <div className="flex items-center md:gap-2">
                  {/* Welcome Admin text */}
                  <p className="text-white mt-3">
                    <span className="block">Welcome</span>
                    <span className="block font-bold">Admin</span>
                  </p>
                </div>
              </div>

              {/* end nav-right */}
            </div>
          </div>
        </header>
      </body>
    </html>
  );
}

export default header;
