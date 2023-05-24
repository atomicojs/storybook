import { addons, useEffect } from "@storybook/addons";
import { SNIPPET_RENDERED } from "@storybook/docs-tools";
import { h, html, render } from "atomico";
import { VNode } from "atomico/types/vnode";
import { serializeDom } from "./serialize-dom";
import { serializeJsx } from "./serialize-jsx";

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

export const decorator = (Story, context) => {
    let channel = addons.getChannel();

    if (!cache[context.id]) {
        cache[context.id] = document.createElement("atomico-decorator-wrapper");
        cache[context.id].setAttribute("data-id", context.id);
    }

    let result = Story() as any[] | VNode<any> | string;

    const canvas = cache[context.id];

    if (typeof result === "string") {
        render(h("host", null, html.call(null, [result])), canvas);
    } else if (result instanceof Node) {
        canvas.innerHTML = "";
        canvas.append(result);
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
        render(h("host", null, result), canvas);
    } else if (result.render) {
        //@ts-ignore
        result.render(canvas);
    }

    let rendered = canvas;

    const isJsx = context.parameters.docs?.source?.language === "jsx";

    useEffect(() => {
        requestAnimationFrame(() => {
            channel.emit(SNIPPET_RENDERED, {
                id: context.id,
                args: context.unmappedArgs,
                source: isJsx
                    ? serializeJsx(result)
                    : serializeDom(rendered.childNodes),
            });
        });
    });

    return canvas;
};
