var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// src/serialize.ts
var serialize = (children, tab = 0) => [...children].reduce((html, child) => {
  let space = tab ? "   ".repeat(tab) : "";
  if (child instanceof Element) {
    const { localName, childNodes, attributes } = child;
    const { _props = {} } = child;
    if (localName.includes("-")) {
      const props = _props ? Object.entries(_props) : Object.values(attributes).map((attr) => [
        attr.name,
        attr.value
      ]);
      const attrs = props.reduce((attrs2, [prop, value]) => {
        if (value != null) {
          let type = typeof value;
          let attr = type === "boolean" ? value ? prop : "" : type === "function" ? `${prop}=${type}` : `${prop}=${JSON.stringify(value)}`;
          attr && attrs2.push(attr);
        }
        return attrs2;
      }, []);
      let content = serialize(childNodes, tab + 1);
      if (content) {
        content += `
${space}`;
      }
      html += `${space ? `
${space}` : ""}<${localName}${attrs.length ? ` ${attrs.join(" ")}` : ""}>${content}</${localName}>`;
    }
  } else if (child.textContent.trim()) {
    html += `
${space}${child.textContent}`;
  }
  return html;
}, "");

export {
  __commonJS,
  __toESM,
  serialize
};
