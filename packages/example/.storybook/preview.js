import "./disable-hmr";
import { decorator } from "@atomico/storybook";

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
