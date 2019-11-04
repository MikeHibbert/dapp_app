import React, {Component} from 'react';
import arweave from '../../arweave-config';
import settings from '../../app-config';
import SearchResult from './Result';

class Search extends Component {
    state = {
        documents: [],
        filter: ""
    }

    async componentDidMount() {
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
    
            }).finally((response) => {    
                const final_documents = documents.sort((a, b) => a.created > b.created);
                that.setState({documents: final_documents});
            });
        }   
    }

    match_filter(document) {

        const title = document.title.toLowerCase();
        const description = document.description.toLowerCase();
        const filename = document.filename.toLowerCase();

        if(title.indexOf(this.state.filter) !== -1) {
            return true;
        }

        if(description.indexOf(this.state.filter) !== -1) {
            return true;
        }

        if(filename.indexOf(this.state.filter) !== -1) {
            return true;
        }

        return false;
    }

    onChange(event) {
        const filter = event.target.value;

        this.setState({filter: filter});
    }

    render() {
        let search_summary = null;

        let documents = [];
        let found_documents = [];
        
        if(this.state.documents.length > 0) {
            if(this.state.filter.length > 0) {
                documents = this.state.documents.filter(this.match_filter.bind(this));
            } else {
                documents = [...this.state.documents];
            }

            search_summary = (<div>
                <h6 className="nomargin"> 
                    {documents.length} results
                </h6>
                <hr className="nomargin-bottom margin-top-10" />
            </div>);

            found_documents = documents.map(doc => {
                return <SearchResult key={doc.txid} document={doc} />;
            });
        }
        

        return ( <>
            <header id="page-header">
                <h1>Search</h1>
            </header>
            <div id="content" className="padding-20">
                <div className="panel panel-default">
                    <div className="panel-body">
                        <label>Search:</label>
                        <input type="text" className="form-control" onChange={(e) => this.onChange(e)} />
                    </div>
                </div>
                <div className="panel panel-default">
                    <div className="panel-body">
                    {search_summary}
                    {found_documents}
                    </div>
                </div>
            </div>
            </>);
    }
}

export default Search;