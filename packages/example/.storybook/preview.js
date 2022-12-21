import "./disable-hmr";
import { decorator, options } from "@atomico/storybook";

options.markdown = true;

options.global = {
    color: {
        category: "Appearance",
    },
};

export const parameters = {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
        expanded: true,
        matchers: {
            color: /(background|color)$/i,
            date: /Date$/,
        },
    },
};

export const decorators = [decorator];
