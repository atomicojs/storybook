import { Atomico } from "atomico/types/dom";
import { Meta, ArgTypes } from "./types";
export { options } from "./options";
export * from "./decorator";
export declare function define<Component extends CustomElementConstructor>(component: Component, config?: Meta<Component>): Omit<import("@storybook/types").ComponentAnnotations<import("./types").Render, import("atomico/types/component").GetProps<Component>>, "argTypes" | "args"> & {
    argTypes?: ArgTypes;
    args?: import("atomico/types/component").GetProps<Component>;
} & {
    argTypes: any;
    args: any;
};
export declare const defineArgTypes: (component: Atomico<any, any>, argTypes?: ArgTypes) => any;
export declare const defineArgs: (component: Atomico<any, any>, argTypes?: ArgTypes) => any;
