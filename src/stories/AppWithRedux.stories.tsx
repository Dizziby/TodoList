import {ComponentMeta, ComponentStory} from "@storybook/react";
import {action} from "@storybook/addon-actions";
import React from "react";
import AppWithRedux from "../AppWithRedux";
import {ReduxStoreProviderDecorator} from "./decorators/ReduxStoreProviderDecorator";

export default  {
    title: "AppWithRedux",
    component: AppWithRedux,
    decorators: [ReduxStoreProviderDecorator]
} as ComponentMeta<typeof AppWithRedux>

const Template: ComponentStory<typeof AppWithRedux> = () => <AppWithRedux/>

export const AppWithReduxStories = Template.bind({})

AppWithReduxStories.args = {
    callback: action("button clicked inside form")
}