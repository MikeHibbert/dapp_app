import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class UserMenu extends Component {
  state = {
    opened: false,
    navClasses: ['dropdown', 'pull-left'],
    wallet_address: null,
    current_balance: 0
  }

  componentDidMount() {

    // console.log(this.props);
    this.unlisten = this.props.history.listen((location, action) => {
      if(this.state.opened === true) {
        this.setState({navClasses: ['dropdown', 'pull-left'], opened: false});
      }
    });
  }

  componentDidUpdate(prevProps) {
    if(this.props.wallet_address !== undefined && this.props.wallet_address !== prevProps.wallet_address) {
      this.setState({wallet_address: this.props.wallet_address});
    }

    if(this.props.currrent_balance !== undefined && this.props.current_balance !== prevProps.current_balance) {
      this.setState({current_balance: this.props.current_balance});
    }
  }

  componentWillUnmount() {
      this.unlisten();
  }

  handleMenuToggle() {
    this.setState({opened: !this.state.opened});

    if(this.state.opened !== true) {
      this.setState({navClasses: ['dropdown', 'pull-left', 'open']});
    } else {
      this.setState({navClasses: ['dropdown', 'pull-left']});
    }
  }

  render() {
    return (
      <nav>
            <ul className="nav pull-right">
                    <li className={this.state.navClasses.join(' ')}>

                            <a onClick={this.handleMenuToggle.bind(this)}  className="dropdown-toggle" data-toggle="dropdown" data-hover="dropdown" data-close-others="true">
                                    <span className="user-name" style={{lineHeight: "48px", paddingLeft: "10px"}}>
                                            <span onClick={this.handleMenuToggle.bind(this)}  className="hidden-xs">
                                                    {this.props.wallet_address} <i className="fa fa-angle-down"></i>
                                            </span>
                                    </span>
                            </a>
                            <ul className="dropdown-menu hold-on-click">
                                    <li>
                                        <a>Balance: {this.props.current_balance} AR</a>
                                    </li>
                                    <li className="divider"></li>

                                    <li>
                                            <Link to='/logout'><i className="fa fa-power-off"></i> Log Out</Link>
                                    </li>
                            </ul>
                    </li>
            </ul>
        </nav>
    );
  }
}

export default UserMenu;
