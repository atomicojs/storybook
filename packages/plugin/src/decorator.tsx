import { addons } from "@storybook/addons";
import { SNIPPET_RENDERED } from "@storybook/docs-tools";
import { StoryContext } from "@storybook/types";
import { Props, Type, c, h, useEffect, useHost } from "atomico";

type Source = "code" | "html";

const Alias = {
    tsx: "typescript",
    html: "html",
};

function wrapper({ story, cid, args, code, source }: Props<typeof wrapper>) {
    const host = useHost();

    useEffect(() => {
        requestAnimationFrame(() => {
            addons.getChannel().emit(SNIPPET_RENDERED, {
                id: cid,
                args,
                source: source === "html" ? host.current.innerHTML : code,
                ...(Alias[source] ? { format: Alias[source] } : null),
            });
        });
    });

    const result = story();

    host.result = result;

    return h("host", null, result);
}

wrapper.props = {
    cid: String,
    story: Function,
    originalSource: String,
    code: String,
    source: String as Type<Source>,
    args: null,
};

const Wrapper = c(wrapper);

if (!customElements.get("atomico-decorator-wrapper"))
    customElements.define("atomico-decorator-wrapper", Wrapper);

export const decorator =
    ({ source }: { source?: Source } = { source: "code" }) =>
    (Story: () => any, context: StoryContext) => {
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
        host.code = context.parameters.docs.source.originalSource;
        host.source = source;

        const test = context.parameters.fileName.match(/\.(\w+)$/);

        if (test) {
            context.parameters.docs.source.language = test.at(1);
        }

        return host;
    };
