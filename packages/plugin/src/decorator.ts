import { addons, useEffect, DecoratorFunction } from "@storybook/addons";
import { SNIPPET_RENDERED } from "@storybook/docs-tools";
import { h, render, html } from "atomico";
import { VNode } from "atomico/types/vnode";
import { serialize } from "./serialize";

const cache: {
    [id: string]: Element;
} = {};

class Wrapper extends HTMLElement {
    disconnectedCallback() {
        delete cache[this.dataset.id];
    }
}

if (!customElements.get("atomico-decorator-wrapper"))
    customElements.define("atomico-decorator-wrapper", Wrapper);

const isVnode = (value): value is VNode<any> => "$$" in value;

export const decorator =
    ({ jsx = false }): DecoratorFunction<any> =>
    (Story, context) => {
        let channel = addons.getChannel();

        if (!cache[context.id]) {
            cache[context.id] = document.createElement(
                "atomico-decorator-wrapper"
            );
            cache[context.id].setAttribute("data-id", context.id);
        }

        let result = Story() as any[] | VNode<any> | string;

        if (typeof result === "string") {
            render(
                h("host", null, html.call(null, [result])),
                cache[context.id]
            );
        } else if (result instanceof Node) {
            cache[context.id].innerHTML = "";
            cache[context.id].append(result);
        } else if (Array.isArray(result) || result.$$) {
            if (isVnode(result)) {
                const { props, cssProps } = Object.entries(result.props).reduce(
                    ({ props, cssProps }, [prop, value]) => {
                        if (prop.startsWith("--") && value) {
                            cssProps[prop] = value;
                        } else {
                            props[prop] = value;
                        }
                        return { props, cssProps };
                    },
                    {
                        props: {} as { [prop: string]: any },
                        cssProps: {} as { [prop: string]: any },
                    }
                );
                if (Object.keys(cssProps).length) {
                    result.props = {
                        ...props,
                        style: cssProps,
                    };
                }
            }
            render(h("host", null, result), cache[context.id]);
        } else if (result.render) {
            //@ts-ignore
            result.render(cache[context.id]);
        }

        let rendered = cache[context.id];

        useEffect(() => {
            channel.emit(
                SNIPPET_RENDERED,
                context.id,
                serialize({ jsx }, rendered.childNodes)
            );
        });

        return rendered;
    };
