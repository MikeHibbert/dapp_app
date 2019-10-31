import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import arweave from '../../arweave-config';
import settings from '../../app-config';
import Document from '../Documents/Document';

class Dashboard extends Component {

  state = {
    coin_pair: null,
    coin_pairs: null,
    baselines: null,
    candlesticks: null,
    coinpair_baselines: null,
    current_balance: 0.0,
    current_basecoin_prices: null,
    measure_enabled: false,
    exchange: 'binance',
    account: null,
    documents: []
  }

  componentDidMount() {
    this.getLatestDocuments();
  }

  async getLatestDocuments() {
    const txids = await arweave.arql({
        op: "equals",
        expr1: "app",
        expr2: settings.APP_TAG
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
    let latest_articles = [<span>Loading Latest Articles ...</span>];
    let documents = [];

    if(this.state.documents.length > 0) {
        documents = this.state.documents.map((doc) => {
            return <Document document={doc} key={doc.txid} />;            
        });
    }

    return ( <>
        <header id="page-header">
            <h1>Dashboard</h1>
        </header>
        <div className="col-md-8 padding-20">
            <section className="panel panel-default">
                <header className="panel-heading">
                    <h2 className="panel-title elipsis">
                        <i className="fa fa-rss"></i> Latest submissions
                    </h2>
                </header>
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

export default Dashboard;