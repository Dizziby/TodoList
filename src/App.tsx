import React, {useState} from 'react';
import './App.css';
import TodoList, {TaskType} from "./components/Todolist";
import {v1} from "uuid";
import {FullInput} from "./components/FullInput";
import ButtonAppBar from "./components/ButtonAppBar";
import {Container, Grid, Paper} from "@mui/material";

export type FilterValuesType = "all" | "active" | "completed"

export type TodolistsType = {
    id: string
    title: string
    filter: FilterValuesType
}

type TasksType = {
    [key: string]: Array<TaskType>
}

function App() {

    let todolistID1 = v1();
    let todolistID2 = v1();

    let [todolists, setTodolists] = useState<Array<TodolistsType>>([
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'},
    ])

    let [tasks, setTasks] = useState<TasksType>({
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
        setTodolists(todolists.filter(el => el.id !== todolisdID))
        delete tasks[todolisdID]
    }

    const addTask = (todolisdID: string, title: string) => {
        setTasks({
            ...tasks, [todolisdID]: [{
                id: v1(),
                title,
                isDone: false
            },
                ...tasks[todolisdID],
            ]
        })
    }

    const removeTask = (todolisdID: string, taskID: string) => {
        setTasks({...tasks, [todolisdID]: tasks[todolisdID].filter(el => el.id !== taskID)})
    }

    const changeTaskStatus = (todolisdID: string, taskId: string, isDone: boolean) => {
        setTasks({...tasks, [todolisdID]: tasks[todolisdID].map(el => el.id === taskId ? {...el, isDone} : el)})
    }

    const changeFilter = (todolisdID: string, filter: FilterValuesType) => {
        setTodolists(todolists.map(el => el.id === todolisdID ? {...el, filter: filter} : {...el}))
    }

    const addTodolist = (newTitle: string) => {
        let newID = v1()
        let newTodolist: TodolistsType = {id: newID, title: newTitle, filter: 'all'}
        setTodolists([...todolists, newTodolist])
        setTasks({...tasks, [newID]: []})
    }

    const editNameTodolist = (todolisdID: string, newTitle: string) => {
        setTodolists(todolists.map(el => el.id === todolisdID ? {...el, title: newTitle} : el))
    }

    const editNameTask = (todolisdID: string, taskID: string, newTitle: string) => {
        setTasks({
            ...tasks,
            [todolisdID]: tasks[todolisdID].map(el => el.id === taskID ? {...el, title: newTitle} : el)
        })
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
                                        editNameTodolist={editNameTodolist}
                                        editNameTask={editNameTask}
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

export default App;