import type {App} from 'vue';
import * as elems  from './elem';
import * as boxes  from './box';
import * as frames from './frame';

import * as direces from './directive';

export default {
    install(app:App) {
        [elems, boxes, frames].forEach(compos => {
            Object.values(compos).forEach(item => {
                app.component(item.name||'', item)
            });
        })

        Object.values(direces).forEach(direc => {
            app.directive(direc.name, direc);
        });
    }
};

