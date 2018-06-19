import React from 'react';
import { Container, Row, Col } from 'reactstrap';

import CourseFiles from './CourseFiles'
import CourseActivities from './CourseActivities'
import CourseStudents from './CourseStudents'
import CourseAssignments from './CourseAssignments'
import CourseProgress from './CourseProgress'
import CourseInfo from './CourseInfo'
import axios from 'axios'
import { apis, colors } from '../../shared/config';
import Loading from "../../shared/Loader"
import MediaQuery from 'react-responsive'
import { Tabs } from 'antd';
const TabPane = Tabs.TabPane;

export default class Course extends React.Component {

    constructor(props) {
        super(props)

        this.updateCourse = this.updateCourse.bind(this)

        this.state = {
            registered: false,
            loading: true,
            course: undefined,
            loadingMessage: "Getting content from server..."
        }
    }

    async componentDidMount() {
        await this.loadCourse()
    }

    loadCourse() {
        let courseId = this.props.match.params.id;
        axios.get(apis.courses + courseId)
            .then((response) => {
                this.setState({ loading: false, course: response.data })
            })
            .catch((error) => {
                this.setState({ loading: true, loadingMessage: error.toString() })
            })
    }

    updateCourse(actions) {

        for (let action of actions) {
            if (action === "activities")
                this.refs.activities.refresh()
        }

    }

    render() {

        let { course } = this.state

        return (
            <div>

                <MediaQuery maxDeviceWidth={768}>

                    <Container style={{ marginTop: 50, width: "100%" }}>
                        {this.renderMainContent()}
                    </Container>

                </MediaQuery>

                <MediaQuery minDeviceWidth={769}>

                    <Row>

                        <Col lg="4" xs="3" sm="3" style={{ backgroundColor: colors.mute }}>
                            {
                                course ?

                                    <CourseActivities ref="activities" course={course} /> : null

                            }

                        </Col>

                        <Col lg="4" xs="6" sm="6" style={{ backgroundColor: "white", padding: 10 }}>
                            {this.renderMainContent()}
                        </Col>

                        <Col lg="4" xs="3" sm="3" style={{ backgroundColor: colors.mute }}>
                        </Col>

                    </Row>
                </MediaQuery>

            </div>
        );
    }

    renderMainContent() {

        let { loading, loadingMessage } = this.state


        return (
            <div>
                {
                    loading ?

                        <Loading text={loadingMessage} />

                        :
                        this.renderCourse()
                }
            </div>
        )
    }

    renderCourse() {

        let { course } = this.state;

        let tabpanes = [
            { title: 'Files', content: <CourseFiles course={course} updateCourse={this.updateCourse} /> },
            { title: 'Students', content: <CourseStudents course={course} /> },
            { title: 'Assignments', content: <CourseAssignments course={course} updateCourse={this.updateCourse} /> },
            { title: 'Progress', content: <CourseProgress course={course} /> },
            { title: 'Info', content: <CourseInfo course={course} /> },
            { title: 'Unsubscribe', content: <CourseInfo course={course} /> },
        ]

        return (
            <div>
                <h5>path: {this.props.match.path}</h5>
                <h2>{course.name}</h2>

                <Tabs
                    defaultActiveKey="1"
                    tabPosition="top">

                    {
                        tabpanes.map((pane, index) =>

                            <TabPane tab={pane.title} key={index}>{pane.content}</TabPane>

                        )
                    }
                </Tabs>

            </div>
        )
    }
}
