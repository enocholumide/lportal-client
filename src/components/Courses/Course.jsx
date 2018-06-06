import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import HeaderNavigator from '../../shared/Header/Header';
import { Tab } from 'semantic-ui-react';
import CourseFiles from './CourseFiles'
import CourseActivities from './CourseActivities'
import CourseStudents from './CourseStudents'
import CourseAssignments from './CourseAssignments'
import CourseProgress from './CourseProgress'
import CourseInfo from './CourseInfo'
import axios from 'axios'
import { apis } from '../../shared/config';
import Loading from "../../shared/Loader";

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
        axios.get(apis.courses + "/" + courseId)
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

        let { loading, loadingMessage, course } = this.state

        return (
            <div>
                <HeaderNavigator activeIndex={6} />

                <Container>

                    {
                        loading ?

                            <Row>
                                <Loading text={loadingMessage} />
                            </Row>

                            :

                            <Row>
                                <Col xs="3" style={{ marginTop: 40 }}>{<CourseActivities ref="activities" course={course}/>}</Col>
                                <Col xs="9">{this.renderCourse()}</Col>
                            </Row>
                    }

                </Container>


            </div>
        );
    }

    renderCourse() {

        let { course } = this.state;

        let panes = [
            { menuItem: 'Files', render: () => <Tab.Pane>{<CourseFiles course={course} updateCourse={this.updateCourse}/>}</Tab.Pane> },
            { menuItem: 'Students', render: () => <Tab.Pane>{<CourseStudents course={course} />}</Tab.Pane> },
            { menuItem: 'Assignments', render: () => <Tab.Pane>{<CourseAssignments course={course} updateCourse={this.updateCourse} />}</Tab.Pane> },
            { menuItem: 'Progress', render: () => <Tab.Pane>{<CourseProgress course={course} />}</Tab.Pane> },
            { menuItem: 'Info', render: () => <Tab.Pane>{<CourseInfo course={course} />}</Tab.Pane> },
            { menuItem: 'Unsubscribe', render: () => <Tab.Pane>Tab 3 Content</Tab.Pane> },
        ]

        return (
            <div>
                <h5>path: {this.props.match.path}</h5>
                <h2>{course.name}</h2>
                <Tab menu={{ color: 'blue', secondary: true, pointing: true }} panes={panes} defaultActiveIndex={0} />
            </div>
        )
    }
}
