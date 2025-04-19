import { configureStore } from "@reduxjs/toolkit";
import { productsReducer} from "products/store";
import { counterReducer } from "remote/store";

export const store = configureStore({
    reducer: {
      products: productsReducer,
      counter: counterReducer,
    },
  });
  
  export type RootState = ReturnType<typeof store.getState>;
  export type AppDispatch = typeof store.dispatch;