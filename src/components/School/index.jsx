import React from 'react'
import { Row, Col, Tabs, Icon } from 'antd'
import Dashboard from '../Dashboard/Dashboard'
import News from '../News/News'
import People from '../People/People'
import Lecture from '../Lectures/Lectures'
import Grade from '../Grades/Grades'
import Exams from '../Exams/Exams'
import Jobs from '../Jobs/Jobs'
import Info from '../Info/Info'
import Course from '../Courses/index'
import Chat from '../Dashboard/Contents/Chat'
import Summary from '../Dashboard/Contents/Summary'
import { Layout } from 'antd'

const { Sider, Content } = Layout;
const TabPane = Tabs.TabPane;


export default class School extends React.Component {

    constructor(props) {
        super(props)
        this.updatePath = this.updatePath.bind(this)
        this.getContent = this.getContent.bind(this)
        this.state = {
            content: this.props.active
        }
    }

    render() {

        let siderWidth = this.state.content === "News" ? 250 : 220

        return (

            <div>

                <div style={{  }}>
                    <Row >
                        <Col md={{ span: 24, offset: 0 }} lg={{ span: 16, offset: 4 }} >
                            {this.renderTabs()}
                        </Col>

                        <Col md={{ span: 24, offset: 0 }} lg={{ span: 16, offset: 4 }} >
                            <Layout>
                                <Sider style={{ padding: 10, backgroundColor: 'white' }} width={siderWidth}><Summary {...this.props}/></Sider>
                                <Content style={{ padding: 15, backgroundColor: 'white' }}>{this.getContent()}</Content>
                                <Sider style={{ padding: 10, backgroundColor: 'white' }} width={siderWidth}><Chat organisationID={this.props.organisationID}/></Sider>
                            </Layout>
                        </Col>
                    </Row >
                </div>
            </div>

        )
    }

    getContent() {

        let content = this.state.content;

        switch (content) {
            case "Dashboard":
                return (<Dashboard organisationID={this.props.organisationID} {...this.props}/>)
            case "News":
                return (<News organisationID={this.props.organisationID} {...this.props}/>)
            case "People":
                return (<People organisationID={this.props.organisationID} {...this.props}/>)
            case "Lectures":
                return (<Lecture organisationID={this.props.organisationID} {...this.props}/>)
            case "Grades":
                return (<Grade organisationID={this.props.organisationID} {...this.props}/>)
            case "Exams":
                return (<Exams organisationID={this.props.organisationID} {...this.props}/>)
            case "Courses":
                return (<Course organisationID={this.props.organisationID} {...this.props}/>)
            default:
                return (<Jobs organisationID={this.props.organisationID} {...this.props}/>)
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
                    tabPosition="top"
                    style={{ padding: 10, paddingLeft: 0 }}
                    defaultActiveKey={this.state.content}
                    tabBarGutter={16}
                    onChange={this.updatePath}>
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
    //{ link: "/dashboard", icon: "appstore-o", title: "Dashboard", content: <Dashboard /> },
    { link: "/courses", icon: "code  ", title: "Courses", content: <Course /> },
    { link: "/news", icon: "global", title: "News", content: <News /> },
    { link: "/people", icon: "team", title: "People", content: <People /> },
    { link: "/lectures", icon: "schedule", title: "Lectures", content: <Lecture /> },
    { link: "/grades", icon: "solution", title: "Grades", content: <Grade /> },
    { link: "/exams", icon: "edit", title: "Exams", content: <Exams /> },
    { link: "/jobs", icon: "gift", title: "Jobs", content: <Jobs /> },
    { link: "/info", icon: "info-circle", title: "Info", content: <Info /> },
]