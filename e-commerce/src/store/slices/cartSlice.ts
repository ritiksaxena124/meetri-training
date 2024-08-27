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
      state.cartItems.push(action.payload);
    },
    removeFromCart: (state, action: PayloadAction<any>) => {},
    emptyCart: (state) => {
      state.cartItems = [];
    },
  },
});

export const { addToCart, removeFromCart, emptyCart } = cartSlice.actions;
export default cartSlice.reducer;
