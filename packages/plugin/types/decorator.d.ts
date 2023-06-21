import { StoryContext } from "@storybook/types";
type Source = "code" | "html";
export declare const decorator: ({ source }?: {
    source?: Source;
}) => (Story: () => any, context: StoryContext) => any;
export {};
