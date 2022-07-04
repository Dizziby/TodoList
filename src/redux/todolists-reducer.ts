import {v1} from "uuid";
import {todolistsAPI, TodolistType} from "../api/todolistAPI";
import {AppDispatchType, AppThunkType} from "./store";

const initialState: Array<TodolistDomainType> = []

export const todolistsReducer = (state: Array<TodolistDomainType> = initialState, action: TodolistsActionType): Array<TodolistDomainType> => {
    switch (action.type) {
        case "SET-TODOLISTS":
            return action.payload.todolists.map(todolist => ({...todolist, filter: "all"}))
        case "REMOVE-TODOLIST" :
            return state.filter(el => el.id !== action.payload.todolistId)
        case 'ADD-TODOLIST':
            return [
                {
                    id: action.payload.todolistId,
                    title: action.payload.title,
                    filter: "all",
                    addedDate: "",
                    order: 0
                },
                ...state
            ]
        case 'CHANGE-TODOLIST-TITLE':
            return state.map(el => el.id === action.payload.id ? {
                ...el,
                title: action.payload.title
            } : el)
        case 'CHANGE-TODOLIST-FILTER':
            return state.map(el => el.id === action.payload.id ? {
                ...el,
                filter: action.payload.filter
            } : el)
        default:
            return state
    }
}

// =============================AC=============================

export const removeTodolistAC = (todolistId: string) => ({
    type: 'REMOVE-TODOLIST',
    payload: {
        todolistId
    }
}) as const

export const addTodolistAC = (title: string) => ({
    type: 'ADD-TODOLIST',
    payload: {
        todolistId: v1(),
        title
    }
}) as const

export const changeTodolistTitleAC = (id: string, title: string) => ({
    type: 'CHANGE-TODOLIST-TITLE',
    payload: {
        id,
        title
    }
}) as const

export const changeTodolistFilterAC = (id: string, filter: FilterValuesType) => ({
    type: 'CHANGE-TODOLIST-FILTER',
    payload: {
        id,
        filter
    }
}) as const

export const setTodolistsAC = (todolists: TodolistType[]) => ({
    type: "SET-TODOLISTS",
    payload: {todolists}
}) as const

// =============================TC=============================

export const fetchTodolistsTC = (): AppThunkType => (dispatch: AppDispatchType) => {
    todolistsAPI.getTodolists()
        .then((res) => {
            dispatch(setTodolistsAC(res.data))
        })
}

export const addTodolistTC = (title: string): AppThunkType => (dispatch: AppDispatchType) => {
    todolistsAPI.createTodolist(title)
        .then(() => {
            dispatch(addTodolistAC(title))
        })
}

export const removeTodolistTC = (todolistId: string): AppThunkType => (dispatch: AppDispatchType) => {
    todolistsAPI.deleteTodolist(todolistId)
        .then(() => {
            dispatch(removeTodolistAC(todolistId))
        })
}

export const changeTodolistTC = (todolisdID: string, newTitle: string): AppThunkType => (dispatch: AppDispatchType) => {
    todolistsAPI.updateTodolist(todolisdID, newTitle)
        .then(() => {
            dispatch(changeTodolistTitleAC(todolisdID, newTitle))
        })
}

// =============================Types=============================

export type FilterValuesType = "all" | "active" | "completed"

export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
}

export type TodolistsActionType =
    ReturnType<typeof removeTodolistAC>
    | ReturnType<typeof addTodolistAC>
    | ReturnType<typeof changeTodolistTitleAC>
    | ReturnType<typeof changeTodolistFilterAC>
    | ReturnType<typeof setTodolistsAC>