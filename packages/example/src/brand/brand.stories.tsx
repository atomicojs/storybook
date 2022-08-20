import { template, html } from "atomico";
import { Brand } from "./brand";
import { html as litHTML } from "@atomico/lit-html";
import { html as uHTML } from "@atomico/uhtml";

export default {
    title: "components/brand",
    argTypes: {
        color: { control: "color" },
        width: {
            control: { type: "text" },
        },
    },
};

export const ExampleJSX = (props: any) => <Brand {...props}></Brand>;

ExampleJSX.args = {
    color: "black",
    width: "280px",
};

export const ExampleHTML = (props) => html`<${Brand} ...${props}></${Brand}>`;

ExampleHTML.args = {
    color: "blueviolet",
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

export const ExampleUHtml = (props) =>
    uHTML`<atomico-brand
        color=${props.color}
        width=${props.width}
    ></atomico-brand>`;

ExampleDOM.args = {
    color: "teal",
    width: "280px",
};
