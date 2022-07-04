import {Provider} from "react-redux";
import React from "react";
import {applyMiddleware, combineReducers, legacy_createStore as createStore} from 'redux'
import {v1} from "uuid";
import {tasksReducer} from "../../redux/tasks-reducer";
import {todolistsReducer} from "../../redux/todolists-reducer";
import {TaskPriorities, TaskStatuses} from "../../api/todolistAPI";
import {RootState} from "../../redux/store";
import thunk from "redux-thunk";

const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer
})

const initialGlobalState = {
    todolists: [
        {id: "todolistId1", title: 'What to learn', filter: 'all', addedDate: "", order: 0},
        {id: "todolistId2", title: 'What to buy', filter: 'all', addedDate: "", order: 0},
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
                priority: TaskPriorities.Low

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
                priority: TaskPriorities.Low

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
                priority: TaskPriorities.Low

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
                priority: TaskPriorities.Low

            }
        ]
    }
}

export const storyBookStore = createStore(rootReducer, initialGlobalState as RootState, applyMiddleware(thunk))

export const ReduxStoreProviderDecorator = (storyFn: () => React.ReactNode) => <Provider
    store={storyBookStore}>{storyFn()}</Provider>
