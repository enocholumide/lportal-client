import React, { Component } from 'react'
import { Message } from 'semantic-ui-react'
import { List, Divider, Spin, Alert } from 'antd'

import TeacherGradingCard from './TeacherGradingCard'
import axios from 'axios'
import { apis } from '../../../shared/config'

export default class TeacherGradingArea extends Component {



    constructor(props) {
        super(props)

        this.state = {
            loading: true,
            courses: [],
            loadingMessage: "Getting your courses"
        }
    }

    async componentDidMount() {
        await this.getTeacherCourses();
    }

    getTeacherCourses() {

        let courses = apis.teachers + "3/courses"  //http://localhost:8080/api/teacher/3/courses

        axios.get(courses)
            .then((response) => {
                if (response.status === 200) {          
                    this.setState({ loading: false, courses: response.data })
                }
            })
            .catch((error) => {
                this.setState({ loading: true, loadingMessage: error })
                console.log(error)
            })

    }

    render() {
        return (
            <div style={{ backgroundColor: 'white', padding: 10 }}>
                {this.renderTeacherArea()}
            </div>
        );
    }

    renderTeacherArea = () => {

        let { loading, loadingMessage, courses } = this.state

        return (



            <div>

                <Message warning >
                    <Message.Header>Publish grades</Message.Header>
                    <p>The portal is now opened, please publish your grades before the deadline</p>
                    <Message.List items={[
                        "Here are the list of courses you are authorized to publish students grades",
                        "Please note that the students' names will not be shown for privacy concerns",
                        "The matric numbers are only available",
                        "Please click save when you are done editing",
                        "Unsaved changes will not be processed before the deadline!"
                    ]} />

                </Message>

                <Divider />

                {loading ?

                    <div style={{ padding: 80, textAlign: 'center' }}>
                        <Spin size="large" tip={loadingMessage} />
                    </div>

                    :

                    (courses && courses.length) > 0 ?

                        <List
                            itemLayout="horizontal"
                            dataSource={courses}
                            renderItem={course => (
                                <TeacherGradingCard course={course} />
                            )}
                        /> :

                        <Alert message="No course found at this time, check again" type="info" showIcon />

                }
            </div>

        )

    }
}

