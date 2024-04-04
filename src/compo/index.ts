import type {App} from 'vue';
import {fdScreen, fdLayout} from './frame';
const frames = [fdScreen, fdLayout]; // Look Dumb For Me

export default {
    install(app:App) {
        frames.forEach(compo => {
            app.component(compo.name, compo);
        });
    }
};