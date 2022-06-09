import {TasksType} from "../App";
import {v1} from "uuid";

let todolistID1 = v1();
let todolistID2 = v1();

const initialState: TasksType = {
    // [todolistID1]: [
    //     {id: v1(), title: "HTML&CSS", isDone: true},
    //     {id: v1(), title: "JS", isDone: true},
    //     {id: v1(), title: "ReactJS", isDone: false},
    //     {id: v1(), title: "Rest API", isDone: false},
    //     {id: v1(), title: "GraphQL", isDone: false},
    // ],
    // [todolistID2]: [
    //     {id: v1(), title: "HTML&CSS2", isDone: true},
    //     {id: v1(), title: "JS2", isDone: true},
    //     {id: v1(), title: "ReactJS2", isDone: false},
    //     {id: v1(), title: "Rest API2", isDone: false},
    //     {id: v1(), title: "GraphQL2", isDone: false},
    // ]
}

export const tasksReducer = (state: TasksType = initialState, action: ActionType): TasksType => {
    switch (action.type) {
        case 'REMOVE-TASK': {
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId].filter(el => el.id !== action.payload.taskId)
            }
        }
        case "ADD-TASK": {
            return {
                ...state,
                [action.payload.todolistId]: [{
                    id: v1(),
                    title: action.payload.title,
                    isDone: false
                }, ...state[action.payload.todolistId]]
            }
        }
        case "CHANGE-TASK-STATUS": {
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId].map(el => el.id === action.payload.id ? {
                    ...el,
                    isDone: action.payload.isDone
                } : el)
            }
        }
        case "CHANGE-TASK-TITLE": {
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId].map(el => el.id === action.payload.id ? {
                    ...el,
                    title: action.payload.title
                } : el)
            }
        }
        case "ADD-TODOLIST": {
            return {
                ...state,
                [action.payload.todolistId]: []
            }
        }
        case "REMOVE-TODOLIST": {
            const copyState = {...state}
            delete copyState[action.payload.todolistId]
            return copyState
        }
        default:
            return state
    }
}

type ActionType =
    ReturnType<typeof removeTaskAC>
    | ReturnType<typeof addTaskAC>
    | ReturnType<typeof changeTaskStatusAC>
    | ReturnType<typeof changeTaskTitleAC>
    | ReturnType<typeof addTodolistAC>
    | ReturnType<typeof removeTodolistAC>

export const removeTaskAC = (taskId: string, todolistId: string) => ({
    type: 'REMOVE-TASK',
    payload: {
        taskId,
        todolistId
    }
}) as const

export const addTaskAC = (title: string, todolistId: string) => ({
    type: 'ADD-TASK',
    payload: {
        title,
        todolistId
    }
}) as const

export const changeTaskStatusAC = (id: string, isDone: boolean, todolistId: string) => ({
    type: 'CHANGE-TASK-STATUS',
    payload: {
        id,
        isDone,
        todolistId
    }
}) as const

export const changeTaskTitleAC = (id: string, title: string, todolistId: string) => ({
    type: 'CHANGE-TASK-TITLE',
    payload: {
        id,
        title,
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

export const removeTodolistAC = (todolistId: string) => ({
    type: 'REMOVE-TODOLIST',
    payload: {
        todolistId
    }
}) as const