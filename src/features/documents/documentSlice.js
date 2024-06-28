import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = [];

// Dummy API call
export const fetchDocuments = createAsyncThunk('documents/fetchDocuments', async () => {
  const response = await new Promise((resolve) =>
    setTimeout(
      () =>
        resolve([
          { id: 1, title: 'Document 1' },
          { id: 2, title: 'Document 2' },
          { id: 3, title: 'Document 3' },
        ]),
      500
    )
  );
  return response;
});

const documentSlice = createSlice({
  name: 'documents',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchDocuments.fulfilled, (state, action) => {
      return action.payload;
    });
  },
});

export default documentSlice.reducer;
