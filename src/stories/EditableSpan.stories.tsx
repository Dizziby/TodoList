import {ComponentMeta, ComponentStory} from "@storybook/react";
import {action} from "@storybook/addon-actions";
import React from "react";
import {EditableSpan} from "../components/common/EditableSpan/EditableSpan";

export default  {
    title: "EditableSpan",
    component: EditableSpan,
    argTypes: {
        callback: {
            description: "button inside form clicked"
        }
    }
} as ComponentMeta<typeof EditableSpan>

const Template: ComponentStory<typeof EditableSpan> = (args) => <EditableSpan {...args}/>


export const EditableSpanExample = Template.bind({})


EditableSpanExample.args = {
    title: "Example",
    callback: action("EditableSpan value changed")
}
