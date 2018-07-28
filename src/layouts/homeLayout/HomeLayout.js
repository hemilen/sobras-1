import React, { Component } from 'react';

// react-md
import {NavigationDrawer} from 'react-md';


class HomeLayout extends Component {


  render() {

    return (
      <NavigationDrawer
            drawerTitle="Sobras"
            toolbarTitle="">
         {this.props.children}
      </NavigationDrawer>
    );
  }
}


export default HomeLayout;
