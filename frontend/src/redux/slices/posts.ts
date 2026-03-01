import { createAsyncThunk, createReducer } from "@reduxjs/toolkit";
import axios from '../../axios';
import { EReduxStatus } from "../Enums";

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
    const { data } = await axios.get('/posts');

    return data;
});

const initialState = {
    posts: {
        items: [],
        status: 'loading'
    },
    tags: {
        items: [],
        status: 'loading'
    }
};

export const postsReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(fetchPosts.pending, (state) => {
            state.posts.status = EReduxStatus.LOADING;
        })
        .addCase(fetchPosts.fulfilled, (state, { payload }) => {
            state.posts = payload;
        });
});
