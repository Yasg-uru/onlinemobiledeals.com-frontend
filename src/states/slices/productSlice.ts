import { AddProductFormValues } from "@/pages/createproduct";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {};
export const addproducts = createAsyncThunk(
  "product/addproducts",
  async (AddProductFormValues: AddProductFormValues, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/product/add-product",
        AddProductFormValues,
        {
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue("failed to add product please try again later");
    }
  }
);
const productSlice = createSlice({
  name: "product",
  initialState: {},
  reducers: {},
  extraReducers(builder) {},
});
export const {} = productSlice.actions;
export default productSlice.reducer;
