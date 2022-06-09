import React, {useReducer, useState} from 'react';
import './App.css';
import TodoList, {TaskType} from "./components/Todolist";
import {v1} from "uuid";
import {FullInput} from "./components/FullInput";
import ButtonAppBar from "./components/ButtonAppBar";
import {Container, Grid, Paper} from "@mui/material";
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC,
    todolistsReducer
} from "./state/todolists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./state/tasks-reducer";

export type FilterValuesType = "all" | "active" | "completed"

export type TodolistsType = {
    id: string
    title: string
    filter: FilterValuesType
}
export type TasksType = {
    [key: string]: Array<TaskType>
}

function AppWithReducer() {

    let todolistID1 = v1();
    let todolistID2 = v1();

    let [todolists, dispatchToTodolists] = useReducer(todolistsReducer, [
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'},
    ])

    let [tasks, dispatchToTasks] = useReducer(tasksReducer, {
        [todolistID1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "Rest API", isDone: false},
            {id: v1(), title: "GraphQL", isDone: false},
        ],
        [todolistID2]: [
            {id: v1(), title: "HTML&CSS2", isDone: true},
            {id: v1(), title: "JS2", isDone: true},
            {id: v1(), title: "ReactJS2", isDone: false},
            {id: v1(), title: "Rest API2", isDone: false},
            {id: v1(), title: "GraphQL2", isDone: false},
        ]
    });

    const removeTodolist = (todolisdID: string) => {
        dispatchToTodolists(removeTodolistAC(todolisdID))
        dispatchToTasks(removeTodolistAC(todolisdID))
    }

    const addTask = (todolisdID: string, title: string) => {
        dispatchToTasks(addTaskAC(title, todolisdID))
    }

    const removeTask = (todolisdID: string, taskID: string) => {
        dispatchToTasks(removeTaskAC(taskID, todolisdID))
    }

    const changeTaskStatus = (todolisdID: string, taskId: string, isDone: boolean) => {
        dispatchToTasks(changeTaskStatusAC(taskId, isDone, todolisdID))
    }

    const changeFilter = (todolisdID: string, filter: FilterValuesType) => {
        dispatchToTodolists(changeTodolistFilterAC(todolisdID, filter))
    }

    const addTodolist = (newTitle: string) => {
        let action = addTodolistAC(newTitle)
        dispatchToTodolists(action)
        dispatchToTasks(action)
    }

    const changeTodolistTitle = (todolisdID: string, newTitle: string) => {
        dispatchToTodolists(changeTodolistTitleAC(todolisdID, newTitle))
    }

    const changeTaskTitle = (todolisdID: string, taskID: string, newTitle: string) => {
        dispatchToTasks(changeTaskTitleAC(taskID,newTitle, todolisdID))
    }

    return (
        <div className="App">
            <ButtonAppBar/>
            <Container fixed>
                <Grid container style={{padding: "20px"}}>
                    <FullInput callback={addTodolist} />
                </Grid>
                <Grid container spacing={3}>
                    {todolists.map(el => {
                        return (
                            <Grid item>
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
            </Container>
        </div>
    )
}

export default AppWithReducer;
