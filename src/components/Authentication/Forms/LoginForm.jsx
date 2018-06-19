import React, { Component } from 'react'
import { Form } from 'semantic-ui-react'
import { apis } from '../../../shared/config'
import axios from 'axios'
import { Spin, Alert } from 'antd'
import { Redirect } from 'react-router-dom'

export default class LoginForm extends Component {

    constructor(props) {
        super(props)
        this.handleFormChange = this.handleFormChange.bind(this)
        this.onSignIn = this.onSignIn.bind(this)

        console.log(localStorage.getItem("user"))

        this.state = {
            email: 'admin@lportal.com',
            password: 'secret',
            loading: false,
            loginerror: false,
            redirect: false
        }
    }

    render() {

        let { email, password, username, loading, loginerror, redirect } = this.state

        let SIZE = 'medium'

        if (redirect) return <Redirect to={this.props.redirect} />

        else
            return (

                <div className='d-flex flex-justify-content-center' style={{ flexDirection: 'column', margin: 'auto', justifyContent: 'center', width: 360, padding: '10px' }} >


                    <div style={{ borderWidth: 5, borderColor: 'red', backgroundColor: 'white', padding: '24px', borderRadius: 8 }}>

                        <Form>
                            {loginerror ?

                                <Alert message="Invalid email or password" type="error" showIcon style={{ marginBottom: '24px' }} /> :

                                null}

                            <Form.Input size={SIZE} fluid label='Email address' placeholder='you@email.com' type='email' name='email' defaultValue={email} onChange={this.handleFormChange} />

                            <Form.Input size={SIZE} fluid label='Password' placeholder='Type Secret' name='password'defaultValue={password}  type='password' onChange={this.handleFormChange} />
                            <p><a href="/login">Forgot password?</a></p>
                            {loading ? <Spin /> : null}
                            <Form.Button fluid positive size={SIZE} onClick={this.onSignIn}>Sign in</Form.Button>
                            <p style={{ textAlign: 'center' }}>
                                By clicking “Sign in, you agree to our terms of service and privacy statement. We’ll occasionally send you account related emails.
                            </p>

                        </Form>

                    </div>

                    <div style={{ textAlign: 'center', marginTop: '24px', padding: '14px', borderRadius: 3, borderColor: 'gray', borderWidth: 2, backgroundColor: 'white' }}>

                        <p style={{}}> New to Lportal?  <a href="/login"> Create an account</a>.</p>

                    </div>
                </div>

            )
    }

    handleFormChange(event) {
        const state = this.state
        state[event.target.name] = event.target.value;
        state.loginerror = false
        this.setState(state);
    }

    onSignIn() {

        let { email, password } = this.state
        let validate = this.validateEntries();

        if (validate) {

            this.setState({ loading: true })

            let signInData = { email: email, password: password }
            //console.log(email + "," + password.toString())

            axios.post(apis.signin, signInData)
                .then((response) => {
                    if (response.status === 200) {
                        let credentials = response.data;
                        axios.get(apis.signinwithtoken + credentials.accessToken)
                            .then((userresponse) => {
                                if (userresponse.status === 200) {
                                    this.props.context.setCredentials(credentials)
                                    this.props.context.setUser(userresponse.data)
                                    //console.log(JSON.parse(localStorage.getItem("user")))
                                    this.setState({ redirect: true })
                                }
                            })
                            .catch((userresponseerror) => {
                                console.log(userresponseerror)
                                this.setState({ loginerror: true, loading: false })
                            })
                    }
                })
                .catch((error) => {
                    console.log(error.response.data)
                    this.setState({ loginerror: true, loading: false })

                })

        }

    }

    validateEntries() {
        let { email, password } = this.state

        let re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        console.log(re.test(email))
        if (!re.test(email)) {
            return false
        }

        return true
    }
}