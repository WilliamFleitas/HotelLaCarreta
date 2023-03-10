import { configureStore } from "@reduxjs/toolkit";
import roomSlice from "./redux/slices/RoomSlice";
import adminSlice from "./redux/adminSlice";
import facilitieSlice from "./redux/slices/FacilitiesSlice";
import gallerySlice from "./redux/slices/GallerySlice";
import userSlice from "./redux/userSlice/index";

const store = configureStore({
  reducer: {
    rooms: roomSlice,
    admin: adminSlice,
    facilities: facilitieSlice,
    gallery: gallerySlice,
    user: userSlice
  },
  
});

export default store;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch