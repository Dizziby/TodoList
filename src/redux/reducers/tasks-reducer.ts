import {TaskType, todolistsAPI, TodolistType} from "../../api/todolistAPI";
import {clearTodolistData, setTodolistsAC} from "./todolists-reducer";
import {AppDispatchType, AppThunkType, RootState} from "../store";
import {RequestStatusType, setAppErrorAC, setAppStatusAC} from "./app-reducer";
import {AxiosError} from "axios";
import {handleServerAppError, handleServerNetworkError} from "../../utils/error-utils";

const initialState: TasksType = {}

export const tasksReducer = (state: TasksType = initialState, action: TasksActionType): TasksType => {

    switch (action.type) {
        case 'SET-TASKS':
            return {
                ...state,
                [action.payload.todolistId]: action.payload.tasks.map(task => ({
                    ...task,
                    entityStatus: "idle"
                }))
            }
        case 'SET-TODOLISTS': {
            const copyState = {...state}
            action.payload.todolists.forEach((todolist) => {
                copyState[todolist.id] = []
            })
            return copyState;
        }
        case 'ADD-TASK':
            return {
                ...state,
                [action.payload.task.todoListId]: [{
                    ...action.payload.task,
                    entityStatus: "idle"
                }, ...state[action.payload.task.todoListId]]
            }
        case 'REMOVE-TASK':
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId].filter(el => el.id !== action.payload.taskId)
            }
        case "CHANGE-TASK":
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId].map(el => el.id === action.payload.id ? {
                    ...el,
                    ...action.payload.domainModel
                } : el)
            }
        case "ADD-TODOLIST":
            return {
                ...state,
                [action.payload.todolist.id]: []
            }
        case "REMOVE-TODOLIST": {
            const copyState = {...state}
            delete copyState[action.payload.todolistId]
            return copyState
        }
        case "CHANGE-TASK-ENTITY-STATUS":
            return {
                ...state,
                [action.payload.todolistId]:
                    state[action.payload.todolistId].map(el => el.id === action.payload.id ? {
                        ...el,
                        entityStatus: action.payload.entityStatus
                    } : el)
            }
        case "CLEAR-TODOLIST-DATA":
            return {}
        default:
            return state
    }
}

// =============================AC=============================

export const removeTaskAC = (taskId: string, todolistId: string) => ({
    type: 'REMOVE-TASK',
    payload: {
        taskId,
        todolistId
    }
}) as const

export const changeTaskAC = (id: string, domainModel: UpdateDomainTaskModelType, todolistId: string) => ({
    type: 'CHANGE-TASK',
    payload: {
        id,
        domainModel,
        todolistId
    }
}) as const

export const addTodolistAC = (todolist: TodolistType) => ({
    type: 'ADD-TODOLIST',
    payload: {
        todolist
    }
}) as const

export const removeTodolistAC = (todolistId: string) => ({
    type: 'REMOVE-TODOLIST',
    payload: {
        todolistId
    }
}) as const

export const setTasksAC = (tasks: Array<TaskType>, todolistId: string) => ({
    type: 'SET-TASKS',
    payload: {
        tasks,
        todolistId
    }
}) as const

export const addTaskAC = (task: TaskType) => ({
    type: 'ADD-TASK',
    payload: {
        task
    }
}) as const

export const changeTaskEntityStatusAC = (id: string, todolistId: string, entityStatus: RequestStatusType) => ({
    type: "CHANGE-TASK-ENTITY-STATUS",
    payload: {
        id,
        todolistId,
        entityStatus
    }
}) as const


// =============================TC=============================

export const fetchTasksTC = (todolistId: string): AppThunkType => (dispatch: AppDispatchType) => {
    dispatch(setAppStatusAC("loading"))
    todolistsAPI.getTasks(todolistId)
        .then((res) => {
            if (res.data.error === null) {
                dispatch(setTasksAC(res.data.items, todolistId))
                dispatch(setAppStatusAC("succeeded"))
            } else {
                dispatch(setAppErrorAC(res.data.error))
                dispatch(setAppStatusAC("succeeded"))
            }
        })
        .catch((error: AxiosError) => {
            handleServerNetworkError(error, dispatch)
        })
}

export const addTasksTC = (todolistId: string, title: string): AppThunkType => {
    debugger
    return (dispatch: AppDispatchType) => {
        dispatch(setAppStatusAC("loading"))
        todolistsAPI.createTask(todolistId, title)
            .then((res) => {
                if (res.data.resultCode === 0) {
                    dispatch(addTaskAC(res.data.data.item));
                    dispatch(setAppStatusAC("succeeded"))
                } else {
                    handleServerAppError(res.data, dispatch)
                }
            })
            .catch((error: AxiosError) => {
                handleServerNetworkError(error, dispatch)
            })
    }
}

export const removeTaskTC = (todolistId: string, taskId: string): AppThunkType => {
    return (dispatch: AppDispatchType) => {
        dispatch(setAppStatusAC("loading"))
        dispatch(changeTaskEntityStatusAC(taskId, todolistId, "loading"))
        todolistsAPI.deleteTask(todolistId, taskId)
            .then((res) => {
                if (res.data.resultCode === 0) {
                    dispatch(removeTaskAC(taskId, todolistId));
                    dispatch(setAppStatusAC("succeeded"))
                } else {
                    handleServerAppError(res.data, dispatch)
                    dispatch(changeTaskEntityStatusAC(taskId, todolistId, "idle"))
                }
            })
            .catch((error: AxiosError) => {
                handleServerNetworkError(error, dispatch)
                dispatch(changeTaskEntityStatusAC(taskId, todolistId, "idle"))
            })
    }
}

export const updateTaskTC = (taskId: string, todolistId: string, domainModel: UpdateDomainTaskModelType): AppThunkType => {
    return (dispatch: AppDispatchType, getState: () => RootState) => {
        const task = getState().tasks[todolistId].find(t => {
            return t.id === taskId
        })
        if (task) {
            dispatch(setAppStatusAC("loading"))
            dispatch(changeTaskEntityStatusAC(taskId, todolistId, "loading"))
            todolistsAPI.updateTask(todolistId, taskId, {
                title: task.title,
                startDate: task.startDate,
                priority: task.priority,
                description: task.description,
                deadline: task.deadline,
                status: task.status,
                ...domainModel
            }).then((res) => {
                if (res.data.resultCode === 0) {
                    dispatch(changeTaskAC(taskId, domainModel, todolistId))
                    dispatch(setAppStatusAC("succeeded"))
                } else {
                    handleServerAppError(res.data, dispatch)
                }
            })
                .catch((error: AxiosError) => {
                    handleServerNetworkError(error, dispatch)
                })
                .finally(() => {
                    dispatch(changeTaskEntityStatusAC(taskId, todolistId, "idle"))
                })
        }
    }
}

// =============================Types=============================

export type TasksType = {
    [key: string]: Array<TaskDomainType>
}

export type TaskDomainType = TaskType & {
    entityStatus: RequestStatusType
}

export type TasksActionType =
    ReturnType<typeof removeTaskAC>
    | ReturnType<typeof addTaskAC>
    | ReturnType<typeof addTodolistAC>
    | ReturnType<typeof removeTodolistAC>
    | ReturnType<typeof setTodolistsAC>
    | ReturnType<typeof setTasksAC>
    | ReturnType<typeof changeTaskAC>
    | ReturnType<typeof changeTaskEntityStatusAC>
    | ReturnType<typeof clearTodolistData>


type UpdateDomainTaskModelType = {
    title?: string
    description?: string
    status?: number
    priority?: number
    startDate?: string
    deadline?: string
}