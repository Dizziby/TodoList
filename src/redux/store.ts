import {applyMiddleware, combineReducers, legacy_createStore as createStore} from "redux";
import {TasksActionType, tasksReducer} from "./tasks-reducer";
import {TodolistsActionType, todolistsReducer} from "./todolists-reducer";
import thunk, {ThunkAction, ThunkDispatch} from "redux-thunk"
import {AppActionsType, appReducer} from "./app-reducer";
import {TypedUseSelectorHook, useSelector} from "react-redux";

const rootReducer = combineReducers(
    {
        tasks: tasksReducer,
        todolists: todolistsReducer,
        app: appReducer
    }
)

export const store = createStore(rootReducer, applyMiddleware(thunk))

// =============================Types=============================

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

type AppActionType = TasksActionType | TodolistsActionType | AppActionsType
export type AppThunkType = ThunkAction<void, RootState, unknown, AppActionType>
export type AppDispatchType = ThunkDispatch<RootState, unknown, AppActionType>

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector


// @ts-ignore
window.store = store






