import {setAppErrorAC, setAppStatusAC} from "../redux/reducers/app-reducer";
import {AppActionType} from "../redux/store";
import {ResponseType} from "../api/todolistAPI";
import axios, {AxiosError} from "axios";
import {Dispatch} from "redux";

export const handleServerAppError = <T>(data: ResponseType<T>, dispatch: Dispatch<AppActionType>) => {
    if (data.messages.length) {
        dispatch(setAppErrorAC({error: data.messages[0]}))
    } else {
        dispatch(setAppErrorAC({error: 'Some error occurred'}))
    }
    dispatch(setAppStatusAC({status: 'failed'}))
}

export const handleServerNetworkError = (e: Error | AxiosError<{error: string}>, dispatch: Dispatch<AppActionType>): void => {
    const err = e as Error | AxiosError<{ error: string }>
    if (axios.isAxiosError(err)) {
        const error = err.response?.data ? err.response.data.error : err.message
        dispatch(setAppErrorAC({error}))
    } else {
        dispatch(setAppErrorAC({error: `Native error ${err.message}`}))
    }
    dispatch(setAppStatusAC({status: 'failed'}))
}