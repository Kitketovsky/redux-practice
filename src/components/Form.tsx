import React, { useEffect, useState } from "react";
import { useAppDispatch } from "../redux/hooks";
import { editPost, sendPost } from "../redux/slices/postsSlice";
import { IPost } from "../types/IPost";

interface Props {
  post?: IPost;
  setPostToEdit?: (post: IPost | null) => void;
}

export const Form: React.FC<Props> = ({ post, setPostToEdit }) => {
  const [title, setTitle] = useState(post?.title ?? "");
  const [body, setBody] = useState(post?.body ?? "");
  const [userId, setUserId] = useState(post?.userId ?? 1);

  useEffect(() => {
    if (post) {
      const { title, body, userId } = post;

      setTitle(title);
      setBody(body);
      setUserId(userId);
    }
  }, [post]);

  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useAppDispatch();

  const canSend = !isLoading && [title, body, userId].every(Boolean);

  async function onSubmitPostHandler(event: React.FormEvent<HTMLFormElement>) {
    // createAsyncThunk handles errors internally, and we can not see any messages on component level
    // 'unwrap()' method lets us handle success and failure statuses in the component using normal try / catch logic
    try {
      setIsLoading(true);
      event.preventDefault();
      if (post && setPostToEdit) {
        await dispatch(editPost({ title, body, userId, id: post.id })).unwrap();
        setPostToEdit(null);
      } else {
        await dispatch(sendPost({ title, body, userId })).unwrap();
        setTitle("");
        setBody("");
        setUserId(1);
      }
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <form
      onSubmit={onSubmitPostHandler}
      style={{ display: "flex", flexDirection: "column", rowGap: "0.5rem" }}
    >
      <label htmlFor="title">
        Title
        <input
          id="title"
          type="text"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          disabled={isLoading}
        />
      </label>

      <label htmlFor="body">
        Body
        <input
          id="body"
          type="text"
          value={body}
          onChange={(event) => setBody(event.target.value)}
          disabled={isLoading}
        />
      </label>

      {!post && (
        <label htmlFor="userId">
          UserId
          <input
            id="userId"
            type="number"
            value={userId}
            onChange={(event) => setUserId(Number(event.target.value))}
            disabled={isLoading}
          />
        </label>
      )}

      <button type="submit" disabled={!canSend}>
        {post ? "Edit" : "Send"} Post
      </button>
    </form>
  );
};
