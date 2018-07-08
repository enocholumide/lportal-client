import React, { Component } from 'react'
import { Message } from 'semantic-ui-react'
import { List, Card, Breadcrumb } from 'antd'
import moment from 'moment'
import Loading from "../../shared/Loader"
import Course from './Course'
import req from "../../shared/axios/requests"


const OVERVIEW = "Overview"
export default class CoursesOverview extends Component {

    constructor(props) {
        super(props)

        this.updateContent = this.updateContent.bind(this)

        this.state = {
            courses: [],
            loading: true,
            loadingMessage: "Loading content from server...",
            course: undefined,
            content: OVERVIEW,
            breadcrumbs: [OVERVIEW]
        }
    }


    async componentDidMount() {
        await this.loadCourses();
    }

    loadCourses() {

        if (this.props.context) {

            let organisationID = this.props.context.state.organisationID
            let studentID = this.props.context.state.user.id


            req.get("/courses/org/" + organisationID + "/students/" + studentID)
                .then((response) => {
                    this.setState({ loading: false, courses: response.data })
                })
                .catch((error) => {
                    console.log(error)
                    this.setState({ loading: true, loadingMessage: "Error: Cannot load content from server, please try again" })
                })
        }
    }


    render() {

        let { loading, loadingMessage, content, breadcrumbs } = this.state;

        if (loading) return (<Loading text={loadingMessage} />)
        else
            return (
                <div >
                    <React.Fragment >
                        <Breadcrumb separator=">" style={{ marginBottom: 10 }}>
                            {
                                breadcrumbs.map(breadcrumb =>
                                    <Breadcrumb.Item key={breadcrumb} href="" onClick={() => this.updateCrumbs(breadcrumb)}>{breadcrumb}</Breadcrumb.Item>
                                )
                            }
                        </Breadcrumb>
                    </React.Fragment>
                    {
                        content === 'Overview' ? this.renderOverview() : this.renderCourse()
                    }
                </div>
            )
    }

    renderOverview() {

        let { courses } = this.state;

        return (
            <div >
                {

                    courses.length < 1 ?

                        <Message
                            error
                            icon='question'
                            header='No course found'
                            content='You have not been enrolled in any course. Please contact admin or request to join a course'
                        />
                        :
                        <List
                            grid={{ gutter: 16, xs: 1, sm: 1, md: 1, lg: 1, xl: 1, xxl: 1 }}
                            dataSource={courses}
                            renderItem={item => (
                                <List.Item onClick={() => this.updateContent(item.course)}>
                                    <Card >
                                        <p>{item.course.code}</p>
                                        <h4>{item.course.name}</h4>
                                        <p>Registration deadline : {moment(new Date()).format("MMMM Do YYYY")}</p>
                                    </Card>
                                </List.Item>
                            )}
                        />
                }
            </div>

        )
    }

    updateCrumbs(crumb) {

        if (crumb === OVERVIEW) {
            let breadcrumbs = []
            breadcrumbs.push(OVERVIEW)
            this.setState({ breadcrumbs: breadcrumbs, course: undefined, content: OVERVIEW })
        }
    }

    updateContent(course) {
        let breadcrumbs = this.state.breadcrumbs
        breadcrumbs.push(course.name)
        this.setState({ breadcrumbs: breadcrumbs, course: course, content: "Course" })
    }

    renderCourse() {
        return (
            <Course course={this.state.course} />
        )
    }
}