import React, { Component } from 'react'
import { Form } from 'semantic-ui-react'

export default class CreateUser extends Component {

    render() {

        let SIZE = 'big'

        return (
            <div style={{ backgroundColor: 'white', padding: '24px', borderRadius: 8 }}>
                <Form>
                    <Form.Group widths='equal'>
                        <Form.Input size={SIZE} fluid label='First name' placeholder='First name' name='first' />
                        <Form.Input size={SIZE} fluid label='Last name' placeholder='last name' name='last' />
                    </Form.Group>
                    <Form.Input size={SIZE} fluid label='Email' placeholder='you@email.com' name='email' />
                    <Form.Input size={SIZE} fluid label='Password' placeholder='' name='password' />
                    <p>Use at least one letter, one numeral, and seven characters.</p>
                    <Form.Button fluid positive size={SIZE}>Sign up Now</Form.Button>
                    <p style={{ textAlign: 'center' }}>
                        By clicking “Sign up Now, you agree to our terms of service and privacy statement. We’ll occasionally send you account related emails.</p>
                </Form>
            </div>

        )
    }
}



