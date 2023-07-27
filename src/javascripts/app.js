import Model from "./models/model";
import View from "./views/view";
import Controller from "./controllers/controller";

export class App {
    /**
     * Constructor off App object
     */
    constructor() { }

    /**
     * Function for starting the App
     */
    async startApp() {
        const controller = new Controller(new Model, new View);
        controller.init();
    }
}



