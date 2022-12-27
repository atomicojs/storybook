import { options } from "./options";

const AtomicoID = Symbol.for("Atomico.ID");

export const serialize = (
    children: NodeList,
    tab = 0,
    currentId?: symbol | string
) =>
    [...children].reduce((html, child) => {
        let space = tab ? "   ".repeat(tab) : "";

        if (child instanceof Element) {
            const { localName, childNodes, attributes } = child;
            const ignore = options.ignore[localName] || [];

            if (options.ignore["*"]) ignore.push(...options.ignore["*"]);

            const { _props = {} } = child as Element & {
                _props?: { [prop: string]: any };
            };

            //@ts-ignore
            currentId = child.symbolId || currentId;

            if (!child[currentId] && !child[AtomicoID]) return html;

            const props = (
                _props
                    ? Object.entries(_props)
                    : Object.values(attributes).map((attr) => [
                          attr.name,
                          attr.value,
                      ])
            ) as [string, string][];

            const attrs = props
                .filter(([prop]) => !ignore.includes(prop))
                .reduce<string[]>((attrs, [prop, value]) => {
                    if (value != null) {
                        let type = typeof value;
                        let attr =
                            type === "boolean"
                                ? value
                                    ? prop
                                    : ""
                                : type === "function"
                                ? `${prop}=${type}`
                                : `${prop}=${JSON.stringify(value)}`;
                        attr && attrs.push(attr);
                    }
                    return attrs;
                }, []);

            let content = ignore.includes("children")
                ? ""
                : serialize(childNodes, tab + 1, currentId);

            if (content) {
                content += `\n${space}`;
            }

            html += `${space ? `\n${space}` : ""}<${localName}${
                attrs.length ? ` ${attrs.join(" ")}` : ""
            }>${content}</${localName}>`;
        } else if (child.textContent.trim()) {
            html += `\n${space}${child.textContent}`;
        }

        return html;
    }, "");
