// src/react.ts
import { auto } from "@atomico/react";
var components = /* @__PURE__ */ new Map();
var vnode = /* @__PURE__ */ new Map();
var decorator = (story, context) => {
  if (context.component) {
    if (!components.has(context.id)) {
      components.set(context.id, auto(context.component));
    }
    context.component = components.get(context.id);
  }
  const result = story();
  return mapWrappers(result);
};
function mapWrappers(node) {
  const elements = [node].flat(1e3);
  return elements.map((child) => {
    if (child?.type?.props) {
      if (!vnode.has(child?.type)) {
        vnode.set(child?.type, auto(child?.type));
      }
      child.type = vnode.get(child?.type);
      if (child?.props?.children) {
        child.props.children = mapWrappers(child.children);
      }
    }
    return child;
  });
}
export {
  decorator,
  mapWrappers
};
