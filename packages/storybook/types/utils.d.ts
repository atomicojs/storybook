import { Atomico } from "atomico/types/dom";
import { InputType } from "@storybook/csf";
interface Input extends InputType {
    control?: "boolean" | "number" | "range" | "object" | "file" | "radio" | "inline-radio" | "check" | "inline-check" | "select" | "multi-select" | "text" | "color" | "date";
}
export declare const agsTypes: {
    [x: string]: string;
    default: string;
};
export declare const argsTypesReg: (string | RegExp)[][];
export declare function defineArgTypes({ props }: Atomico<any, any>, rewrite?: {
    [index: string]: Input | false;
}): {};
export {};
