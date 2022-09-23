import { DecoratorFunction } from "@storybook/csf";
import { h, render, html } from "atomico";
import { addons } from "@storybook/addons";
import { SNIPPET_RENDERED } from "@storybook/docs-tools";
import { serialize } from "./serialize";

const cache: {
    [id: string]: Element;
} = {};

class Wrapper extends HTMLElement {
    connectedCallback() {
        requestIdleCallback(() => {
            const channel = addons.getChannel();
            channel.emit(
                SNIPPET_RENDERED,
                this.dataset.id,
                serialize(this.childNodes)
            );
        });
    }
    disconnectedCallback() {
        delete cache[this.dataset.id];
    }
}

customElements.define("atomico-decorator-wrapper", Wrapper);

export const decorator: DecoratorFunction = (Story, context) => {
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
        cache[context.id].append(result);
    } else if (Array.isArray(result) || result.$$) {
        render(h("host", null, result), cache[context.id]);
    } else if (result.render) {
        result.render(cache[context.id]);
    }
    return cache[context.id];
};
