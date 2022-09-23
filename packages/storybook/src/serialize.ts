export const serialize = (children: NodeList, tab = 0) =>
    [...children].reduce((html, child) => {
        let space = tab ? "   ".repeat(tab) : "";

        if (child instanceof Element) {
            const { localName, childNodes, attributes } = child;
            const { _props = {} } = child as Element & {
                _props?: { [prop: string]: any };
            };

            if (localName.includes("-")) {
                const props = (
                    _props
                        ? Object.entries(_props)
                        : Object.values(attributes).map((attr) => [
                              attr.name,
                              attr.value,
                          ])
                ) as [string, string][];

                const attrs = props.reduce<string[]>((attrs, [prop, value]) => {
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

                let content = serialize(childNodes, tab + 1);

                if (content) {
                    content += `\n${space}`;
                }

                html += `${space ? `\n${space}` : ""}<${localName}${
                    attrs.length ? ` ${attrs.join(" ")}` : ""
                }>${content}</${localName}>`;
            }
        } else if (child.textContent.trim()) {
            html += `\n${space}${child.textContent}`;
        }

        return html;
    }, "");
