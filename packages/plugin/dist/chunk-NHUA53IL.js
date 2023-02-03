import {
  EMPTY_PROPS,
  getType
} from "./chunk-GJ32V3B3.js";

// src/serialize-jsx.ts
function serializeJsx(vnode, deep = 0) {
  const children = [vnode].flat(100).map((vnode2) => {
    let localName = "";
    let props = EMPTY_PROPS;
    let attrs = "";
    if (vnode2?.$$ && vnode2.type) {
      localName = vnode2.raw === 2 ? vnode2.type?.name : vnode2.type;
      props = vnode2.props;
    }
    if (localName) {
      if (props != EMPTY_PROPS) {
        attrs = Object.entries(props).filter(([prop]) => prop !== "children").map(([prop, value]) => {
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
        }).filter((value) => value).map((value) => value.join("=")).join(" ");
      }
      const children2 = serializeJsx(vnode2.children, deep + 1);
      const isBr = children2.includes("<");
      const space = (deep ? "\n" : "") + "    ".repeat(deep);
      return `${space}<${localName}${attrs ? ` ${attrs}` : ""}${children2 ? `>${children2}${isBr ? "\n" + "    ".repeat(deep) : ""}</${localName}>` : "/>"}`;
    } else if (vnode2 == null || vnode2 === false) {
      return false;
    } else if (typeof vnode2 === "object") {
      if (getType(vnode2) === "array")
        return serializeJsx(vnode2);
    } else {
      return vnode2;
    }
  });
  return children.filter((value) => value !== false).join("");
}

export {
  serializeJsx
};
