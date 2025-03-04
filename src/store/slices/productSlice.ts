import { createSlice } from "@reduxjs/toolkit";
import { Product } from "../../API";
import { addProduct, changeToSoldProductStatus, fetchAllProducts, fetchFavoriteProducts, fetchMyProducts, fetchMyProductsPurchased, removeProduct } from "../thunks/productsThunk";
import { updateTotalLikes } from "../thunks/likeStatusThunk";

const productsSlice = createSlice({
  name: "products",
  initialState: {
    myProducts: {
      data: null as Product[] | null,
      error: "",
    },
    allProducts: {
      data: null as Product[] | null,
      error: "",
    },
    myFavoriteProducts: {
      data: null as Product[] | null,
      error: "",
    },
    myProductsPurchased: {
      data: null as Product[] | null,
      error: "",
    },
    error: "",
  },
  extraReducers(builder) {
    builder.addCase(addProduct.fulfilled, (state, action) => {
      if(action.payload === null) return;
      if (action.payload) {
        state.allProducts.data?.push(action.payload as Product)
        console.log("addProduct success in Redux");
      }
    });
    builder.addCase(addProduct.rejected, (state) => {
      state.error = "fail to addProduct";
      console.log("fail to addProduct");
    });
    builder.addCase(fetchMyProducts.fulfilled , (state,action) => {
      state.myProducts.data = action.payload as Product[]
    })
    builder.addCase(fetchMyProducts.rejected, (state) => {
      state.error = "fail to fetchMyProducts";
      console.log("fail to fetchMyProducts");
    });

    builder.addCase(fetchAllProducts.fulfilled , (state,action) => {
      state.allProducts.data = action.payload as Product[]
    })
    builder.addCase(fetchAllProducts.rejected, (state) => {
      state.error = "fail to fetchAllProducts";
      console.log("fail to fetchAllProduct");
    });

    builder.addCase(fetchFavoriteProducts.fulfilled , (state,action) => {
      state.myFavoriteProducts.data = action.payload as Product[]
    })
    builder.addCase(fetchFavoriteProducts.rejected, (state) => {
      state.error = "fail to fetchFavoriteProducts";
      console.log("fail to fetchFavoriteProducts");
    });
    builder.addCase(fetchMyProductsPurchased.fulfilled , (state,action) => {
      state.myProductsPurchased.data = action.payload as Product[]
    })
    builder.addCase(fetchMyProductsPurchased.rejected, (state) => {
      state.error = "fail to fetchMyProductsPurchased";
      console.log("fail to fetchMyProductsPurchased");
    });
    builder.addCase(changeToSoldProductStatus.fulfilled, (state,action) => {
      const index = state.allProducts.data.findIndex((product) => product.id === action.payload.id)
      state.allProducts.data[index].status = action.payload.status
      state.allProducts.data[index].buyerID = action.payload.buyerID
    })
    builder.addCase(changeToSoldProductStatus.rejected, (state,action) => {
      state.error = "fail to changeProductStatus"
      console.log(action.error);
    })
    builder.addCase(removeProduct.fulfilled, (state,action) => {
      state.myProducts.data = state.myProducts.data.filter((product) => {
        return product.id !== action.payload.id
      })
    })
    builder.addCase(updateTotalLikes.fulfilled, (state,action) => {
      const index = state.allProducts.data.findIndex((product) => product.id === action.payload.id)
      state.allProducts.data[index].likes = action.payload.likes
    })
  },
  reducers: {},
});

export const productsReducer = productsSlice.reducer;
