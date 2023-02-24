import * as Gluon from '@gluon-framework/gluon';
const Window = await Gluon.open('https://discord.com/app', {
    windowSize: [800,600],
});

Window.ipc.store.config = {
    version: "4.0.0"
}
