import { EMPTY_PROPS, getType } from "./serialize-dom";
export function serializeJsx(vnode, deep = 0) {
    const children = [vnode].flat(100).map((vnode) => {
        let localName = "";
        let props = EMPTY_PROPS;
        let attrs = "";
        if (vnode?.$$ && vnode.type) {
            localName =
                vnode.raw === 2
                    ? vnode.type?.export || vnode.type?.name
                    : vnode.type;
            props = vnode.props;
        }
        if (localName) {
            if (props != EMPTY_PROPS) {
                attrs = Object.entries(props)
                    .filter(([prop]) => prop !== "children")
                    .map(([prop, value]) => {
                    switch (getType(value)) {
                        case "undefined":
                            return false;
                        case "boolean":
                            return value ? [prop] : false;
                        case "string":
                            return [prop, JSON.stringify(value)];
                        default:
                            return [prop, `{${value}}`];
                    }
                })
                    .filter((value) => value)
                    .map((value) => value.join("="))
                    .join(" ");
            }
            const children = serializeJsx(vnode.children, deep + 1);
            const isBr = children.includes("<");
            const space = (deep ? "\n" : "") + "    ".repeat(deep);
            return `${space}<${localName}${attrs ? ` ${attrs}` : ""}${children
                ? `>${children}${isBr ? "\n" + "    ".repeat(deep) : ""}</${localName}>`
                : "/>"}`;
        }
        else if (vnode == null || vnode === false) {
            return false;
        }
        else if (typeof vnode === "object") {
            if (getType(vnode) === "array")
                return serializeJsx(vnode);
        }
        else {
            return vnode;
        }
    });
    return children.filter((value) => value !== false).join("");
}
