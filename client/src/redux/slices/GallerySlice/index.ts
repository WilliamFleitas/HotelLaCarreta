import { createSlice, PayloadAction} from "@reduxjs/toolkit";


export interface PostDetail {
      description: string;
      image: string;
      id: string;
  };

interface PostState {
    postList: Array<PostDetail>;
    postsLength: number;
    loading: boolean;
};

const initialState: PostState = {
    postList: [],
    postsLength: 0,
    loading: false,
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
          clearPost(state){
            state.postList = []
          },
          setLoading(state, action: PayloadAction<boolean>){
            state.loading = action.payload;
          }
    }
});

export default PostSlice.reducer;
export const {setPostList, setPostLength, clearPost, setLoading} = PostSlice.actions;