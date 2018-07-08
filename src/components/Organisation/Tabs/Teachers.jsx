import React from 'react'
import { Row, Col, Alert, Menu, Icon, message } from 'antd'
import Loading from '../../../shared/Loader'
import Files from '../../Courses/Tabs/Files'
import Course from '../../Courses/Course'
import Assignments from '../../Courses/Tabs/Assignments'
import req from '../../../shared/axios/requests'
const SubMenu = Menu.SubMenu


export default class Teachers extends React.Component {

    constructor(props) {
        super(props)

        this.onCourseSelected = this.onCourseSelected.bind(this)

        this.state = {
            course: undefined,
            editAreaIsLoading: true,
            courseAreaIsLoading: true,
            courses: [],

        }

        this.contents = [
            { title: 'Files' },
            { title: 'Assignments' }
        ];

    }

    async componentDidMount() {
        this.loadTeacherCourses()
    }

    render() {

        let { courses, courseAreaIsLoading } = this.state

        return (
            <div>
                <Alert
                    message="Teachers zone"
                    description={
                        <div> <p>Make changes to your courses here, Add course files, Administer students, Add or reove assignments</p> </div>
                    }
                    type="info"
                    showIcon
                />

                <Row>
                    <Col span={7} style={{ padding: '24px' }}>

                        {
                            courseAreaIsLoading ? <Loading text="Getting your courses" /> :

                                <Menu
                                    onClick={this.handleClick}
                                    style={{ width: 'auto' }}
                                    defaultOpenKeys={['courses']}
                                    mode="inline"
                                    onSelect={this.onCourseSelected}
                                >
                                    <SubMenu key="courses" title={<span><Icon type="mail" /><span>Courses</span></span>}>
                                        {
                                            courses.map((item, index) =>
                                                <Menu.Item key={index}>{
                                                    <div>{item.name}</div>
                                                }</Menu.Item>
                                            )
                                        }

                                    </SubMenu>
                                </Menu>
                        }


                    </Col>
                    <Col span={17} style={{ padding: '24px' }}>
                        {
                            this.state.editAreaIsLoading || this.state.course === undefined ? <Loading text="Select one of your course at the left to edit" /> :
                                    <Course course={this.state.course} {...this.props} writeAble isTeacher/>
                        }

                    </Col>
                </Row>
            </div>
        )
    }

    getTabContents(title) {

        let course = this.state.course

        switch (title) {
            case "Files":
                return (<Files canDelete canCreate listOnly course={course} />)
            default:
                return (<Assignments writeAble course={course} />)

        }

    }

    loadTeacherCourses() {

        let context = this.props.context

        let courses = "/teachers/" + context.state.user.id + "/org/" + context.state.organisationID + "/courses"

        req.get(courses)
            .then((response) => {
                if (response.status === 200) {
                    this.setState({ courses: response.data, courseAreaIsLoading: false })
                } else message.error("Error while getting your courses from server", 5)
            })
            .catch((error) => {
                console.log(error)
                message.error("Error while getting your courses from server", 5)
            })

    }

    /**
     * Call back when a course is changed
     * @param {Object} menuItem the menu item selected. The key used here is the index of the item in the list!
     */
    onCourseSelected(menuItem) {

        if (this.state.courses.length > 0) {
            this.setState({ course: this.state.courses[menuItem.key], editAreaIsLoading: false });
        }

    }
}