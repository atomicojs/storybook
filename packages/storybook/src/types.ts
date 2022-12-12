export type Conditional =
    | (
          | {
                arg: string;
            }
          | {
                global: string;
            }
      ) &
          (
              | {
                    truthy?: boolean;
                }
              | {
                    exists: boolean;
                }
              | {
                    eq: any;
                }
              | {
                    neq: any;
                }
          );

export type Type = "boolean" | "string" | "number" | "function" | "symbol";

interface TypeBase {
    required?: boolean;
    raw?: string;
}
export type TypeGeneric = TypeBase & {
    name: "boolean" | "string" | "number" | "function" | "symbol";
};
export type TypeArray = TypeBase & {
    name: "array";
    value: Types;
};
export type TypeObject = TypeBase & {
    name: "object";
    value: Record<string, Types>;
};
export type TypeEnum = TypeBase & {
    name: "enum";
    value: (string | number)[];
};
export type TypeInserction = TypeBase & {
    name: "intersection";
    value: Types[];
};
export type TypeUnion = TypeBase & {
    name: "union";
    value: Types[];
};
export type TypeOther = TypeBase & {
    name: "other";
    value: string;
};

export type ControlGeneric<Type extends string> = {
    control: Type;
};

export type ControlColor<Type extends string> = {
    control?:
        | Type
        | {
              type: Type;
              presetColors?: (string | { color: string; title: string })[];
              options?: string[];
          };
};

export type ControlOptions<Type extends string> = {
    control?:
        | Type
        | {
              type: Type;
              labels?: Record<string, string>;
          };
    options: string[];
};

export type ControlFile = {
    control:
        | "file"
        | {
              type: "file";
              accept?: string;
          };
};

export type ControlRange<Type extends string> = {
    control:
        | Type
        | {
              type: Type;
              min?: number;
              max?: number;
              step?: number;
          };
};

export type Controls =
    | ControlColor<"color">
    | ControlGeneric<"object" | "boolean" | "text" | "date">
    | ControlFile
    | ControlRange<"number" | "range">
    | ControlOptions<
          "radio" | "select" | "inline-radio" | "check" | "multi-select"
      >;

export type Types =
    | TypeGeneric
    | TypeEnum
    | TypeArray
    | TypeObject
    | TypeInserction
    | TypeUnion
    | TypeOther;

export interface Table {
    type?: {
        summary?: string;
        detail?: string;
    };
    defaultValue?: { summary?: string; detail?: string };
    category?: string;
}

export type InputBase<Control> = {
    name?: string;
    description?: string;
    type?: Types | Type;
    if?: Conditional;
    table?: Table;
    category?: string;
    action?: string;
} & Control;

export type Input = InputBase<Controls>;

export interface ArgTypes {
    [index: string]: Input | false;
}
