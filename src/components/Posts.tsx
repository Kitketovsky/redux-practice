import React, { useCallback, useState } from "react";
import { useAppSelector } from "../redux/hooks";
import {
  getPostById,
  getPostsIds,
  getPostsSelector,
  getPostsStatusSelector,
} from "../redux/slices/postsSlice";
import { IPost } from "../types/IPost";
import { Form } from "./Form";
import { EntityId } from "@reduxjs/toolkit";

interface PostProps {
  id: EntityId;
  setPostToEdit: (post: IPost) => void;
}

const Post: React.FC<PostProps> = ({ id, setPostToEdit }) => {
  const post = useAppSelector((state) => getPostById(state, id)) as IPost;

  const { title, userId, body } = post;

  return (
    <div
      key={id}
      style={{ marginBottom: "1rem" }}
      onClick={() => {
        setPostToEdit(post);
      }}
    >
      <div style={{ fontSize: "1.2rem" }}>{title}</div>
      <div>{body.length > 30 ? body.substring(0, 30) + "..." : body}</div>
    </div>
  );
};

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
