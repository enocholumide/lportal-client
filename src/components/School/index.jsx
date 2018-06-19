import React from 'react'
import { Row, Col, Tabs, Icon } from 'antd'
import Dashboard from '../Dashboard/Dashboard';
import News from '../News/News';
import People from '../People/People';
import Lecture from '../Lectures/Lectures';
import Grade from '../Grades/Grades';
import Exams from '../Exams/Exams';
import Jobs from '../Jobs/Jobs';
import Info from '../Info/Info';
import CoursesOverview from '../Courses/CoursesOverview';
import { colors } from '../../shared/config'
const TabPane = Tabs.TabPane;


export default class Index extends React.Component {

    constructor(props) {
        super(props)
        this.updatePath = this.updatePath.bind(this)
        this.getContent = this.getContent.bind(this)
        this.state = {
            content: this.props.active
        }
    }

    render() {
        return (

            <div>
                <div style={{ backgroundColor: colors.mute }}>
                    <Row >
                        <Col xs={{ span: 24, offset: 0 }} lg={{ span: 16, offset: 4 }} md={{ span: 16, offset: 4 }}>
                            {this.renderTabs()}
                        </Col>
                    </Row >
                </div>
                <div>{this.getContent()}</div>
            </div>

        )
    }

    getContent() {

        let content = this.state.content;

        switch (content) {
            case "Dashboard":
                return (<Dashboard />)
                break;
            case "News":
                return (<News />)
                break;
            case "People":
                return (<People />)
                break;
            case "Lectures":
                return (<Lecture />)
                break;
            case "Grades":
                return (<Grade />)
                break;
            case "Exams":
                return (<Exams />)
                break;
            case "Courses":
                return (<CoursesOverview />)
                break;
            default:
                return (<Jobs />)
        }
    }

    updatePath(content) {
        this.props.updatePath(content)
        this.setState({ content: content })
    }

    renderTabs() {
        return (
            <div>
                <Tabs
                    defaultActiveKey={this.state.content}
                    tabBarGutter={16}
                    tabPosition="top"
                    type="card"
                    justified
                    onChange={this.updatePath}
                    tabBarStyle={{ paddingBottom: 0, marginBottom: 0, display: 'flex', justifyContent: 'space-between', textAlign: 'center', paddingTop: 30, flexGrow: 1, width: '100%', marginRight: '0px' }}
                    style={{ flex: 1, justifyContent: 'space-between', flexDirection: 'row' }} >
                    {
                        panes.map((pane, index) =>
                            <TabPane tab={<span><Icon type={pane.icon} />{pane.title}</span>} key={pane.title}></TabPane>
                        )
                    }
                </Tabs>
            </div>
        )
    }
}

const panes = [
    { link: "/dashboard", icon: "appstore-o", title: "Dashboard", content: <Dashboard /> },
    { link: "/news", icon: "global", title: "News", content: <News /> },
    { link: "/people", icon: "team", title: "People", content: <People /> },
    { link: "/lectures", icon: "schedule", title: "Lectures", content: <Lecture /> },
    { link: "/grades", icon: "solution", title: "Grades", content: <Grade /> },
    { link: "/exams", icon: "edit", title: "Exams", content: <Exams /> },
    { link: "/courses", icon: "code  ", title: "Courses", content: <CoursesOverview /> },
    { link: "/jobs", icon: "gift", title: "Jobs", content: <Jobs /> },
    { link: "/info", icon: "info-circle", title: "Info", content: <Info /> },
]