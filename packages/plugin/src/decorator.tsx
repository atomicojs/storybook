import { addons, useEffect } from "@storybook/addons";
import { SNIPPET_RENDERED } from "@storybook/docs-tools";
import { h, Host, c, Props } from "atomico";
import { serializeDom } from "./serialize-dom";
import { serializeJsx } from "./serialize-jsx";

function wrapper({ story }: Props<typeof wrapper>): Host<{ result: any }> {
    const result = story();
    return h("host", { result }, result);
}

wrapper.props = {
    cid: String,
    story: Function,
};

const Wrapper = c(wrapper);

const cache: {
    [id: string]: InstanceType<typeof Wrapper>;
} = {};

if (!customElements.get("atomico-decorator-wrapper"))
    customElements.define("atomico-decorator-wrapper", Wrapper);

export const decorator = (Story, context) => {
    let channel = addons.getChannel();

    if (!cache[context.id]) {
        cache[context.id] = document.createElement(
            "atomico-decorator-wrapper"
        ) as InstanceType<typeof Wrapper>;

        cache[context.id].setAttribute("data-id", context.id);

        cache[context.id].unmounted.then(() => {
            delete cache[context.id];
        });
    }

    cache[context.id].story = Story;

    const isJsx = context.parameters.docs?.source?.language === "jsx";

    useEffect(() => {
        requestAnimationFrame(async () => {
            await cache[context.id].updated;

            channel.emit(SNIPPET_RENDERED, {
                id: context.id,
                args: context.unmappedArgs,
                source: isJsx
                    ? serializeJsx(cache[context.id].result)
                    : serializeDom(cache[context.id].childNodes),
            });
        });
    });

    return cache[context.id];
};
