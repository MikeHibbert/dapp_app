import React, { Component } from 'react';

class UploaderPage extends Component {
    state = {

    }

    render() {
        let upload_form = [];
        
        return ( <>
            <header id="page-header">
                <h1>Upload</h1>
            </header>
            <div className="col-md-8 padding-20">
                <section className="panel panel-default">
                    <header className="panel-heading">
                        <h2 className="panel-title elipsis">
                            <i className="fa fa-cloud-upload"></i> Upload Document to the blockchain
                        </h2>
                    </header>
                    <div className="panel-body noradius padding-10">
                        <div className="row profile-activity">
                            {upload_form}
                        </div>
                    </div>
                </section>
            </div>
            
        </>);
    }
}

export default UploaderPage;