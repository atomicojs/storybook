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

export const agsTypes = {
    [String.name]: "text",
    [Number.name]: "number",
    [Boolean.name]: "boolean",
    [Object.name]: "object",
    [Array.name]: "object",
    default: "text",
};

export const argsTypesReg = [
    { regExp: /color/, control: "color" },
    { regExp: /date/, control: "date" },
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

        const autoControl = argsTypesReg.find(({ regExp }) =>
            regExp.test(prop)
        );

        const control =
            autoControl?.control || agsTypes[type?.name || "default"];

        argsTypes[prop] = {
            control,
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
