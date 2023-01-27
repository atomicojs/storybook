import "./disable-hmr";
import { decorator } from "@atomico/storybook";

export const parameters = {
    actions: { argTypesRegex: "^on.*" },
    docs: {
        story: { inline: false },
        source: {
            language: "jsx",
        },
    },
};

export const decorators = [decorator];
