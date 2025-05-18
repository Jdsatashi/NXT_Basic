import React from "react";
import { redirect } from "next/navigation";
import { getPost } from "@/actions/post";

async function DeletePost({ params }) {
  const { id } = await params;
  const post = await getPost(id);
  if (!post) {
    return <div>Post not found</div>;
  }
  return redirect("/posts");
}

export default DeletePost;
