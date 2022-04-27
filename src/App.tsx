import React, {useState} from 'react';
import './App.css';
import TodoList from "./components/Todolist";
import {v1} from "uuid";

export type FilterValuesType = "all" | "active" | "completed"

export type TodolistsType = {
    id: string
    title: string
    filter: FilterValuesType
}

function App() {

    let todolistID1 = v1();
    let todolistID2 = v1();

    let [todolists, setTodolists] = useState<Array<TodolistsType>>([
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'},
    ])

    let [tasks, setTasks] = useState({
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

    return (
        <div className="App">
            {todolists.map(el => {
                return (<TodoList
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
                    />
                )
            })}
        </div>
    )
}

export default App;