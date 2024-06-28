import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Simulated fetch function (Replace this with actual API call if needed)
const simulatedFetchDocuments = async () => {
  return [
    { id: 1, title: 'Document 1' },
    { id: 2, title: 'Document 2' },
  ];
};

export const fetchDocuments = createAsyncThunk('documents/fetchDocuments', async () => {
  const response = await simulatedFetchDocuments();
  return response;
});

const documentSlice = createSlice({
  name: 'documents',
  initialState: [],
  reducers: {
    setDocuments: (state, action) => {
      return action.payload;
    },
    addDocument: (state, action) => {
      state.push(action.payload);
    },
    updateDocument: (state, action) => {
      const index = state.findIndex(doc => doc.id === action.payload.id);
      if (index !== -1) {
        state[index] = action.payload;
      }
    },
    deleteDocument: (state, action) => {
      return state.filter(doc => doc.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchDocuments.fulfilled, (state, action) => {
      return action.payload;
    });
  },
});

export const { setDocuments, addDocument, updateDocument, deleteDocument } = documentSlice.actions;
export default documentSlice.reducer;
