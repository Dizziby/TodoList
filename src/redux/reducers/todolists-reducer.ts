import {todolistsAPI, TodolistType} from "../../api/todolistAPI";
import {AppDispatchType, AppThunkType} from "../store";
import {RequestStatusType, setAppStatusAC} from "./app-reducer";
import {AxiosError} from "axios";
import {handleServerAppError, handleServerNetworkError} from "../../utils/error-utils";
import {fetchTasksTC} from "./tasks-reducer";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

const initialState: Array<TodolistDomainType> = []

const slice = createSlice({
    name: "todolists",
    initialState: initialState,
    reducers: {
        removeTodolistAC(state, action: PayloadAction<{ todolistId: string }>) {
            const index = state.findIndex(todolist => todolist.id === action.payload.todolistId)
            if(index > -1) {
                state.splice(index, 1)
            }
        },
        addTodolistAC(state, action: PayloadAction<{ todolist: TodolistType }>) {
            state.unshift({
                    ...action.payload.todolist,
                    filter: "all",
                    entityStatus: "idle"
                })
        },
        changeTodolistTitleAC(state, action: PayloadAction<{ id: string, title: string }>) {
            const index = state.findIndex(todolist => todolist.id === action.payload.id)
            state[index].title = action.payload.title
        },
        changeTodolistFilterAC(state, action: PayloadAction<{ id: string, filter: FilterValuesType }>) {
            const index = state.findIndex(todolist => todolist.id === action.payload.id)
            state[index].filter = action.payload.filter
        },
        setTodolistsAC(state, action: PayloadAction<{ todolists: TodolistType[] }>) {
            return action.payload.todolists.map(todolist => ({
                ...todolist,
                filter: "all",
                entityStatus: "idle"
            }))
        },
        changeTodolistEntityStatusAC(state, action: PayloadAction<{ id: string, entityStatus: RequestStatusType }>) {
            const index = state.findIndex(todolist => todolist.id === action.payload.id)
            state[index].entityStatus = action.payload.entityStatus
        },
        clearTodolistData() {
            return []
        },
    }
})

export const todolistsReducer = slice.reducer
export const {
    removeTodolistAC,
    addTodolistAC,
    changeTodolistTitleAC,
    changeTodolistFilterAC,
    setTodolistsAC,
    changeTodolistEntityStatusAC,
    clearTodolistData
} = slice.actions


// export const todolistsReducer = (state: Array<TodolistDomainType> = initialState, action: TodolistsActionType): Array<TodolistDomainType> => {
//     switch (action.type) {
//         case "SET-TODOLISTS":
//             return action.payload.todolists.map(todolist => ({
//                 ...todolist,
//                 filter: "all",
//                 entityStatus: "idle"
//             }))
//         case "REMOVE-TODOLIST" :
//             return state.filter(el => el.id !== action.payload.todolistId)
//         case 'ADD-TODOLIST':
//             return [
//                 {
//                     ...action.payload.todolist,
//                     filter: "all",
//                     entityStatus: "idle"
//                 },
//                 ...state
//             ]
//         case 'CHANGE-TODOLIST-TITLE':
//             return state.map(el => el.id === action.payload.id ? {
//                 ...el,
//                 title: action.payload.title
//             } : el)
//         case 'CHANGE-TODOLIST-FILTER':
//             return state.map(el => el.id === action.payload.id ? {
//                 ...el,
//                 filter: action.payload.filter
//             } : el)
//         case "CHANGE-TODOLIST-ENTITY-STATUS":
//             return state.map(el => el.id === action.payload.id ? {
//                 ...el,
//                 entityStatus: action.payload.entityStatus
//             } : el)
//         case "CLEAR-TODOLIST-DATA":
//             return []
//         default:
//             return state
//     }
// }

// =============================AC=============================

// export const removeTodolistAC = (todolistId: string) => ({
//     type: 'REMOVE-TODOLIST',
//     payload: {
//         todolistId
//     }
// }) as const
//
// export const addTodolistAC = (todolist: TodolistType) => ({
//     type: 'ADD-TODOLIST',
//     payload: {
//         todolist
//     }
// }) as const
//
// export const changeTodolistTitleAC = (id: string, title: string) => ({
//     type: 'CHANGE-TODOLIST-TITLE',
//     payload: {
//         id,
//         title
//     }
// }) as const
//
// export const changeTodolistFilterAC = (id: string, filter: FilterValuesType) => ({
//     type: 'CHANGE-TODOLIST-FILTER',
//     payload: {
//         id,
//         filter
//     }
// }) as const
//
// export const setTodolistsAC = (todolists: TodolistType[]) => ({
//     type: "SET-TODOLISTS",
//     payload: {todolists}
// }) as const
//
//
// export const changeTodolistEntityStatusAC = (id: string, entityStatus: RequestStatusType) => ({
//     type: "CHANGE-TODOLIST-ENTITY-STATUS",
//     payload: {
//         id,
//         entityStatus
//     }
// }) as const
//
// export const clearTodolistData = () => ({
//     type: "CLEAR-TODOLIST-DATA"
// }) as const

// =============================TC=============================

export const fetchTodolistsTC = (): AppThunkType => (dispatch: AppDispatchType) => {
    dispatch(setAppStatusAC({status: "loading"}))
    todolistsAPI.getTodolists()
        .then((res) => {
            dispatch(setTodolistsAC({todolists: res.data}))
            dispatch(setAppStatusAC({status: "succeeded"}))
            return res.data
        })
        .then((todolists: TodolistType[]) => {
            todolists.forEach((todolisd) => {
                dispatch(fetchTasksTC(todolisd.id))
            })
        })
        .catch((error: AxiosError) => {
            handleServerNetworkError(error, dispatch)
        })

}

export const addTodolistTC = (title: string): AppThunkType => (dispatch: AppDispatchType) => {
    dispatch(setAppStatusAC({status: "loading"}))
    todolistsAPI.createTodolist(title)
        .then((res) => {
            if (res.data.resultCode === 0) {
                dispatch(addTodolistAC({todolist: res.data.data.item}));
                dispatch(setAppStatusAC({status: "succeeded"}))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch((error: AxiosError) => {
            handleServerNetworkError(error, dispatch)
        })
}

export const removeTodolistTC = (todolistId: string): AppThunkType => (dispatch: AppDispatchType) => {
    dispatch(setAppStatusAC({status: "loading"}))
    dispatch(changeTodolistEntityStatusAC({id: todolistId, entityStatus: "loading"}))
    todolistsAPI.deleteTodolist(todolistId)
        .then((res) => {
            if (res.data.resultCode === 0) {
                dispatch(removeTodolistAC({todolistId}))
                dispatch(setAppStatusAC({status: "succeeded"}))
            } else {
                handleServerAppError(res.data, dispatch)
                dispatch(changeTodolistEntityStatusAC({id: todolistId, entityStatus: "idle"}))
            }
        })
        .catch((error: AxiosError) => {
            handleServerNetworkError(error, dispatch)
            dispatch(changeTodolistEntityStatusAC({id: todolistId, entityStatus: "idle"}))
        })
}

export const changeTodolistTC = (todolisdID: string, newTitle: string): AppThunkType => (dispatch: AppDispatchType) => {
    dispatch(setAppStatusAC({status: "loading"}))
    dispatch(changeTodolistEntityStatusAC({id:todolisdID, entityStatus: "loading"}))
    todolistsAPI.updateTodolist(todolisdID, newTitle)
        .then((res) => {
            if (res.data.resultCode === 0) {
                dispatch(changeTodolistTitleAC({id: todolisdID, title: newTitle}))
                dispatch(setAppStatusAC({status: "succeeded"}))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch((error: AxiosError) => {
            handleServerNetworkError(error, dispatch)
        })
        .finally(() => {
            dispatch(changeTodolistEntityStatusAC({id: todolisdID, entityStatus: "idle"}))
        })
}

// =============================Types=============================

export type FilterValuesType = "all" | "active" | "completed"

export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
    entityStatus: RequestStatusType
}

export type TodolistsActionType =
    ReturnType<typeof removeTodolistAC>
    | ReturnType<typeof addTodolistAC>
    | ReturnType<typeof changeTodolistTitleAC>
    | ReturnType<typeof changeTodolistFilterAC>
    | ReturnType<typeof setTodolistsAC>
    | ReturnType<typeof changeTodolistEntityStatusAC>
    | ReturnType<typeof clearTodolistData>