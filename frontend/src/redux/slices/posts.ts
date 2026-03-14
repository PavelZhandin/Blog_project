import { createAsyncThunk, createReducer } from "@reduxjs/toolkit";
import axios from '../../axios';
import { EReduxStatus } from "../Enums";
import { TRootState } from "..";
import { IPost } from "../../Models/IPost";


export const fetchPosts = createAsyncThunk<IPost[]>('posts/fetchPosts', async () => {
    const { data } = await axios.get('/posts');

    return data;
});

export const fetchTags = createAsyncThunk<string[]>('posts/fetchTags', async () => {
    const { data } = await axios.get('/tags');

    return data;
});


interface IInitialState {
    postList: {
        items: IPost[];
        status: EReduxStatus;
    }
    tagList: {
        items: string[];
        status: EReduxStatus;
    }
}

const initialState: IInitialState = {
    postList: {
        items: [],
        status: EReduxStatus.LOADING,
    },
    tagList: {
        items: [],
        status: EReduxStatus.LOADING,
    }
};

export const postsReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(fetchPosts.pending, (state) => {
            state.postList.status    = EReduxStatus.LOADING;
        })
        .addCase(fetchPosts.fulfilled, (state, { payload }) => {
            state.postList.items = payload;
            state.postList.status = EReduxStatus.SUCCESS;
        })
        .addCase(fetchPosts.rejected, (state)=> {
            state.postList.items = [];
            state.postList.status = EReduxStatus.ERROR;
        })
        .addCase(fetchTags.pending, (state) => {
            state.tagList.status    = EReduxStatus.LOADING;
        })
        .addCase(fetchTags.fulfilled, (state, { payload }) => {
            state.tagList.items = payload;
            state.tagList.status = EReduxStatus.SUCCESS;
        })
        .addCase(fetchTags.rejected, (state)=> {
            state.tagList.items = [];
            state.tagList.status = EReduxStatus.ERROR;
        });


});


export function selectPosts ({ posts }: TRootState): IPost[] | undefined {
    return posts.postList.items;
};
export function selectTagsList ({ posts }: TRootState): string[] | undefined {
    return posts.tagList.items;
};

export function selectIsPostsLoading ({ posts }: TRootState) {
    return posts.postList.status === EReduxStatus.LOADING;
};

export function selectIsTagListLoading ({ posts }: TRootState) {
    return posts.tagList.status === EReduxStatus.LOADING;
};
