import { c } from "atomico";

function myComponent() {
    return (
        <host shadowDom>
            <h1>Welcome!</h1>
        </host>
    );
}

myComponent.props = {
    message: String,
};

export const MyComponent = c(myComponent);
