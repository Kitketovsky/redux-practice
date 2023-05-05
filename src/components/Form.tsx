import React, { useState } from "react";
import { useAppDispatch } from "../redux/hooks";
import { sendPost } from "../redux/slices/postsSlice";

export const Form = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [userId, setUserId] = useState(1);

  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useAppDispatch();

  const canSend = !isLoading && [title, body, userId].every(Boolean);

  async function onSubmitPostHandler(event: React.FormEvent<HTMLFormElement>) {
    // createAsyncThunk handles errors internally, and we can not see any messages on component level
    // 'unwrap()' method lets us handle success and failure statuses in the component using normal try / catch logic
    try {
      setIsLoading(true);
      event.preventDefault();
      await dispatch(sendPost({ title, body, userId })).unwrap();
    } finally {
      setIsLoading(false);
      setTitle("");
      setBody("");
      setUserId(1);
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

      <button type="submit" disabled={!canSend}>
        Send Post
      </button>
    </form>
  );
};
