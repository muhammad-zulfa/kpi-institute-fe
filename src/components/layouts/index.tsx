import Breadcrumb from "@components/breadcrumb";
import Link from "next/link";
import React, { useContext, useState } from "react";
import { FaBookOpen, FaHome, FaUser } from "react-icons/fa";
import { GeneralContext } from "src/providers/general-provider";
import BottomNav from "./bottom-nav";
import HeaderNav from "./header-nav";

interface LayoutsProps extends React.HTMLAttributes<HTMLDivElement> {
  withFooter?: boolean,
  withHeader?: boolean,
  withSidebar?: boolean,
}

export default function Layout({withFooter = false, withHeader = false, withSidebar = false, children, ...rest}: LayoutsProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { histories } = useContext(GeneralContext)
  
  return (
    <div className="flex flex-col min-h-screen">
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="bg-gray-900 bg-opacity-50 dark:bg-opacity-80 fixed inset-0 z-30 md:hidden"
        ></div>
      )}
      {/* {!withHeader && (
        <button
          onClick={() => setSidebarOpen(true)}
          aria-controls="default-sidebar"
          type="button"
          className={`${
            withSidebar ? "block" : "hidden"
          } inline-flex w-10 items-center p-2 mt-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600`}
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
      )} */}
      {withSidebar && (
        <aside
          id="default-sidebar"
          className={`fixed shadow-md top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0 ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
          aria-label="Sidebar"
        >
          <div className="h-full px-3 py-4 overflow-y-auto bg-white dark:bg-gray-800">
            <h1 className="text-xl font-bold mb-3">KPI Institute</h1>
            <div className="mb-3 mt-2 border-b-2 border-gray-700 w-16"></div>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/admin/dashboard"
                  className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <FaHome className="text-gray-500" />
                  <span className="ml-3">Dashboard</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/admin/users"
                  className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <FaUser className="text-gray-500" />
                  <span className="flex-1 ml-3 whitespace-nowrap">Users</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/admin/courses"
                  className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <FaBookOpen className="text-gray-500" />
                  <span className="flex-1 ml-3 whitespace-nowrap">Courses</span>
                  {/* <span className="inline-flex items-center justify-center px-2 ml-3 text-sm font-medium text-gray-800 bg-gray-200 rounded-full dark:bg-gray-700 dark:text-gray-300">
                    Pro
                  </span> */}
                </Link>
              </li>
            </ul>
          </div>
        </aside>
      )}
      <div
        className={`relative flex flex-col min-h-screen${
          withSidebar ? " sm:ml-64" : ""
        }`}
      >
        {withHeader && (
          <HeaderNav
            withSidebar={withSidebar}
            sidebarOpen={sidebarOpen}
            setSidebarOpen={setSidebarOpen}
          />
        )}
        <div className={`mt-[60px] flex-grow flex flex-col items-center p-4`}>
          {(withSidebar || withHeader) && <Breadcrumb histories={histories} />}
          {children}
        </div>
        {withFooter && <BottomNav />}
      </div>
    </div>
  );
}