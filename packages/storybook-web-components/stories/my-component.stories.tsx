import { MyComponent } from "./my-component";
import { MyComponentSlot } from "./my-component-slot";
import { define } from "@atomico/storybook";

let id = 0;

export default {
    title: "my-component",
    component: "my-element",
    tags: ["autodocs"],
    ...define(MyComponent),
};

export const myStory = (props) => <MyComponent {...props}>Go!</MyComponent>;
