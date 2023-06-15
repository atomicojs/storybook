import { addons } from '@storybook/addons';
import { SNIPPET_RENDERED } from '@storybook/docs-tools';
import { useHost, useEffect, h, c } from 'atomico';
import { serializeDom } from './serialize-dom.js';
import { serializeJsx } from './serialize-jsx.js';
import './options.js';

function wrapper({ story, cid, args, source }) {
  const host = useHost();
  useEffect(() => {
    requestAnimationFrame(() => {
      addons.getChannel().emit(SNIPPET_RENDERED, {
        id: cid,
        args,
        source: source === "jsx" ? serializeJsx(result) : serializeDom(host.current.childNodes)
      });
    });
  });
  const result = story();
  return h("host", null, result);
}
wrapper.props = {
  cid: String,
  story: Function,
  source: null,
  args: null
};
const Wrapper = c(wrapper);
const cache = {};
if (!customElements.get("atomico-decorator-wrapper"))
  customElements.define("atomico-decorator-wrapper", Wrapper);
const decorator = (Story, context) => {
  if (!cache[context.id]) {
    cache[context.id] = document.createElement(
      "atomico-decorator-wrapper"
    );
    cache[context.id].setAttribute("cid", context.id);
  }
  const host = cache[context.id];
  host.story = Story;
  host.args = context.unmappedArgs;
  host.source = context.parameters.docs?.source?.language;
  return host;
};

export { decorator };
