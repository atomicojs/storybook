import { Atomico } from "atomico/types/dom";
import { Meta, ArgTypes } from "./types";
export { options } from "./options";
export * from "./decorator";
export declare function define<Component extends CustomElementConstructor>(component: Component, config?: Meta<Component>): Meta<Component>;
export declare const defineArgTypes: (component: Atomico<any, any>, argTypes?: ArgTypes) => ArgTypes;
export declare const defineArgs: (component: Atomico<any, any>, argTypes?: ArgTypes) => any;
