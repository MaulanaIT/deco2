// Import Library
import { createSlice } from "@reduxjs/toolkit";
import { useRouter } from "next/router";

export const storeSlice = createSlice({
    name: 'store',
    initialState: {
        Loading: {
            active: false
        },
        PopupResponse: {
            active: false,
            response: '',
            callback: '',
            url: ''
        },
    },
    reducers: {
        HideLoading: (state) => {
            state.Loading.active = false;
        },
        HidePopupResponse: (state) => {
            if (state.PopupResponse.callback === 'Redirect') {
                window.location.href = state.PopupResponse.url;
            } else {
                state.PopupResponse.active = false;
                state.PopupResponse.response = '';
                state.PopupResponse.callback = '';
                state.PopupResponse.url = '';
            }
        },
        ShowLoading: (state) => {
            state.Loading.active = true;
        },
        ShowPopupResponse: (state, action) => {
            state.PopupResponse.active = true;
            state.PopupResponse.response = action.payload.text;

            if (action.payload.callback) {
                state.PopupResponse.callback = action.payload.callback;
                state.PopupResponse.url = action.payload.url;
            }
        }
    },
});

export const {
    HideLoading,
    HidePopupResponse,
    ShowLoading,
    ShowPopupResponse,
} = storeSlice.actions;

export default storeSlice.reducer;