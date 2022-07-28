import {TaskType, todolistsAPI} from "../../api/todolistAPI";
import {
    addTodolistAC,
    clearTodolistData,
    removeTodolistAC,
    setTodolistsAC
} from "./todolists-reducer";
import {AppDispatchType, AppThunkType, RootState} from "../store";
import {RequestStatusType, setAppErrorAC, setAppStatusAC} from "./app-reducer";
import {AxiosError} from "axios";
import {handleServerAppError, handleServerNetworkError} from "../../utils/error-utils";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

const initialState: TasksType = {}

const slice = createSlice({
    name: "tasks",
    initialState: initialState,
    reducers: {
        setTasksAC(state, action: PayloadAction<{ tasks: Array<TaskType>, todolistId: string }>) {
            state[action.payload.todolistId] = action.payload.tasks.map(task => ({
                ...task,
                entityStatus: "idle"
            }))
        },
        addTaskAC(state, action: PayloadAction<{ task: TaskType }>) {
            state[action.payload.task.todoListId].unshift({
                ...action.payload.task,
                entityStatus: "idle"
            })
        },
        removeTaskAC(state, action: PayloadAction<{ taskId: string, todolistId: string }>) {
            const index = state[action.payload.todolistId].findIndex(task => task.id === action.payload.taskId)
            if (index > -1) {
                state[action.payload.todolistId].splice(index, 1)
            }
        },
        changeTaskAC(state, action: PayloadAction<{ id: string, domainModel: UpdateDomainTaskModelType, todolistId: string }>) {
            const index = state[action.payload.todolistId].findIndex(task => task.id === action.payload.id)
            if (index > -1) {
                state[action.payload.todolistId][index] = {...state[action.payload.todolistId][index], ...action.payload.domainModel}
            }
        },
        changeTaskEntityStatusAC(state, action: PayloadAction<{ id: string, todolistId: string, entityStatus: RequestStatusType }>) {
            const index = state[action.payload.todolistId].findIndex(task => task.id === action.payload.id)
            if (index > -1) {
                state[action.payload.todolistId][index].entityStatus = action.payload.entityStatus
            }
        },
    },
    extraReducers: builder => {
        builder.addCase(setTodolistsAC, (state, action) => {
            action.payload.todolists.forEach((todolist) => {
                state[todolist.id] = []
            })
        })
            .addCase(addTodolistAC, (state, action) => {
                state[action.payload.todolist.id] = []
            })
            .addCase(removeTodolistAC, (state, action) => {
                delete state[action.payload.todolistId]
            })
            .addCase(clearTodolistData, () => {
                return {}
            })
    }
})

export const tasksReducer = slice.reducer
export const {
    setTasksAC,
    addTaskAC,
    removeTaskAC,
    changeTaskAC,
    changeTaskEntityStatusAC
} = slice.actions


// export const tasksReducer = (state: TasksType = initialState, action: TasksActionType): TasksType => {
//
//     switch (action.type) {
//         case 'SET-TASKS':
//             return {
//                 ...state,
//                 [action.payload.todolistId]: action.payload.tasks.map(task => ({
//                     ...task,
//                     entityStatus: "idle"
//                 }))
//             }
//         case 'SET-TODOLISTS': {
//             const copyState = {...state}
//             action.payload.todolists.forEach((todolist) => {
//                 copyState[todolist.id] = []
//             })
//             return copyState;
//         }
//         case 'ADD-TASK':
//             return {
//                 ...state,
//                 [action.payload.task.todoListId]: [{
//                     ...action.payload.task,
//                     entityStatus: "idle"
//                 }, ...state[action.payload.task.todoListId]]
//             }
//         case 'REMOVE-TASK':
//             return {
//                 ...state,
//                 [action.payload.todolistId]: state[action.payload.todolistId].filter(el => el.id !== action.payload.taskId)
//             }
//         case "CHANGE-TASK":
//             return {
//                 ...state,
//                 [action.payload.todolistId]: state[action.payload.todolistId].map(el => el.id === action.payload.id ? {
//                     ...el,
//                     ...action.payload.domainModel
//                 } : el)
//             }
//         case "ADD-TODOLIST":
//             return {
//                 ...state,
//                 [action.payload.todolist.id]: []
//             }
//         case "REMOVE-TODOLIST": {
//             const copyState = {...state}
//             delete copyState[action.payload.todolistId]
//             return copyState
//         }
//         case "CHANGE-TASK-ENTITY-STATUS":
//             return {
//                 ...state,
//                 [action.payload.todolistId]:
//                     state[action.payload.todolistId].map(el => el.id === action.payload.id ? {
//                         ...el,
//                         entityStatus: action.payload.entityStatus
//                     } : el)
//             }
//         case "CLEAR-TODOLIST-DATA":
//             return {}
//         default:
//             return state
//     }
// }

// =============================AC=============================

// export const removeTaskAC = (taskId: string, todolistId: string) => ({
//     type: 'REMOVE-TASK',
//     payload: {
//         taskId,
//         todolistId
//     }
// }) as const
//
// export const changeTaskAC = (id: string, domainModel: UpdateDomainTaskModelType, todolistId: string) => ({
//     type: 'CHANGE-TASK',
//     payload: {
//         id,
//         domainModel,
//         todolistId
//     }
// }) as const
//
// export const setTasksAC = (tasks: Array<TaskType>, todolistId: string) => ({
//     type: 'SET-TASKS',
//     payload: {
//         tasks,
//         todolistId
//     }
// }) as const
//
// export const addTaskAC = (task: TaskType) => ({
//     type: 'ADD-TASK',
//     payload: {
//         task
//     }
// }) as const
//
// export const changeTaskEntityStatusAC = (id: string, todolistId: string, entityStatus: RequestStatusType) => ({
//     type: "CHANGE-TASK-ENTITY-STATUS",
//     payload: {
//         id,
//         todolistId,
//         entityStatus
//     }
// }) as const


// =============================TC=============================

export const fetchTasksTC = (todolistId: string): AppThunkType => (dispatch: AppDispatchType) => {
    dispatch(setAppStatusAC({status: "loading"}))
    todolistsAPI.getTasks(todolistId)
        .then((res) => {
            if (res.data.error === null) {
                dispatch(setTasksAC({tasks: res.data.items, todolistId}))
                dispatch(setAppStatusAC({status: "succeeded"}))
            } else {
                dispatch(setAppErrorAC({error: res.data.error}))
                dispatch(setAppStatusAC({status: "succeeded"}))
            }
        })
        .catch((error: AxiosError) => {
            handleServerNetworkError(error, dispatch)
        })
}

export const addTasksTC = (todolistId: string, title: string): AppThunkType => {
    return (dispatch: AppDispatchType) => {
        dispatch(setAppStatusAC({status: "loading"}))
        todolistsAPI.createTask(todolistId, title)
            .then((res) => {
                if (res.data.resultCode === 0) {
                    dispatch(addTaskAC({task: res.data.data.item}));
                    dispatch(setAppStatusAC({status: "succeeded"}))
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
        dispatch(setAppStatusAC({status: "loading"}))
        dispatch(changeTaskEntityStatusAC({id: taskId, todolistId, entityStatus: "loading"}))
        todolistsAPI.deleteTask(todolistId, taskId)
            .then((res) => {
                if (res.data.resultCode === 0) {
                    dispatch(removeTaskAC({taskId, todolistId}));
                    dispatch(setAppStatusAC({status: "succeeded"}))
                } else {
                    handleServerAppError(res.data, dispatch)
                    dispatch(changeTaskEntityStatusAC({
                        id: taskId,
                        todolistId,
                        entityStatus: "idle"
                    }))
                }
            })
            .catch((error: AxiosError) => {
                handleServerNetworkError(error, dispatch)
                dispatch(changeTaskEntityStatusAC({id: taskId, todolistId, entityStatus: "idle"}))
            })
    }
}

export const updateTaskTC = (taskId: string, todolistId: string, domainModel: UpdateDomainTaskModelType): AppThunkType => {
    return (dispatch: AppDispatchType, getState: () => RootState) => {
        const task = getState().tasks[todolistId].find(t => {
            return t.id === taskId
        })
        if (task) {
            dispatch(setAppStatusAC({status: "loading"}))
            dispatch(changeTaskEntityStatusAC({id: taskId, todolistId, entityStatus: "loading"}))
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
                    dispatch(changeTaskAC({id: taskId, domainModel, todolistId}))
                    dispatch(setAppStatusAC({status: "succeeded"}))
                } else {
                    handleServerAppError(res.data, dispatch)
                }
            })
                .catch((error: AxiosError) => {
                    handleServerNetworkError(error, dispatch)
                })
                .finally(() => {
                    dispatch(changeTaskEntityStatusAC({
                        id: taskId,
                        todolistId,
                        entityStatus: "idle"
                    }))
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
    | ReturnType<typeof setTasksAC>
    | ReturnType<typeof changeTaskAC>
    | ReturnType<typeof changeTaskEntityStatusAC>

type UpdateDomainTaskModelType = {
    title?: string
    description?: string
    status?: number
    priority?: number
    startDate?: string
    deadline?: string
}