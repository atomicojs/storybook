import { MyComponent } from "./my-component";
import { define } from "@atomico/storybook";
import { useAsync } from "atomico";

let id = 0;

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

export const myStory = (props) => {
    const list = useAsync(() => todo, []);
    return (
        <ul>
            {list.map((todo) => (
                <li>{todo.title}</li>
            ))}
        </ul>
    );
};
