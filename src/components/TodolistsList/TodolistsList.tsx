import React, {useCallback, useEffect} from "react";
import {useDispatch} from "react-redux";
import {AppDispatchType} from "../../redux/store";
import {
    addTodolistTC,
    changeTodolistFilterAC,
    changeTodolistTC,
    fetchTodolistsTC,
    FilterValuesType,
    removeTodolistTC
} from "../../redux/reducers/todolists-reducer";
import {addTasksTC, removeTaskTC, updateTaskTC} from "../../redux/reducers/tasks-reducer";
import {TaskStatuses} from "../../api/todolistAPI";
import {Grid, Paper} from "@mui/material";
import {FullInput} from "../common/FullInput/FullInput";
import TodoList from "./Todolist/Todolist";
import {Navigate} from "react-router-dom";
import {useAppSelector} from "../common/hooks/useAppSelector";

export const TodolistsList: React.FC<TodolistsListPropsType> = ({demo}) => {
    const dispatch: AppDispatchType = useDispatch()

    const todolists = useAppSelector(state => state.todolists)
    const tasks = useAppSelector(state => state.tasks)
    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)

    const removeTodolist = useCallback((todolisdID: string) => {
        dispatch(removeTodolistTC(todolisdID))
    }, [])
    const addTask = useCallback((todolisdID: string, title: string) => {
        dispatch(addTasksTC(todolisdID, title))
    }, [])
    const removeTask = useCallback((todolisdID: string, taskID: string) => {
        dispatch(removeTaskTC(todolisdID, taskID))
    }, [])
    const changeTaskStatus = useCallback((todolisdID: string, taskID: string, status: TaskStatuses) => {
        dispatch(updateTaskTC(taskID, todolisdID, {status}))
    }, [])
    const changeFilter = useCallback((todolisdID: string, filter: FilterValuesType) => {
        dispatch(changeTodolistFilterAC({id: todolisdID, filter}))
    }, [])
    const addTodolist = useCallback((newTitle: string) => {
        dispatch(addTodolistTC(newTitle))
    }, [])
    const changeTodolistTitle = useCallback((todolisdID: string, newTitle: string) => {
        dispatch(changeTodolistTC(todolisdID, newTitle))
    }, [])
    const changeTaskTitle = useCallback((todolisdID: string, taskID: string, newTitle: string) => {
        dispatch(updateTaskTC(taskID, todolisdID, {title: newTitle}))
    }, [])

    useEffect(() => {
        if (demo) {
            return
        }
        if(isLoggedIn) {
            dispatch(fetchTodolistsTC())
        }
    }, [])

    if(!isLoggedIn) {
        return <Navigate to="/login" />
    }

    return (
        <>
            <Grid container style={{padding: "20px"}}>
                <FullInput callback={addTodolist}/>
            </Grid>
            <Grid container spacing={3}>
                {todolists.map(el => {
                    return (
                        <Grid item key={el.id}>
                            <Paper style={{padding: "10px"}}>
                                <TodoList
                                    key={el.id}
                                    todolisdID={el.id}
                                    title={el.title}
                                    tasks={tasks[el.id]}
                                    filter={el.filter}
                                    entityStatus={el.entityStatus}
                                    removeTask={removeTask}
                                    changeFilter={changeFilter}
                                    addTask={addTask}
                                    changeTaskStatus={changeTaskStatus}
                                    removeTodolist={removeTodolist}
                                    changeTodolistTitle={changeTodolistTitle}
                                    changeTaskTitle={changeTaskTitle}
                                    demo={demo}
                                />
                            </Paper>
                        </Grid>
                    )
                })}
            </Grid>
        </>
    )
}

// =============================Types=============================

type TodolistsListPropsType = {
    demo?: boolean
}