import React from "react";
import Card from "@/components/post/Card";
import { allPosts } from "@/actions/post";
import getAuthUser from "@/lib/getAuthUser";
import { redirect } from "next/navigation";

async function Posts() {
  const userAuth = await getAuthUser();
  if (!userAuth) {
    return redirect("/login");
  }
  const posts = await allPosts({ author: userAuth.payload.userId });
  return (
    <div className="grid lg:grid-cols-2 grid-cols-1 gap-4">
      {posts && posts.length > 0 ? (
        posts.map((post, idx) => <Card post={post} key={idx} />)
      ) : (
        <h3>No post found</h3>
      )}
    </div>
  );
}

export default Posts;
