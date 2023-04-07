import * as Gluon from "@gluon-framework/gluon";
import {getVersion} from "../shared/updater.js";
const Window = await Gluon.open("https://discord.com/app", {
    windowSize: [800, 600]
});

Window.ipc.store.config = {
    version: getVersion()
};
