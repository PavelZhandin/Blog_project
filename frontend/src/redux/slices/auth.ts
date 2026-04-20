import { createAction, createAsyncThunk, createReducer } from "@reduxjs/toolkit";
import { EReduxStatus } from "../Enums";
import axios from '../../axios';
import { IAuthResponse, ILoginData, IRegisterData } from "../../Models/Auth";
import { TRootState } from "..";
import { IUser } from "../../Models/IUser";

interface IInitialState {
    data: IAuthResponse | null;
    status: EReduxStatus;
}

const initialState: IInitialState = {
    data: null,
    status: EReduxStatus.LOADING,
};

export const fetchRegister = createAsyncThunk<IAuthResponse | null, IRegisterData>('auth/fetchRegistration', async (params: ILoginData) => {
    const { data } = await axios.post('/auth/register', params);

    return data;
});

export const fetchAuth = createAsyncThunk<IAuthResponse | null, ILoginData>('auth/fetchUserData', async (params: ILoginData) => {
    const { data } = await axios.post('/auth/login', params);

    return data;
});

export const fetchAuthMe = createAsyncThunk<Omit<IUser, 'avatarUrl'>>('auth/fetchAuthMe', async () => {
    const { data } = await axios.get('/auth/me');

    return data;
});
 
export const fetchLogout = createAction('auth/logout');

export const authReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(fetchAuth.pending, (state) => {
            state.status = EReduxStatus.LOADING;
            state.data = null;
        })
        .addCase(fetchAuth.fulfilled, (state, action) => {
            state.status = EReduxStatus.SUCCESS;
            state.data = action.payload;
        })
        .addCase(fetchAuth.rejected, (state) => {
            state.status = EReduxStatus.ERROR;
            state.data = null;
        })

        .addCase(fetchRegister.pending, (state) => {
            state.status = EReduxStatus.LOADING;
            state.data = null;
        })
        .addCase(fetchRegister.fulfilled, (state, action) => {
            state.status = EReduxStatus.SUCCESS;
            state.data = action.payload;
        })
        .addCase(fetchRegister.rejected, (state) => {
            state.status = EReduxStatus.ERROR;
            state.data = null;
        })

        .addCase(fetchAuthMe.pending, (state) => {
            state.status = EReduxStatus.LOADING;
            state.data = null;
        })
        .addCase(fetchAuthMe.fulfilled, (state, action) => {
            state.status = EReduxStatus.SUCCESS;
            state.data = { token: window.localStorage.getItem('userToken'), user: action.payload};
        })
        .addCase(fetchAuthMe.rejected, (state) => {
            state.status = EReduxStatus.ERROR;
            state.data = null;
        })

        .addCase(fetchLogout, (state) => {
            state.data = null;
            state.status = EReduxStatus.SUCCESS;
        });
});

export function selectIsAuthorized (state: TRootState): boolean {
    return !!state.auth.data;
}

export function selectAuthData (state: TRootState): IAuthResponse | null {
    return state.auth.data;
}
