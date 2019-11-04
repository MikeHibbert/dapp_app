import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class SearchResult extends Component {
    
    render() {
        const link_obj = {
            pathname: '/document/' + this.props.document.txid
        }

        return (
            <div className="clearfix search-result">
                <h4><Link to={link_obj}>{this.props.document.title}</Link></h4>
                <small className="text-success">{this.props.document.filename}</small>
                <p>{this.props.document.description.slice(0, 200)} ...</p>
            </div>
        );
    }
}

export default SearchResult;