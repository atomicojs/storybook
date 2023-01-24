import "./disable-hmr";
import { decorator } from "@atomico/storybook";

export const parameters = {
    actions: { argTypesRegex: "^on.*" },
    docs: { story: { inline: false } },
};

export const decorators = [decorator({ jsx: true })];
