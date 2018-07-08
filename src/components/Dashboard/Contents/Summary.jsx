import React, { Component } from 'react'
import { View } from 'react-native-web'
import { Carousel, Tabs } from 'antd'
const TabPane = Tabs.TabPane

export default class Summary extends Component {


    render() {

        let user = this.props.context.state.user
        
        return (
            <div style={{ backgroundColor: "white", boxShadow: '3px 3px 2px #888888' }}>
                <View>
                    <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center' }}>

                        <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: 200 }}>

                            <div style={{ position: 'absolute', top: 0, height: 100, backgroundImage: 'url(https://s-media-cache-ak0.pinimg.com/originals/93/54/5e/93545e596dae182a6e7976247146e3b1.jpg)', right: 0, left: 0, width: "100%" }}></div>

                            <img src={user.photoUrl} alt="" style={{ zIndex: 10, marginRight: 'auto', marginLeft: 'auto', marginBottom: '10px', marginTop: '50px', borderRadius: "50%", border: 5, borderColor: 'white', verticalAlign: 'middle', height: '90px', width: '90px' }} />

                            <h3>{user.firstName + " " + user.lastName}</h3>

                            <label style={{ color: 'lightgray' }}>{user.role}</label>

                        </View>

                        <View style={{ borderColor: 'lightgray',  borderBottomWidth: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>

                            <View style={{ flexDirection: 'column', flex: 1, justifyContent: 'space-between', alignItems: 'center' }}>
                                <h3 style={{ marginBottom: 1 }}>0</h3>
                                <label style={{ color: 'lightgray', fontSize: 10 }}>EXAMS</label>
                            </View>

                            <View style={{ borderColor: 'lightgray', borderLeftWidth: 1, borderRightWidth: 1, flexDirection: 'column', flex: 1, justifyContent: 'space-between', alignItems: 'center' }}>
                                <h3 style={{ marginBottom: 1 }}>0</h3>
                                <label style={{ color: 'lightgray', fontSize: 10 }}>ASSG.</label>
                            </View>

                            <View style={{ flexDirection: 'column', flex: 1, justifyContent: 'space-between', alignItems: 'center' }}>
                                <h3 style={{ marginBottom: 1 }}>0</h3>
                                <label style={{ color: 'lightgray', fontSize: 10 }}>CLASSES</label>
                            </View>

                        </View>

                        <Tabs
                            defaultActiveKey="1"
                            tabPosition={'top'}
                            style={{ fontSize: 11 }}
                            tabBarStyle={{ fontSize: 11 }}
                        >
                            <TabPane tab="News" key="1">
                                <Carousel autoplay>
                                <img style={{height: 80, width: null}} alt="example" src="http://theressomuchtosee.com/wp-content/uploads/2012/12/girl-running-away-300x300.jpg" />
                                <img style={{height: 80, width: null}} alt="example" src="http://theressomuchtosee.com/wp-content/uploads/2012/12/girl-running-away-300x300.jpg" />
                                <img style={{height: 80, width: null}} alt="example" src="http://theressomuchtosee.com/wp-content/uploads/2012/12/girl-running-away-300x300.jpg" />
                                </Carousel>
                            </TabPane>
                            <TabPane tab="Events" key="2">

                            </TabPane>
                        </Tabs>

                    </View>
                </View>
            </div>
        )
    }
}