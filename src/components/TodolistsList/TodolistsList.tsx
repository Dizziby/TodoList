import React, {useCallback, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatchType, RootState} from "../../redux/store";
import {
    addTodolistTC,
    changeTodolistFilterAC,
    changeTodolistTC,
    fetchTodolistsTC,
    FilterValuesType,
    removeTodolistTC,
    TodolistDomainType
} from "../../redux/todolists-reducer";
import {addTasksTC, removeTaskTC, TasksType, updateTaskTC} from "../../redux/tasks-reducer";
import {TaskStatuses} from "../../api/todolistAPI";
import {Grid, Paper} from "@mui/material";
import {FullInput} from "../common/FullInput";
import TodoList from "./Todolist/Todolist";

export const TodolistsList: React.FC = () => {

    const todolists = useSelector<RootState, Array<TodolistDomainType>>(state => state.todolists)

    const tasks = useSelector<RootState, TasksType>(state => state.tasks)

    const dispatch: AppDispatchType = useDispatch()

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
        dispatch(changeTodolistFilterAC(todolisdID, filter))
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
        dispatch(fetchTodolistsTC())
    }, [])

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
                                    removeTask={removeTask}
                                    changeFilter={changeFilter}
                                    addTask={addTask}
                                    changeTaskStatus={changeTaskStatus}
                                    removeTodolist={removeTodolist}
                                    changeTodolistTitle={changeTodolistTitle}
                                    changeTaskTitle={changeTaskTitle}
                                />
                            </Paper>
                        </Grid>
                    )
                })}
            </Grid>
        </>
    )
}