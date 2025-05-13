"use client";
import React from "react";
import BackButton from "../BackButton";
import Link from "next/link";

function Card({ post, showContent = false }) {
  const content =
    post.content.length > 50 && !showContent
      ? `${post.content.slice(0, 50)}...`
      : post.content;

  return (
    <>
      <div className="p-6 border-2 border-gray-300 rounded-md w-auto bg-linear-to-r from-cyan-800 to-indigo-900 shadow-xl">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl text-indigo-100 font-bold">{post.title}</h2>
          <p className="text-slate-200 font-light text-sm mt-2">
            {post.created_at}
          </p>
        </div>
        <p className="text-slate-100 mt-2 ms-4 text-justify">{content}</p>
        {!showContent && <Link href={`/posts/${post._id}`}>View more</Link>}
      </div>
    </>
  );
}

export default Card;
