import { DecoratorFunction } from "@storybook/csf";
import { h, render } from "atomico";

const cache: {
    [id: string]: Element;
} = {};

export const decorator: DecoratorFunction = (Story, context) => {
    if (!cache[context.id]) {
        cache[context.id] = document.createElement("div");
    }
    return render(h("host", null, Story()), cache[context.id]);
};
