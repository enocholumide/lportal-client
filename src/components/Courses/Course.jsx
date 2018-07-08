import React from 'react'
import Files from './Tabs/Files'
import Students from './Tabs/Students'
import Assignments from './Tabs/Assignments'
import Progress from './Tabs/Progress'
import Info from './Tabs/Info'
import axios from 'axios'
import { apis } from '../../shared/config'
import Loading from "../../shared/Loader"
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
        //await this.loadCourse()
        this.setState({ loading: false, course: this.props.course }) // Remove later!
    }

    componentWillReceiveProps(){
        this.setState(this.state)
    }

    loadCourse() {
        let courseId = this.props.course.id;
        axios.get(apis.courses + courseId)
            .then((response) => {
                if (response.status === 200) {
                    this.setState({ loading: false, course: response.data })
                }
                else
                    console.log(response)

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

        let { loading, loadingMessage } = this.state

        let { course } = this.props

        return (
            <div>
                {
                    (loading || !course) ?

                        <Loading text={loadingMessage} />

                        :

                        this.renderCourse()
                }
            </div>
        )
    }

    renderCourse() {

        let { course } = this.props

        let tabpanes = [
            { title: 'Files', content: <Files course={course} updateCourse={this.updateCourse} {...this.props} /> },
            { title: 'Students', content: <Students course={course} {...this.props} /> },
            { title: 'Assignments', content: <Assignments course={course} {...this.props} /> },
            { title: 'Progress', content: <Progress course={course} {...this.props} /> },
            { title: 'Info', content: <Info course={course} {...this.props} /> },
            { title: 'Unsubscribe', content: <Info course={course} {...this.props} /> },
        ]

        return (
            <div>
                <h4>{course.name}</h4>
                <hr />
                <Tabs
                    defaultActiveKey="2"
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
