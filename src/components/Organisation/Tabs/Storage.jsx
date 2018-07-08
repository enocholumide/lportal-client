import React from 'react'
import { Alert, Tag, Progress } from 'antd'
import { storageConfig } from '../../../shared/config'

export default class Storage extends React.Component {
    render() {

        return (

            <div>
                <Alert
                    message="Your Storage"
                    description="Find your organisation storage details here"
                    type="info"
                    showIcon
                />

                <h5 style={{ margin: 20 }}>Storage details</h5>

                <hr />

                <Progress percent={10} />

                <hr />

                <div >
                    <ul className="list-unstyled">
                        <li>Authorization Domain : <Tag color="#f50">{storageConfig.authDomain}</Tag></li>
                        <hr />
                        <li>Database Url : <Tag color="#2db7f5">{storageConfig.databaseURL}</Tag></li>
                        <hr />
                        <li>Storage Bucket : <Tag color="#87d068">{storageConfig.storageBucket}</Tag></li>
                        <hr />
                        <li>Project ID : <Tag color="#108ee9">{storageConfig.projectId}</Tag></li>
                    </ul>
                </div>
            </div>
        )
    }
}