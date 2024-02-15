import { addons, useEffect as useStorybookEffect } from "@storybook/addons";
import { SNIPPET_RENDERED } from "@storybook/docs-tools";
import { c, h, useEffect, useHost } from "atomico";
const Alias = {
    tsx: "typescript",
    html: "html",
};
const props = { style: "display:contents" };
function wrapper({ story, cid, args, code, source }) {
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
    source: String,
    args: null,
};
const Wrapper = c(wrapper);
if (!customElements.get("atomico-decorator-wrapper"))
    customElements.define("atomico-decorator-wrapper", Wrapper);
export const decorator = ({ source, forceRemount, } = { source: "code" }) => (Story, context) => {
    const cache = context.canvasElement;
    useStorybookEffect(() => () => host.remove(), []);
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
                    value: (element) => {
                        if (!host.isConnected) {
                            cache.append(element);
                        }
                    },
                });
            }
            catch { }
        }
        cache[context.id] = document.createElement("atomico-decorator-wrapper");
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
    // Avoid double insertion by @storybook/web-components
    if (!forceRemount) {
        if (!host.isConnected) {
            cache.append(host);
        }
        return "";
    }
    return host;
};
