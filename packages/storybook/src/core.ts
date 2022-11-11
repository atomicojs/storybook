import { Props } from "atomico";
import { Atomico } from "atomico/types/dom";
import { ArgTypes, Input, Controls } from "./types";
export * from "./decorator";

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
    ] as { regExp: RegExp; control: Controls; and?: any }[],
};

export interface Config<Component extends Atomico<any, any>> {
    title?: string;
    id?: string;
    argTypes?: ArgTypes;
    args?: Props<Component>;
    component?: Component;
    subcomponents?: Record<string, Component>;
    [index: string]: any;
}

export function define<Component extends Atomico<any, any>>(
    component: Component,
    config?: Config<Component>
) {
    const story: Config<Component> = {
        ...config,
        argTypes: {
            ...config?.argTypes,
        },
        args: {
            ...config?.args,
        },
        parameters: {
            actions: { argTypesRegex: "^on.*" },
            ...config?.parameters,
        },
        component,
    };

    const { props } = component;

    for (let prop in props) {
        const type = props[prop]?.type || props[prop];
        const value = props[prop]?.value;

        if (story?.argTypes?.[prop] === false) continue;

        const autoControl = options.match.find(({ regExp, and }) =>
            regExp.test(prop) ? (and ? type === and : true) : false
        );

        const control =
            autoControl?.control ||
            (options.alias[type?.name || "default"] as any);

        const defaultValue =
            typeof value === "function" && type !== Function
                ? value()
                : type === Boolean && !value
                ? false
                : value;

        story.argTypes[prop] = {
            control,
            ...story?.argTypes?.[prop],
        };

        if (defaultValue != null) {
            story.args[prop] = defaultValue;
        }
    }

    for (let prop in options.global) {
        /**
         * @todo add 'is' operator
         */
        if (options.global[prop]) {
            story.argTypes[prop] = options.global[prop] as Input;
        } else {
            delete story.argTypes[prop];
        }
    }

    return story;
}

export const defineArgTypes = (
    component: Atomico<any, any>,
    argTypes?: ArgTypes
) => define(component, { argTypes }).argTypes;

export const defineArgs = (component: Atomico<any, any>, argTypes?: ArgTypes) =>
    define(component, { argTypes }).args;
