import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType} from "./App";

type TodoListPropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskID: string) => void
    changeFilter: (filter: FilterValuesType) => void
    addTask: (title: string) => void
}

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

function TodoList(props: TodoListPropsType) {

    const [title, setTitle] = useState<string>("")

    const onClickAddTask = () => {
        title.trim() && props.addTask(title)
        setTitle("")
    }

    const onChangeSetTitle = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value)

    const onKeyPressOnClickAddTask = (e: KeyboardEvent<HTMLInputElement>) => e.key === "Enter" && onClickAddTask()

    const onClickChangeFilter = (filter: FilterValuesType) => () => props.changeFilter(filter)


    const taskListItems = props.tasks.map((task) => {
        return (
            <li key={task.id}>
                <input type="checkbox" checked={task.isDone}/>
                <span>{task.title}</span>
                <button onClick={() => props.removeTask(task.id)}>x</button>
            </li>
        )
    })

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input value={title} onChange={onChangeSetTitle} onKeyPress={onKeyPressOnClickAddTask}/>
                <button onClick={onClickAddTask}>+</button>
            </div>
            <ul>
                {taskListItems}
            </ul>
            <div>
                <button onClick={onClickChangeFilter("all")}>All</button>
                <button onClick={onClickChangeFilter("active")}>Active</button>
                <button onClick={onClickChangeFilter("completed")}>Completed</button>
            </div>
        </div>

    );
}

export default TodoList;
