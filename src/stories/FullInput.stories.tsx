import {FullInput} from "../components/common/FullInput";
import {ComponentMeta, ComponentStory} from "@storybook/react";
import {action} from "@storybook/addon-actions";
import React from "react";

export default  {
    title: "FullInput",
    component: FullInput,
    argTypes: {
        callback: {
            description: "button clicked inside form"
        }
    }
} as ComponentMeta<typeof FullInput>

const Template: ComponentStory<typeof FullInput> = (args) => <FullInput {...args}/>


export const FullInputStories = Template.bind({})

FullInputStories.args = {
    callback: action("button clicked inside form")
}