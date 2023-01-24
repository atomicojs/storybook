// src/options.ts
var options = {
  global: {},
  ignore: {},
  alias: {
    [String.name]: "text",
    [Number.name]: "number",
    [Boolean.name]: "boolean",
    [Object.name]: "object",
    [Array.name]: "object",
    default: "text"
  },
  match: [
    { regExp: /color/i, control: "color" },
    { regExp: /date/i, control: "date" }
  ]
};

export {
  options
};
