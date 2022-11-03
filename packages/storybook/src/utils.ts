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

export const options = {
    global: {} as ArgTypes,
    alias: {
        [String.name]: "text",
        [Number.name]: "number",
        [Boolean.name]: "boolean",
        [Object.name]: "object",
        [Array.name]: "object",
        default: "text",
    },
    match: [
        { regExp: /color/i, control: "color" },
        { regExp: /date/i, control: "date" },
    ] as { regExp: RegExp; control: string; and?: any }[],
};

export function define(component: Atomico<any, any>, rewrite?: ArgTypes) {
    const story = {
        argTypes: {},
        args: {},
    };

    const { props } = component;

    for (let prop in props) {
        const type = props[prop]?.type || props[prop];
        const value = props[prop]?.value;
        if (rewrite?.[prop] === false) continue;

        const autoControl = options.match.find(({ regExp, and }) =>
            regExp.test(prop) ? (and ? type === and : true) : false
        );

        const control =
            autoControl?.control || options.alias[type?.name || "default"];

        const defaultValue =
            typeof value === "function" && type !== Function
                ? value()
                : type === Boolean && !value
                ? false
                : value;

        story.argTypes[prop] = {
            control,
            ...rewrite?.[prop],
        };

        if (defaultValue != null) {
            story.args[prop] = defaultValue;
        }
    }

    for (let prop in options.global) {
        if (!options.global[prop]) {
            delete story.argTypes[prop];
        } else {
            story.argTypes[prop] = options.global[prop];
        }
    }

    return story;
}

export const defineArgTypes = (
    component: Atomico<any, any>,
    rewrite?: ArgTypes
) => define(component, rewrite).argTypes;

export const defineArgs = (component: Atomico<any, any>, rewrite?: ArgTypes) =>
    define(component, rewrite).args;
