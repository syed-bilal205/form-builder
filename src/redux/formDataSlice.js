// formDataSlice.js
import { createSlice } from "@reduxjs/toolkit";

const formDataSlice = createSlice({
  name: "formData",
  initialState: {
    additionalFields: [],
  },
  reducers: {
    addAdditionalField: (state, action) => {
      // If the action payload doesn't have an 'id', generate a unique one
      const addedField = {
        id: action.payload.id || Date.now(), // Add a unique identifier if not provided
        ...action.payload,
      };
      state.additionalFields.push(addedField);
    },
    clearFormData: (state) => {
      state.additionalFields = [];
    },
    updateDataForm: (state, action) => {
      const updatedField = action.payload;
      state.additionalFields = state.additionalFields.map((field) => {
        if (field.id === updatedField.id) {
          return { ...field, ...updatedField };
        }
        return field;
      });
    },
  },
});

export const { addAdditionalField, updateDataForm, clearFormData } =
  formDataSlice.actions;

export default formDataSlice.reducer;
