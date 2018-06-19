import React, { Component } from 'react'
import { Spin } from 'antd'

export default class Loading extends Component {

    render() {
        return (
            <div style={{ padding: 80, textAlign: 'center', justifyContent: 'center', alignItems: 'center', margin: 0}}>
                <Spin size="large" tip={this.props.text} />
            </div>
        );
    }
}
