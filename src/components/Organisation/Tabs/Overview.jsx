import React, { Component } from 'react';
import { View, Text } from 'react-native-web'
import { Row, Col, Card, Progress } from 'antd'
import Activities from '../Shared/Activity'

export default class Overview extends Component {

    render() {
        return (
            <div>
                <Row>
                    <Col span={12} style={{ padding: '24px' }}>
                        {this.storageDetails()}
                        {this.collaboratorActivities()}

                    </Col>
                    <Col span={12} style={{ padding: '24px' }}>

                        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', marginBottom: '12px' }}>

                            <Text> Latest Activity </Text>
                            <span className="floated">View all</span>

                        </View>

                        <Activities activities={this.props.organisation.activities}/>

                    </Col>
                </Row>
            </div>
        );
    }

    storageDetails() {
        return (

            <div>

                <Card title="Storage" extra={<a href="">Details</a>}  >
                    <Progress percent={35} />
                </Card>

            </div>

        )

    }

    collaboratorActivities() {
        return (

            <div style={{ marginTop: '54px' }}  >

                <Card title="Teachers' Activity" extra={<a href="">Details</a>} >

                    <Activities activities={this.props.organisation.teacherActivities}/>

                </Card>

            </div>

        )
    }


}

