import { addons, useEffect } from '@storybook/addons';
import { SNIPPET_RENDERED } from '@storybook/docs-tools';
import { render, h, html } from 'atomico';
import { serializeDom } from './serialize-dom.js';
import { serializeJsx } from './serialize-jsx.js';
import './options.js';

const cache = {};
class Wrapper extends HTMLElement {
  disconnectedCallback() {
    delete cache[this.dataset.id];
  }
}
if (!customElements.get("atomico-decorator-wrapper"))
  customElements.define("atomico-decorator-wrapper", Wrapper);
const isVnode = (value) => "$$" in value;
const decorator = (Story, context) => {
  let channel = addons.getChannel();
  if (!cache[context.id]) {
    cache[context.id] = document.createElement("atomico-decorator-wrapper");
    cache[context.id].setAttribute("data-id", context.id);
  }
  let result = Story();
  const canvas = cache[context.id];
  if (typeof result === "string") {
    render(h("host", null, html.call(null, [result])), canvas);
  } else if (result instanceof Node) {
    canvas.innerHTML = "";
    canvas.append(result);
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
    render(h("host", null, result), canvas);
  } else if (result.render) {
    result.render(canvas);
  }
  let rendered = canvas;
  const isJsx = context.parameters.docs?.source?.language === "jsx";
  useEffect(() => {
    requestAnimationFrame(() => {
      channel.emit(SNIPPET_RENDERED, {
        id: context.id,
        args: context.unmappedArgs,
        source: isJsx ? serializeJsx(result) : serializeDom(rendered.childNodes)
      });
    });
  });
  return canvas;
};

export { decorator };
