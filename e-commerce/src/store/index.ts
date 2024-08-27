import { combineReducers, configureStore } from "@reduxjs/toolkit";
import cartReducer from "./slices/cartSlice";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import persistStore from "redux-persist/es/persistStore";

const persistConfig = {
  key: "root",
  storage,
};
const rootReducer = combineReducers({
  cart: cartReducer,
});
const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  // reducer: {
  //   cart: cartReducer,
  // },
  reducer: persistedReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
export const persistor = persistStore(store);
