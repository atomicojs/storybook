import "./disable-hmr";
import { decorator } from "@atomico/storybook";
import { setCustomElements } from "@storybook/web-components";

setCustomElements({
    schemaVersion: "2.0.0",
    modules: [
        {
            kind: "javascript-module",
            path: "my-project/my-element.js",
            declarations: [
                {
                    kind: "class",
                    customElement: true,
                    name: "MyElement",
                    tagName: "my-element",
                    description: "This is the description of the class",
                    members: [
                        {
                            kind: "field",
                            name: "disabled",
                        },
                        {
                            kind: "method",
                            name: "fire",
                        },
                    ],
                    events: [
                        {
                            name: "disabled-changed",
                            type: {
                                text: "Event",
                            },
                        },
                    ],
                    attributes: [
                        {
                            name: "disabled",
                        },
                    ],
                    superclass: {
                        name: "HTMLElement",
                    },
                },
            ],
            exports: [
                {
                    kind: "js",
                    name: "MyElement",
                    declaration: {
                        name: "MyElement",
                    },
                },
                {
                    kind: "custom-element-definition",
                    name: "my-element",
                    declaration: {
                        name: "MyElement",
                    },
                },
            ],
        },
    ],
});

export const parameters = {
    actions: { argTypesRegex: "^on.*" },
};

export const decorators = [decorator];

const { define } = customElements;

customElements.define = function (tagName, element, options) {
    console.log({ tagName, element, options });
    define.call(this, tagName, element, options);
};
