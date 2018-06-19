import React from 'react'
import { Form } from 'semantic-ui-react'

export default class NewOrgainsation extends React.Component {

    render() {
        return (
            <div>
                <Form>
                    <Form.Input size="big" fluid label='Organisation Name' placeholder='e.g New Town University' name='name' />
                </Form>
                <Form.Button fluid positive size='huge' >Create an Organization</Form.Button>
            </div>
        )
    }
}


