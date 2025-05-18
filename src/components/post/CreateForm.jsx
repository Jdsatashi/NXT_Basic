"use client";
import { createPost } from "@/actions/post";
import React, { useActionState } from "react";

function CreateForm() {
  const [state, action, isPending] = useActionState(createPost, undefined);
  return (
    <div>
      <form action={action} className="space-y-4">
        <div>
          <label htmlFor="title">Title</label>
          <input type="text" name="title" defaultValue={state?.title} />
          {state?.errors?.title && (
            <p className="error">{state?.errors?.title}</p>
          )}
        </div>
        <div>
          <label htmlFor="content">Content</label>
          <textarea
            type="text"
            name="content"
            row="6"
            defaultValue={state?.content}
          />
          {state?.errors?.content && (
            <p className="error">{state?.errors?.content}</p>
          )}
        </div>
        <button type="submit" className="btn-primary">
          {isPending ? "Loading..." : "Add Post"}
        </button>
      </form>
    </div>
  );
}

export default CreateForm;
