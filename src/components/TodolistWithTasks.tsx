import React, {ChangeEvent} from 'react';
import {FullInput} from "./FullInput";
import {EditableSpan} from "./EditableSpan";
import {Button, Checkbox, IconButton} from "@mui/material";
import {Delete} from "@mui/icons-material";
import {
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    FilterValuesType,
    removeTodolistAC,
    TodolistDomainType
} from "../state/todolists-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../state/store.js";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "../state/tasks-reducer";
import {TaskStatuses, TaskType} from "../api/todolistAPI";


type TodolistWithTasksPropsType = {
    todolist: TodolistDomainType
}

function TodolistWithTasks({todolist}: TodolistWithTasksPropsType) {

    let tasks = useSelector<AppRootStateType, Array<TaskType>>(state => state.tasks[todolist.id])

    const dispatch = useDispatch()

    const onClickChangeFilter = (filter: FilterValuesType) => dispatch(changeTodolistFilterAC(todolist.id, filter))

    const removeTodolistHandler = () => {
        dispatch(removeTodolistAC(todolist.id))
    }

    const addTaskHandler = (title: string) => {
        dispatch(addTaskAC(title, todolist.id))
    }

    const editTitleTodolistHandler = (newTitle: string) => {
        dispatch(changeTodolistTitleAC(todolist.id, newTitle))
    }

    const editTaskHandler = (taskID: string, newTitle: string) => {
        dispatch(changeTaskTitleAC(todolist.id, taskID, newTitle))
    }

    const getTaskForRender = (filter: FilterValuesType, tasks: Array<TaskType>) => {
        let taskForRender;
        switch (filter) {
            case "completed":
                taskForRender = tasks.filter(task => task.status === TaskStatuses.Completed);
                break;
            case "active":
                taskForRender = tasks.filter(task => task.status === TaskStatuses.New);
                break;
            default:
                taskForRender = tasks;
        }
        return taskForRender;
    }

    const taskForRender: Array<TaskType> = getTaskForRender(todolist.filter, tasks);

    const taskListItems = taskForRender.length
        ? taskForRender.map((task) => {

            const onChangeStatus = (e: ChangeEvent<HTMLInputElement>) => {
                dispatch(changeTaskStatusAC(task.id, e.currentTarget.checked ? TaskStatuses.Completed : TaskStatuses.New,  todolist.id))
            }

            return (
                <li key={task.id} style={{minWidth: "200px", display: "flex", justifyContent: "space-Between"}}>
                    {/*<input onChange={onChangeStatus} type="checkbox" checked={task.isDone}/>*/}
                    <Checkbox style={{color: "#7F77E0"}} onChange={onChangeStatus} checked={task.status === TaskStatuses.Completed} />

                    {/*<span className={taskClasses}>{task.title}</span>*/}
                    <EditableSpan title={task.title} callback={(newTitle) => editTaskHandler(task.id, newTitle)}/>

                    {/*<button onClick={() => props.removeTask(props.todolisdID, task.id)}>✖</button>*/}
                    <IconButton aria-label="delete" style={{color: "#3A354D"}}>
                        <Delete onClick={() => dispatch(removeTaskAC(task.id, todolist.id))}/>
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
                <EditableSpan title={todolist.title} callback={editTitleTodolistHandler}/>

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
                <Button variant={todolist.filter === "all" ? "outlined" : "text"} color="success"
                        onClick={() => onClickChangeFilter("all")}>All</Button>
                <Button variant={todolist.filter === "active" ? "outlined" : "text"} color="error"
                        onClick={() => onClickChangeFilter("active")}>Active</Button>
                <Button variant={todolist.filter === "completed" ? "outlined" : "text"} color="secondary"
                        onClick={() => onClickChangeFilter("completed")}>Completed</Button>
                {/*<button className={allBtnClasses} onClick={() => onClickChangeFilter("all")}>"All"</button>*/}
                {/*<button className={activeBtnClasses} onClick={() => onClickChangeFilter("active")}>"Active"</button>*/}
                {/*<button className={completedBtnClasses} onClick={() => onClickChangeFilter("completed")}>"Completed"</button>*/}
            </div>
        </div>

    );
}

export default TodolistWithTasks;