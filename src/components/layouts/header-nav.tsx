import { signOut } from "next-auth/react";
import { FaSignOutAlt } from "react-icons/fa";

interface HeaderNavProps {
  withSidebar?: boolean;
  sidebarOpen: boolean;
  setSidebarOpen: (value: boolean) => void;
}

export default function HeaderNav({ withSidebar = false, sidebarOpen, setSidebarOpen}: HeaderNavProps) {
  return (
    <div
      className={`l-0 drop-shadow-sm bg-stone-50 bg-opacity-90 top-0 w-full h-[60px] flex justify-between ${
        withSidebar ? "md:justify-end" : ""
      } absolute p-4 shadow-sm`}
    >
      {withSidebar ? (
        <div className="flex space-x-4 items-center">
          <button
            onClick={() => setSidebarOpen(true)}
            aria-controls="default-sidebar"
            type="button"
            className={`${
              withSidebar ? "block" : "hidden"
            } inline-flex w-10 items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600`}
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
          <h1 className={`text-xl font-bold ${withSidebar ? "sm:hidden" : ""}`}>
            KPI Institute
          </h1>
        </div>
      ) : (
        <h1
          className={`text-xl font-bold block ${
            withSidebar ? "sm:hidden" : ""
          }`}
        >
          KPI Institute
        </h1>
      )}

      <button
        onClick={() => signOut({ redirect: true })}
        className="flex items-center px-2 text-sm text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
      >
        <FaSignOutAlt className="text-gray-500" />
        <span className="flex-1 ml-3 whitespace-nowrap hidden md:block">
          Logout
        </span>
      </button>
    </div>
  );
}