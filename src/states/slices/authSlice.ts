import { LoginFormValues } from "@/pages/Login";
import { authSliceState } from "@/types/authtype";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";

const initialState: authSliceState = {
  user: null,
};
export const Login = createAsyncThunk(
  "auth/login",
  async (LoginData: LoginFormValues, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/user/sign-in",
        LoginData,
        { withCredentials: true }
      );
      console.log("this is a response of login", response.data);
      return response.data;
    } catch (error) {
      const err: AxiosError = error as AxiosError;
      if (
        err.response &&
        err.response.data &&
        (err.response.data as { error?: string }).error !== undefined
      ) {
        return rejectWithValue((err.response.data as { error: string }).error);
      }
      console.log("this is a error of login", error);
      return rejectWithValue("failed to login please try again later");
    }
  }
);
export const getUserByToken = createAsyncThunk(
  "auth/getuserbytoken",
  async (token: string, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `http://localhost:3000/user/me/${token}`,
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue("please login to continue");
    }
  }
);
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(Login.fulfilled, (_, action) => {
      localStorage.setItem("token", action.payload.token);
    });
    builder.addCase(getUserByToken.fulfilled, (state, action) => {
      state.user = action.payload.user;
    });
  },
});
export const {} = authSlice.actions;
export default authSlice.reducer;
