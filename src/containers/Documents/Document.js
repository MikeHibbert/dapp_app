import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';

class Document extends Component {
    
    render() {
        const mdate = moment(this.props.document.created);

        const link_obj = {
            pathname: '/document/' + this.props.document.txid
        }
        return (<div key={this.props.document.txid}>
            <div className="col-xs-2 col-sm-1">
                <time dateTime={mdate.format('YYYY-MM-DD')} className="datebox">
                    <strong>{mdate.format('MMM')}</strong>
                    <span>{mdate.format('DD')}</span>
                </time>
            </div>

            <div className="col-xs-10 col-sm-11">
                <h6><Link to={link_obj}>{this.props.document.title}</Link></h6>
                
                <p className="margin-right-20">
                    <strong>File: {this.props.document.filename}</strong><br /><br />
                    <strong>Description: </strong><br />
                    {this.props.document.description}
                </p>
            </div>
            <div className="col-sm-12">
                <hr className="half-margins" />
            </div>
            
        </div>);
    }
}

export default Document;