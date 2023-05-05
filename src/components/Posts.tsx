import React, { useState } from "react";
import { useAppSelector } from "../redux/hooks";
import {
  getPostsIds,
  getPostsStatusSelector,
} from "../redux/slices/postsSlice";
import { IPost } from "../types/IPost";
import { Form } from "./Form";
import { Post } from "./Post";

export const Posts = () => {
  const postsIds = useAppSelector(getPostsIds);
  const status = useAppSelector(getPostsStatusSelector);

  const [postToEdit, setPostToEdit] = useState<IPost | null>(null);

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
      {postToEdit && <Form post={postToEdit} setPostToEdit={setPostToEdit} />}
      {postsIds.map((id) => (
        <Post key={id} id={id} setPostToEdit={setPostToEdit} />
      ))}
    </div>
  );
};
