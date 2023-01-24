import {
  decorator
} from "./chunk-77IT5RJY.js";
import "./chunk-ATM4IPOZ.js";
import {
  options
} from "./chunk-RO7U2N3F.js";

// src/core.ts
var getAutoControl = (prop, type) => options.match.find(
  ({ regExp, and }) => regExp.test(prop) ? and ? type === and : true : false
);
function define(component, config) {
  const story = {
    ...config,
    argTypes: {},
    args: {
      ...config?.args
    },
    parameters: {
      actions: { argTypesRegex: "^on.*" },
      ...config?.parameters
    }
  };
  const { props } = component;
  const types = Object.entries(props).map(
    ([prop, schema]) => [
      prop,
      typeof schema === "object" && schema != null ? schema : { type: schema }
    ]
  ).reduce((types2, [prop, schema]) => {
    const { type, value } = schema;
    const autoControl = getAutoControl(prop, type);
    const control = autoControl?.control || options.alias[type?.name || "default"];
    const defaultValue = typeof value === "function" && type !== Function ? value() : type === Boolean && !value ? false : value;
    return { ...types2, [prop]: { control, defaultValue, type } };
  }, {});
  story.argTypes = [options.global, config?.argTypes].reduce(
    (argTypes, schema) => {
      if (!schema)
        return argTypes;
      let entries = Object.entries(schema);
      if (schema === options.global)
        entries = entries.filter(([prop]) => prop in props);
      return entries.reduce((argTypes2, [prop, value]) => {
        if (value === false) {
          delete argTypes2[prop];
        } else {
          const argType = argTypes2[prop];
          const event = /on(.+)/.test(prop) && !types[prop];
          const automaticCategory = event ? "Events" : prop.startsWith("--") ? `CSS custom properties` : void 0;
          const {
            category = argType?.table?.category || automaticCategory,
            defaultValue = argType?.table?.defaultValue?.summary,
            ...config2
          } = value;
          let { description = argType?.description } = value;
          let {
            control = argType?.control || getAutoControl(prop)?.control
          } = value || {};
          const table = {
            category,
            type: {
              ...argType?.table?.type,
              ...config2?.table?.type
            },
            defaultValue: {
              summary: defaultValue,
              ...argType?.table?.defaultValue,
              ...config2?.table?.defaultValue
            }
          };
          return {
            ...argTypes2,
            [prop]: {
              ...argType,
              ...config2,
              description,
              control,
              table
            }
          };
        }
        return argTypes2;
      }, argTypes);
    },
    story.argTypes
  );
  Object.entries(types).forEach(([prop, { control, defaultValue, type }]) => {
    if (story.argTypes?.[prop] === false)
      return;
    const argType = story.argTypes?.[prop];
    story.argTypes[prop] = {
      ...story.argTypes[prop],
      control: argType?.control || control,
      type: argType?.type || type,
      table: {
        ...argType?.table,
        type: {
          ...argType?.table?.type,
          summary: type?.name || "Any"
        },
        defaultValue: {
          ...argType?.table?.defaultValue,
          summary: argType?.table?.defaultValue?.summary || defaultValue
        }
      }
    };
    story.args[prop] = prop in story.args ? story.args[prop] : defaultValue;
  });
  return story;
}
var defineArgTypes = (component, argTypes) => define(component, { argTypes }).argTypes;
var defineArgs = (component, argTypes) => define(component, { argTypes }).args;
export {
  decorator,
  define,
  defineArgTypes,
  defineArgs,
  options
};
