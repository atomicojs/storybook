import { options } from "./options";

const AtomicoID = Symbol.for("Atomico.ID");

/**
 * Transform a Camel Case string to a Kebab case
 */
export const getAttr = (prop: string) =>
    prop.replace(/([A-Z])/g, "-$1").toLowerCase();

export const EMPTY_PROPS: { [prop: string]: any } = {};

export const getType = (value: any) =>
    ({}.toString
        .call(value)
        .replace(/(.+) (.+)]/, "$2")
        .toLowerCase());

export const serializeDom = (
    children: NodeList,
    tab = 0,
    currentId?: symbol | string
) =>
    [...children].reduce((html, child) => {
        let space = tab ? "   ".repeat(tab) : "";

        if (child instanceof Element) {
            let { localName } = child;
            const { childNodes, attributes } = child;
            const ignore = [...(options.ignore[localName] || [])];

            if (options.ignore["*"]) ignore.push(...options.ignore["*"]);

            const { _props = EMPTY_PROPS, constructor } = child as Element & {
                _props?: { [prop: string]: any };
            };

            //@ts-ignore
            currentId = child.symbolId || currentId;

            if (!child[currentId] && !child[AtomicoID]) return html;

            const props = new Map<string, any>(
                Object.values(attributes).map((attr) => [attr.name, attr.value])
            );

            if (_props != EMPTY_PROPS) {
                Object.entries(_props).forEach(([prop, value]) =>
                    props.set(value?.attr || getAttr(prop), value)
                );
            }

            const attrs = [...props]
                .filter(([prop]) => !ignore.includes(prop))
                .map<string[] | false>(([prop, value]) => {
                    if (value != null) {
                        const type = getType(value);
                        switch (type) {
                            case "boolean":
                                return value ? [prop] : false;
                            case "object":
                            case "array":
                                return [prop, `'${JSON.stringify(value)}'`];
                            case "function":
                                return [prop, type];
                            default:
                                return [prop, JSON.stringify(value)];
                        }
                    }
                    return attrs;
                })
                .filter((value) => value)
                .map((value: string[]) => value.join("="));

            let content = ignore.includes("children")
                ? ""
                : serializeDom(childNodes, tab + 1, currentId);

            const isBr = content.includes("<");

            if (content) {
                content += `${isBr ? "\n" + space : ""}`;
            }

            html += `${space ? `\n${space}` : ""}<${localName}${
                attrs.length ? ` ${attrs.join(" ")}` : ""
            }>${content}</${localName}>`;
        } else if (child.textContent.trim()) {
            html += `${child.textContent}`;
        }

        return html;
    }, "");
