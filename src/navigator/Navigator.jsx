import { Switch, Route, Redirect } from 'react-router-dom';
import React, { Component } from 'react';

import Home from '../components/Home/Home';
import Organisation from '../components/Organisation/Organisation'
import Organisations from '../components/Organisation/Organisations'
import Login from '../components/Authentication/Login'
import { AppContext } from '../provider/DataProvider'

class Navigator extends Component {

    constructor(props) {
        super(props)
    }

    componentDidMount() {
    }

    render() {
        return (
            <AppContext.Consumer>

                {(context) => (

                    <React.Fragment>

                        <Switch>

                            <Route exact path="/" component={Home} />
                            <Route exact path="/login" component={Login} />
                            <Route exact path="/organisations" component={Organisations} />
                            <Route exact path="/organisation/:id" component={Organisation} />

                        </Switch>

                        

                        {context.checkAuthorization()}

                    </React.Fragment>

                )}
            </AppContext.Consumer>
        )
    }
}

export default Navigator;