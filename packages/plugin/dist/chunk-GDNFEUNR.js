import {
  serialize
} from "./chunk-BAWAZQJT.js";

// src/decorator.ts
import { addons, useEffect } from "@storybook/addons";

// ../../node_modules/@storybook/docs-tools/dist/esm/shared.js
var ADDON_ID = "storybook/docs";
var PANEL_ID = "".concat(ADDON_ID, "/panel");
var SNIPPET_RENDERED = "".concat(ADDON_ID, "/snippet-rendered");
var SourceType;
(function(SourceType2) {
  SourceType2["AUTO"] = "auto";
  SourceType2["CODE"] = "code";
  SourceType2["DYNAMIC"] = "dynamic";
})(SourceType || (SourceType = {}));

// src/decorator.ts
import { h, render, html } from "atomico";
var cache = {};
var Wrapper = class extends HTMLElement {
  disconnectedCallback() {
    delete cache[this.dataset.id];
  }
};
if (!customElements.get("atomico-decorator-wrapper"))
  customElements.define("atomico-decorator-wrapper", Wrapper);
var isVnode = (value) => "$$" in value;
var decorator = ({ jsx = false }) => (Story, context) => {
  let channel = addons.getChannel();
  if (!cache[context.id]) {
    cache[context.id] = document.createElement(
      "atomico-decorator-wrapper"
    );
    cache[context.id].setAttribute("data-id", context.id);
  }
  let result = Story();
  if (typeof result === "string") {
    render(
      h("host", null, html.call(null, [result])),
      cache[context.id]
    );
  } else if (result instanceof Node) {
    cache[context.id].innerHTML = "";
    cache[context.id].append(result);
  } else if (Array.isArray(result) || result.$$) {
    if (isVnode(result)) {
      const { props, cssProps } = Object.entries(result.props).reduce(
        ({ props: props2, cssProps: cssProps2 }, [prop, value]) => {
          if (prop.startsWith("--") && value) {
            cssProps2[prop] = value;
          } else {
            props2[prop] = value;
          }
          return { props: props2, cssProps: cssProps2 };
        },
        {
          props: {},
          cssProps: {}
        }
      );
      if (Object.keys(cssProps).length) {
        result.props = {
          ...props,
          style: cssProps
        };
      }
    }
    render(h("host", null, result), cache[context.id]);
  } else if (result.render) {
    result.render(cache[context.id]);
  }
  let rendered = cache[context.id];
  useEffect(() => {
    channel.emit(
      SNIPPET_RENDERED,
      context.id,
      serialize({ jsx }, rendered.childNodes)
    );
  });
  return rendered;
};

export {
  decorator
};
