import { html } from "atomico";
import { Brand } from "./brand";
import { define } from "@atomico/storybook";
import { html as litHTML } from "@atomico/lit-html";

export default define(Brand, {
    title: "components/brand",
    argTypes: {
        color: {
            description: "Defines the color of the component",
            category: "Generic",
        },
        onclick: {
            description: "dispatch...",
            action: "clicked",
        },
        header: {
            category: "Slots",
            description: "My header slot",
        },
        size: {
            control: "radio",
            options: ["small", "large", "big"],
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

export const ExampleDOM = (props) => Object.assign(new Brand(), props);

ExampleDOM.args = {
    color: "teal",
    width: "280px",
};

export const ExampleLitHtml = (props) =>
    litHTML`<atomico-brand
        color=${props.color}
        width=${props.width}
    ></atomico-brand>`;

ExampleDOM.args = {
    color: "teal",
    width: "280px",
};

ExampleDOM.args = {
    color: "teal",
    width: "280px",
};
