import React, { Component } from 'react';
import { observer, Provider } from 'mobx-react';
import { toJS } from 'mobx';
import * as stores from './stores';
import CPUGraph from './components/cpu';
import RamDoughnut from './components/ram';
import UserName from './components/user';
import Disk from './components/disk';
import IO from './components/io';

const GetDataWorkerScript = require("worker-static-loader?{'staticPath':'static/build/'}!./web_workers/web_worker_get_data.js");

const getDataWorker = new GetDataWorkerScript();
getDataWorker.postMessage(toJS(stores.SystemDataStore));

@observer
class DashBoard extends Component {

    constructor() {
        super();
        this.setWebWorker();
    }

    setWebWorker() {
        getDataWorker.onmessage = message => this.handelDataChange(message.data);
    }

    handelDataChange(data) {
        for (let key of Object.keys(data)) {
          stores.SystemDataStore[key] = data[key];
        }
    }


    render() {
        return (
            <Provider {...stores}>
                <div>
                    <div className="row">
                        <UserName />
                        <Disk />
                        <IO />
                    </div>
                    <div className="row">
                        <CPUGraph />
                        <RamDoughnut />
                    </div>
                </div>
            </Provider>
        );
    }
}

DashBoard.propTypes = {};

export default DashBoard;
