import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import arweave from '../../arweave-config';
import settings from '../../app-config';
import Document from './Document';

class Documents extends Component {

  state = {
    documents: [],
    loading: false
  }

  componentDidMount() {
    this.getMyDocuments();
  }

  async getMyDocuments() {
    const txids = await arweave.arql({
        op: "and",
        expr1: {
            op: "equals",
            expr1: "from",
            expr2: this.props.wallet_address
        },
        expr2: {
            op: "equals",
            expr1: "app",
            expr2: settings.APP_TAG
        }
    });

    const that = this;
    const documents = [];

    for(let i in txids) {
        const txid = txids[i];
        
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

            documents.push(doc);


        }).finally(() => {     
            const final_documents = documents.sort((a, b) => a.created > b.created);
            that.setState({documents: final_documents});
        });
    }   
  }

  render() {
    let documents = [];

    if(this.state.loading) {
        documents = [<span>Loading Latest Articles ...</span>];
    }

    if(this.state.documents.length > 0) {
        documents = this.state.documents.map((doc) => {
            return <Document document={doc} />;            
        });
    }

    return ( <>
    <header id="page-header">
        <h1>Dashboard</h1>
    </header>
    <div className="col-md-8 padding-20">
        <section className="panel panel-default">
            <div className="panel-heading">
                <span className="panel-title elipsis">
                    <i className="fa fa-rss"></i> Published Documents
                </span>
                <ul className="options pull-right relative list-unstyled">
                    <li><Link to={"/upload-document"} className="btn btn-primary btn-xs white"><i className="fa fa-plus"></i> Upload</Link></li>
                </ul>
            </div>
            <div className="panel-body noradius padding-10">
                <div className="row profile-activity">
                    {documents}
                </div>
            </div>
        </section>
    </div>
    
    </>);
  }

}

export default Documents;