import React, {useCallback} from 'react';
import {FullInput} from "../../common/FullInput/FullInput";
import {EditableSpan} from "../../common/EditableSpan/EditableSpan";
import {Button, IconButton} from "@mui/material";
import {Delete} from "@mui/icons-material";
import {Task} from "./Task/Task";
import {TaskStatuses} from "../../../api/todolistAPI";
import {FilterValuesType} from "../../../redux/reducers/todolists-reducer";
import {TaskDomainType} from "../../../redux/reducers/tasks-reducer";
import {RequestStatusType} from "../../../redux/reducers/app-reducer";

const TodoList = React.memo(({demo, ...props}: TodoListPropsType) => {
    const removeTodolist = useCallback(() => {
        props.removeTodolist(props.todolisdID)
    }, [props.removeTodolist, props.todolisdID])
    const changeTodolistTitle = useCallback((newTitle: string) => {
        props.changeTodolistTitle(props.todolisdID, newTitle)
    }, [props.changeTodolistTitle, props.todolisdID])
    const addTask = useCallback((title: string) => {
        props.addTask(props.todolisdID, title)
    }, [props.addTask, props.todolisdID])
    const changeTaskTitle = useCallback((taskID: string, newTitle: string) => {
        props.changeTaskTitle(props.todolisdID, taskID, newTitle)
    }, [props.changeTaskTitle, props.todolisdID])
    const onClickChangeFilter = useCallback((filter: FilterValuesType) => {
        props.changeFilter(props.todolisdID, filter)
    }, [props.changeFilter, props.todolisdID])
    const removeTask = useCallback((taskID: string) => {
        props.removeTask(props.todolisdID, taskID)
    }, [props.removeTask, props.todolisdID])
    const changeTaskStatus = useCallback((taskId: string, status: TaskStatuses) => {
        props.changeTaskStatus(props.todolisdID, taskId, status)
    }, [props.changeTaskStatus, props.todolisdID])

    let taskForRender;
    switch (props.filter) {
        case "completed":
            taskForRender = props.tasks.filter(task => task.status === TaskStatuses.Completed);
            break;
        case "active":
            taskForRender = props.tasks.filter(task => task.status === TaskStatuses.New);
            break;
        default:
            taskForRender = props.tasks
    }

    return (
        <div>
            <h3 style={{
                minWidth: "250px",
                display: "flex",
                justifyContent: "space-between",
                color: "#3A354D"
            }}>
                <EditableSpan title={props.title} callback={changeTodolistTitle}
                              disabled={props.entityStatus === "loading"}/>
                <IconButton color={"inherit"} aria-label="delete" onClick={removeTodolist}
                            disabled={props.entityStatus === "loading"}>
                    <Delete/>
                </IconButton>
            </h3>
            <FullInput callback={addTask} disabled={props.entityStatus}/>
            {taskForRender.length
                ? taskForRender.map((task) => <Task
                        key={task.id}
                        task={task}
                        removeTask={removeTask}
                        changeTaskStatus={changeTaskStatus}
                        changeTaskTitle={changeTaskTitle}
                    />
                )
                : <div style={{padding: "10px"}}>No tasks</div>
            }
            <div>
                <Button variant={props.filter === "all" ? "outlined" : "text"} color="success"
                        onClick={() => onClickChangeFilter("all")}>All</Button>
                <Button variant={props.filter === "active" ? "outlined" : "text"} color="error"
                        onClick={() => onClickChangeFilter("active")}>Active</Button>
                <Button variant={props.filter === "completed" ? "outlined" : "text"}
                        color="secondary"
                        onClick={() => onClickChangeFilter("completed")}>Completed</Button>
            </div>
        </div>
    );
})

export default TodoList;

// =============================Types=============================

export type TodoListPropsType = {
    todolisdID: string
    title: string
    tasks: Array<TaskDomainType>
    filter: FilterValuesType
    entityStatus: RequestStatusType
    removeTask: (todolisdID: string, taskID: string) => void
    changeFilter: (todolisdID: string, filter: FilterValuesType) => void
    addTask: (todolisdID: string, title: string) => void
    changeTaskStatus: (todolisdID: string, taskId: string, status: TaskStatuses) => void
    removeTodolist: (todolisdID: string) => void
    changeTodolistTitle: (todolisdID: string, newTitle: string) => void
    changeTaskTitle: (todolisdID: string, taskID: string, newTitle: string) => void
    demo?: boolean
}