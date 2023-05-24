import "./disable-hmr";
import { decorator } from "@atomico/storybook/decorator";

export const parameters = {
    actions: { argTypesRegex: "^on.*" },
    docs: {
        source: {
            // language: "jsx",
        },
    },
};

export const decorators = [decorator];
