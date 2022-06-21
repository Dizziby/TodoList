import {ComponentMeta, ComponentStory} from "@storybook/react";
import {action} from "@storybook/addon-actions";
import React from "react";
import {Task} from "../components/Task";
import {v1} from "uuid";

export default  {
    title: "Task",
    component: Task,
    args: {
        removeTask: action("removeTask"),
        changeTaskStatus: action("changeTaskStatus"),
        changeTaskTitle: action("changeTaskTitle"),
    }
} as ComponentMeta<typeof Task>

const Template: ComponentStory<typeof Task> = (args) => <Task {...args}/>


export const TaskIsDoneStories = Template.bind({})


TaskIsDoneStories.args = {
    task: {id: v1(), title: "HTML&CSS", isDone: true}
}

export const TaskIsNotDoneStories = Template.bind({})

TaskIsNotDoneStories.args = {
    task: {id: v1(), title: "HTML&CSS", isDone: false}
}