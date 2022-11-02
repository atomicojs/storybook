import { html } from "atomico";
import { Brand } from "./brand";
import { define } from "@atomico/storybook/utils";
import { html as litHTML } from "@atomico/lit-html";
import { html as uHTML } from "@atomico/uhtml";

export default {
    title: "components/brand",
    ...define(Brand),
};

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

export const ExampleUHtml = (props) =>
    uHTML`<atomico-brand
        color=${props.color}
        width=${props.width}
    ></atomico-brand>`;

ExampleDOM.args = {
    color: "teal",
    width: "280px",
};
