"use server";

import { redirect } from "next/navigation";
import { getColct } from "@/lib/db";
import getAuthUser from "@/lib/getAuthUser";
import { BlogSchema } from "@/lib/rule";
import { ObjectId } from "mongodb";

export async function createPost(state, formData) {
  // Validate user
  const user = await getAuthUser();
  if (!user) {
    return redirect("/login");
  }

  // Get form fields data
  const title = formData.get("title");
  const content = formData.get("content");

  // Validate form fields
  const validatedFields = BlogSchema.safeParse({
    title,
    content,
  });

  // If form fields are not valid, return errors early
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      title,
      content,
    };
  }

  // Save the new post to the database
  try {
    console.log();
    const postClt = await getColct("posts");
    await postClt.insertOne({
      title,
      content,
      author: user.payload.userId,
    });
  } catch (e) {
    return {
      errors: {
        title: "Failed to create post",
        content: "Failed to create post",
      },
      title,
      content,
    };
  }
  return redirect("/dashboard");
}

export async function allPosts(query = {}) {
  try {
    const postClt = await getColct("posts");
    const posts = await postClt.find(query).toArray();
    for (const post of posts) {
      const created_at = post._id.getTimestamp().toLocaleString();
      const id = post._id.toString();
      post.created_at = created_at;
      post._id = id;
    }
    return posts;
  } catch (e) {
    console.log(e);
    return null;
  }
}

export async function getPost(postId) {
  const postClt = await getColct("posts");
  try {
    const post = await postClt.findOne({
      _id: ObjectId.createFromHexString(postId),
    });
    const created_at = post._id.getTimestamp().toLocaleString();
    const id = post._id.toString();
    return { ...post, _id: id, created_at };
  } catch (e) {
    console.log(e);
    return null;
  }
}

export async function updatePost(state, formData) {
  // Validate user
  const user = await getAuthUser();
  if (!user) {
    return redirect("/login");
  }

  // Get form fields data
  const postId = formData.get("postId");
  const title = formData.get("title");
  const content = formData.get("content");
  const objId = ObjectId.createFromHexString(postId);
  // Get post collection
  const postClt = await getColct("posts");

  // Get update post
  const post = await postClt.findOne({
    _id: objId,
  });

  // Validate author
  if (post.author !== user.payload.userId) {
    return {
      errors: {
        title: "Not allowed to update this post",
      },
      state,
    };
  }

  // Update post
  try {
    const updatePost = await postClt.updateOne(
      { _id: objId },
      { $set: { title, content } }
    );
    console.log(updatePost);
  } catch (e) {
    return {
      errors: {
        title: "Failed to update post",
      },
    };
  }
  return redirect("/dashboard");
}

export async function deletePost(postId) {
  const postClt = await getColct("posts");
  const objId = ObjectId.createFromHexString(postId);
  const post = await postClt.findOne({
    _id: objId,
  });
  if (!post) {
    return {
      errors: {
        title: "Post not found",
      },
    };
  }
  await postClt.deleteOne({ _id: objId });
  return redirect("/posts");
}
