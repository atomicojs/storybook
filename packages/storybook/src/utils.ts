import { Atomico } from "atomico/types/dom";
import { InputType } from "@storybook/csf";

interface Input extends InputType {
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

export const agsTypes = {
    [String.name]: "text",
    [Number.name]: "number",
    [Boolean.name]: "boolean",
    [Object.name]: "object",
    [Array.name]: "object",
    default: "text",
};

export const argsTypesReg = [
    [/color/, "color"],
    [/date/, "date"],
];

export function defineArgTypes(
    { props }: Atomico<any, any>,
    rewrite?: {
        [index: string]: Input | false;
    }
) {
    const argsTypes = {};

    for (let prop in props) {
        const type = props[prop]?.type || props[prop];
        const value = props[prop]?.value;
        if (rewrite?.[prop] === false) continue;

        argsTypes[prop] = {
            control: agsTypes[type?.name || "default"],
            ...rewrite?.[prop],
            ...(value != null
                ? {
                      defaultValue:
                          typeof value === "function" && type !== Function
                              ? value()
                              : value,
                  }
                : {}),
        };
    }

    return argsTypes;
}
