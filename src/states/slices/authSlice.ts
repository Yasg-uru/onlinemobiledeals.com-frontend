import { LoginFormValues } from "@/pages/Login";
import { RegisterFormValues } from "@/pages/register";
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
        "https://online-mobile-deals-backend.onrender.com/user/sign-in",
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
export const logout = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `https://online-mobile-deals-backend.onrender.com/user/logout`,
        {},
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue("failed to logout please try again later");
    }
  }
);
export const getUserByToken = createAsyncThunk(
  "auth/getuserbytoken",
  async (token: string, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `https://online-mobile-deals-backend.onrender.com/user/me/${token}`,
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue("please login to continue");
    }
  }
);
export const Register = createAsyncThunk(
  "auth/getuserbytoken",
  async (data: RegisterFormValues, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `https://online-mobile-deals-backend.onrender.com/user/register`,
        data,
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue("please login to continue");
    }
  }
);
export const verifyOtp = createAsyncThunk(
  "auth/verifyotp",
  async (
    { email, code }: { email: string; code: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.post(
        `https://online-mobile-deals-backend.onrender.com/user/verify-code`,
        {
          email,
          code,
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue("please enter correct otp");
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
