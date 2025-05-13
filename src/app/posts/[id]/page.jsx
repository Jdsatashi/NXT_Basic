import { getPost } from "@/app/actions/post";
import BackButton from "@/app/components/BackButton";
import Card from "@/app/components/post/Card";
import React from "react";

async function ShowItem({ params }) {
  const { id } = await params;
  const post = await getPost(id);
  return post ? (
    <>
      <BackButton />
      <Card post={post} showContent={true} />
    </>
  ) : (
    <div>Post not found</div>
  );
}

export default ShowItem;
