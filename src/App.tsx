import React, {useState} from 'react';
import './App.css';
import TodoList, {TaskType} from "./Todolist";
import {v1} from "uuid";

export type FilterValuesType = "all" | "active" | "completed"

function App() {

    const todoListTitle: string = "What to learn"

    const [tasks, setTasks] = useState<Array<TaskType>>([
        {id: v1(), title: "HTML", isDone: true},
        {id: v1(), title: "CSS", isDone: true},
        {id: v1(), title: "JS", isDone: false}
    ])

    const addTask = (title: string) => {
        setTasks([{
            id: v1(),
            title,
            isDone: false
        }, ...tasks])
    }

    const [filter, setFilter] = useState<FilterValuesType>("all")

    const changeFilter = (filter: FilterValuesType) => {
        setFilter(filter)
    }

    let taskForRender;
    switch (filter) {
        case "completed":
            taskForRender = tasks.filter(task => task.isDone);
            break;
        case "active":
            taskForRender = tasks.filter(task => !task.isDone);
            break;
        default:
            taskForRender = tasks;
    }

    const removeTask = (taskID: string) => {
        setTasks(tasks.filter(task => task.id !== taskID))
    }

    return (
        <div className="App">
            <TodoList title={todoListTitle} tasks={taskForRender} removeTask={removeTask} changeFilter={changeFilter}
                      addTask={addTask}/>
        </div>
    );
}

export default App;