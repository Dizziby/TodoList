import {ComponentMeta, ComponentStory} from "@storybook/react";
import React from "react";
import App from "../components/App/App";
import {ReduxStoreProviderDecorator} from "./decorators/ReduxStoreProviderDecorator";

export default  {
    title: "App",
    component: App,
    decorators: [ReduxStoreProviderDecorator]
} as ComponentMeta<typeof App>

const Template: ComponentStory<typeof App> = () => <App/>

export const AppStories = Template.bind({})

AppStories.args = {

}