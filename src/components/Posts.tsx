import React, { useState } from "react";
import { useAppSelector } from "../redux/hooks";
import {
  getPostsSelector,
  getPostsStatusSelector,
} from "../redux/slices/postsSlice";
import { IPost } from "../types/IPost";
import { Form } from "./Form";

export const Posts = () => {
  const posts = useAppSelector(getPostsSelector);
  const status = useAppSelector(getPostsStatusSelector);

  const [currentPost, setCurrentPost] = useState<IPost | null>(null);

  if (status === "pending") {
    return (
      <div>
        <span>Loading...</span>
      </div>
    );
  }

  if (status === "rejected") {
    return (
      <div>
        <span>Error getting posts...</span>
      </div>
    );
  }

  return (
    <div>
      {currentPost && <Form post={currentPost} />}
      {posts.map(({ id, title, body, userId }) => (
        <div
          key={id}
          style={{ marginBottom: "1rem" }}
          onClick={() => {
            setCurrentPost({ id, title, body, userId });
          }}
        >
          <div style={{ fontSize: "1.2rem" }}>{title}</div>
          <div>{body.length > 30 ? body.substring(0, 30) + "..." : body}</div>
        </div>
      ))}
    </div>
  );
};
