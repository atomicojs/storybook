import { options } from './options.js';

const AtomicoID = Symbol.for("Atomico.ID");
const getAttr = (prop) => prop.replace(/([A-Z])/g, "-$1").toLowerCase();
const EMPTY_PROPS = {};
const getType = (value) => ({}).toString.call(value).replace(/(.+) (.+)]/, "$2").toLowerCase();
const serializeDom = (children, tab = 0, currentId) => [...children].reduce((html, child) => {
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

export { EMPTY_PROPS, getAttr, getType, serializeDom };
