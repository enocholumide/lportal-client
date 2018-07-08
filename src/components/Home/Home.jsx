import React, { Component } from 'react'
import Header from '../../shared/Header/Header';
import { Row, Col, List, Button } from 'antd';
import CreateUser from './CreateOrganisation'
import HomeMessage from './Rider/Message'
import { View } from 'react-native-web'
import LoginForm from '../Authentication/Forms/LoginForm'
import { AppContext } from '../../provider/DataProvider'

export default class Home extends Component {

    render() {

        let messages = [
            {
                title: "CREATE NEW ORGANISATION",
                description: "With an organisation, you can create and administer dynamic content. Add coruses, students, etc",
                cover: "http://assets.stickpng.com/thumbs/5898ba52cba9841eabab61a1.png",
                color: "#ffa726",
                action: <Button type="primary" ghost>CREATE ORGANISATION</Button>
            },

            {
                title: "IMPORT EXISTING ORGANISATION",
                description: "You can set up an organisation from existing data. Schools, students and other assets will be imported",
                cover: "http://www.iconarchive.com/download/i6270/custom-icon-design/pretty-office-6/import-export.ico",
                color: "#bf360c",
                action: <Button type="primary" ghost>IMPORT ORGANISATION</Button>
            },

            {
                title: "JOIN AN ORGANISATION",
                description: "Are you a member of an exisitng organisation? Login or Sign up, find the organisation and access their content",
                cover: "https://cdn0.iconfinder.com/data/icons/real-estate-colored-icons-1/48/06-512.png",
                color: "#4dd0e1",
                action: <Button type="primary" ghost>JOIN ORGANISATION</Button>
            }
        ]

        return (

            <AppContext.Consumer>
                {(context) => (

                    <div >

                        <div style={{ boxShadow: '2px 2px 1px #888888' }}>
                            <Header submenu={false} />
                        </div>

                        <Row style={{ background: 'linear-gradient(-90deg, white, #424242)', marginTop: '3px' }}>
                            <Col md={{ span: 24, offset: 0 }} lg={{ span: 16, offset: 4 }} >

                                <View style={{ padding: '54px', justifyContent: 'center', alignItems: 'center' }}>

                                    <Row >
                                        <Col span={15} style={{height: '100%', flex: 1, alignItems: 'center'}} >
                                            <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1, height: '100%' }}>
                                                <HomeMessage />
                                            </View>
                                        </Col>
                                        <Col span={9} >
                                            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                                <CreateUser color='#4dd0e1' />
                                            </View>
                                        </Col>
                                    </Row>

                                </View>
                            </Col>
                        </Row>
                        <Row style={{ backgroundColor: 'white' }}>


                                <Col md={{ span: 24, offset: 0 }} lg={{ span: 16, offset: 4 }} >
                                    <div style={{ margin: '54px', textAlign: 'center' }}>
                                        <h2> A Student Information Management System </h2>
                                        <hr />
                                        <p>
                                            Are you a university, an academic institution or a freelance tutor? <br />
                                            With Lportal, you can create schools, departments, courses, add students, post grades and do much more without having a website!
                                    </p>
                                    </div>
                                    <List
                                        grid={{ gutter: 24, xs: 1, sm: 1, md: 2, lg: 3, xl: 3, xxl: 3 }}
                                        dataSource={messages}
                                        renderItem={item => (
                                            <List.Item>
                                                <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1, flexDirection: 'column', width: 320 }}>

                                                    <View style={{ backgroundColor: item.color, height: 320, width: 320, justifyContent: 'center', alignItems: 'center' }}>

                                                        <img src={item.cover} alt='Avatar' style={{ height: 200, width: null }} />

                                                    </View>

                                                    <View style={{ padding: 15, backgroundColor: '#f5f5f5', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', flex: 1 }}>
                                                        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
                                                            <h5 style={{ fontWeight: 'bold' }}>{item.title}</h5>
                                                            <p>{item.description}</p>
                                                        </div>
                                                        {item.action}
                                                    </View>
                                                </View>
                                            </List.Item>
                                        )}
                                    />

                                    <div style={{ padding: 24, backgroundColor: '#f5f5f5', marginTop: 54, marginBottom: 54 }}>

                                        <LoginForm flat context={context} redirect='/organisations' />

                                    </div>

                                </Col>
                        </Row>
                    </div>
                )}
            </AppContext.Consumer>

        )
    }

}



