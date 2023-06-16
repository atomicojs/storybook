import { Atomico } from "atomico/types/dom";
import { ArgTypes, Meta } from "./types";
export * from "./decorator";
export { options } from "./options";
export declare function define<Component extends CustomElementConstructor>(component: Component, config?: Meta<Component>): Meta<Component>;
export declare const defineArgTypes: (component: Atomico<any, any>, argTypes?: ArgTypes) => ArgTypes;
export declare const defineArgs: (component: Atomico<any, any>, argTypes?: ArgTypes) => any;
