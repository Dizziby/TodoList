import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType} from "../App";
import {debuglog} from "util";
import Button from "./Button";

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
                <Button name={"✖"} callback={() => props.removeTask(task.id) } />
            </li>
        )
    })

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input value={title} onChange={onChangeSetTitle} onKeyPress={onKeyPressOnClickAddTask}/>
                <Button name={"+"} callback={onClickAddTask} />
            </div>
            <ul>
                {taskListItems}
            </ul>
            <div>
                <Button name={"All"} callback={onClickChangeFilter("all")} />
                <Button name={"Active"} callback={onClickChangeFilter("active")} />
                <Button name={"Completed"} callback={onClickChangeFilter("completed")} />
            </div>
        </div>

    );
}

export default TodoList;