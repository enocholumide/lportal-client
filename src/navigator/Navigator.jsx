import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import Home from '../components/Home/Home'
import Organisation from '../components/Organisation/Organisation'
import Organisations from '../components/Organisation/index'
import Login from '../components/Authentication/Login'
import Course from '../components/Courses/index'
import { AppContext } from '../provider/DataProvider'
import Loading from '../shared/Loader'
import { Alert } from 'antd'

//let stateContext = undefined
class Navigator extends Component {

    constructor(props) {
        super(props)
        this.state = {
            loading: true
        }
    }

    componentDidMount() {
        this.setState({ loading: false })
    }

    render() {

        let { loading } = this.state


        if (loading) return (<div><Loading /><AppContext.Consumer>{context => { }}</AppContext.Consumer></div>)
        else
            return (
                <AppContext.Consumer>

                    {(context) => (

                        <React.Fragment>

                            <Alert
                                message={<div>This <a href='https://github.com/enocholumide/lportal-client'>Website</a> is currently under development.</div>}   
                                type="info"
                                description= {<div><span style={{fontWeight: 'bold'}}>Student Account:</span> sandrajenks@yahoo.com | Password: secret3. 
                                <span style={{fontWeight: 'bold', marginLeft: '10px'}}>Teacher/ Admin Account:</span> admin@lportal.com | Password: 'secret"</div>}
                                closable
                                style={{margin: '10px', textAlign: 'center', fontSize: 8}}
                            />
                            <Switch>

                                <Route exact path="/" component={Home} />
                                <Route exact path="/login" component={Login} />
                                <Route exact path="/organisations" component={Organisations} />
                                <Route exact path="/organisation/:id" component={Organisation} />
                                <Route exact path="/organisation/:id/courses" component={Course} />

                            </Switch>

                            {context.checkAuthorization()}

                        </React.Fragment>

                    )}
                </AppContext.Consumer>
            )
    }
}

export default Navigator;