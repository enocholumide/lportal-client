import React, { Component } from 'react'
import { colors } from '../../../shared/config'
import { List, Card, Avatar, Steps } from 'antd'
import { View, Text } from 'react-native-web'
import Loading from '../../../shared/Loader'
import { Progress } from 'antd'

export default class Home extends Component {


    state = {
        loading: true
    };


    componentDidMount() {
        setTimeout(() => this.setState({ loading: false }), 300)
    }



    render() {

        let marginTop = 30
        const data = [{ title: "Assignments" }, { title: "Lectures" }, { title: "Events" }, { title: "Todos" }];
        const analytics = [{ title: "Assignments", percent: 100 }, { title: "Exams", percent: 30 }, { title: "Projects", percent: 70 }]
        const academics = this.getAcademicsStats();

        if (this.state.loading) {
            return (
                <Loading text={"Refreshing..."} />
            )
        }

        else

            return (

                <div style={{ padding: '24px' }}>

                    <Card title="ACADEMICS" extra={<a href="#">View all</a>} style={{ backgroundColor: colors.mute, marginBottom: '24px', padding: 0 }}>

                        <List
                            grid={{ gutter: 10, xs: 1, sm: 1, md: 1, lg: 3, xl: 3, xxl: 3 }}
                            dataSource={academics}
                            renderItem={item => (
                                <List.Item>
                                    <Card >{item.content}</Card>
                                </List.Item>
                            )}
                        />

                    </Card>

                    <List
                        grid={{ gutter: 16, xs: 3, sm: 3, md: 3, lg: 3, xl: 3, xxl: 3 }}
                        dataSource={analytics}
                        renderItem={item => (
                            <List.Item>
                                <View style={{ alignItems: 'center', flex: 1, flexDirection: 'column' }}>
                                    <Progress type="circle" percent={item.percent} />
                                    <p style={{ color: colors.accent, fontWeight: 'bold', margin: 10 }}>{item.title}</p>
                                </View>
                            </List.Item>
                        )}
                    />

                    <List
                        grid={{ gutter: 16, xs: 1, sm: 1, md: 1, lg: 2, xl: 2, xxl: 2 }}
                        dataSource={data}
                        renderItem={item => (
                            <List.Item>
                                <Card title={item.title} extra={<a href="#">View all</a>}>
                                    <div style={{height: 150}}>

                                        {this.getContent(item.title)}

                                        </div>

                                </Card>
                            </List.Item>
                        )}
                    />

                </div>
            );
    }

    getContent(key) {

        //if (key.toUpperCase() === "TODOS") {
            return (

                <Steps direction="vertical" size="small" current={1}>
                    <Steps.Step title="Finished" description="This is a description." />
                    <Steps.Step title="In Progress" description="This is a description." />
                    <Steps.Step title="Waiting" description="This is a description." />
                </Steps>

            )
        //} else
           // return (
           //     <p>COntent</p>
          //  )

    }

    getAcademicsStats() {
        return [

            {
                title: "Profile",
                content:

                    <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>

                        <Avatar src='https://media.licdn.com/dms/image/C5603AQHnQxbadUX5_Q/profile-displayphoto-shrink_100_100/0?e=1531958400&v=beta&t=rc8O0NrheHHILd9KciSZLsXl7uoDNCUtnnkucT6JnFY' size="large" />
                        <View style={{ marginLeft: 10 }}>
                            <Text style={{ color: colors.accent, fontWeight: 'bold' }}>Olumide Igbiloba</Text>
                            <Text>DOB: 17/09/18</Text>
                        </View>

                    </View>
            },

            {

                title: "Sem",
                content:
                    <View style={{ flex: 1, flexDirection: 'column', }}>

                        <Text>Academic standing: <Text style={{ color: colors.accent, fontWeight: 'bold' }}>GOOD</Text></Text>
                        <Text>Current semester: <Text style={{ color: colors.accent, fontWeight: 'bold' }}>4/4</Text></Text>

                    </View>
            },

            {

                title: "GPA",
                content:

                    <View style={{ flex: 1, flexDirection: 'column' }}>

                        <Text>GPA: <Text style={{ color: colors.accent, fontWeight: 'bold' }}>N/A</Text></Text>
                        <Text>Credits: <Text style={{ color: colors.accent, fontWeight: 'bold' }}>90/120</Text></Text>

                    </View>
            }

        ]
    }
}
