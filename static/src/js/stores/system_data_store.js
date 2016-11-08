import { observable } from 'mobx';

class SystemDataStore {
    @observable cpu = {
        percent: 0,
    };
    @observable disk = {
        total: 0,
        used: 0,
    };
    @observable user = {
        name: 'UserName',
    };
    @observable io = {
        sent_bytes_sec: 0,
        received_bytes_sec: 0,
    };
    @observable ram = {
        total: 50,
        used: 0,
        percent: 0,
    };
}

export default new SystemDataStore();
