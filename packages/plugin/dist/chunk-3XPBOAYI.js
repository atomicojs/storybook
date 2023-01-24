import {
  options
} from "./chunk-RO7U2N3F.js";

// src/serialize.ts
var AtomicoID = Symbol.for("Atomico.ID");
var getAttr = (prop) => prop.replace(/([A-Z])/g, "-$1").toLowerCase();
var EMPTY_PROPS = {};
var serialize = ({ jsx = false }, children, tab = 0, currentId) => [...children].reduce((html, child) => {
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
        ([prop, value]) => props.set(jsx ? prop : value?.attr || getAttr(prop), value)
      );
      if (jsx && constructor.name && constructor.name != "AtomicoElement ") {
        localName = constructor.name;
      }
    }
    const attrs = [...props].filter(([prop]) => !ignore.includes(prop)).reduce((attrs2, [prop, value]) => {
      if (value != null) {
        let type = {}.toString.call(value).replace(/(.+) (.+)]/, "$2").toLowerCase();
        const wrapper = type === "object" || type === "array" ? ["", JSON.stringify(value), "'"] : ["", value, ""];
        let attr = type === "boolean" ? value ? prop : "" : type === "function" ? `${prop}=${type}` : `${prop}=${wrapper.join("")}`;
        attr && attrs2.push(attr);
      }
      return attrs2;
    }, []);
    let content = ignore.includes("children") ? "" : serialize({ jsx }, childNodes, tab + 1, currentId);
    if (content) {
      content += `
${space}`;
    }
    html += `${space ? `
${space}` : ""}<${localName}${attrs.length ? ` ${attrs.join(" ")}` : ""}>${content}</${localName}>`;
  } else if (child.textContent.trim()) {
    html += `
${space}${child.textContent}`;
  }
  return html;
}, "");

export {
  getAttr,
  serialize
};
