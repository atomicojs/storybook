import "./chunk-R3PFIBHC.js";

// src/utils.ts
var agsTypes = {
  [String.name]: "text",
  [Number.name]: "number",
  [Boolean.name]: "boolean",
  [Object.name]: "object",
  [Array.name]: "object",
  default: "text"
};
var argsTypesReg = [
  [/color/, "color"],
  [/date/, "date"]
];
function defineArgTypes({ props }, rewrite) {
  const argsTypes = {};
  for (let prop in props) {
    const type = props[prop]?.type || props[prop];
    const value = props[prop]?.value;
    if (rewrite?.[prop] === false)
      continue;
    argsTypes[prop] = {
      control: agsTypes[type?.name || "default"],
      ...rewrite?.[prop],
      ...value != null ? {
        defaultValue: typeof value === "function" && type !== Function ? value() : value
      } : {}
    };
  }
  return argsTypes;
}
export {
  agsTypes,
  argsTypesReg,
  defineArgTypes
};
