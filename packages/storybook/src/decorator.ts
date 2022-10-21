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

    if (context.argTypes) {
        const entries = Object.entries(context.argTypes);
        /**
         * The following code block defines the default arguments for stories.
         */
        context.args = entries.reduce(
            (args, [prop, { atomicoType }]) => {
                if (args[prop] && typeof args[prop] === "string") {
                    switch (atomicoType) {
                        case Boolean:
                            args[prop] = args[prop] !== "false";
                            break;
                        case Object:
                        case Array:
                        case Number:
                            args[prop] = JSON.parse(args[prop]);
                            break;
                    }
                }
                return args;
            },
            {
                ...entries.reduce((args, [name, { defaultValue }]) => {
                    if (defaultValue != null) {
                        args[name] = defaultValue;
                    }
                    return args;
                }, {}),
                ...context.args,
            }
        );
    }

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
