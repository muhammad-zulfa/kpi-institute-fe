import React, { useEffect, useRef, useState } from "react";
import { FaBookOpen, FaDoorClosed, FaDoorOpen, FaHome, FaSignInAlt, FaSignOutAlt, FaUser } from "react-icons/fa";

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  showSideBar?: boolean;
  showHeader?: boolean;
}

export const Container: React.FC<SidebarProps> = ({
  children,
  showSideBar = false,
  showHeader = false,
}: SidebarProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="bg-gray-900 bg-opacity-50 dark:bg-opacity-80 fixed inset-0 z-30 md:hidden"
        ></div>
      )}
      <button
        onClick={() => setSidebarOpen(true)}
        aria-controls="default-sidebar"
        type="button"
        className="inline-flex w-10 items-center p-2 mt-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
      >
        <span className="sr-only">Open sidebar</span>
        <svg
          className="w-6 h-6"
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            clipRule="evenodd"
            fillRule="evenodd"
            d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
          ></path>
        </svg>
      </button>
      {showSideBar && (
        <aside
          id="default-sidebar"
          className={`fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0 ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
          aria-label="Sidebar"
        >
          <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
            <h1 className="text-xl font-bold">KPI Institute</h1>
            <div className="mb-3 mt-2 border-b-2 border-gray-700 w-20"></div>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <FaHome className="text-gray-500" />
                  <span className="ml-3">Dashboard</span>
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <FaUser className="text-gray-500" />
                  <span className="flex-1 ml-3 whitespace-nowrap">Users</span>
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <FaBookOpen className="text-gray-500" />
                  <span className="flex-1 ml-3 whitespace-nowrap">Courses</span>
                  {/* <span className="inline-flex items-center justify-center px-2 ml-3 text-sm font-medium text-gray-800 bg-gray-200 rounded-full dark:bg-gray-700 dark:text-gray-300">
                    Pro
                  </span> */}
                </a>
              </li>
            </ul>
          </div>
        </aside>
      )}
      <div className={`relative flex${showSideBar ? " sm:ml-64" : ""}`}>
        {showHeader && (
          <div className="l-0 bg-gray-50 top-0 w-full h-[60px] flex justify-between absolute p-4 shadow-sm">
            <h1 className="text-xl font-bold">KPI Institute</h1>
            <button className="flex items-center px-2 text-sm text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
              <FaSignOutAlt className="text-gray-500" />
              <span className="flex-1 ml-3 whitespace-nowrap">Logout</span>
            </button>
          </div>
        )}
        <div className={`flex flex-col justify-center items-center`}>
          {children}
        </div>
      </div>
    </>
  );
};