import { createSlice } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';

export const appSlice = createSlice({
    name: 'app',
    initialState: {
        hasSelected: false,
        selectedAnswer: null,
        currentQuestion: 0,
        userIsRight: null,
        correctAnswers: 0,
        totalAnswers: 0,
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
        }
    },
});

export default appSlice.reducer;
export const { selectAnswer, updateUserIsRight, nextQuestion, toggleSelected} = appSlice.actions
