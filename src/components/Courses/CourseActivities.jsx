import React from 'react';
import { List, Card, Divider, Message } from 'semantic-ui-react';
import axios from 'axios';
import moment from 'moment';
import { apis } from '../../shared/config';

export default class CourseActivities extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            activities: []
        }
    }

    async componentDidMount() {
       await this.loadActivities()
    }

    loadActivities() {

        //http://localhost:8080/api/courses/1/activities
        

        let request = "" + apis.courses + this.props.course.id + "/activities"

        axios.get(request)
            .then((response) => {

                if (response.status === 200) {
                    this.setState({ activities: response.data })
                }

            })
            .catch((error) => {

                console.log(error)

            })

    }

    refresh() {
        console.log("I am refreshing activites")
        this.loadActivities()
    }

    render() {

        let { activities } = this.state

        activities = activities.reverse();

        return (


            <div style={{ margin: 10 }}>
                <h4>Recent Activities</h4>
                <Divider />

                <Card style={{justifyContent: 'center', padding: 10}}>

                    {
                        activities.length < 1 ?
                            <Message
                                icon='search'
                                header='No recent activity for this course'
                                content=""
                            /> : null
                    }
                    <List divided relaxed>
                        {
                            activities.map((activity, index) =>
                                <List.Item key={index} style={{ padding: 10 }}>
                                    <List.Icon name='file' size='large' verticalAlign='middle' />
                                    <List.Content>
                                        <List.Description as='a'>{activity.type}</List.Description>
                                        <List.Description as='a'>{activity.text}</List.Description>
                                        <List.Description as='a'>{moment(activity.created).fromNow()}</List.Description>
                                    </List.Content>
                                </List.Item>

                            )
                        }
                    </List>

                </Card>
                
            </div>
        );
    }


}
