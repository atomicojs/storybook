import { MyComponent } from "./my-component";
import { define } from "@atomico/storybook";
import { useAsync } from "atomico";

export default {
    title: "my-component",
    component: "my-element",
    ...define(MyComponent),
};

const todo: Promise<
    {
        userId: number;
        id: number;
        title: string;
        completed: boolean;
    }[]
> = fetch("https://jsonplaceholder.typicode.com/todos").then((response) =>
    response.json()
);

export const myStory1 = (props) => {
    const list = useAsync(() => todo, []);
    return (
        <>
            <ul>
                {list.slice(0, 4).map((todo) => (
                    <li>{todo.title}</li>
                ))}
            </ul>
            <code>{JSON.stringify(props)}</code>
        </>
    );
};

export const myStory2 = (props) => {
    const list = useAsync(() => todo, []);
    return (
        <ul>
            {list.map((todo) => (
                <li>{todo.title}</li>
            ))}
        </ul>
    );
};
