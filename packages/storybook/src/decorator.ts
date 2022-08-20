import { DecoratorFunction } from "@storybook/csf";
import { h, render, html } from "atomico";

const cache: {
    [id: string]: Element;
} = {};

export const decorator: DecoratorFunction = (Story, context) => {
    if (!cache[context.id]) {
        cache[context.id] = document.createElement("div");
    }
    let result = Story() as
        | any[]
        | { render?: (prev: Element) => Element; $$: symbol }
        | string;

    if (typeof result === "string") {
        result = html.call(null, [result]);
    } else if (result instanceof Node) {
        return result;
    } else if (Array.isArray(result) || result.$$) {
        return render(h("host", null, result), cache[context.id]);
    } else if (result.render) {
        result.render(cache[context.id]);
        return cache[context.id];
    }
};
