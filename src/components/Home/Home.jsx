import React, { Component } from 'react'
import Header from '../../shared/Header/Header';
import { Row, Col } from 'antd';
import CreateUser from './CreateOrganisation'
import HomeMessage from './Rider/Message'

export default class Home extends Component {

    render() {

        return (

            <div>

                <Header submenu={false} />

                <div style={{ backgroundColor: 'black', backgroundImage: 'url(https://www.profoundry.co/wp-content/uploads/2015/02/bigstock-Education-Doodle-Elements-48340424.jpg)' }}>

                    <div style={{ height: '100%', backgroundColor: 'rgba(0,0,0,0.9)', padding: 100 }}>
                        <Row>
                            <Col span={16} offset={4} >

                                <Row>
                                    <Col span={16} style={{ paddingRight: 200 }}><HomeMessage /></Col>
                                    <Col span={8}><CreateUser /></Col>
                                </Row>
                            </Col>
                        </Row>
                    </div>

                </div>
            </div>

        )
    }

}



