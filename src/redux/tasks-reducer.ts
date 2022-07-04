import {v1} from "uuid";
import {TaskStatuses, TaskType, todolistsAPI} from "../api/todolistAPI";
import {setTodolistsAC} from "./todolists-reducer";
import {AppDispatchType, AppThunkType, RootState} from "./store";

const initialState: TasksType = {}

export const tasksReducer = (state: TasksType = initialState, action: TasksActionType): TasksType => {
    switch (action.type) {
        case 'SET-TASKS':
            return {
                ...state,
                [action.payload.todolistId]: action.payload.tasks
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
                [action.payload.task.todoListId]: [action.payload.task, ...state[action.payload.task.todoListId]]
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
                [action.payload.todolistId]: []
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

export const updateTaskTC = (taskId: string, todolistId: string, domainModel: UpdateDomainTaskModelType): AppThunkType => {
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
                status: task.status,
                ...domainModel
            }).then(() => {
                dispatch(changeTaskAC(taskId, domainModel, todolistId))
            })
        }
    }
}

// =============================Types=============================

export type TasksType = {
    [key: string]: Array<TaskType>
}

export type TasksActionType =
    ReturnType<typeof removeTaskAC>
    | ReturnType<typeof addTaskAC>
    | ReturnType<typeof addTodolistAC>
    | ReturnType<typeof removeTodolistAC>
    | ReturnType<typeof setTodolistsAC>
    | ReturnType<typeof setTasksAC>
    | ReturnType<typeof changeTaskAC>


type UpdateDomainTaskModelType = {
    title?: string
    description?: string
    status?: number
    priority?: number
    startDate?: string
    deadline?: string
}