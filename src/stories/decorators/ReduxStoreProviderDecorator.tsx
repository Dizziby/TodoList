import {Provider} from "react-redux";
import React from "react";
import {combineReducers} from 'redux'
import {v1} from "uuid";
import {tasksReducer} from "../../redux/reducers/tasks-reducer";
import {todoListsReducer} from "../../redux/reducers/todo-lists-reducer";
import {TaskPriorities, TaskStatuses} from "../../api/todolistAPI";
import {RootReducerType, RootState} from "../../redux/store";
import thunk from "redux-thunk";
import {appReducer} from "../../redux/reducers/app-reducer";
import {authReducer} from "../../redux/reducers/auth-reducer";
import {configureStore} from "@reduxjs/toolkit";

export const rootReducer: RootReducerType = combineReducers(
    {
        tasks: tasksReducer,
        todolists: todoListsReducer,
        app: appReducer,
        auth:  authReducer
    }
)


const initialGlobalState = {
    todolists: [
        {
            id: "todolistId1",
            title: 'What to learn',
            filter: 'all',
            addedDate: "",
            order: 0,
            entityStatus: "idle"
        },
        {
            id: "todolistId2",
            title: 'What to buy',
            filter: 'all',
            addedDate: "",
            order: 0,
            entityStatus: "idle"
        },
    ],
    tasks: {
        ['todolistId1']: [
            {
                id: v1(), title: 'HTML&CSS',
                status: TaskStatuses.Completed,
                description: "",
                todoListId: 'todolistId1',
                startDate: "",
                deadline: "",
                addedDate: "",
                order: 0,
                priority: TaskPriorities.Low,
                entityStatus: "idle"

            },
            {
                id: v1(), title: 'JS',
                status: TaskStatuses.Completed,
                description: "",
                todoListId: 'todolistId1',
                startDate: "",
                deadline: "",
                addedDate: "",
                order: 0,
                priority: TaskPriorities.Low,
                entityStatus: "idle"
            }
        ],
        ['todolistId2']: [
            {
                id: v1(), title: 'Milk',
                status: TaskStatuses.Completed,
                description: "",
                todoListId: 'todolistId2',
                startDate: "",
                deadline: "",
                addedDate: "",
                order: 0,
                priority: TaskPriorities.Low,
                entityStatus: "idle"
            },
            {
                id: v1(), title: 'React Book',
                status: TaskStatuses.Completed,
                description: "",
                todoListId: 'todolistId2',
                startDate: "",
                deadline: "",
                addedDate: "",
                order: 0,
                priority: TaskPriorities.Low,
                entityStatus: "idle"
            }
        ]

    },
    app: {
        status: 'idle',
        error: null,
        isInitialized: true
    },
    auth: {
        isLoggedIn: true
    }
}

export const storyBookStore = configureStore({
    reducer: rootReducer,
    preloadedState: initialGlobalState as RootState,
    middleware: getDefaultMiddleware => getDefaultMiddleware().prepend(thunk),

})

export const ReduxStoreProviderDecorator = (storyFn: () => React.ReactNode) => <Provider
    store={storyBookStore}>
        {storyFn()}
</Provider>
