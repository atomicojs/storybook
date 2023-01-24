import { Props } from "atomico";
import { Atomico } from "atomico/types/dom";
import { ArgTypes } from "./types";
export { options } from "./options";
export * from "./decorator";
export interface Config<Component extends Atomico<any, any>> {
    title?: string;
    id?: string;
    argTypes?: ArgTypes;
    args?: Props<Component>;
    component?: string;
    subcomponents?: Record<string, string>;
    [index: string]: any;
}
export declare function define<Component extends Atomico<any, any>>(component: Component, config?: Config<Component>): Config<Component>;
export declare const defineArgTypes: (component: Atomico<any, any>, argTypes?: ArgTypes) => ArgTypes;
export declare const defineArgs: (component: Atomico<any, any>, argTypes?: ArgTypes) => any;
