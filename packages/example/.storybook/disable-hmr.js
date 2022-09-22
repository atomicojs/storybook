if (module && module.hot && module.hot.decline) {
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
