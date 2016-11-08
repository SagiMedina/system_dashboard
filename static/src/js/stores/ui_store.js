import { observable } from 'mobx';

class UiStore {
    @observable test = 1
}

export default new UiStore();
