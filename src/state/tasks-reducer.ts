import {v1} from "uuid";
import {TaskStatuses, TaskType, todolistsAPI} from "../api/todolistAPI";
import {setTodolistsAC} from "./todolists-reducer";
import {AppDispatchType, AppThunkType, RootState} from "./store";

export type TasksType = {
    [key: string]: Array<TaskType>
}

const initialState: TasksType = {}

export const tasksReducer = (state: TasksType = initialState, action: TasksActionType): TasksType => {
    switch (action.type) {
        case 'SET-TASKS': {
            const stateCopy = {...state}
            stateCopy[action.todolistId] = action.tasks
            return stateCopy
        }
        case 'SET-TODOLISTS': {
            const stateCopy = {...state}
            action.payload.todolists.forEach((todolist) => {
                stateCopy[todolist.id] = []
            })
            return stateCopy;
        }
        case 'REMOVE-TASK': {
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId].filter(el => el.id !== action.payload.taskId)
            }
        }
        // case "ADD-TASK": {
        //     return {
        //         ...state,
        //         [action.payload.todolistId]: [{
        //             id: v1(),
        //             title: action.payload.title,
        //             status: TaskStatuses.New,
        //             description: "",
        //             todoListId: action.payload.todolistId,
        //             startDate: "",
        //             deadline: "",
        //             addedDate: "",
        //             order: 0,
        //             priority: TaskPriorities.Low
        //
        //         }, ...state[action.payload.todolistId]]
        //     }
        // }
        case 'ADD-TASK': {
            const stateCopy = {...state}
            const tasks = stateCopy[action.task.todoListId];
            const newTasks = [action.task, ...tasks];
            stateCopy[action.task.todoListId] = newTasks;
            return stateCopy;
            // Will change
        }
        case "CHANGE-TASK-STATUS": {
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId].map(el => el.id === action.payload.id ? {
                    ...el,
                    status: action.payload.status
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

export type TasksActionType =
    ReturnType<typeof removeTaskAC>
    | ReturnType<typeof addTaskAC>
    | ReturnType<typeof changeTaskStatusAC>
    | ReturnType<typeof changeTaskTitleAC>
    | ReturnType<typeof addTodolistAC>
    | ReturnType<typeof removeTodolistAC>
    | ReturnType<typeof setTodolistsAC>
    | ReturnType<typeof setTasksAC>


export const removeTaskAC = (taskId: string, todolistId: string) => ({
    type: 'REMOVE-TASK',
    payload: {
        taskId,
        todolistId
    }
}) as const

export const changeTaskStatusAC = (id: string, status: TaskStatuses, todolistId: string) => ({
    type: 'CHANGE-TASK-STATUS',
    payload: {
        id,
        status,
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

export const setTasksAC = (tasks: Array<TaskType>, todolistId: string) => ({
    type: 'SET-TASKS', tasks, todolistId
}) as const

export const addTaskAC = (task: TaskType) => ({
    type: 'ADD-TASK',
    task
}) as const


// =============================TC=============================


export const fetchTasksTC = (todolistId: string): AppThunkType => (dispatch: AppDispatchType) => {
    todolistsAPI.getTasks(todolistId)
        .then((res) => {
            dispatch(setTasksAC(res.data.items, todolistId))
        })
}

export const addTasksTC = (todolistId: string, title: string): AppThunkType => {
    return (dispatch: AppDispatchType) => {
        todolistsAPI.createTask(todolistId, title)
            .then((res) => {
                dispatch(addTaskAC(res.data.data.item));
            });
    };
};

export const removeTaskTC = (todolistId: string, taskId: string): AppThunkType => {
    return (dispatch: AppDispatchType) => {
        todolistsAPI.deleteTask(todolistId, taskId)
            .then((res) => {
                res.data.resultCode === 0 && dispatch(removeTaskAC(taskId, todolistId));
            });
    };
};


export const updateTaskStatusTC = (taskId: string, todolistId: string, status: TaskStatuses): AppThunkType => {
    return (dispatch: AppDispatchType, getState: () => RootState) => {
        const task = getState().tasks[todolistId].find(t => {
            return t.id === taskId
        })
        if (task) {
            todolistsAPI.updateTask(todolistId, taskId, {
                title: task.title,
                startDate: task.startDate,
                priority: task.priority,
                description: task.description,
                deadline: task.deadline,
                status: status,
            }).then(() => {
                dispatch(changeTaskStatusAC(taskId, status, todolistId))
            })
        }
    }
}

