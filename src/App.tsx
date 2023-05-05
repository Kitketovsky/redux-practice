import { useAppDispatch, useAppSelector } from "./redux/hooks";
import React, { useEffect } from "react";
import { fetchPosts, getPostsStatusSelector } from "./redux/slices/postsSlice";
import { Posts } from "./components/Posts";
import { Form } from "./components/Form";

function App() {
  const dispatch = useAppDispatch();
  const status = useAppSelector(getPostsStatusSelector);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchPosts());
    }
  }, [status, dispatch]);

  return (
    <div style={{ display: "flex" }}>
      <Posts />
      <Form />
    </div>
  );
}

export default App;
