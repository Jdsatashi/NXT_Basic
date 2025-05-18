import { allPosts } from "@/actions/post";
import Card from "@/components/post/Card";
import React from "react";

async function Dashboard() {
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

export default Dashboard;
