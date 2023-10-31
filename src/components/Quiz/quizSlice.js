import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const fetchQuiz = createAsyncThunk('quiz/fetch', async () => {
    const res = await fetch('http://127.0.0.1:9000/api');
    if(!res.ok){
        throw new Error('Anfrage fehlgeschlagen');
    }
    const data = await res.json();
    return data;
});

export const deleteQuestion = createAsyncThunk('quiz/delete', async (id) => {
    const res = await fetch(`http://127.0.0.1:9000/api/quiz/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    if(!res.ok){
        throw new Error('Anfrage fehlgeschlagen');
    }
    const data = await res.json();
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
            state.isError = false;
        })
        builder.addCase(fetchQuiz.fulfilled, (state, action) => {
            state.isLoading = false;
            state.data = action.payload;
        })
        builder.addCase(fetchQuiz.rejected, (state, action) => {
            state.isError = true;
        })
        builder.addCase(deleteQuestion.pending, (state) => {
            state.isLoading = true;
            state.isError = false; // Reset isError when a delete request starts
        });
        builder.addCase(deleteQuestion.fulfilled, (state, action) => {
            state.isLoading = false;
            // You can update your state as needed after a successful delete
        });
        builder.addCase(deleteQuestion.rejected, (state) => {
            state.isLoading = false;
            state.isError = true; // Set isError to true on delete error
        });
    }
});

export default quizSlice.reducer;

