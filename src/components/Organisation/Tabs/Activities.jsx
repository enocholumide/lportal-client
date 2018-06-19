import React from 'react'
import { Alert } from 'antd'
import Activity from '../Shared/Activity'

export default class Activities extends React.Component {
    render() {
        
        return (

            <div>

                <Alert
                    message="Activity Notes"
                    description="You can change the kind of acitvity feed you will like to recieve on this organisation at the settings"
                    type="info"
                    showIcon
                />

                <h5 style={{margin: 20}}>Activity Feed</h5>

                <Activity activities={this.props.organisation.activities}/>
                
                <h5 style ={{margin: 20}}>Load more..</h5>

            </div>
        )
    }
}