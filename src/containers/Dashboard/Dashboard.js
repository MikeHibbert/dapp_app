import React, { Component } from 'react';
import { Link } from 'react-router-dom';

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
  }

  componentDidMount() {

  }

  render() {
    let latest_articles = [<span>Loading Latest Articles ...</span>];

    if(this.props.latest_articles.length > 0) {
        latest_articles = this.props.latest_articles.map((article) => {
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
                <header className="panel-heading">
                    <h2 className="panel-title elipsis">
                        <i className="fa fa-rss"></i> Latest submissions
                    </h2>
                </header>
                <div className="panel-body noradius padding-10">
                    <div className="row profile-activity">
                        {latest_articles}
                    </div>
                </div>
            </section>
        </div>
    
    </>);
  }

}

export default Dashboard;