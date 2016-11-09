import React from 'react';
import { observer, inject } from 'mobx-react';


const UserName = inject('SystemDataStore')(observer(props =>
    <div className="col-lg-3 col-md-6 col-sm-6">
        <div className="card card-stats">
            <div className="card-header animated zoomIn" data-background-color="blue">
                <i className="material-icons">account_box</i>
            </div>
            <div className="card-content">
                <p className="category">User Name</p>
                <h3 className="title">{props.SystemDataStore.user.name}</h3>
            </div>
            <div className="card-footer">
                <div className="stats">
                    <i className="material-icons text-danger">refresh</i> <a onClick={() => props.SystemDataStore.user.name = 'UserName'}>Reset</a>
                </div>
            </div>
        </div>
    </div>
));

UserName.wrappedComponent.propTypes = {
    SystemDataStore: React.PropTypes.object.isRequired,
};

export default UserName;
