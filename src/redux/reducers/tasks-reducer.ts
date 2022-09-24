import {TaskType, todoListsAPI} from "../../api/todolistAPI";
import {
    addTodoListTC,
    clearTodoListData, fetchTodoListsTC, removeTodoListTC,
} from "./todo-lists-reducer";
import {RequestStatusType, setAppErrorAC, setAppStatusAC} from "./app-reducer";
import {AxiosError} from "axios";
import {handleServerAppError, handleServerNetworkError} from "../../utils/error-utils";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "../store";

export const fetchTasksTC = createAsyncThunk("tasks/fetchTasks", async (todolistId: string, {dispatch}) => {
        dispatch(setAppStatusAC({status: "loading"}))
        try {
            const res = await todoListsAPI.getTasks(todolistId)
            if (res.data.error === null) {
                dispatch(setAppStatusAC({status: "succeeded"}))
                return {tasks: res.data.items, todolistId}
            } else {
                dispatch(setAppStatusAC({status: "succeeded"}))
                dispatch(setAppErrorAC({error: res.data.error}))
            }
        } catch (error: any) {
            handleServerNetworkError(error, dispatch)
        }
    }
)
export const removeTaskTC = createAsyncThunk("tasks/removeTask", async (param: { todolistId: string, taskId: string }, {dispatch}) => {
        dispatch(setAppStatusAC({status: "loading"}))
        dispatch(changeTaskEntityStatusAC({
            id: param.taskId,
            todolistId: param.todolistId,
            entityStatus: "loading"
        }))
        const res = await todoListsAPI.deleteTask(param.todolistId, param.taskId)
        try {
            if (res.data.resultCode === 0) {
                dispatch(setAppStatusAC({status: "succeeded"}))
                return {
                    taskId: param.taskId,
                    todolistId: param.todolistId
                }
            } else {
                handleServerAppError(res.data, dispatch)
                dispatch(changeTaskEntityStatusAC({
                    id: param.taskId,
                    todolistId: param.todolistId,
                    entityStatus: "idle"
                }))
            }
        } catch (error: any) {
            handleServerNetworkError(error, dispatch)
            dispatch(changeTaskEntityStatusAC({
                id: param.taskId,
                todolistId: param.todolistId,
                entityStatus: "idle"
            }))
        }
    }
)
export const addTaskTC = createAsyncThunk("tasks/addTask", async (param: { todolistId: string, title: string }, {dispatch}) => {
    dispatch(setAppStatusAC({status: "loading"}))
    try {
        const res = await todoListsAPI.createTask(param.todolistId, param.title)
        if (res.data.resultCode === 0) {
            dispatch(setAppStatusAC({status: "succeeded"}))
            return {task: res.data.data.item}
        } else {
            handleServerAppError(res.data, dispatch)
        }
    } catch (error: any) {
        handleServerNetworkError(error, dispatch)
    }
})
export const updateTaskTC = createAsyncThunk("tasks/updateTask", async (param: { taskId: string, todoListId: string, domainModel: UpdateDomainTaskModelType }, {
    dispatch,
    getState
}) => {
    const state = getState() as RootState
    const task = state.tasks[param.todoListId].find(t => {
        return t.id === param.taskId
    })
    if (task) {
        dispatch(setAppStatusAC({status: "loading"}))
        dispatch(changeTaskEntityStatusAC({
            id: param.taskId,
            todolistId: param.todoListId,
            entityStatus: "loading"
        }))
        todoListsAPI.updateTask(param.todoListId, param.taskId, {
            title: task.title,
            startDate: task.startDate,
            priority: task.priority,
            description: task.description,
            deadline: task.deadline,
            status: task.status,
            ...param.domainModel
        }).then((res) => {
            if (res.data.resultCode === 0) {
                dispatch(changeTaskAC({
                    id: param.taskId,
                    domainModel: param.domainModel,
                    todolistId: param.todoListId
                }))
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
                    id: param.taskId,
                    todolistId: param.todoListId,
                    entityStatus: "idle"
                }))
            })
    }
})

const slice = createSlice({
    name: "tasks",
    initialState: {} as TasksType,
    reducers: {
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
        builder.addCase(fetchTodoListsTC.fulfilled, (state, action) => {
            if (action.payload) {
                action.payload.todoLists.forEach((todoList) => {
                    state[todoList.id] = []
                })
            }
        })
            .addCase(addTodoListTC.fulfilled, (state, action) => {
                if (action.payload) {
                    state[action.payload.todolist.id] = []
                }
            })
            .addCase(clearTodoListData, () => {
                return {}
            })
            .addCase(fetchTasksTC.fulfilled, (state, action) => {
                if (action.payload) {
                    state[action.payload.todolistId] = action.payload.tasks.map(task => ({
                        ...task,
                        entityStatus: "idle"
                    }))
                }
            })
            .addCase(removeTaskTC.fulfilled, (state, action) => {
                if (action.payload) {
                    const index = state[action.payload.todolistId].findIndex(task => action.payload && task.id === action.payload.taskId)
                    if (index > -1) {
                        state[action.payload.todolistId].splice(index, 1)
                    }
                }
            })
            .addCase(addTaskTC.fulfilled, (state, action) => {
                if (action.payload) {
                    state[action.payload.task.todoListId].unshift({
                        ...action.payload.task,
                        entityStatus: "idle"
                    })
                }
            })
            .addCase(removeTodoListTC.fulfilled, (state, action) => {
                if (action.payload) {
                    delete state[action.payload.todolistId]
                }
            })
    }
})

export const tasksReducer = slice.reducer
export const {
    changeTaskAC,
    changeTaskEntityStatusAC
} = slice.actions


// =============================Types=============================

export type TasksType = {
    [key: string]: Array<TaskDomainType>
}

export type TaskDomainType = TaskType & {
    entityStatus: RequestStatusType
}

export type TasksActionType =
    ReturnType<typeof changeTaskAC>
    | ReturnType<typeof changeTaskEntityStatusAC>

type UpdateDomainTaskModelType = {
    title?: string
    description?: string
    status?: number
    priority?: number
    startDate?: string
    deadline?: string
}