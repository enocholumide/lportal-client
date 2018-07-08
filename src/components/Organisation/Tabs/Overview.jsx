import React, { Component } from 'react';
import { View, Text } from 'react-native-web'
import { Row, Col, Card, Progress, Button } from 'antd'
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
                            <span className="floated">{this.getExtraButton("Activities")}</span>

                        </View>

                        <Activities activities={this.props.organisation.activities} />

                    </Col>
                </Row>
            </div>
        );
    }

    storageDetails() {
        return (
            <div>
                <Card
                    title="Storage" extra={this.getExtraButton("Storage")} >
                    <Progress percent={10} />
                </Card>
            </div>
        )

    }

    getExtraButton = (tabName) => {
        return (
            <Button
                type="primary"
                size={'small'}
                ghost
                onClick={() => this.props.onTabChange(tabName)}
            > Details </Button>
        )
    }

    collaboratorActivities() {
        return (

            <div style={{ marginTop: '54px' }}  >

                <Card title="Teachers' Activity" extra={this.getExtraButton("Activities")} >

                    <Activities activities={this.props.organisation.teacherActivities} />

                </Card>

            </div>

        )
    }


}

