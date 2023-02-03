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
    { regExp: /^color/, control: "color" },
    { regExp: /\w+Color/, control: "color" },
    { regExp: /^date/, control: "date" },
    { regExp: /\w+Date/, control: "date" }
  ]
};

export {
  options
};
