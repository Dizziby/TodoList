import {authAPI} from "../../api/todolistAPI";
import {AppDispatchType, AppThunkType} from "../store";
import {setIsLoggedInAC} from "./auth-reducer";
import {AxiosError} from "axios";
import {handleServerNetworkError} from "../../utils/error-utils";

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

const initialState = {
    status: 'idle' as RequestStatusType,
    error: null as null | string,
    isInitialized: false
}

type InitialStateType = typeof initialState

export const appReducer = (state: InitialStateType = initialState, action: AppActionsType): InitialStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return {...state, status: action.payload.status}
        case 'APP/SET-ERROR':
            return {...state, error: action.payload.error}
        case 'APP/SET-INITIALIZED':
            return {...state, isInitialized: action.payload.value}
        default:
            return state
    }
}

// =============================AC=============================

export const setAppStatusAC = (status: RequestStatusType) => ({
    type: 'APP/SET-STATUS',
    payload: {
        status
    }
}) as const

export const setAppErrorAC = (error: string | null) => ({
    type: 'APP/SET-ERROR',
    payload: {
        error
    }
}) as const

export const setIsInitializedAC = (value: boolean) => ({
    type: 'APP/SET-INITIALIZED',
    payload: {
        value
    }
}) as const

// =============================TC=============================

export const initializeAppTC = (): AppThunkType => (dispatch: AppDispatchType) => {
    dispatch(setAppStatusAC('loading'))
    authAPI.me()
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(setIsLoggedInAC(true));
            } else {
                dispatch(setAppStatusAC('failed'))
            }
        })
        .catch((error: AxiosError) => {
            handleServerNetworkError(error, dispatch)
        })
        .finally(() => {
            dispatch(setIsInitializedAC(true))
        })
}

// =============================Types=============================

export type AppActionsType =
    ReturnType<typeof setAppStatusAC>
    | ReturnType<typeof setAppErrorAC>
    | ReturnType<typeof setIsInitializedAC>