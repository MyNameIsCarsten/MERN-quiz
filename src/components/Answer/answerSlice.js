import { createSlice } from '@reduxjs/toolkit';

export const answerSlice = createSlice({
    name: 'answer',
    initialState: {
        hasSelected:false
    },
    reducers: {
        toggleSelected:(state, action) =>{
            state.hasSelected = true;
        }
    },
});

export default answerSlice.reducer;
export const { toggleSelected} = answerSlice.actions
