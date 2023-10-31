import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const fetchQuiz = createAsyncThunk('fetch', async () => {
    const res = await fetch('http://127.0.0.1:9000/api');
    if(!res.ok){
        throw new Error('Anfrage fehlgeschlagen');
    }
    console.log(res)
    const data = await res.json();
    console.log(data)
    return data;
});

export const quizSlice = createSlice({
    name: 'quiz',
    initialState: {
        isLoading: false,
        data: [],
        isError: false
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchQuiz.pending, (state, action) => {
            state.isLoading = true;
        })
        builder.addCase(fetchQuiz.fulfilled, (state, action) => {
            state.isLoading = false;
            state.data = action.payload;
        })
        builder.addCase(fetchQuiz.rejected, (state, action) => {
            state.isError = true;
        })
    }
});

export default quizSlice.reducer;
// export const { fetchQuiz } = quizSlice.actions

