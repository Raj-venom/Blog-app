import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    oldPosts: []
}

const postSlice = createSlice({
    name: "post",
    initialState,

    reducers: {
        getPost: (state, action) => {
            state.oldPosts = action.payload.oldPosts
        },

        clearPost: (state, action) => {
            state.oldPosts = []
        }

    }
})

export const { getPost, clearPost } = postSlice.actions;

export default postSlice.reducer;