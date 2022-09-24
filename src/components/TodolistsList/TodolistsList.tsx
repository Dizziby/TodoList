import React, {useCallback, useEffect} from "react";
import {useDispatch} from "react-redux";
import {AppDispatchType} from "../../redux/store";
import {
    addTodoListTC,
    changeTodoListFilterAC,
    changeTodoListTC,
    fetchTodoListsTC,
    FilterValuesType,
    removeTodoListTC
} from "../../redux/reducers/todo-lists-reducer";
import {addTaskTC, removeTaskTC, updateTaskTC} from "../../redux/reducers/tasks-reducer";
import {TaskStatuses} from "../../api/todolistAPI";
import {Grid, Paper} from "@mui/material";
import {FullInput} from "../common/FullInput/FullInput";
import TodoList from "./Todolist/Todolist";
import {Navigate} from "react-router-dom";
import {useAppSelector} from "../common/hooks/useAppSelector";

export const TodolistsList: React.FC<TodoListsListPropsType> = ({demo}) => {
    const dispatch: AppDispatchType = useDispatch()

    const todolists = useAppSelector(state => state.todolists)
    const tasks = useAppSelector(state => state.tasks)
    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)

    const removeTodolist = useCallback((todoListId: string) => {
        dispatch(removeTodoListTC(todoListId))
    }, [dispatch])
    const addTask = useCallback((todolistId: string, title: string) => {
        dispatch(addTaskTC({todolistId, title}))
    }, [dispatch])
    const removeTask = useCallback((todolistId: string, taskId: string) => {
        dispatch(removeTaskTC({todolistId, taskId}))
    }, [dispatch])
    const changeTaskStatus = useCallback((todoListId: string, taskId: string, status: TaskStatuses) => {
        dispatch(updateTaskTC({taskId, todoListId, domainModel: {status}}))
    }, [dispatch])
    const changeFilter = useCallback((todoListId: string, filter: FilterValuesType) => {
        dispatch(changeTodoListFilterAC({id: todoListId, filter}))
    }, [dispatch])
    const addTodolist = useCallback((newTitle: string) => {
        dispatch(addTodoListTC(newTitle))
    }, [dispatch])
    const changeTodolistTitle = useCallback((todoListId: string, newTitle: string) => {
        dispatch(changeTodoListTC({todoListId, newTitle}))
    }, [dispatch])
    const changeTaskTitle = useCallback((todoListId: string, taskId: string, newTitle: string) => {
        dispatch(updateTaskTC({taskId, todoListId, domainModel: {title: newTitle}}))
    }, [dispatch])

    useEffect(() => {
        if (demo) {
            return
        }
        if (isLoggedIn) {
            dispatch(fetchTodoListsTC())
        }
    }, [dispatch, demo, isLoggedIn])

    if (!isLoggedIn) {
        return <Navigate to="/login"/>
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

type TodoListsListPropsType = {
    demo?: boolean
}