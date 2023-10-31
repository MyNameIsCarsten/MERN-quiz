import { createSlice } from '@reduxjs/toolkit';

export const appSlice = createSlice({
    name: 'app',
    initialState: {
        hasSelected: false,
        selectedAnswer: null,
        currentQuestion: 0,
        userIsRight: null,
        correctAnswers: 0,
        totalAnswers: 0,
        isCompleted: false,
        isStarted: false,
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
        },
    },
});

export default appSlice.reducer;
export const { selectAnswer, updateUserIsRight, nextQuestion, toggleSelected, toggleCompleted, reset, start} = appSlice.actions
