import { ArgTypes, Controls } from "./types";
export declare const options: {
    global: ArgTypes;
    ignore: {
        [tagName: string]: string[];
    };
    alias: {
        [x: string]: string;
        default: string;
    };
    match: {
        regExp: RegExp;
        control: Controls;
        and?: any;
    }[];
};
