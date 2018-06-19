import React from 'react'
import { List, Avatar } from 'antd'
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
                                <Avatar src={item.userIcon} style={{ marginLeft: '10px' , marginRight: '10px'}}/>
                                <p ><label style={{fontWeight: 10}}>{item.email}</label> {item.type.toLowerCase()} {item.description} <br />{moment(item.timeStamp).fromNow()}</p>
                            </View>
                        </List.Item>
                    )}
                />
            </div>
        )
    }
}