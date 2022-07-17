import {setAppErrorAC, setAppStatusAC} from "../redux/reducers/app-reducer";
import {AppDispatchType} from "../redux/store";
import {ResponseType} from "../api/todolistAPI";

// generic function
export const handleServerAppError = <T>(data: ResponseType<T>, dispatch: AppDispatchType) => {
    if (data.messages.length) {
        dispatch(setAppErrorAC(data.messages[0]))
    } else {
        dispatch(setAppErrorAC('Some error occurred'))
    }
    dispatch(setAppStatusAC('failed'))
}

export const handleServerNetworkError = (error: { message: string }, dispatch: AppDispatchType) => {
    dispatch(setAppErrorAC(error.message))
    dispatch(setAppStatusAC('failed'))
}