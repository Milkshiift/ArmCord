import * as Config from "./shared/config.js";
console.log("Booting ArmCord...");
Config.init();
// https://stackoverflow.com/a/69409483
const argv = (key: string) => {
    // Return true if the key exists and a value is defined
    if (process.argv.includes(`--${key}`)) return true;

    const value = process.argv.find((element) => element.startsWith(`--${key}=`));

    // Return null if the key does not exist and a value is not defined
    if (!value) return null;

    return value.replace(`--${key}=`, "");
};
switch (argv("start")) {
    case "settings": {
        console.log("Boot: starting settings");
        break;
    }
    case "setup": {
        console.log("Boot: starting setup");
        break;
    }
    case "client": {
        console.log("Boot: starting client");
        import("./client/index.js");
        break;
    }
    default: {
        console.log("Boot: starting splash");
        import("./splash/index.js");
        break;
    }
}
