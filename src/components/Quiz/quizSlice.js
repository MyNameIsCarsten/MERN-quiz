import { createSlice } from '@reduxjs/toolkit';

export const quizSlice = createSlice({
    name: 'quiz',
    initialState: 
    [
        {
            question: 'Question',
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
                    answer: 'Hello City',
                    isCorrect: false
                },
                4:{
                    answer: 'Hello Country',
                    isCorrect: false
                },
            }
        },{
            question: 'Question 2',
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
                    answer: 'Hello City',
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

export default quizSlice.reducer;

