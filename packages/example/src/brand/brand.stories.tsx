import { define } from "@atomico/storybook";
import { html } from "atomico";
import { Brand } from "./brand";

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

export const ExampleHTML = (props) => html`<${Brand} ...${props}></${Brand}>`;

export const ExampleRaw = (props) =>
    `<atomico-brand color="${props.color}" width="${props.width}"></atomico-brand>`;
