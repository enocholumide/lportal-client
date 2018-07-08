import React, { Component } from 'react'
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

                {this.renderMainContent()}

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
