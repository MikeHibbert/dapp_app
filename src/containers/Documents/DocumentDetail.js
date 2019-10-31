import React, { Component } from 'react';
import { Link, useParams } from 'react-router-dom';
import moment from 'moment';
import arweave from '../../arweave-config';

class DocumentDetail extends Component {
    state = {
        document: null
    }

    componentDidMount() {
        const { txid } = useParams();
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

            that.setState({document: doc});

        });
    }
    
    render() {
        let document_details = <p>Loading Document Details ...</p>;
        
        if(this.state.document) {
            const mdate = moment(this.state.document.created);

            document_details = (<div key={this.state.document.txid}>
                <div className="col-xs-2 col-sm-1">
                    <time dateTime="2014-06-29" className="datebox">
                        <strong>{mdate.format('MMM')}</strong>
                        <span>{mdate.format('DD')}</span>
                    </time>
                </div>
    
                <div className="col-xs-10 col-sm-11">
                    <h6><Link to="/document/{this.props.document.txid}">{this.state.document.title}</Link></h6>
                    
                    <p>
                        <h5>File: {this.state.document.filename}</h5>
                        {this.state.document.description}
                    </p>
                </div>
                <div className="col-sm-12">
                    <hr className="half-margins" />
                </div>
                
            </div>);
        }
        

        return document_details;
    }
}

export default DocumentDetail;