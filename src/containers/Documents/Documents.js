import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Documents extends Component {

  state = {
    documents: [],
    loading: false
  }

  componentDidMount() {

  }

  render() {
    let documents = [];

    if(this.state.loading) {
        documents = [<span>Loading Latest Articles ...</span>];
    }

    if(this.state.documents.length > 0) {
        documents = this.state.documents.map((document) => {
            return (<>
                <div className="col-xs-2 col-sm-1">
                    <time datetime="2014-06-29" className="datebox">
                        <strong>Jun</strong>
                        <span>29</span>
                    </time>
                </div>

                <div className="col-xs-10 col-sm-11">
                    <h6><a href="page-sidebar.html">Lorem ipsum dolor sit amet</a></h6>
                    <p>
                        Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod 
                        tincidunt laoreet dolore magna aliquam tincidunt erat volutpat laoreet dolore magna aliquam 
                        tincidunt erat volutpat.
                    </p>
                </div>
                <div className="col-sm-12">
                    <hr className="half-margins" />
                </div>
                
            </>);
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
                <ul class="options pull-right relative list-unstyled">
                    <li><Link to={"/upload-document"} class="btn btn-primary btn-xs white"><i class="fa fa-plus"></i> Upload</Link></li>
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