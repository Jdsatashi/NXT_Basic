import React from "react";
import CreateForm from "@/components/Post/CreateForm";
function PostCreate() {
  return (
    <div>
      <div className="container w-1/2">
        <h1 className="title">Create Post</h1>
        <CreateForm />
      </div>
    </div>
  );
}

export default PostCreate;
