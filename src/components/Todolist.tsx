import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType} from "../App";
import {FullInput} from "./FullInput";
import {EditableSpan} from "./EditableSpan";
import {Button, Checkbox, IconButton} from "@mui/material";
import {Delete} from "@mui/icons-material";

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
    editNameTodolist: (todolisdID: string, newTitle: string) => void
    editNameTask: (todolisdID: string, taskID: string, newTitle: string) => void
}

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

function TodoList(props: TodoListPropsType) {

    const onClickChangeFilter = (filter: FilterValuesType) => props.changeFilter(props.todolisdID, filter)

    const removeTodolistHandler = () => {
        props.removeTodolist(props.todolisdID)
    }

    const addTaskHandler = (title: string) => {
        props.addTask(props.todolisdID, title)
    }

    const editTitleTodolistHadler = (newTitle: string) => {

        props.editNameTodolist(props.todolisdID, newTitle)
    }

    const editTaskHandler = (taskID: string, newTitle: string) => {
        props.editNameTask(props.todolisdID, taskID, newTitle)
    }

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

            return (
                <li key={task.id} style={{minWidth: "200px", display: "flex", justifyContent: "space-Between"}}>
                    {/*<input onChange={onChangeStatus} type="checkbox" checked={task.isDone}/>*/}
                    <Checkbox style={{color: "#7F77E0"}} onChange={onChangeStatus} checked={task.isDone} />

                    {/*<span className={taskClasses}>{task.title}</span>*/}
                    <EditableSpan title={task.title} callback={(newTitle) => editTaskHandler(task.id, newTitle)}/>

                    {/*<button onClick={() => props.removeTask(props.todolisdID, task.id)}>✖</button>*/}
                    <IconButton aria-label="delete" style={{color: "#3A354D"}}>
                        <Delete onClick={() => props.removeTask(props.todolisdID, task.id)}/>
                    </IconButton>
                </li>
            )
        })
        : <span>No tasks</span>

    // const allBtnClasses = props.filter === "all" ? "active-filter" : "";
    // const activeBtnClasses = props.filter === "active" ? "active-filter" : "";
    // const completedBtnClasses = props.filter === "completed" ? "active-filter" : "";

    return (
        <div>
            <h3 style={{minWidth: "250px", display: "flex", justifyContent: "space-between", color: "#3A354D"}}>
                <EditableSpan title={props.title} callback={editTitleTodolistHadler}/>

                {/*<button onClick={removeTodolistHandler}>X</button>*/}
                <IconButton aria-label="delete" style={{color: "#3A354D"}}>
                    <Delete onClick={removeTodolistHandler}/>
                </IconButton>
            </h3>
            <FullInput callback={addTaskHandler}/>
            <ul style={{paddingLeft: "0"}}>
                {taskListItems}
            </ul>
            <div>
                <Button variant={props.filter === "all" ? "outlined" : "text"} color="success"
                        onClick={() => onClickChangeFilter("all")}>All</Button>
                <Button variant={props.filter === "active" ? "outlined" : "text"} color="error"
                        onClick={() => onClickChangeFilter("active")}>Active</Button>
                <Button variant={props.filter === "completed" ? "outlined" : "text"} color="secondary"
                        onClick={() => onClickChangeFilter("completed")}>Completed</Button>
                {/*<button className={allBtnClasses} onClick={() => onClickChangeFilter("all")}>"All"</button>*/}
                {/*<button className={activeBtnClasses} onClick={() => onClickChangeFilter("active")}>"Active"</button>*/}
                {/*<button className={completedBtnClasses} onClick={() => onClickChangeFilter("completed")}>"Completed"</button>*/}
            </div>
        </div>

    );
}

export default TodoList;