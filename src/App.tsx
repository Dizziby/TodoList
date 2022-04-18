import React, {useState} from 'react';
import './App.css';
import TodoList, {TaskType} from "./components/Todolist";
import {v1} from "uuid";

export type FilterValuesType = "all" | "active" | "completed"

function App() {

    const todoListTitle: string = "What to learn"

    const [tasks, setTasks] = useState<Array<TaskType>>([
        {id: v1(), title: "HTML", isDone: true},
        {id: v1(), title: "CSS", isDone: true},
        {id: v1(), title: "JS", isDone: false},
        {id: v1(), title: "Rest API", isDone: false},
        {id: v1(), title: "GraphQL", isDone: false},
    ])

    const addTask = (title: string) => {
        setTasks([{
            id: v1(),
            title,
            isDone: false
        },
            ...tasks])
    }
    const removeTask = (taskID: string) => {
        setTasks(tasks.filter(task => task.id !== taskID))
    }
    const changeTaskStatus = (taskId: string, isDone: boolean) => {
        setTasks(tasks.map(task => task.id === taskId ? {...task, isDone: isDone} : task))
    }

    const [filter, setFilter] = useState<FilterValuesType>("all")
    const changeFilter = (filter: FilterValuesType) => {
        setFilter(filter)
    }

    return (
        <div className="App">
            <TodoList title={todoListTitle}
                      tasks={tasks}
                      filter={filter}
                      removeTask={removeTask}
                      changeFilter={changeFilter}
                      addTask={addTask}
                      changeTaskStatus={changeTaskStatus}
            />
        </div>
    );
}

export default App;