import {applyMiddleware, combineReducers, legacy_createStore as createStore} from "redux";
import {TasksActionType, tasksReducer} from "./tasks-reducer";
import {TodolistsActionType, todolistsReducer} from "./todolists-reducer";
import thunk, {ThunkAction, ThunkDispatch} from "redux-thunk"

const rootReducer = combineReducers(
    {
        tasks: tasksReducer,
        todolists: todolistsReducer
    }
)

export const store = createStore(rootReducer, applyMiddleware(thunk))

// =============================Types=============================

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
type AppActionType = TasksActionType | TodolistsActionType
export type AppThunkType = ThunkAction<void, RootState, unknown, AppActionType>
export type AppDispatchType = ThunkDispatch<RootState, unknown, AppActionType>

// @ts-ignore
window.store = store






