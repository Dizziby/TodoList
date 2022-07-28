import {authAPI} from "../../api/todolistAPI";
import {AppDispatchType, AppThunkType} from "../store";
import {setIsLoggedInAC} from "./auth-reducer";
import {AxiosError} from "axios";
import {handleServerNetworkError} from "../../utils/error-utils";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

const initialState = {
    status: 'idle' as RequestStatusType,
    error: null as null | string,
    isInitialized: false
}

const slice = createSlice({
    name: "app",
    initialState: initialState,
    reducers: {
        setAppStatusAC(state, action: PayloadAction<{ status: RequestStatusType }>) {
            state.status = action.payload.status
        },
        setAppErrorAC(state, action: PayloadAction<{ error: string | null }>) {
            state.error = action.payload.error
        },
        setIsInitializedAC(state, action: PayloadAction<{ value: boolean }>) {
            state.isInitialized = action.payload.value
        },
    }

})

export const appReducer = slice.reducer
export const {setAppStatusAC, setAppErrorAC, setIsInitializedAC} = slice.actions


// export const appReducer = (state: InitialStateType = initialState, action: AppActionsType): InitialStateType => {
//     switch (action.type) {
//         case 'APP/SET-STATUS':
//             return {...state, status: action.payload.status}
//         case 'APP/SET-ERROR':
//             return {...state, error: action.payload.error}
//         case 'APP/SET-INITIALIZED':
//             return {...state, isInitialized: action.payload.value}
//         default:
//             return state
//     }
// }

// =============================AC=============================

// export const setAppStatusAC = (status: RequestStatusType) => ({
//     type: 'APP/SET-STATUS',
//     payload: {
//         status
//     }
// }) as const
//
// export const setAppErrorAC = (error: string | null) => ({
//     type: 'APP/SET-ERROR',
//     payload: {
//         error
//     }
// }) as const
//
// export const setIsInitializedAC = (value: boolean) => ({
//     type: 'APP/SET-INITIALIZED',
//     payload: {
//         value
//     }
// }) as const

// =============================TC=============================

export const initializeAppTC = (): AppThunkType => (dispatch: AppDispatchType) => {
    dispatch(setAppStatusAC({status: 'loading'}))
    authAPI.me()
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(setIsLoggedInAC({value: true}));
            } else {
                dispatch(setAppStatusAC({status: 'failed'}))
            }
        })
        .catch((error: AxiosError) => {
            handleServerNetworkError(error, dispatch)
        })
        .finally(() => {
            dispatch(setIsInitializedAC({value: true}))
        })
}

// =============================Types=============================

export type AppActionsType =
    ReturnType<typeof setAppStatusAC>
    | ReturnType<typeof setAppErrorAC>
    | ReturnType<typeof setIsInitializedAC>