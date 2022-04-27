import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType} from "../App";

type TodoListPropsType = {
    todolisdID: string
    title: string
    tasks: Array<TaskType>
    filter: FilterValuesType
    removeTask: (todolisdID: string, taskID: string) => void
    changeFilter: (todolisdID: string, filter: FilterValuesType) => void
    addTask: (todolisdID: string, title: string) => void
    changeTaskStatus: (todolisdID: string, taskId: string, isDone: boolean) => void
    removeTodolist: (todolisdID: string) => void
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
            props.addTask(props.todolisdID, title)
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
    const onClickChangeFilter = (filter: FilterValuesType) => props.changeFilter(props.todolisdID, filter)

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
                props.changeTaskStatus(props.todolisdID, task.id, e.currentTarget.checked)
            }

            const taskClasses = task.isDone ? "is-done" : ""

            return (
                <li key={task.id}>
                    <input onChange={onChangeStatus} type="checkbox" checked={task.isDone}/>
                    <span className={taskClasses}>{task.title}</span>
                    <button onClick={() => props.removeTask(props.todolisdID, task.id)}>✖</button>
                </li>
            )
        })
        : <span>No</span>

    const allBtnClasses = props.filter === "all" ? "active-filter" : "";
    const activeBtnClasses = props.filter === "active" ? "active-filter" : "";
    const completedBtnClasses = props.filter === "completed" ? "active-filter" : "";

    const inputClasses = error ? "error" : "";

    const removeTodolistHandler = () => {
        props.removeTodolist(props.todolisdID)
    }


    return (
        <div>
            <h3>{props.title}</h3>
            <button onClick={removeTodolistHandler}>X</button>
            <div>
                <input
                    value={title}
                    onChange={onChangeSetTitle}
                    onKeyPress={onKeyPressOnClickAddTask}
                    className={inputClasses}
                />
                <button onClick={onClickAddTask}>+</button>

                {error && <div style={{color: "red", fontWeight: 700}}>Title is required</div>}
            </div>
            <ul>
                {taskListItems}
            </ul>
            <div>
                <button className={allBtnClasses} onClick={() => onClickChangeFilter("all")}>"All"</button>
                <button className={activeBtnClasses} onClick={() => onClickChangeFilter("active")}>"Active"</button>
                <button className={completedBtnClasses} onClick={() => onClickChangeFilter("completed")}>"Completed"
                </button>
            </div>
        </div>

    );
}

export default TodoList;