import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type UserInfo = {
    name: string;
    email: string;
};

type UserState = {
    profile: UserInfo;
    loading: boolean;
};

const initialUserState: UserState = {
    profile: { name: '', email: '' },
    loading: false,
};

const UserSlice = createSlice({
    name: 'user',
    initialState: initialUserState,
    reducers: {
        setUserProfile(state, action: PayloadAction<UserInfo>) {
            state.profile = action.payload;
        },
        clearUserProfile(state) {
            state.profile = { name: '', email: '' };
        },
        setUserInfoLoading(state, action: PayloadAction<boolean>) {
            state.loading = action.payload;
        },
    },
});

export const { setUserProfile, clearUserProfile, setUserInfoLoading } =
    UserSlice.actions;

export default UserSlice.reducer;
