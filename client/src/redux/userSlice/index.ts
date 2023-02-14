import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IUserType {
    username: string;
    id: string;
    privilege: string;
}

export interface UserStateType {
    user: IUserType;
    loading: Boolean;
};

const initialState: UserStateType = {
    user: {
      username: "",
      id: "",
      privilege: ""
    },
    loading: false,
};

const UserSlice = createSlice({
    name: "User",
    initialState,
    reducers: {
        setDataUser(state, action: PayloadAction<IUserType>){
            state.user.username = action.payload.username;
            state.user.id = action.payload.id;
            state.user.privilege = action.payload.privilege;
        },
        clearDataUser(state){
            state.user = {
                username: "",
                id: "",
                privilege: ""
            };
        },
        setLoadingUser(state, action: PayloadAction<Boolean>){
            state.loading = action.payload
        }
    }
});

export default UserSlice.reducer;
export const {setDataUser, clearDataUser, setLoadingUser}= UserSlice.actions;