import React from 'react'
import { Tabs } from 'antd'
import Departments from './Departments'
const TabPane = Tabs.TabPane;

export default class SchoolAdmin extends React.Component {


    render() {

        let tabpanes = [
            { title: 'Departments', content: <Departments school={this.props.school} /> },
            { title: 'Teachers', content: <Departments school={this.props.school} /> }
        ]

        return (
            <div>
                <Tabs
                    defaultActiveKey="0"
                    tabPosition="top">

                    {
                        tabpanes.map((pane, index) =>

                            <TabPane tab={pane.title} key={index}>{pane.content}</TabPane>

                        )
                    }
                </Tabs>

            </div>
        )
    }
}