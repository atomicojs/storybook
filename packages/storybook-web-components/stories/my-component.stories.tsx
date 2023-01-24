import { MyComponent } from "./my-component";
import { define } from "@atomico/storybook";

const { args, argTypes } = define(MyComponent);

export default {
    title: "my-component",
    args,
    argTypes,
};

export const myStory = (props) => (
    <MyComponent {...props}>
        <input type="checkbox" checked value="value ... " name="name other" />
    </MyComponent>
);
