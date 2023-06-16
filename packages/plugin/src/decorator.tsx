import { addons } from "@storybook/addons";
import { SNIPPET_RENDERED } from "@storybook/docs-tools";
import { h, c, Props, useEffect, useHost } from "atomico";
import { serializeDom } from "./serialize-dom";
import { serializeJsx } from "./serialize-jsx";

function wrapper({ story, cid, args, source }: Props<typeof wrapper>) {
    const host = useHost();

    useEffect(() => {
        requestAnimationFrame(() => {
            addons.getChannel().emit(SNIPPET_RENDERED, {
                id: cid,
                args,
                source:
                    source === "jsx"
                        ? serializeJsx(result)
                        : serializeDom(host.current.childNodes),
            });
        });
    });
    //@ts-ignore
    const result = story();

    return h("host", null, result);
}

wrapper.props = {
    cid: String,
    story: Function,
    source: null,
    args: null,
};

const Wrapper = c(wrapper);

const cache: {
    [id: string]: InstanceType<typeof Wrapper>;
} = {};

if (!customElements.get("atomico-decorator-wrapper"))
    customElements.define("atomico-decorator-wrapper", Wrapper);

export const decorator = (Story, context) => {
    const cache = context.canvasElement;

    if (!cache[context.id]) {
        cache[context.id] = document.createElement(
            "atomico-decorator-wrapper"
        ) as InstanceType<typeof Wrapper>;

        cache[context.id].setAttribute("cid", context.id);
    }

    const host = cache[context.id];

    host.story = Story;
    host.args = context.unmappedArgs;
    host.source = context.parameters.docs?.source?.language;

    return host;
};
