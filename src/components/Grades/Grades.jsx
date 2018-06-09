import React, { Component } from 'react'
import { Row, Col } from 'reactstrap'
import { View } from 'react-native-web'
import { Message, Container } from 'semantic-ui-react'
import HeaderNavigator from '../../shared/Header/Header'
import { colors, apis, current_student_id } from '../../shared/config.js'
import axios from 'axios'
import Loading from '../../shared/Loader'
import MediaQuery from 'react-responsive'

import {Divider, Layout} from 'antd'
import StudentsGradeArea from './Students/StudentGradesArea'
import TeacherGradingArea from './Teachers/TeacherGradingArea'

class Grade extends Component {

    constructor(props) {
        super(props)

        this.state = {
            student: true,
            teacher: true
        }
    }

    render() {

        return (

            <div className="main">

                <HeaderNavigator activeIndex={4} />

                <MediaQuery maxDeviceWidth={768}>

                    <Container style={{ marginTop: 50, width: "100%" }}>
                        {this.renderMainContent()}
                    </Container>

                </MediaQuery>

                <MediaQuery minDeviceWidth={769}>

                    <Row>

                        <Col lg="4" xs="3" sm="3" style={{ backgroundColor: colors.mute }}>
                        </Col>

                        <Col lg="4" xs="6" sm="6" style={{ backgroundColor: "white", padding: 10 }}>
                            {this.renderMainContent()}
                        </Col>

                        <Col lg="4" xs="3" sm="3" style={{ backgroundColor: colors.mute }}>
                        </Col>

                    </Row>
                </MediaQuery>

            </div>
        );
    }

    renderMainContent() {

        let { student, teacher } = this.state

        return (

            <div>

                {
                    student ? <StudentsGradeArea /> : null
                }

                <Divider />

                {
                    teacher ? <TeacherGradingArea /> : null
                }


            </div>

        )
    }
}

export default Grade;
