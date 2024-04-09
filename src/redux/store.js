// store.js
import { configureStore } from "@reduxjs/toolkit";
import formDataReducer from "./formDataSlice";

const store = configureStore({
  reducer: {
    formData: formDataReducer,
  },
});

export default store;
