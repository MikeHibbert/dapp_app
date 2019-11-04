import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import arweave from '../../arweave-config';
import DonateDialog from '../../components/donate/DonateDialog';

class DocumentDetail extends Component {
    state = {
        document: null,
        show_dialog: false
    }

    componentDidMount() {
        // debugger;
        const txid = this.props.match.params.txid;
        const that = this;

        arweave.transactions.get(txid).then(transaction => {
            const tags = transaction.get('tags');
            
            const doc = {txid: txid};

            for(let i in tags) {
                const tag = tags[i];
                
                const name = tag.get('name', {decode: true, string: true});
                let value = tag.get('value', {decode: true, string: true});

                if(name === "created") {
                    value = parseInt(value);
                }

                doc[name] = value;
            };

            doc['data'] = transaction.get('data', {decode: true});

            doc['filetype'] = this.getFileType(doc.filename);

            doc['owner'] = transaction.owner;

            that.setState({document: doc});

        });
    }

    getFileType(filename) {
        const extention = filename.split('.').pop();

        let filetype = null;
        switch(extention.toLowerCase()) {
            case 'pdf':
                filetype = 'application/pdf';
                break;
            case 'docx':
                filetype = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
                break;
            case 'docx':
                filetype = 'application/msword';
                break;
            default:
                filetype = 'application/doc';
        }

        return filetype;
    }

    openDialog() {
        this.setState({show_dialog: true});
    }

    closeDialog() {
        this.setState({show_dialog: false});
    }
    
    render() {
        let document_details = <p>Loading Document Details ...</p>;
        
        if(this.state.document) {
            const mdate = moment(this.state.document.created);

            document_details = (<div key={this.state.document.txid}>
                <div className="col-xs-2 col-sm-1">
                    <time dateTime={mdate.format('YYYY-MM-DD')} className="datebox">
                        <strong>{mdate.format('MMM')}</strong>
                        <span>{mdate.format('DD')}</span>
                    </time>
                </div>
    
                <div className="col-xs-10 col-sm-11">
                    <h6>{this.state.document.title}</h6>
                    
                    <p className="margin-right-20">
                        <strong>File: {this.state.document.filename}</strong><br/><br/>
                        {this.state.document.description}
                    </p>
                </div>
                <div className="col-sm-12">
                    <hr className="half-margins" />
                </div>
                
            </div>);
        }
        
        let data_link = null;
        if(this.state.document) {
            const blob = new Blob([this.state.document.data.buffer], {type: this.state.document.filetype});
            const data = window.URL.createObjectURL(blob);

            data_link = (<li><a className="btn btn-success btn-xs white" 
                                href={data}
                                download={this.state.document.filename}><i className="fa fa-cloud-download"></i> Download</a></li>);
        }

        const dialog = <DonateDialog document={this.state.document} show={this.state.show_dialog} close={() => this.closeDialog.bind(this)}/>;        

        return (
            <>
            <div className="col-md-6 padding-20">
                <section className="panel panel-default">
                    <div className="panel-heading">
                        <span className="panel-title elipsis">
                            <i className="fa fa-rss"></i> Details
                        </span>
                        <ul className="options pull-right relative list-unstyled">
                    
                            {data_link}
                            
                            <li><a 
                                className="btn btn-info btn-xs white"
                                onClick={this.openDialog.bind(this)}
                                ><i className="fa fa-thumbs-o-up"></i> Donate!</a></li>
                        </ul>
                    </div>
                    <div className="panel-body noradius padding-10">
                        <div className="row profile-activity">
                            {document_details}
                        </div>
                    </div>
                </section>
            </div>
            {dialog}
            </>
        );
    }
}

export default DocumentDetail;