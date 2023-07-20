import { App } from "./app";
// import { prepareUtils } from "./utils/utils";

// Sure that scripts called after DOM loaded
document.addEventListener("DOMContentLoaded", () => {
    const myApp = new App();

    // Prepare the Utils
    // prepareUtils();

    // Start the App
    myApp.startApp();
});