import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { UserModel } from "../../models/user";

interface AuthState {
  user: UserModel | null;
  accessToken: string | null;
  isAuth: boolean | null;
}
const initialState: AuthState = {
  user: null,
  accessToken: null,
  isAuth: null,
};
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.accessToken = action.payload;
      state.isAuth = true;
    },
    logOut: (state) => {
      state.accessToken = null;
      state.accessToken = null;
      state.isAuth = false;
    },
    setUser: (state, action) => {
      state.user = action.payload;
      state.isAuth = true;
    },
  },
});
export const { setToken, logOut, setUser } = authSlice.actions;
export default authSlice.reducer;
export const selectCurrentUser = (state: RootState) => state.auth.user;
