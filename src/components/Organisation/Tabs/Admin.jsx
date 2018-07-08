import React, { Component } from 'react';
import { Layout } from 'antd'
import Schools from '../Shared/Schools'
const { Sider, Content } = Layout;

export default class Admin extends Component {

    render() {
        return (
            <div style={{backgroundColor: 'white'}}>
                <Layout>
                    <Sider style={{ backgroundColor: 'white', padding: 10 }}><p>Activities</p></Sider>
                    <Content style={{ paddingLeft: 10, backgroundColor: 'white'}}>
                        <Schools />
                    </Content>
                </Layout>
            </div>
        );
    }
}

