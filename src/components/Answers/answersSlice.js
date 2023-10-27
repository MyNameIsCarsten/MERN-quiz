import { createSlice } from '@reduxjs/toolkit';

export const answersSlice = createSlice({
    name: 'answers',
    initialState: 
    [
        {
            questionId: 1,
            answers: {
                1:{
                    answer: 'Hello World',
                    isCorrect: true
                },
                2:{
                    answer: 'Hello Universe',
                    isCorrect: false
                },
                3:{
                    answer: 'Hello World',
                    isCorrect: false
                },
                4:{
                    answer: 'Hello Country',
                    isCorrect: false
                },
            }
        },
    ],
    reducers: {},
});

export default answersSlice.reducer;

