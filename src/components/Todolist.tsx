import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType} from "../App";
import Button from "./Button";

type TodoListPropsType = {
    title: string
    tasks: Array<TaskType>
    filter: FilterValuesType
    removeTask: (taskID: string) => void
    changeFilter: (filter: FilterValuesType) => void
    addTask: (title: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean) => void
}

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

function TodoList(props: TodoListPropsType) {

    const [error, setError] = useState<boolean>(false)
    const [title, setTitle] = useState<string>("")

    const onClickAddTask = () => {
        if (title.trim()) {
            props.addTask(title)
            setTitle("")
        } else {
            setError(true)
        }
    }
    const onChangeSetTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
        error && setError(false)
    }
    const onKeyPressOnClickAddTask = (e: KeyboardEvent<HTMLInputElement>) => e.key === "Enter" && onClickAddTask()
    const onClickChangeFilter = (filter: FilterValuesType) => props.changeFilter(filter)

    const getTaskForRender = (filter: FilterValuesType, tasks: Array<TaskType>) => {
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
        return taskForRender;
    }

    const taskForRender: Array<TaskType> = getTaskForRender(props.filter, props.tasks);

    const taskListItems = taskForRender.length
        ? taskForRender.map((task) => {

            const onChangeStatus = (e: ChangeEvent<HTMLInputElement>) => {
                props.changeTaskStatus(task.id, e.currentTarget.checked)
            }

            const taskClasses = task.isDone ? "is-done" : ""

            return (
                <li key={task.id}>
                    <input onChange={onChangeStatus} type="checkbox" checked={task.isDone}/>
                    <span className={taskClasses}>{task.title}</span>

                    <Button name={"✖"} callback={() => props.removeTask(task.id)}/>
                </li>
            )
        })
        : <span>No</span>

    const allBtnClasses = props.filter === "all" ? "active-filter" : "";
    const activeBtnClasses = props.filter === "active" ? "active-filter" : "";
    const completedBtnClasses = props.filter === "completed" ? "active-filter" : "";

    const inputClasses = error ? "error" : "";

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input
                    value={title}
                    onChange={onChangeSetTitle}
                    onKeyPress={onKeyPressOnClickAddTask}
                    className={inputClasses}
                />
                <Button name={"+"} callback={onClickAddTask}
                />
                {error && <div style={{color: "red", fontWeight: 700}}>Title is required</div>}
            </div>
            <ul>
                {taskListItems}
            </ul>
            <div>
                <button className={allBtnClasses} onClick={() => onClickChangeFilter("all")}>"All"</button>
                <button className={activeBtnClasses} onClick={() => onClickChangeFilter("active")}>"Active"</button>
                <button className={completedBtnClasses} onClick={() => onClickChangeFilter("completed")}>"Completed"</button>
            </div>
        </div>

    );
}

export default TodoList;