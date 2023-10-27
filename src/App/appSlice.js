import { createSlice } from '@reduxjs/toolkit';

export const appSlice = createSlice({
    name: 'app',
    initialState: {
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
        }
    },
});

export default appSlice.reducer;
export const { selectAnswer, updateUserIsRight} = appSlice.actions
