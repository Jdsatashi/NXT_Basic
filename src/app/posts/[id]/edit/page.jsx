import { getPost } from "@/actions/post";
import EditForm from "@/components/post/EditForm";
import React from "react";

async function PostEdit({ params }) {
  try {
    const { id } = await params;
    const post = await getPost(id);
    if (!post) {
      return <div>Post not found</div>;
    }
    return (
      <div>
        <div className="container w-1/2">
          <h1 className="title">Update Post</h1>
          <EditForm post={post} />
        </div>
      </div>
    );
  } catch (error) {
    console.log(error);
    return <div>Post not found</div>;
  }
}

export default PostEdit;
