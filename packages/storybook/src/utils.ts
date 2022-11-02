import { ArgType } from "@storybook/addons";
import { Atomico } from "atomico/types/dom";

interface Input extends ArgType {
    control?:
        | "boolean"
        | "number"
        | "range"
        | "object"
        | "file"
        | "radio"
        | "inline-radio"
        | "check"
        | "inline-check"
        | "select"
        | "multi-select"
        | "text"
        | "color"
        | "date";
}

interface ArgTypes {
    [index: string]: Input | false;
}

export const agsTypes = {
    [String.name]: "text",
    [Number.name]: "number",
    [Boolean.name]: "boolean",
    [Object.name]: "object",
    [Array.name]: "object",
    default: "text",
};

export const argsTypesReg = [
    { regExp: /color/i, control: "color" },
    { regExp: /date/i, control: "date" },
];

export function define(component: Atomico<any, any>, rewrite?: ArgTypes) {
    const story = {
        argsTypes: {},
        args: {},
    };

    const { props } = component;

    for (let prop in props) {
        const type = props[prop]?.type || props[prop];
        const value = props[prop]?.value;
        if (rewrite?.[prop] === false) continue;

        const autoControl = argsTypesReg.find(({ regExp }) =>
            regExp.test(prop)
        );

        const control =
            autoControl?.control || agsTypes[type?.name || "default"];

        const defaultValue =
            typeof value === "function" && type !== Function
                ? value()
                : type === Boolean && !value
                ? false
                : value;

        story.argsTypes[prop] = {
            control,
            ...rewrite?.[prop],
        };

        if (defaultValue != null) {
            story.args[prop] = defaultValue;
        }
    }

    for (let prop in defineArgTypes.global) {
        if (!defineArgTypes.global[prop]) {
            delete story.argsTypes[prop];
        } else {
            story.argsTypes[prop] = defineArgTypes.global[prop];
        }
    }

    return story;
}

export const defineArgTypes = (
    component: Atomico<any, any>,
    rewrite?: ArgTypes
) => define(component, rewrite).argsTypes;

export const defineArgs = (component: Atomico<any, any>, rewrite?: ArgTypes) =>
    define(component, rewrite).args;

defineArgTypes.global = {} as ArgTypes;
