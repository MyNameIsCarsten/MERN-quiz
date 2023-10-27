import { createSlice } from '@reduxjs/toolkit';
import { quiz } from './quiz';

export const quizSlice = createSlice({
    name: 'quiz',
    initialState: quiz,
    reducers: {},
});

export default quizSlice.reducer;

