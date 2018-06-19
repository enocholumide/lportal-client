import React, { Component } from 'react'
import { Row, Col } from 'reactstrap'
import { Container } from 'semantic-ui-react'

import { colors } from '../../shared/config.js'
import MediaQuery from 'react-responsive'
import { Divider } from 'antd'
import StudentsGradeArea from './Students/StudentGradesArea'
import TeacherGradingArea from './Teachers/TeacherGradingArea'

class Grade extends Component {

    constructor(props) {
        super(props)

        this.state = {
            student: true,
            teacher: false
        }
    }

    render() {

        return (

            <div className="main">

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
