import React, { Component } from 'react';
import HeaderNavigator from '../../shared/Header/Header';
import { Layout, Menu, Breadcrumb, Icon, Card, Row, Col, Avatar, List, Tabs } from 'antd';
import MediaQuery from 'react-responsive'
import { View, Text } from 'react-native-web'
import { colors } from '../../shared/config'
import Home from './Contents/Home'
import StudentCalendar from './Contents/StudentCalendar'
import Chat from './Contents/Chat'
import { Jumbotron, Button } from 'reactstrap'

const TabPane = Tabs.TabPane;
const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

class Dashboard extends Component {

    constructor(props) {
        super(props);
        this.getContent = this.getContent.bind(this)
        this.state = {
            content: "HOME"
        }
    }

    setContent(key) {

        this.setState({ content: key })
    }

    getContent = () => {
        if (this.state.content === "HOME") {
            return <Home />
        }

        else if(this.state.content === "CALENDAR") {
            return <StudentCalendar/>
        }
        else {
            return (
                <Jumbotron>
                <h1 className="display-3">{this.state.content}</h1>
                <p className="lead">Working on it!</p>
                <hr className="my-2" />
                <p>You may play around and see what is up :) </p>
                <p className="lead">
                    <Button color="primary" href="https://github.com/enocholumide/SIS--Spring-MVC-with-React">Show Code in GIT</Button>
                </p>
            </Jumbotron>
            )
        }
    }


    render() {

        let tabpanes = [{ title: "HOME", icon: "home" }, { title: "CALENDAR", icon: "calendar" }, { title: "SETTINGS", icon: "setting" }, { title: "HELP/ INFO", icon: "question-circle" }]

        let show = true;

        return (        
            <div>
                <HeaderNavigator activeIndex={0} />
                <div>

                    <MediaQuery maxDeviceWidth={768}>

                        <Tabs defaultActiveKey={this.state.content} tabPosition="top" onChange={(item)=>this.setContent(item)}>
                            {tabpanes.map((pane, index) => <TabPane tab={pane.title} key={pane.title} >{this.getContent()}</TabPane>)}
                        </Tabs>

                    </MediaQuery>

                    <MediaQuery minDeviceWidth={769}>
                        <Layout>
                            <Sider width={200}>

                                <Menu
                                    onClick={(item)=>this.setContent(item.key)}
                                    mode="inline"
                                    theme="light"
                                    defaultSelectedKeys={[this.state.content]}
                                    style={{ height: '100%', borderRight: 0, backgroundColor: colors.side }} >
                                    {
                                        tabpanes.map((menu, index) =>
                                            <Menu.Item key={menu.title} style={{ padding: 15, height: 'auto' }}>

                                                <Icon type={menu.icon} style={{ fontSize: 24 }} /> {menu.title}

                                            </Menu.Item>

                                        )
                                    }
                                </Menu>


                            </Sider>
                            <Content>{this.getContent()}</Content>
                            <Sider width={200} style={{ backgroundColor: colors.header }}><Chat /> </Sider>
                        </Layout>
                    </MediaQuery>


                </div>
            </div>
        );
    }
    
}

export default Dashboard;
