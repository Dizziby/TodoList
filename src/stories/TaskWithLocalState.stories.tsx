import {ComponentMeta, ComponentStory} from "@storybook/react";
import {action} from "@storybook/addon-actions";
import React, {ChangeEvent, useCallback, useState} from "react";
import {Task} from "../components/Task";
import {v1} from "uuid";
import {TaskType} from "../components/Todolist";

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
        {id: v1(), title: 'HTML&CSS', isDone: true}
    )

    const changeTaskStatus = () => {
        setTask({...task, isDone: !task.isDone})
    }

    const changeTaskTitle = (taskID: string, title: string) => {
        setTask({...task, title})
    }

    return <Task {...args} task={task} changeTaskTitle={changeTaskTitle} changeTaskStatus={changeTaskStatus}/>
}



const Template: ComponentStory<typeof TaskWithLocalState> = () => <TaskWithLocalState />


export const TaskWithLocalStateStories = Template.bind({})


TaskWithLocalStateStories.args = {

}
