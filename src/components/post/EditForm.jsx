"use client";
import { updatePost } from "@/actions/post";
import React, { useActionState } from "react";

function EditForm({ post }) {
  const [state, action, isPending] = useActionState(updatePost, undefined);
  return (
    <div>
      <form action={action} className="space-y-4">
        <div>
          <input type="hidden" name="postId" defaultValue={post._id} />
          <label htmlFor="title">Title</label>
          <input
            type="text"
            name="title"
            defaultValue={state ? state?.title : post?.title}
          />
          {/* {state?.errors?.title && (
            <p className="error">{state?.errors?.title}</p>
          )} */}
        </div>
        <div>
          <label htmlFor="content">Content</label>
          <textarea
            type="text"
            name="content"
            row="6"
            defaultValue={state ? state?.content : post?.content}
          />
          {/* {state?.errors?.content && (
            <p className="error">{state?.errors?.content}</p>
          )} */}
        </div>
        <button type="submit" className="btn-primary">
          {isPending ? "Loading..." : "Edit Post"}
        </button>
      </form>
    </div>
  );
}

export default EditForm;
