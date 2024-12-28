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
export const deleteproduct = createAsyncThunk(
  "prouct/deleteproduct",
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await axios.delete(
        `http://localhost:3000/product/delete-product/${id}`,
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue("failed to delete product please try again later");
    }
  }
);
export const updateProduct = createAsyncThunk(
  "product/update",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.put(``);
      return response.data;
    } catch (error) {
      return rejectWithValue("failed to update product please try again later");
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
