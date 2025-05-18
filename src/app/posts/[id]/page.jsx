import { getPost } from "@/actions/post";
import BackButton from "@/components/BackButton";
import Card from "@/components/post/Card";
import getAuthUser from "@/lib/getAuthUser";
import React from "react";

async function ShowItem({ params }) {
  const userAuth = await getAuthUser();
  const { id } = await params;
  const post = await getPost(id);
  return post ? (
    <>
      <Card
        post={post}
        showContent={true}
        showEdit={post.author === userAuth.payload.userId}
      />
    </>
  ) : (
    <div>Post not found</div>
  );
}

export default ShowItem;
