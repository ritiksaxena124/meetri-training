import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";
import { ProductType } from "../../pages/Home";

interface CartType {
  cartItems: ProductType[];
}

const initialState: CartType = {
  cartItems: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<ProductType>) => {
      const isPresent = state.cartItems.find(
        (product) => product.id === action.payload.id
      );
      if (!isPresent) {
        const product = { ...action.payload, productCount: 1 };
        state.cartItems.push(product);
      }
    },
    removeFromCart: (state, action: PayloadAction<ProductType>) => {
      const updatedProductsList = state.cartItems.filter(
        (product) => product.id !== action.payload.id
      );
      if (updatedProductsList) {
        state.cartItems = updatedProductsList;
      }
    },
    emptyCart: (state) => {
      state.cartItems = [];
    },
    incrementCount: (state, action: PayloadAction<ProductType>) => {
      const product = state.cartItems.find(
        (product) => product.id === action.payload.id
      );
      if (product) {
        product.productCount += 1;
      }
    },
    decrementCount: (state, action: PayloadAction<ProductType>) => {
      const product = state.cartItems.find(
        (product) => product.id === action.payload.id
      );
      if (product && product.productCount > 1) {
        product.productCount -= 1;
      } else if (product && product.productCount <= 1) {
        state.cartItems = state.cartItems.filter(
          (product) => product.id !== action.payload.id
        );
      }
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  emptyCart,
  incrementCount,
  decrementCount,
} = cartSlice.actions;
export default cartSlice.reducer;
