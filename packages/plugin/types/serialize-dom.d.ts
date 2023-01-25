/**
 * Transform a Camel Case string to a Kebab case
 */
export declare const getAttr: (prop: string) => string;
export declare const EMPTY_PROPS: {
    [prop: string]: any;
};
export declare const getType: (value: any) => any;
export declare const serializeDom: (children: NodeList, tab?: number, currentId?: symbol | string) => string;
