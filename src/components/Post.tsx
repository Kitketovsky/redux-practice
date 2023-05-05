import { EntityId } from "@reduxjs/toolkit";
import { IPost } from "../types/IPost";
import React from "react";
import { useAppSelector } from "../redux/hooks";
import { getPostById } from "../redux/slices/postsSlice";

interface Props {
  id: EntityId;
  setPostToEdit: (post: IPost) => void;
}

const PostComponent: React.FC<Props> = ({ id, setPostToEdit }) => {
  const post = useAppSelector((state) => getPostById(state, id)) as IPost;

  const { title, body } = post;

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

export const Post = React.memo(PostComponent);
