import { createSlice } from "@reduxjs/toolkit";

const formDataSlice = createSlice({
  name: "formData",
  initialState: {
    fieldType: "",
    fieldLabel: "",
    additionalFields: [],
  },
  reducers: {
    setFormData: (state, action) => {
      return { ...state, ...action.payload };
    },
    addAdditionalField: (state, action) => {
      state.additionalFields.push(action.payload);
    },
    clearFormData: (state) => {
      return {
        ...state,
        fieldType: "",
        fieldLabel: "",
        additionalFields: [],
      };
    },
  },
});

export const { setFormData, addAdditionalField, clearFormData } =
  formDataSlice.actions;

export default formDataSlice.reducer;
