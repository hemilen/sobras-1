import React, { Component } from 'react';

// react-md
import {NavigationDrawer} from 'react-md';

let titulo = "aloo viado";

class HomeLayout extends Component {

  render() {

    return (
      <NavigationDrawer
            drawerTitle="Sobras"
            toolbarTitle={titulo}>

         {this.props.children}

      </NavigationDrawer>
    );
  }
}


export default HomeLayout;
