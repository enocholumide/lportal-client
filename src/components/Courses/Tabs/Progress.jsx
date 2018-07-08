import React from 'react';
import { List, Message, Divider } from 'semantic-ui-react'
import { Progress } from 'reactstrap'

export default class CourseProgress extends React.Component {


    render() {

        return (
            <div>

                <Message info>
                    <Message.Header>Your learninng progress</Message.Header>
                    <Message.List items={["See where you stand in this course"]} />
                </Message>

                <List relaxed>
                    <List.Item style={{ padding: 10, backgroundColor: 'white' }}>
                        <List.Content>
                            <List.Header as='h3'>Assignments {3 + "/" + 4}</List.Header>
                            <Progress animated striped color="info" value={60} />
                        </List.Content>
                    </List.Item>
                    <List.Item style={{ padding: 10, backgroundColor: 'white' }}>
                        <List.Content>
                            <List.Header as='h3'>Tests {2 + "/" + 2}</List.Header>
                            <Progress animated striped color="success" value={100} />
                        </List.Content>
                    </List.Item>
                    <List.Item style={{ padding: 10, backgroundColor: 'white' }}>
                        <List.Content>
                            <List.Header as='h3'>Practicals {2 + "/" + 15}</List.Header>
                            <Progress animated striped color="danger" value={10} />
                        </List.Content>
                    </List.Item>
                    <Divider/>
                    <List.Item style={{ padding: 10, backgroundColor: 'white' }}>
                        <List.Content>
                            <List.Header as='h2'>Overall {"50%"}</List.Header>
                            <Progress animated striped color="info" value={50} />
                        </List.Content>
                    </List.Item>
                </List>

            </div>
        );
    }
}
