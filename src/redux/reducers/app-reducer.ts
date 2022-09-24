import {authAPI} from "../../api/todolistAPI";
import {handleServerNetworkError} from "../../utils/error-utils";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {setIsLoggedInAC} from "./auth-reducer";

export const initializeAppTC = createAsyncThunk("app/initializeApp", async (param, {dispatch}) => {
    dispatch(setAppStatusAC({status: "loading"}))
    const res = await authAPI.me()
    try {
        if (res.data.resultCode === 0) {
            dispatch(setIsLoggedInAC({value: true}));
        } else {
            dispatch(setAppStatusAC({status: "failed"}))
        }
    } catch (error: any) {
        handleServerNetworkError(error, dispatch)
    }
})

const slice = createSlice({
    name: "app",
    initialState: {
        status: "idle" as RequestStatusType,
        error: null as null | string,
        isInitialized: false
    },
    reducers: {
        setAppStatusAC(state, action: PayloadAction<{ status: RequestStatusType }>) {
            state.status = action.payload.status
        },
        setAppErrorAC(state, action: PayloadAction<{ error: string | null }>) {
            state.error = action.payload.error
        },
    },
    extraReducers: builder => {
        builder.addCase(initializeAppTC.fulfilled, (state) => {
            state.isInitialized = true
        })
    }
})

export const appReducer = slice.reducer
export const {setAppStatusAC, setAppErrorAC} = slice.actions


// =============================Types=============================

export type AppActionsType =
    ReturnType<typeof setAppStatusAC>
    | ReturnType<typeof setAppErrorAC>

export type RequestStatusType = "idle" | "loading" | "succeeded" | "failed"