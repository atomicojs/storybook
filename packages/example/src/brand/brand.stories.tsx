import { html } from "atomico";
import { Brand } from "./brand";
import { define } from "@atomico/storybook";
import { html as litHTML } from "@atomico/lit-html";

export default define(Brand, {
    title: "components/brand",
    argTypes: {
        color: {
            description: `### Defines the color of the component`,
        },
        onclick: {
            description: "dispatch...",
            action: "clicked",
        },
        header: {
            category: "Slots",
            description: "My header slot",
            defaultValue: "HTMLElement",
        },
        size: {
            control: "radio",
            options: ["small", "large", "big"],
        },
        width: {
            control: { type: "number", min: 200, max: 1500, step: 50 },
        },
        "--color": {
            description: "Color",
            defaultValue: "red",
        },
    },
});

export const ExampleJSX = (props: any) => <Brand {...props}></Brand>;

ExampleJSX.args = {
    width: "120px",
};

export const ExampleHTML = (props) => html`<${Brand} ...${props}></${Brand}>`;

ExampleHTML.args = {
    width: "280px",
};

export const ExampleRaw = (props) =>
    `<atomico-brand color="${props.color}" width="${props.width}"></atomico-brand>`;

ExampleRaw.args = {
    color: "gold",
    width: "280px",
};
