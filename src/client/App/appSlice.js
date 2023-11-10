import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const login = createAsyncThunk('app/login', async ({ username, password }) => {
    try {
        const res = await fetch(process.env.NODE_ENV === 'production' ? 'https://quizify-mern-app.netlify.app/api/login' : 'http://localhost:9000/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: username,
                password: password
            }),
            credentials:'include',
        })
        if (!res.ok) {
            const errorData = await res.json();
            const errorMessage = errorData.message || 'An error occurred during the request';
            throw new Error(`Request failed with status: ${res.status}, Message: ${errorMessage}`);
        }
        const data = await res.json();

        return data;
    } catch (error) {
        throw new Error(`An unexpected error occurred: ${error.message}`);
    }
});


export const logout = createAsyncThunk('app/logout', async () => {
    const res = await fetch('http://localhost:9000/api/logout', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    if(!res.ok){
        throw new Error('Logout fehlgeschlagen');
    }
    const data = await res.json();
    return data;
});

export const appSlice = createSlice({
    name: 'app',
    initialState: {
        user:null,
        userId: null,
        isLoggedIn: false,
        isLoading: false,
        isError: false,
        hasSelected: false,
        selectedAnswer: null,
        currentQuestion: 0,
        userIsRight: null,
        correctAnswers: 0,
        totalAnswers: 0,
        isCompleted: false,
        isStarted: false,
        errorMessage: ''
    },
    reducers: {
        selectAnswer:(state, action) =>{
            state.selectedAnswer = action.payload;
            state.totalAnswers ++;
        },
        updateUserIsRight:(state, action) =>{
            state.userIsRight = action.payload;
            if(state.userIsRight){
                state.correctAnswers ++;
            }
        },
        nextQuestion:(state, action) =>{
            state.currentQuestion = state.currentQuestion + 1;
            state.hasSelected = false;
            state.userIsRight = null;
            state.selectedAnswer = null;
        },
        toggleSelected:(state, action) =>{
            state.hasSelected = true;
        }, 
        toggleCompleted:(state, action) =>{
            state.isCompleted = true;
            state.isStarted = false;
        },
        reset:(state, action) =>{
            state.hasSelected = false;
            state.selectedAnswer = null;
            state.currentQuestion = 0;
            state.userIsRight = null;
            state.correctAnswers = 0;
            state.totalAnswers = 0;
            state.isCompleted = false;
        },
        start:(state, action) =>{
            state.isStarted = true;
            state.isCompleted = false;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(login.pending, (state, action) => {
            state.isLoading = true;
            state.isError = false;
            state.hasSelected = false;
            state.selectedAnswer = null;
            state.currentQuestion = 0;
            state.userIsRight = null;
            state.correctAnswers = 0;
            state.totalAnswers = 0;
            state.isCompleted = false;
            state.isStarted = false;
            state.errorMessage = '';
        })
        builder.addCase(login.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isLoggedIn = true;
            state.errorMessage = '';
            state.user = action.meta.arg.username;
            // state.userId = action.payload.user._id;
            state.userId = action.payload._id;
        })
        builder.addCase(login.rejected, (state, action) => {
            state.isError = true;
            state.isLoading = false;
            state.errorMessage = action.error.message;
        })
        builder.addCase(logout.pending, (state, action) => {
            state.isLoading = true;
            state.isError = false;
        })
        builder.addCase(logout.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isLoggedIn = false;
            state.user = null;
            state.userId = null;
        })
        builder.addCase(logout.rejected, (state, action) => {
            state.isError = true;
            state.isLoading = false;
            state.errorMessage = action.error.message;
        })
    }
});

export default appSlice.reducer;
export const { loginUser, selectAnswer, updateUserIsRight, nextQuestion, toggleSelected, toggleCompleted, reset, start} = appSlice.actions
