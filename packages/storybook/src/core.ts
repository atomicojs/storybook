import { Props } from "atomico";
import { Atomico } from "atomico/types/dom";
import { ArgTypes, Input, Controls, Table } from "./types";
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
    component?: string;
    subcomponents?: Record<string, string>;
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
    };

    const { props } = component;

    for (const prop in options.global) {
        if (!options.global[prop] || !(prop in props)) continue;

        const { description, category, ...config } = options.global[
            prop
        ] as Input;

        const table: Table = {
            category,
            ...config.table,
            type: {
                ...config?.table?.type,
            },
            defaultValue: {
                ...config?.table?.defaultValue,
            },
        };

        story.argTypes[prop] = { ...config, table, description };
    }

    for (let prop in props) {
        //@ts-ignore
        const type = props[prop]?.type || props[prop];
        //@ts-ignore
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

        const argType = (story?.argTypes?.[prop] || {}) as Input;

        const { category } = argType;
        let { type: typeForTable = type?.name || "Any" } = argType as any;

        const table: Table = {
            category,
            ...argType?.table,
            type: {
                summary: typeForTable,
                ...argType?.table?.type,
            },
            defaultValue: {
                summary: defaultValue,
                ...argType?.table?.defaultValue,
            },
        };

        story.argTypes[prop] = {
            control,
            ...argType,
            table,
        };

        if (defaultValue != null) {
            story.args[prop] = defaultValue;
        }
    }

    for (const prop in options.global) {
        if (!options.global[prop]) {
            delete story.argTypes[prop];
        }
    }

    for (const prop in story.argTypes) {
        if (prop in props || !story.argTypes?.[prop]) continue;

        const argType = story.argTypes?.[prop] as Input;

        if (argType.action) {
            const test = prop.match(/on(.+)/);
            if (!test) continue;
            const [, event] = test;
            const { category = "Events" } = argType;
            const table: Table = {
                category,
                ...argType?.table,
                type: {
                    summary: event,
                    ...argType?.table?.type,
                },
            };
            story.argTypes[prop] = {
                ...story.argTypes[prop],
                table,
            };
        } else {
            const { category } = argType;
            const table: Table = {
                category,
                ...argType?.table,
                type: {
                    summary:
                        argType?.table?.type?.summary ||
                        category?.toLowerCase() === "slots"
                            ? "Element"
                            : "",
                    ...argType?.table?.type,
                },
            };
            story.argTypes[prop] = {
                ...story.argTypes[prop],
                table,
            };
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
