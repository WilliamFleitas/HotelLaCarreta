import { createSlice, PayloadAction} from "@reduxjs/toolkit";


export interface PostDetail {
      description: string;
      image: string;
      id: string;
  };

interface PostState {
    postList: Array<PostDetail>;
    postsLength: number;
};

const initialState: PostState = {
    postList: [],
    postsLength: 0,
};

const PostSlice = createSlice({
    name: "Posts",
    initialState,
    reducers: {
        setPostList(state, action: PayloadAction<Array<PostDetail>>) {
            state.postList = action.payload;
          }, 
          setPostLength(state, action: PayloadAction<number>) {
            state.postsLength = action.payload;
          },  
    }
});

export default PostSlice.reducer;
export const {setPostList, setPostLength} = PostSlice.actions;