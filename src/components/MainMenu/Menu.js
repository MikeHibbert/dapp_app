import React, { Component } from 'react';
import MenuItem from './MenuItem';


class Menu extends Component {
  render() {
    return (
      <>
        <nav id="sideNav">
            <ul className="nav nav-list">
              <MenuItem icon='dashboard' name='Dashboard' url='/' {...this.props}/>
              <MenuItem icon='book' name='My Documents' url='/documents' {...this.props}/>
            </ul>
        </nav>
        <span id="asidebg"></span>
    </>
    );
  }
}

export default Menu;
