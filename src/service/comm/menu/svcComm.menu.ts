import data from './svcComm.menu.data';

export default {
    async get() : Promise<Menu[]> {
        return new Promise((resolve /*, reject*/) => {
            setTimeout(() => {
                resolve(data());
            });
        });
    }
}