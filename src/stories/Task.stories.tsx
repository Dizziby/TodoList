import {ComponentMeta, ComponentStory} from "@storybook/react";
import {action} from "@storybook/addon-actions";
import React from "react";
import {Task} from "../components/Task";
import {v1} from "uuid";
import {TaskPriorities, TaskStatuses} from "../api/todolistAPI";

export default {
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
    task: {
        id: v1(), title: "HTML&CSS",
        status: TaskStatuses.Completed,
        description: "",
        todoListId: "task",
        startDate: "",
        deadline: "",
        addedDate: "",
        order: 0,
        priority: TaskPriorities.Low
    }
}

export const TaskIsNotDoneStories = Template.bind({})

TaskIsNotDoneStories.args = {
    task: {
        id: v1(), title: "HTML&CSS",
        status: TaskStatuses.New,
        description: "",
        todoListId: "task",
        startDate: "",
        deadline: "",
        addedDate: "",
        order: 0,
        priority: TaskPriorities.Low
    }
}