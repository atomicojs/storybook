import { c } from "atomico";
function myComponent(props) {
    return (
        <host shadowDom>
            <h1>Welcome!</h1>
            <code>{JSON.stringify(props)}</code>
        </host>
    );
}

myComponent.props = {
    message: String,
    data: Object,
};

export const MyComponent = c(myComponent);
