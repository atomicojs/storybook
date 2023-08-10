import { auto } from "@atomico/react";
const components = new Map();
const vnode = new Map();
export const decorator = (story, context) => {
    if (context.component) {
        if (!components.has(context.id)) {
            components.set(context.id, auto(context.component));
        }
        context.component = components.get(context.id);
    }
    const result = story();
    return mapWrappers(result);
};
export function mapWrappers(node) {
    const elements = [node].flat(1000);
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
