import {ComponentMeta, ComponentStory} from "@storybook/react";
import React from "react";
import App from "../components/App/App";
import {ReduxStoreProviderDecorator} from "./decorators/ReduxStoreProviderDecorator";
import { withRouter } from 'storybook-addon-react-router-v6';

export default  {
    title: "App",
    component: App,
    decorators: [withRouter, ReduxStoreProviderDecorator],
} as ComponentMeta<typeof App>

const Template: ComponentStory<typeof App> = () => <App/>

export const AppStories = Template.bind({})

AppStories.args = {

}