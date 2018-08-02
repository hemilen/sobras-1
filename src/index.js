import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';

// react-md
import WebFontLoader from 'webfontloader';

// style
import './index.css';

// React-router
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// Redux
import { Provider } from 'react-redux';
import store from './store';

// Layouts
import HomeLayout from './layouts/homeLayout/HomeLayout';

// Pages
// import FormRedux from './pages/exemplo-redux-form';
// import App from './pages/app/App';
import Sobras from './pages/sobras/Sobras';
import User from './pages/user/User';



WebFontLoader.load({
    google: {
        families: ['Roboto:300,400,500,700', 'Material Icons'],
    },
});

const RouteWithLayout = ({layout, component, ...rest}) => {
    return (
        (layout ? 
            <Route {...rest} render={(props) =>
                React.createElement( layout, props, React.createElement(component, props))
            }/> 
        : 
            <Route {...rest} component={component} /> 
        )
    )
};

ReactDOM.render(  
    <Provider store={store}>
        <Router>
            <Switch>
                {/* <RouteWithLayout exact path="/" component={App}/> */}
                {/* <RouteWithLayout path="/redux-form" component={FormRedux}/> */}
                <RouteWithLayout exact path="/" layout={HomeLayout} component={Sobras}/>
                <RouteWithLayout path="/users" layout={HomeLayout} component={User}/>

                    
            </Switch>
        </Router>
    </Provider>
, 
  document.getElementById('root'));
  
registerServiceWorker();
