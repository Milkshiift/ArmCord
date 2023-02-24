import * as Gluon from '@gluon-framework/gluon';
const Window = await Gluon.open('splash.html', {
    windowSize: [300,300],
});

Window.ipc.store.config = {
    version: "4.0.0"
}
//TO-DO make splash sub-app detect if settings are complete (e.g new settings gets added in an update, ask user for their choice and load the settings app)
Window.ipc.open = async (app: string) => {
    import(`../${app}/index.js`)
}