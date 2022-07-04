import {ComponentMeta, ComponentStory} from "@storybook/react";
import {action} from "@storybook/addon-actions";
import React, {ChangeEvent, useCallback, useState} from "react";
import {Task} from "../components/TodolistsList/Todolist/Task/Task";
import {v1} from "uuid";
import {TaskPriorities, TaskStatuses, TaskType} from "../api/todolistAPI";

export default  {
    title: "TaskWithLocalState.stories",
    component: Task,
    args: {
        removeTask: action("removeTask"),
        changeTaskStatus: action("changeTaskStatus"),
        changeTaskTitle: action("changeTaskTitle"),
    }
} as ComponentMeta<typeof Task>


const TaskWithLocalState = (args: any) => {

    const [task, setTask] = useState<TaskType>(
        {id: v1(), title: 'HTML&CSS',
            status: TaskStatuses.Completed,
            description: "",
            todoListId: "",
            startDate: "",
            deadline: "",
            addedDate: "",
            order: 0,
            priority: TaskPriorities.Low

        }
    )

    // const changeTaskStatus = () => {
    //     setTask({...task, isDone: !task.isDone})
    // }

    const changeTaskTitle = (taskID: string, title: string) => {
        setTask({...task, title})
    }

    return <Task {...args} task={task} changeTaskTitle={changeTaskTitle} />
}



const Template: ComponentStory<typeof TaskWithLocalState> = () => <TaskWithLocalState />


export const TaskWithLocalStateStories = Template.bind({})


TaskWithLocalStateStories.args = {

}
