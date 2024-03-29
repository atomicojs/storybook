import type { Atomico } from "atomico/types/dom";
import { options } from "./options";
import type { ArgTypes, Input, Meta, Table, Types } from "./types";
export { decorator } from "./decorator";
export { options } from "./options";

const getAutoControl = (prop: string, type?: any) =>
    options.match.find(({ regExp, and }) =>
        regExp.test(prop) ? (and ? type === and : true) : false
    );

export function define<Component extends CustomElementConstructor>(
    component: Component,
    config?: Meta<Component>
) {
    const story: Meta<Component> = {
        ...config,
        argTypes: {},
        args: {
            ...config?.args,
        },
    };

    const { props } = component as any;

    const types = Object.entries(props)
        .map(
            ([prop, schema]) =>
                [
                    prop,
                    typeof schema === "object" && schema != null
                        ? schema
                        : { type: schema },
                ] as [string, { type: any; value?: any }]
        )
        .reduce<{
            [prop: string]: {
                control: any;
                defaultValue: any;
                type: Types;
            };
        }>((types, [prop, schema]) => {
            const { type, value } = schema;

            const autoControl = getAutoControl(prop, type);

            const control =
                autoControl?.control ||
                (options.alias[type?.name || "default"] as any);

            const defaultValue =
                typeof value === "function" && type !== Function
                    ? value()
                    : type === Boolean && !value
                    ? false
                    : value;

            return { ...types, [prop]: { control, defaultValue, type } };
        }, {});

    story.argTypes = [options.global, config?.argTypes].reduce(
        (argTypes, schema) => {
            if (!schema) return argTypes;
            let entries = Object.entries(schema);
            // global props only apply if their declaration exists in the component props
            if (schema === options.global)
                entries = entries.filter(([prop]) => prop in props);

            return entries.reduce((argTypes, [prop, value]) => {
                if (value === false) {
                    delete argTypes[prop];
                } else {
                    const argType = argTypes[prop] as Input;
                    const event = /on(.+)/.test(prop) && !types[prop];

                    const automaticCategory = event
                        ? "Events"
                        : prop.startsWith("--")
                        ? `CSS custom properties`
                        : undefined;

                    const {
                        category = argType?.table?.category ||
                            automaticCategory,
                        defaultValue = argType?.table?.defaultValue?.summary,
                        ...config
                    } = value;

                    let { description = argType?.description } = value;

                    let {
                        control = argType?.control ||
                            getAutoControl(prop)?.control,
                    } = value || {};

                    const table: Table = {
                        category,
                        type: {
                            ...argType?.table?.type,
                            ...config?.table?.type,
                        },
                        defaultValue: {
                            summary: defaultValue,
                            ...argType?.table?.defaultValue,
                            ...config?.table?.defaultValue,
                        },
                    };

                    return {
                        ...argTypes,
                        [prop]: {
                            ...argType,
                            ...config,
                            description,
                            control: control as any,
                            table,
                        },
                    };
                }
                return argTypes;
            }, argTypes);
        },
        story.argTypes
    );

    Object.entries(types).forEach(([prop, { control, defaultValue, type }]) => {
        if (story.argTypes?.[prop] === false) return;

        const argType = story.argTypes?.[prop] as Input;

        story.argTypes[prop] = {
            ...story.argTypes[prop],
            control: argType?.control || control,
            type: argType?.type || type,
            table: {
                ...argType?.table,
                type: {
                    ...argType?.table?.type,
                    summary: type?.name || "Any",
                },
                defaultValue: {
                    ...argType?.table?.defaultValue,
                    summary:
                        argType?.table?.defaultValue?.summary || defaultValue,
                },
            },
        };
        const argValue =
            prop in (story.args as any) ? story.args[prop] : defaultValue;

        if (argValue != undefined) {
            story.args[prop] = argValue;
        }
    });

    return story as Meta<Component>;
}

export const defineArgTypes = (
    component: Atomico<any, any>,
    argTypes?: ArgTypes
) => define(component, { argTypes }).argTypes;

export const defineArgs = (component: Atomico<any, any>, argTypes?: ArgTypes) =>
    define(component, { argTypes }).args;
