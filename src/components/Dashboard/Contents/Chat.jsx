import React, { Component } from 'react';
import { List, Avatar } from 'antd'
import Loading from '../../../shared/Loader'
import { colors } from '../../../shared/config'
import req from '../../../shared/axios/requests'

export default class Info extends Component {


    state = {
        loading: true,
        data: []
    }


    componentDidMount() {
        setTimeout(() => this.loadUsers(), 1500)
    }

    loadUsers() {
        req.get("/organisations/" + this.props.orgnaisationID + "/users")
            .then((response) => {
                if (response.status === 200) {
                    this.setState({ loading: false, data: response.data })
                }
            })
            .catch((error) => {

            })
    }

    render() {

        let { data } = this.state

        if (this.state.loading) {
            return (
                <Loading text="Loding.." />
            )
        }

        else

            return (
                <div style={{ padding: 15, backgroundColor: 'white' }}>
                    <p style={{ color: colors.accent, fontWeight: 'bold' }}>Your colleagues</p>
                    <List
                        itemLayout="horizontal"
                        dataSource={data}
                        renderItem={(item, index) => (
                            <List.Item actions={[<div style={{ height: 8, width: 8, borderRadius: 4, backgroundColor: index === data.length - 1 ? 'red' : colors.accent }}></div>]}>
                                <List.Item.Meta
                                    avatar={<Avatar src={item.photoUrl} size='small' />}
                                    title={item.firstName + " " + item.lastName.charAt(0) + "."}
                                />
                            </List.Item>
                        )}
                    />
                </div>
            );
    }
}

