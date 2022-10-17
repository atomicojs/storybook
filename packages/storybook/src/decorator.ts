import { addons, useEffect, DecoratorFunction } from "@storybook/addons";
import { SNIPPET_RENDERED } from "@storybook/docs-tools";
import { h, render, html } from "atomico";
import { serialize } from "./serialize";

const cache: {
    [id: string]: Element;
} = {};

class Wrapper extends HTMLElement {
    disconnectedCallback() {
        delete cache[this.dataset.id];
    }
}

customElements.define("atomico-decorator-wrapper", Wrapper);

export const decorator: DecoratorFunction<any> = (Story, context) => {
    let channel = addons.getChannel();

    if (!cache[context.id]) {
        cache[context.id] = document.createElement("atomico-decorator-wrapper");
        cache[context.id].setAttribute("data-id", context.id);
    }

    let result = Story() as
        | any[]
        | { render?: (prev: Element) => Element; $$: symbol }
        | string;

    if (typeof result === "string") {
        render(h("host", null, html.call(null, [result])), cache[context.id]);
    } else if (result instanceof Node) {
        cache[context.id].innerHTML = "";
        cache[context.id].append(result);
    } else if (Array.isArray(result) || result.$$) {
        render(h("host", null, result), cache[context.id]);
    } else if (result.render) {
        result.render(cache[context.id]);
    }

    let rendered = cache[context.id];

    useEffect(() => {
        channel.emit(
            SNIPPET_RENDERED,
            context.id,
            serialize(rendered.childNodes)
        );
    });

    return rendered;
};
