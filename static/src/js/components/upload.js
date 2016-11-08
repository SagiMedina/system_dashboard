import React from 'react';
import { observer, inject } from 'mobx-react';


const Upload = inject('SystemDataStore')(observer(props =>
    <div className="col-lg-3 col-md-6 col-sm-6">
        <div className="card card-stats">
            <div className="card-header animated zoomIn" data-background-color="purple">
                <i className="material-icons">cloud_upload</i>
            </div>
            <div className="card-content">
                <p className="category">Sent Bytes</p>
                <h3 className="title">{props.SystemDataStore.io.sent_bytes_sec}<small>/Sec</small></h3>
            </div>
            <div className="card-footer">
                <div className="stats">
                    <i className="material-icons text-danger">refresh</i> <a onClick={() => { props.SystemDataStore.io.received_bytes_sec = 0; props.SystemDataStore.io.sent_bytes_sec = 0; }}>Reset</a>
                </div>
            </div>
        </div>
    </div>
));

Upload.propTypes = {
    SystemDataStore: React.PropTypes.object.isRequired,
};

export default Upload;
