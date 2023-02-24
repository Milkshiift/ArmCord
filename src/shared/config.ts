// Configuration management
import * as os from "os";
import path from "path";
import * as fs from "fs";
export interface Settings {
    channel: string;
    csp: boolean;
    automaticPatches: boolean;
    mods: string[];
    icon: string;
    mobileMode: boolean;
    skipSplash: boolean;
    skipUpdateChecks: boolean;
    updateServer: string;
    startMinimized: boolean;
    richPresence: boolean;
    inviteWebsocket: boolean;
    disableAutogain: boolean;
}
var settingsPath: string;
export function init() {
	if (os.platform() == "win32") {
        settingsPath = path.join(os.homedir(), "AppData/Roaming/ArmCord/storage/settings.json")
    } else if (os.platform() == "linux") {
        settingsPath = path.join(os.homedir(), "/.config/ArmCord/storage/settings.json")
    } //TODO fix macOS
    console.log("Config: init")
    //TODO clean up below
    var armcordFolder = settingsPath.replace("/storage/settings.json", "")
    if (!fs.existsSync(armcordFolder)) {
        console.log("Config: missing ArmCord folder, creating one for you")
        fs.mkdirSync(armcordFolder)
    }
    var storageFolder = settingsPath.replace("/settings.json", "")
    if (!fs.existsSync(storageFolder)) {
        console.log("Config: missing storage folder, creating one for you")
        fs.mkdirSync(storageFolder)
    }
    
}
function generateConfig() {

}
function set(object: string, toSet: string) {
    let rawdata = fs.readFileSync(settingsPath, "utf-8");
    let parsed = JSON.parse(rawdata);
    parsed[object] = toSet;
    let toSave = JSON.stringify(parsed, null, 4);
    fs.writeFileSync(settingsPath, toSave, "utf-8")
}
function get(object: string) {
    let rawdata = fs.readFileSync(settingsPath, "utf-8");
    let parsed = JSON.parse(rawdata);
    return parsed[object];
}

const settingsProxyHandler: ProxyHandler<any> = {
    get(target: any, prop: string, receiver: any) {
        return get(prop)
    },
    set(obj: any, prop: string, value: string) {
        try {
            set(prop, value)
            return true // return success
        } catch(e) {
            return false; //oh ooh stinky error
        }
    }
};
const target = {};
export const settings = new Proxy(target, settingsProxyHandler);