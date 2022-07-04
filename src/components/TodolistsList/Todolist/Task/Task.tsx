import React, {ChangeEvent, useCallback} from 'react';
import {Checkbox, IconButton} from "@mui/material";
import {EditableSpan} from "../../../common/EditableSpan";
import {Delete} from "@mui/icons-material";
import {TaskStatuses, TaskType} from "../../../../api/todolistAPI";

export type TaskPropsType = {
    task: TaskType
    removeTask: (taskID: string) => void
    changeTaskStatus: (taskId: string, status: TaskStatuses) => void
    changeTaskTitle: (taskID: string, newTitle: string) => void
}

export const Task: React.FC<TaskPropsType> = React.memo((props) => {

    const changeTaskStatus = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        props.changeTaskStatus(props.task.id, e.currentTarget.checked ? TaskStatuses.Completed : TaskStatuses.New)
    }, [props.changeTaskStatus, props.task.id])

    const changeTaskTitle = useCallback((newTitle: string) => {
        props.changeTaskTitle(props.task.id, newTitle)
    }, [props.changeTaskTitle, props.task.id])


    return (
        <div style={{minWidth: "200px", display: "flex", justifyContent: "space-Between"}}>
            <Checkbox style={{color: "#7F77E0"}} onChange={changeTaskStatus}
                      checked={props.task.status === TaskStatuses.Completed}/>
            <EditableSpan title={props.task.title} callback={changeTaskTitle}/>
            <IconButton aria-label="delete" style={{color: "#3A354D"}}>
                <Delete onClick={() => props.removeTask(props.task.id)}/>
            </IconButton>
        </div>
    )
})

