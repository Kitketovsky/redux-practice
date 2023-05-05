import {
  createAsyncThunk,
  createSlice,
  nanoid,
  createEntityAdapter,
} from "@reduxjs/toolkit";
import { RootState } from "../store";
import { IPost } from "../../types/IPost";
import { IStatus } from "../../types/IStatus";

export const fetchPosts = createAsyncThunk<IPost[]>(
  "posts/getPosts",
  async () => {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts");
    const posts = await response.json();
    return posts as IPost[];
  }
);

export const sendPost = createAsyncThunk<IPost, Omit<IPost, "id">>(
  "posts/sendPost",
  async (newPost, thunkAPI) => {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      body: JSON.stringify(newPost),
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
    });
    const post = (await response.json()) as IPost;
    // If an action needs to contain a unique ID or some other random value, always generate that first
    // and put it in the action object. Reducers should never calculate random values, because that makes
    // the results unpredictable.
    post.id = Number(nanoid());
    return post;
  }
);

export const editPost = createAsyncThunk<IPost, IPost>(
  "posts/editPost",
  async (post) => {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/posts/${post.id}`,
      {
        method: "PUT",
        body: JSON.stringify(post),
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
        },
      }
    );

    return (await response.json()) as IPost;
  }
);

interface IPostsInitialState {
  status: IStatus;
  error: any;
}

// "createEntityAdapter" is used for creating normalized state of { ids: [], entities: [] } where you can get an item by referencing it with its ID
// "Normalization" means no duplication of data, and keeping items stored in a lookup table by item ID
const postsAdapter = createEntityAdapter<IPost>({
  sortComparer: (a, b) => a.userId - b.userId,
});

// "getInitialState" method merges { ids: [], entities: [] } with the object you passed as an argument
const initialState = postsAdapter.getInitialState<IPostsInitialState>({
  status: "idle",
  error: null,
});

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  // To handle other actions (thinks) that weren't defined as part of this slice,
  // we need to use 'extraReducers'
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.status = "pending";
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.error.message;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        postsAdapter.upsertMany(state, action.payload);
        state.status = "fulfilled";
        state.error = null;
      });

    builder.addCase(sendPost.fulfilled, postsAdapter.addOne);

    builder.addCase(editPost.fulfilled, (state, action) => {
      const { id, title, body } = action.payload;
      const existingPost = state.entities[id];

      if (existingPost) {
        existingPost.title = title;
        existingPost.body = body;
      }
    });
  },
});

export const { selectById: getPostById, selectIds: getPostsIds } =
  postsAdapter.getSelectors<RootState>((state) => state.posts);

export const getPostsStatusSelector = (state: RootState) => state.posts.status;

export default postsSlice.reducer;
