import { ArgTypes, Input, Controls, Table, Types } from "./types";

export const options = {
    global: {} as ArgTypes,
    ignore: {} as {
        [tagName: string]: string[];
    },
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
