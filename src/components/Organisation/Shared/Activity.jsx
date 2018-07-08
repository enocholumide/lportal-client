import React from 'react'
import { List, Avatar, Tag } from 'antd'
import { View } from 'react-native-web'
import moment from 'moment'

export default class Activities extends React.Component {
    render() {

        let data = this.props.activities

        return (
            <div>
                <List
                    itemLayout="horizontal"
                    dataSource={data}
                    renderItem={item => (
                        <List.Item  >
                            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', padding: 10 }}>
                                <Avatar src={item.typeIcon} />
                                <Avatar src={item.userIcon} style={{ marginLeft: '10px', marginRight: '10px' }} />
                                <div>
                                    <Tag color="#2db7f5">{item.email}</Tag>{item.type.toLowerCase() + " " + item.description}
                                    <br />
                                    {moment(item.timeStamp).fromNow()}
                                </div>
                            </View>
                        </List.Item>
                    )}
                />
            </div>
        )
    }
}