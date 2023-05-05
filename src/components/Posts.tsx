import React from "react";
import { useAppSelector } from "../redux/hooks";
import {
  getPostsSelector,
  getPostsStatusSelector,
} from "../redux/slices/postsSlice";

export const Posts = () => {
  const posts = useAppSelector(getPostsSelector);
  const status = useAppSelector(getPostsStatusSelector);

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
      {posts.map(({ id, title, body }) => (
        <div key={id} style={{ marginBottom: "1rem" }}>
          <div style={{ fontSize: "1.2rem" }}>{title}</div>
          <div>{body.length > 30 ? body.substring(0, 30) + "..." : body}</div>
        </div>
      ))}
    </div>
  );
};
