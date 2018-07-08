import React from 'react'
import { Redirect } from 'react-router-dom'
import axios from 'axios'
import { apis } from '../shared/config'

export const AppContext = React.createContext()

let prestate = { user: undefined, credentials: undefined }
export class DataProvider extends React.Component {

    constructor(props) {
        super(props)
        this.logOut = this.logOut.bind(this)
        this.checkAuthorization = this.checkAuthorization.bind(this)
        this.gotoOrganisation = this.gotoOrganisation.bind(this)
        this.setCredentials = this.setCredentials.bind(this)
        this.setUser = this.setUser.bind(this)
        this.signUpUser = this.signUpUser.bind(this)
        this.updateStateParameter = this.updateStateParameter.bind(this)
        this.setOrganisation = this.setOrganisation.bind(this)

        this.state = {
            user: prestate.user,
            credentials: prestate.credentials,
            organisationID: -1
        }
    }

    async componentDidMount() {
        let { user, credentials, organisationID } = localStorage

        if (user && credentials) {
            this.state.user = JSON.parse(user);
            this.state.credentials = JSON.parse(credentials)
            this.state.organisationID = parseInt(organisationID, 10)
        } 
        else
        console.log("Empty local storage");

    }

    logOut() {
        this.setState({ user: undefined, credentials: undefined, organisationID: -1 })
        localStorage.clear()
        this.checkAuthorization()
    }

    gotoOrganisation() {
        return (
            <Redirect to='/organisations' />
        )
    }

    setCredentials(credentials) {
        this.setState({ credentials: credentials })
        localStorage.setItem("credentials", JSON.stringify(credentials))
    }

    setOrganisation(organisationID) {
        this.setState({ organisationID: organisationID })
        localStorage.setItem("organisationID", organisationID)
    }

    setUser(user) {
        this.setState({ user: user })
        localStorage.setItem("user", JSON.stringify(user))
    }

    /**
     * 
     * @param {*} name 
     * @param {*} data 
     */
    updateStateParameter(name, data){

            let state = this.state;
            state[name] = data;
            this.setState(state)
            localStorage.setItem(name, JSON.stringify(data))

    }


    checkAuthorization() {

        let location = window.location.pathname;

        if (location !== "/" && location !== '/login') {

            if (this.state.user === undefined) {

                return (
                    <Redirect to='/' />
                )
            }
        }
    }

    signUpUser(signUpData) {

        axios.post(apis.signup)
            .then((response) => {
                return response
            })

    }


    /**
     * 
     * @param {email: String, password: String} signInData 
     */
    signInUser(signInData) {

        axios.post(apis.signin, signInData)
            .then((response) => {
                return response
            })

    }


    render() {
        return (
            <AppContext.Provider value={{

                state: this.state,
                logOut: this.logOut,
                checkAuthorization: this.checkAuthorization,
                gotoOrganisation: this.gotoOrganisation,
                setCredentials: this.setCredentials,
                setOrganisation: this.setOrganisation,
                setUser: this.setUser,
                signUpUser: this.signUpUser,
                updateStateParameter: this.updateStateParameter

            }}>
                {this.props.children}
            </AppContext.Provider>
        )
    }
}