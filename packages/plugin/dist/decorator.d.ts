import { StoryContext } from "@storybook/types";
type Source = "code" | "html";
export declare const decorator: ({ source, forceRemount, }?: {
    source?: Source;
    forceRemount?: boolean;
}) => (Story: () => any, context: StoryContext) => any;
export {};
