# @atomico/storybook

Allows projects to render projects with virtualDOM

## Setup

create .storybook/preview file and add the following script.

```js
import { decorator } from "@atomico/storybook";

export const decorators = [decorator];
```

## how to disable hmr? (Optional)

Create the file .storybook/disable-hmr.js and add the following script.

```js
if (module && module.hot && module.hot.decline) {
    console.log(module);
    module.hot.decline();
    const hmr = new EventSource("__webpack_hmr");
    hmr.addEventListener("message", function fullPageReload(event) {
        try {
            const { action } = JSON.parse(event.data);
            if (action === "built") {
                location.reload();
            }
        } catch (error) {}
    });
}
```

## render compatibility

-   [x] atomico
-   [x] @atomico/lit-html
-   [x] @atomico/uhtml
