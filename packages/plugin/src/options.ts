import { ArgTypes, Controls } from "./types";

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
        { regExp: /^color/, control: "color", and: String },
        { regExp: /\w+Color/, control: "color", and: String },
        { regExp: /^date/, control: "date" },
        { regExp: /\w+Date/, control: "date" },
    ] as { regExp: RegExp; control: Controls; and?: any }[],
};
