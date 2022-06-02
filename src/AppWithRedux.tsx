import React from 'react';
import './App.css';
import TodoList, {TaskType} from "./components/Todolist";
import {FullInput} from "./components/FullInput";
import ButtonAppBar from "./components/ButtonAppBar";
import {Container, Grid, Paper} from "@mui/material";
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC
} from "./state/todolists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./state/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store.js";
import TodolistWithTasks from "./components/TodolistWithTasks";

export type FilterValuesType = "all" | "active" | "completed"

export type TodolistsType = {
    id: string
    title: string
    filter: FilterValuesType
}
export type TasksType = {
    [key: string]: Array<TaskType>
}

function AppWithRedux() {

    // let todolistID1 = v1();
    // let todolistID2 = v1();

    let todolists = useSelector<AppRootStateType, Array<TodolistsType>>(state => state.todolists)


    let dispatch = useDispatch()


    // let [todolists, dispatchToTodolists] = useReducer(todolistsReducer, [
    //     {id: todolistID1, title: 'What to learn', filter: 'all'},
    //     {id: todolistID2, title: 'What to buy', filter: 'all'},
    // ])

    // let [tasks, dispatchToTasks] = useReducer(tasksReducer, {
    //     [todolistID1]: [
    //         {id: v1(), title: "HTML&CSS", isDone: true},
    //         {id: v1(), title: "JS", isDone: true},
    //         {id: v1(), title: "ReactJS", isDone: false},
    //         {id: v1(), title: "Rest API", isDone: false},
    //         {id: v1(), title: "GraphQL", isDone: false},
    //     ],
    //     [todolistID2]: [
    //         {id: v1(), title: "HTML&CSS2", isDone: true},
    //         {id: v1(), title: "JS2", isDone: true},
    //         {id: v1(), title: "ReactJS2", isDone: false},
    //         {id: v1(), title: "Rest API2", isDone: false},
    //         {id: v1(), title: "GraphQL2", isDone: false},
    //     ]
    // });

    const removeTodolist = (todolisdID: string) => {
        dispatch(removeTodolistAC(todolisdID))
    }

    const addTask = (todolisdID: string, title: string) => {
        dispatch(addTaskAC(title, todolisdID))
    }

    const removeTask = (todolisdID: string, taskID: string) => {
        dispatch(removeTaskAC(taskID, todolisdID))
    }

    const changeTaskStatus = (todolisdID: string, taskId: string, isDone: boolean) => {
        dispatch(changeTaskStatusAC(taskId, isDone, todolisdID))
    }

    const changeFilter = (todolisdID: string, filter: FilterValuesType) => {
        dispatch(changeTodolistFilterAC(todolisdID, filter))
    }

    const addTodolist = (newTitle: string) => {
        dispatch(addTodolistAC(newTitle))
    }

    const editNameTodolist = (todolisdID: string, newTitle: string) => {
        dispatch(changeTodolistTitleAC(todolisdID, newTitle))
    }

    const editNameTask = (todolisdID: string, taskID: string, newTitle: string) => {
        dispatch(changeTaskTitleAC(taskID, newTitle, todolisdID))
    }

    return (
        <div className="App">
            <ButtonAppBar/>
            <Container fixed>
                <Grid container style={{padding: "20px"}}>
                    <FullInput callback={addTodolist}/>
                </Grid>
                <Grid container spacing={3}>
                    {todolists.map(el => {
                        return (
                            <Grid item key={el.id}>
                                <Paper style={{padding: "10px"}}>
                                    {/*<TodoList*/}
                                    {/*    key={el.id}*/}
                                    {/*    todolisdID={el.id}*/}
                                    {/*    title={el.title}*/}
                                    {/*    tasks={tasks[el.id]}*/}
                                    {/*    filter={el.filter}*/}
                                    {/*    removeTask={removeTask}*/}
                                    {/*    changeFilter={changeFilter}*/}
                                    {/*    addTask={addTask}*/}
                                    {/*    changeTaskStatus={changeTaskStatus}*/}
                                    {/*    removeTodolist={removeTodolist}*/}
                                    {/*    editNameTodolist={editNameTodolist}*/}
                                    {/*    editNameTask={editNameTask}*/}
                                    {/*/>*/}

                                    <TodolistWithTasks
                                        todolist={el}
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

export default AppWithRedux;
