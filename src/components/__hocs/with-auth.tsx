/* eslint-disable react/display-name */
import Link from "next/link";
import React from "react";
import { FaUserLock } from "react-icons/fa";

export const withAuth = (Component: React.FC, role: string[]): any => {
  return ({ user, data }: { user: any; data: any }) => {
    if (!user || !role.includes(user.role)) {
      //create simple 403 page with tailwind

      return (
        <div className="flex flex-1 flex-col w-full justify-center items-center min-h-full  ">
          <FaUserLock className="text-slate-700 text-4xl" />
          <span className="text-slate-700 font-bold text-5xl tracking-widest">
            403
          </span>
          <Link
            href="/"
            className="mt-10 text-slate-700 underline tracking-wider"
          >
            {" "}
            Home{" "}
          </Link>
        </div>
      );
    }
    return <Component {...data} />;
  };
};
