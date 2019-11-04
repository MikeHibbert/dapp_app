import React, { Component } from 'react';
import UserMenu from '../UserMenu/UserMenu';
import Search from '../search/Search';


class PageHeader extends Component {
  state = {
    toggled: true,
    current_balance: 0
  }

  handleMobileToggle() {

    if(!this.state.toggled) {
      document.body.classList.remove('min');
      document.body.classList.add('menu-open');
    } else {
      document.body.classList.add('min');
      document.body.classList.remove('menu-open');
    }

    this.setState({toggled: !this.state.toggled});

    this.props.onToggleContenArea(!this.state.toggled);
  }

  render() {
    let header = null;

    if(this.props.isAuthenticated) {

      header = (
        <>
        <button id="mobileMenuBtn" onClick={this.handleMobileToggle.bind(this)}></button>
        <span className="logo pull-left">
					Decentralized Academic Publishing Portal
				</span>
        <UserMenu 
            wallet_address={this.props.wallet_address} 
            history={this.props.history} 
            current_balance={this.props.current_balance}
        />
        </>
      );
    }

    return header;
  }

}

export default PageHeader;
