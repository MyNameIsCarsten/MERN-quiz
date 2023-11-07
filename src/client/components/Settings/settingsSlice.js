import { createSlice } from '@reduxjs/toolkit';


export const settingsSlice = createSlice({
    name: 'settings',
    initialState: {
        randomize: false,
    },
    reducers: {
        toggleRandomize:(state, action) =>{
            state.randomize = !state.randomize;
        }, 
    },
});

export default settingsSlice.reducer;
export const { toggleRandomize } = settingsSlice.actions
