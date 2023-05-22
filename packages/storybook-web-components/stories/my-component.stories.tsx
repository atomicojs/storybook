import { MyComponent } from "./my-component";
import { MyComponentSlot } from "./my-component-slot";
import { define } from "@atomico/storybook";

export default {
    title: "my-component",
    component: "my-element",
    tags: ["autodocs"],
    // ...define(MyComponent),
};

export const myStory = (props) => <MyComponent></MyComponent>;
