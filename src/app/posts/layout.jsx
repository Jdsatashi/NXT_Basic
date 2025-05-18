"use client";

import Link from "next/link";
import React from "react";
import BackButton from "@/components/BackButton";
import { usePathname, useRouter } from "next/navigation";

function layout({ children }) {
  const pathname = usePathname();
  const showBackButton = pathname !== "/posts" && pathname !== "/posts/";
  return (
    <div>
      {showBackButton && <BackButton />}
      {!showBackButton ? <CardDefault>{children}</CardDefault> : children}
    </div>
  );
}

const CardDefault = ({ children }) => (
  <div className="px-6 py-4 w-full bg-amber-100 rounded-md border-2 border-gray-500">
    <div className="flex justify-between items-center mb-4">
      <h1 className="text-2xl font-bold">Your posts</h1>
      <Link
        href="/posts/create"
        className="px-3 py-1.5 font-medium rounded-md bg-blue-500 text-teal-50"
      >
        Add post
      </Link>
    </div>
    {children}
  </div>
);

export default layout;
