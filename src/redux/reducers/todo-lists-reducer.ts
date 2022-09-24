import {todoListsAPI, TodoListType} from "../../api/todolistAPI";
import {RequestStatusType, setAppStatusAC} from "./app-reducer";
import {handleServerAppError, handleServerNetworkError} from "../../utils/error-utils";
import {fetchTasksTC} from "./tasks-reducer";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";

export const fetchTodoListsTC = createAsyncThunk("todoLists/fetchTodoLists", async (param, {dispatch}) => {
    dispatch(setAppStatusAC({status: "loading"}))
    try {
        const res = await todoListsAPI.getTodolists()
        dispatch(setAppStatusAC({status: "succeeded"}))
        res.data.forEach((todoList) => {
            dispatch(fetchTasksTC(todoList.id))
        })
        return {todoLists: res.data}
    } catch (error: any) {
        handleServerNetworkError(error, dispatch)
    }
})
export const addTodoListTC = createAsyncThunk("todoLists/addTodoList", async (title: string, {dispatch}) => {
    dispatch(setAppStatusAC({status: "loading"}))
    try {
        const res = await todoListsAPI.createTodolist(title)
        if (res.data.resultCode === 0) {
            dispatch(setAppStatusAC({status: "succeeded"}))
            return {todolist: res.data.data.item}
        } else {
            handleServerAppError(res.data, dispatch)
        }
    } catch (error: any) {
        handleServerNetworkError(error, dispatch)
    }
})
export const removeTodoListTC = createAsyncThunk("todoLists/removeTodolist", async (todolistId: string, {dispatch}) => {
    dispatch(setAppStatusAC({status: "loading"}))
    dispatch(changeTodoListEntityStatusAC({id: todolistId, entityStatus: "loading"}))
    try {
        const res = await todoListsAPI.deleteTodolist(todolistId)
        if (res.data.resultCode === 0) {
            dispatch(setAppStatusAC({status: "succeeded"}))
            return {todolistId}
        } else {
            dispatch(changeTodoListEntityStatusAC({id: todolistId, entityStatus: "idle"}))
            handleServerAppError(res.data, dispatch)
        }
    } catch (error: any) {
        dispatch(changeTodoListEntityStatusAC({id: todolistId, entityStatus: "idle"}))
        handleServerNetworkError(error, dispatch)
    }
})
export const changeTodoListTC = createAsyncThunk("todoLists/changeTodoList", async (param: { todoListId: string, newTitle: string }, {dispatch}) => {
    dispatch(setAppStatusAC({status: "loading"}))
    dispatch(changeTodoListEntityStatusAC({id: param.todoListId, entityStatus: "loading"}))
    const res = await todoListsAPI.updateTodolist(param.todoListId, param.newTitle)
    try {
        if (res.data.resultCode === 0) {
            dispatch(setAppStatusAC({status: "succeeded"}))
            return {id: param.todoListId, title: param.newTitle}
        } else {
            handleServerAppError(res.data, dispatch)
        }
    } catch (error: any) {
        handleServerNetworkError(error, dispatch)
    } finally {
        dispatch(changeTodoListEntityStatusAC({
            id: param.todoListId,
            entityStatus: "idle"
        }))
    }
})

const slice = createSlice({
    name: "todoLists",
    initialState: [] as Array<TodoListDomainType>,
    reducers: {
        changeTodoListFilterAC(state, action: PayloadAction<{ id: string, filter: FilterValuesType }>) {
            const index = state.findIndex(todolist => todolist.id === action.payload.id)
            state[index].filter = action.payload.filter
        },
        changeTodoListEntityStatusAC(state, action: PayloadAction<{ id: string, entityStatus: RequestStatusType }>) {
            const index = state.findIndex(todolist => todolist.id === action.payload.id)
            state[index].entityStatus = action.payload.entityStatus
        },
        clearTodoListData() {
            return []
        },
    },
    extraReducers: builder => {
        builder.addCase(fetchTodoListsTC.fulfilled, (state, action) => {
            if (action.payload) {
                return action.payload.todoLists.map(todoList => ({
                    ...todoList,
                    filter: "all",
                    entityStatus: "idle"
                }))
            }
        })
            .addCase(addTodoListTC.fulfilled, (state, action) => {
                if (action.payload) {
                    state.unshift({
                        ...action.payload.todolist,
                        filter: "all",
                        entityStatus: "idle"
                    })
                }
            })
            .addCase(removeTodoListTC.fulfilled, (state, action) => {
                if (action.payload) {
                    const index = state.findIndex(todolist => action.payload && todolist.id === action.payload.todolistId)
                    if (index > -1) {
                        state.splice(index, 1)
                    }
                }
            })
            .addCase(changeTodoListTC.fulfilled, (state, action) => {
                if(action.payload) {
                    const index = state.findIndex(todolist => action.payload && todolist.id === action.payload.id)
                    state[index].title = action.payload.title
                }
            })
    }
})

export const todoListsReducer = slice.reducer
export const {
    changeTodoListFilterAC,
    changeTodoListEntityStatusAC,
    clearTodoListData
} = slice.actions


// =============================Types=============================

export type FilterValuesType = "all" | "active" | "completed"

export type TodoListDomainType = TodoListType & {
    filter: FilterValuesType
    entityStatus: RequestStatusType
}

export type TodoListsActionType =
   ReturnType<typeof changeTodoListFilterAC>
    | ReturnType<typeof changeTodoListEntityStatusAC>
    | ReturnType<typeof clearTodoListData>