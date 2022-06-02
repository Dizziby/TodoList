import {FilterValuesType, TodolistsType} from "../App";
import {v1} from "uuid";

let todolistID1 = v1();
let todolistID2 = v1();

const initialState: Array<TodolistsType> = [
    // {id: todolistID1, title: 'What to learn', filter: 'all'},
    // {id: todolistID2, title: 'What to buy', filter: 'all'},
]

export const todolistsReducer = (state: Array<TodolistsType> = initialState, action: ActionType): Array<TodolistsType> => {
    switch (action.type) {
        case "REMOVE-TODOLIST" : {
            return state.filter(el => el.id !== action.payload.todolistId)
        }
        case 'ADD-TODOLIST': {
            return [
                ...state,
                {
                    id: action.payload.todolistId,
                    title: action.payload.title,
                    filter: "all"
                }
            ]
        }
        case 'CHANGE-TODOLIST-TITLE': {
            return state.map(el => el.id === action.payload.id ? {...el, title: action.payload.title} : el)
        }
        case 'CHANGE-TODOLIST-FILTER': {
            return state.map(el => el.id === action.payload.id ? {...el, filter: action.payload.filter} : el)
        }
        default:
            return state
    }
}


type ActionType =
    ReturnType<typeof removeTodolistAC>
    | ReturnType<typeof addTodolistAC>
    | ReturnType<typeof changeTodolistTitleAC>
    | ReturnType<typeof changeTodolistFilterAC>

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