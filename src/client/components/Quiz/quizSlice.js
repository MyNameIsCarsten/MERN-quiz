import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

function shuffleArray(array) {
    let currentIndex = array.length,  randomIndex;
  
    // While there remain elements to shuffle.
    while (currentIndex > 0) {
  
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
  }

export const fetchQuiz = createAsyncThunk('quiz/fetch', async (arg) => {
    const { id, shuffle = false} = arg;
    const res = await fetch('http://127.0.0.1:9000/api');
    if(!res.ok){
        throw new Error('Anfrage fehlgeschlagen');
    }
    const data = await res.json();
    // Filter out only questions-answer set that the user is part of
    const dataFiltered = data.filter(d => d.users && d.users.some(userId => userId.toString() === `${id}`));

    const dataShuffled = shuffleArray(dataFiltered)
    return shuffle ? dataShuffled : dataFiltered;
});

export const deleteQuestion = createAsyncThunk('quiz/delete', async (id) => {
    const res = await fetch(`http://localhost:9000/api/quiz/${id}`, {
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

export const addQuestion = createAsyncThunk('quiz/add', async (arg) => {
    const res = await fetch(`http://127.0.0.1:9000/api/quiz/add`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body:JSON.stringify(arg)
    });
    if(!res.ok){
        throw new Error('Anfrage fehlgeschlagen');
    }
    const data = await res.json();
    return data;
});

export const updateQuestion = createAsyncThunk('quiz/update', async ({id, arg}) => {
    const res = await fetch(`http://127.0.0.1:9000/api/quiz/edit/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body:JSON.stringify(arg)
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
        isError: false,
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
        builder.addCase(addQuestion.pending, (state) => {
            state.isLoading = true;
            state.isError = false; // Reset isError when a delete request starts
        });
        builder.addCase(addQuestion.fulfilled, (state, action) => {
            state.isLoading = false;
            state.data.push(action.payload);
            // You can update your state as needed after a successful delete
        });
        builder.addCase(addQuestion.rejected, (state) => {
            state.isLoading = false;
            state.isError = true; // Set isError to true on delete error
        });
        builder.addCase(updateQuestion.pending, (state) => {
            state.isLoading = true;
            state.isError = false; // Reset isError when a delete request starts
        });
        builder.addCase(updateQuestion.fulfilled, (state, action) => {
            state.isLoading = false;
            // state.data = action.payload;
            // You can update your state as needed after a successful delete
        });
        builder.addCase(updateQuestion.rejected, (state) => {
            state.isLoading = false;
            state.isError = true; // Set isError to true on delete error
        });
    }
});

export default quizSlice.reducer;

