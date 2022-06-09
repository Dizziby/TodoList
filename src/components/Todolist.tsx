import React, {useCallback} from 'react';
import {FilterValuesType} from "../AppWithRedux";
import {FullInput} from "./FullInput";
import {EditableSpan} from "./EditableSpan";
import {Button, IconButton} from "@mui/material";
import {Delete} from "@mui/icons-material";
import {Task} from "./Task";

export type TodoListPropsType = {
    todolisdID: string
    title: string
    tasks: Array<TaskType>
    filter: FilterValuesType
    removeTask: (todolisdID: string, taskID: string) => void
    changeFilter: (todolisdID: string, filter: FilterValuesType) => void
    addTask: (todolisdID: string, title: string) => void
    changeTaskStatus: (todolisdID: string, taskId: string, isDone: boolean) => void
    removeTodolist: (todolisdID: string) => void
    changeTodolistTitle: (todolisdID: string, newTitle: string) => void
    changeTaskTitle: (todolisdID: string, taskID: string, newTitle: string) => void
}

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

const TodoList = React.memo((props: TodoListPropsType) => {
    console.log("Todolist called")

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

    const removeTask = useCallback((taskID: string)=> {
        props.removeTask(props.todolisdID, taskID)
    }, [props.removeTask, props.todolisdID])

    const changeTaskStatus = useCallback((taskId: string, isDone: boolean) => {
        props.changeTaskStatus(props.todolisdID, taskId, isDone)
    }, [props.changeTaskStatus, props.todolisdID])

    let taskForRender;
    switch (props.filter) {
        case "completed":
            taskForRender = props.tasks.filter(task => task.isDone);
            break;
        case "active":
            taskForRender = props.tasks.filter(task => !task.isDone);
            break;
        default:
            taskForRender = props.tasks
    }

    // const allBtnClasses = props.filter === "all" ? "active-filter" : "";
    // const activeBtnClasses = props.filter === "active" ? "active-filter" : "";
    // const completedBtnClasses = props.filter === "completed" ? "active-filter" : "";

    return (
        <div>
            <h3 style={{minWidth: "250px", display: "flex", justifyContent: "space-between", color: "#3A354D"}}>
                <EditableSpan title={props.title} callback={changeTodolistTitle}/>

                {/*<button onClick={removeTodolistHandler}>X</button>*/}
                <IconButton aria-label="delete" style={{color: "#3A354D"}}>
                    <Delete onClick={removeTodolist}/>
                </IconButton>
            </h3>
            <FullInput callback={addTask}/>

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
                <Button variant={props.filter === "completed" ? "outlined" : "text"} color="secondary"
                        onClick={() => onClickChangeFilter("completed")}>Completed</Button>

                {/*<button className={allBtnClasses} onClick={() => onClickChangeFilter("all")}>"All"</button>*/}
                {/*<button className={activeBtnClasses} onClick={() => onClickChangeFilter("active")}>"Active"</button>*/}
                {/*<button className={completedBtnClasses} onClick={() => onClickChangeFilter("completed")}>"Completed"</button>*/}
            </div>

        </div>

    );
})

export default TodoList;