import {combineReducers} from "redux";
import {TasksActionType, tasksReducer} from "./reducers/tasks-reducer";
import {TodoListsActionType, todoListsReducer} from "./reducers/todo-lists-reducer";
import thunk, {ThunkAction, ThunkDispatch} from "redux-thunk"
import {AppActionsType, appReducer} from "./reducers/app-reducer";
import {AuthActionType, authReducer} from "./reducers/auth-reducer";
import {configureStore} from "@reduxjs/toolkit";

const rootReducer = combineReducers(
    {
        tasks: tasksReducer,
        todolists: todoListsReducer,
        app: appReducer,
        auth:  authReducer
    }
)

export const store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware => getDefaultMiddleware().prepend(thunk)
})

// =============================Types=============================

export type RootReducerType = typeof rootReducer
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export type AppActionType = TasksActionType | TodoListsActionType | AppActionsType | AuthActionType
export type AppThunkType = ThunkAction<void, RootState, unknown, AppActionType>
export type AppDispatchType = ThunkDispatch<RootState, unknown, AppActionType>

// @ts-ignore
window.store = store