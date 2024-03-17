import {
    addons,
    useEffect as useStorybookEffect,
} from "@storybook/preview-api";
import { SNIPPET_RENDERED } from "@storybook/docs-tools";
import { StoryContext } from "@storybook/types";
import { Props, Type, c, h, useEffect, useHost, render } from "atomico";

type Source = "code" | "html";

const Alias = {
    tsx: "typescript",
    html: "html",
};

const props = { style: "display:contents" };

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

    return h("host", props, result);
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
    (
        {
            source,
            forceRemount,
        }: { source?: Source; forceRemount?: boolean } = { source: "code" }
    ) =>
    (Story: () => any, context: StoryContext) => {
        const cache = context.canvasElement as HTMLElement;

        useStorybookEffect(() => {
            const story = Story();
            render(<host>{story}</host>, cache);
        }, [context.id]);

        if (!cache[context.id]) {
            // Avoid double insertion by @storybook/web-components
            if (!forceRemount) {
                try {
                    Object.defineProperty(cache, "innerHTML", {
                        set() {
                            return "";
                        },
                        get() {
                            return "";
                        },
                    });

                    Object.defineProperty(cache, "appendChild", {
                        value: (element: HTMLElement) => {
                            if (!host.isConnected) {
                                cache.append(element);
                            }
                        },
                    });
                } catch {}
            }
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

        // Avoid double insertion by @storybook/web-components
        if (!forceRemount) {
            if (!host.isConnected) {
                cache.append(host);
            }
            return "";
        }

        return new Comment("Atomico.decorator");
    };
