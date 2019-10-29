import React, { Component }from 'react';
import { Link } from 'react-router-dom';

class Menuitem extends Component {

  closeMenu() {
    document.body.classList.remove('menu-open');
  }
  
  render() {
    const cssClasses = "main-icon fa fa-" + this.props.icon;

    let active = null;
    // console.log(this.props);
    if(this.props.location.pathname === this.props.url) {
      active = 'active';
    }

    return (
      <>
      <li className={active}>
              <Link className="dashboard" to={this.props.url} onClick={this.closeMenu.bind(this)} >
                <i className={cssClasses}></i> <span>{this.props.name}</span>
              </Link>
      </li>
      </>
    );
  }


}

export default Menuitem;
