import type {App} from 'vue';
import * as elems from './elem';
import * as frames from './frame';


export default {
    install(app:App) {
        [elems, frames].forEach(compos => {
            Object.values(compos).map(item => {
                app.component(item.name||'', item)
            });
        })
    }
};

