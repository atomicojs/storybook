import { c } from "atomico";

function myComponentSlot() {
    return (
        <host shadowDom>
            <h1>Slot!</h1>
        </host>
    );
}

export const MyComponentSlot = c(myComponentSlot);
