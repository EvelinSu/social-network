import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type TThemes = "light" | "dark";

type TAppMessage = {
    id: string;
    severity: "error" | "success";
    text: string;
};

export type TApp = {
    isInitialized: boolean;
    messages: TAppMessage[];
    isFetching: boolean;
};
const slice = createSlice({
    name: "app",
    initialState: {
        isInitialized: false,
        messages: [],
        isFetching: false,
    } as TApp,
    reducers: {
        setIsInitialized(state, action: PayloadAction<boolean>) {
            state.isInitialized = action.payload;
        },
        setAppMessage(state, action: PayloadAction<{ text: string; severity: "error" | "success" }>) {
            const newMessage: TAppMessage = {
                id: String(Math.random()),
                severity: action.payload.severity,
                text: action.payload.text,
            };
            state.messages.push(newMessage);
        },
        setAppLastMessage(state) {
            state.messages = state.messages.splice(0, state.messages.length - 1);
        },
        hideAppMessage(state, action: PayloadAction<string>) {
            state.messages = state.messages.filter((el) => el.id !== action.payload);
        },
        setIsFetching(state, action: PayloadAction<boolean>) {
            state.isFetching = action.payload;
        },

    },
});

export const appReducer = slice.reducer;

export const {
    setIsFetching,
    setIsInitialized,
    setAppMessage,
    setAppLastMessage,
    hideAppMessage,
} = slice.actions;
