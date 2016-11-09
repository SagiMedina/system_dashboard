import _ from 'underscore';
import getSystemData from '../apis/apis';

let dataStore = {};
let dataToSendBack = {};

function whichDataHasChanged(data) {
    !_.isEqual(dataStore.cpu, data.cpu) ? dataToSendBack.cpu = data.cpu : false;
    !_.isEqual(dataStore.disk, data.disk) ? dataToSendBack.disk = data.disk : false;
    !_.isEqual(dataStore.user, data.user) ? dataToSendBack.user = data.user : false;
    !_.isEqual(dataStore.io, data.io) ? dataToSendBack.io = data.io : false;
    !_.isEqual(dataStore.ram, data.ram) ? dataToSendBack.ram = data.ram : false;
    dataStore = data;
}

function fetchSystemData() {
    getSystemData().then(data => {
        whichDataHasChanged({ ...data });
        postMessage({ ...dataToSendBack });
        dataToSendBack = {};
    });
}

self.onmessage = message => dataStore = message.data;

fetchSystemData();
let httpReqInterval = setInterval(() => fetchSystemData(), 5000);
// stop after 3 minutes when on heroku
setTimeout(() => clearInterval(httpReqInterval), 180000);
