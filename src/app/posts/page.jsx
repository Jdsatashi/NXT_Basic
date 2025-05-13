import React from "react";
import Card from "../components/post/Card";
import { allPosts } from "../actions/post";

async function Posts() {
  const posts = await allPosts();
  return (
    <div className="grid grid-cols-2 gap-4">
      {posts && posts.length > 0 ? (
        posts.map((post, idx) => <Card post={post} key={idx} />)
      ) : (
        <h3>No post found</h3>
      )}
    </div>
  );
}

export default Posts;
