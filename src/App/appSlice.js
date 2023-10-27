import { createSlice } from '@reduxjs/toolkit';

export const appSlice = createSlice({
    name: 'app',
    initialState: {
        hasSelected: false,
        selectedAnswer: null,
        currentQuestion: 0,
        userIsRight: null,
    },
    reducers: {
        selectAnswer:(state, action) =>{
            state.selectedAnswer = action.payload;
        },
        updateUserIsRight:(state, action) =>{
            state.userIsRight = action.payload;
        },
        nextQuestion:(state, action) =>{
            state.currentQuestion = state.currentQuestion + 1;
        },
        toggleSelected:(state, action) =>{
            state.hasSelected = true;
        }
    },
});

export default appSlice.reducer;
export const { selectAnswer, updateUserIsRight, nextQuestion, toggleSelected} = appSlice.actions
