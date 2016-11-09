import React from 'react';
import { observer, inject } from 'mobx-react';


const Disk = inject('SystemDataStore')(observer(props =>
    <div className="col-lg-3 col-md-6 col-sm-6">
        <div className="card card-stats">
            <div className="card-header animated zoomIn" data-background-color="red">
                <i className="material-icons">storage</i>
            </div>
            <div className="card-content">
                <p className="category">Used Space</p>
                <h3 className="title">{props.SystemDataStore.disk.used}/{props.SystemDataStore.disk.total}<small>GB</small></h3>
            </div>
            <div className="card-footer">
                <div className="stats">
                    <i className="material-icons text-danger">refresh</i> <a onClick={() => props.SystemDataStore.disk.total = props.SystemDataStore.disk.used = 0}>Reset</a>
                </div>
            </div>
        </div>
    </div>
));

Disk.wrappedComponent.propTypes = {
    SystemDataStore: React.PropTypes.object.isRequired,
};

export default Disk;
