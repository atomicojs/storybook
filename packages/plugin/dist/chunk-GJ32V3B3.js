import {
  options
} from "./chunk-ZJPJA7KU.js";

// src/serialize-dom.ts
var AtomicoID = Symbol.for("Atomico.ID");
var getAttr = (prop) => prop.replace(/([A-Z])/g, "-$1").toLowerCase();
var EMPTY_PROPS = {};
var getType = (value) => ({}).toString.call(value).replace(/(.+) (.+)]/, "$2").toLowerCase();
var serializeDom = (children, tab = 0, currentId) => [...children].reduce((html, child) => {
  let space = tab ? "   ".repeat(tab) : "";
  if (child instanceof Element) {
    let { localName } = child;
    const { childNodes, attributes } = child;
    const ignore = [...options.ignore[localName] || []];
    if (options.ignore["*"])
      ignore.push(...options.ignore["*"]);
    const { _props = EMPTY_PROPS, constructor } = child;
    currentId = child.symbolId || currentId;
    if (!child[currentId] && !child[AtomicoID])
      return html;
    const props = new Map(
      Object.values(attributes).map((attr) => [attr.name, attr.value])
    );
    if (_props != EMPTY_PROPS) {
      Object.entries(_props).forEach(
        ([prop, value]) => props.set(value?.attr || getAttr(prop), value)
      );
    }
    const attrs = [...props].filter(([prop]) => !ignore.includes(prop)).map(([prop, value]) => {
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
    }).filter((value) => value).map((value) => value.join("="));
    let content = ignore.includes("children") ? "" : serializeDom(childNodes, tab + 1, currentId);
    const isBr = content.includes("<");
    if (content) {
      content += `${isBr ? "\n" + space : ""}`;
    }
    html += `${space ? `
${space}` : ""}<${localName}${attrs.length ? ` ${attrs.join(" ")}` : ""}>${content}</${localName}>`;
  } else if (child.textContent.trim()) {
    html += `${child.textContent}`;
  }
  return html;
}, "");

export {
  getAttr,
  EMPTY_PROPS,
  getType,
  serializeDom
};
