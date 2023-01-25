import { MyComponent } from "./my-component";
import { define } from "@atomico/storybook";

const { args, argTypes } = define(MyComponent);

export default {
    title: "my-component",
    args,
    argTypes,
};

export const myStory = (props) => (
    <MyComponent
        {...props}
        onclick={() => {
            console.log("CLICK!");
        }}
    >
        <input type="checkbox" checked value="value ... " name="name other" />
        <h1>welcome</h1>
        <button>
            <span>icon</span>
            label...
        </button>
    </MyComponent>
);
