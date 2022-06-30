import React, {useReducer} from 'react';
import './App.css';
import TodoList from "./components/Todolist";
import {v1} from "uuid";
import {FullInput} from "./components/FullInput";
import ButtonAppBar from "./components/ButtonAppBar";
import {Container, Grid, Paper} from "@mui/material";
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC, FilterValuesType,
    removeTodolistAC,
    todolistsReducer
} from "./state/todolists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./state/tasks-reducer";
import {TaskPriorities, TaskStatuses} from "./api/todolistAPI";

function AppWithReducer() {

    let todolistID1 = v1();
    let todolistID2 = v1();

    let [todolists, dispatchToTodolists] = useReducer(todolistsReducer, [
        {id: todolistID1, title: 'What to learn', filter: 'all', addedDate: "", order: 0},
        {id: todolistID2, title: 'What to buy', filter: 'all', addedDate: "", order: 0},
    ])

    let [tasks, dispatchToTasks] = useReducer(tasksReducer, {
        [todolistID1]: [
            {
                id: v1(),
                title: "HTML&CSS",
                status: TaskStatuses.Completed,
                description: "",
                todoListId: todolistID1,
                startDate: "",
                deadline: "",
                addedDate: "",
                order: 0,
                priority: TaskPriorities.Low
            },
            {
                id: v1(),
                title: "JS",
                status: TaskStatuses.Completed,
                description: "",
                todoListId: todolistID1,
                startDate: "",
                deadline: "",
                addedDate: "",
                order: 0,
                priority: TaskPriorities.Low
            },
            {
                id: v1(),
                title: "ReactJS",
                status: TaskStatuses.New,
                description: "",
                todoListId: todolistID1,
                startDate: "",
                deadline: "",
                addedDate: "",
                order: 0,
                priority: TaskPriorities.Low
            },
            {
                id: v1(),
                title: "Rest API",
                status: TaskStatuses.New,
                description: "",
                todoListId: todolistID1,
                startDate: "",
                deadline: "",
                addedDate: "",
                order: 0,
                priority: TaskPriorities.Low
            },
            {
                id: v1(),
                title: "GraphQL",
                status: TaskStatuses.New,
                description: "",
                todoListId: todolistID1,
                startDate: "",
                deadline: "",
                addedDate: "",
                order: 0,
                priority: TaskPriorities.Low
            },
        ],
        [todolistID2]: [
            {
                id: v1(),
                title: "HTML&CSS2",
                status: TaskStatuses.Completed,
                description: "",
                todoListId: todolistID2,
                startDate: "",
                deadline: "",
                addedDate: "",
                order: 0,
                priority: TaskPriorities.Low
            },
            {
                id: v1(),
                title: "JS2",
                status: TaskStatuses.Completed,
                description: "",
                todoListId: todolistID2,
                startDate: "",
                deadline: "",
                addedDate: "",
                order: 0,
                priority: TaskPriorities.Low
            },
            {
                id: v1(),
                title: "ReactJS2",
                status: TaskStatuses.New,
                description: "",
                todoListId: todolistID2,
                startDate: "",
                deadline: "",
                addedDate: "",
                order: 0,
                priority: TaskPriorities.Low
            },
            {
                id: v1(),
                title: "Rest API2",
                status: TaskStatuses.New,
                description: "",
                todoListId: todolistID2,
                startDate: "",
                deadline: "",
                addedDate: "",
                order: 0,
                priority: TaskPriorities.Low
            },
            {
                id: v1(),
                title: "GraphQL2",
                status: TaskStatuses.New,
                description: "",
                todoListId: todolistID2,
                startDate: "",
                deadline: "",
                addedDate: "",
                order: 0,
                priority: TaskPriorities.Low
            },
        ]
    });

    const removeTodolist = (todolisdID: string) => {
        dispatchToTodolists(removeTodolistAC(todolisdID))
        dispatchToTasks(removeTodolistAC(todolisdID))
    }

    const addTask = (todolisdID: string, title: string) => {
        const task = {
            id: v1(),
            title,
            status: TaskStatuses.New,
            description: "",
            todoListId: todolisdID,
            startDate: "",
            deadline: "",
            addedDate: "",
            order: 0,
            priority: TaskPriorities.Low
        }
        dispatchToTasks(addTaskAC(task))
    }

    const removeTask = (todolisdID: string, taskID: string) => {
        dispatchToTasks(removeTaskAC(taskID, todolisdID))
    }

    const changeTaskStatus = (todolisdID: string, taskId: string, status: TaskStatuses) => {
        dispatchToTasks(changeTaskStatusAC(taskId, status, todolisdID))
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
