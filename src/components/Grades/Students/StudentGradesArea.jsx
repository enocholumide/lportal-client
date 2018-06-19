import React, { Component } from 'react'
import { Message } from 'semantic-ui-react'
import { colors, apis } from '../../../shared/config.js'
import axios from 'axios'
import GradeCard from './GradeCard'
import moment from 'moment'
import { Alert } from 'antd'
import Loader from '../../../shared/Loader'

export default class StudentGradesArea extends Component {

    constructor(props) {
        super(props)

        this.state = {
            gradesAreReady: false,
            loadingMessage: "A moment, we are fetching your grades",
            grades: [],
            student: true,
            teacher: true,
            loading: true
        }
    }


    componentDidMount() {

        this.loadGradesFromServer();

    }

    /**
     * Loads student grades from the server
     */
    loadGradesFromServer() {

        this.setState({ gradesAreReady: false })

        axios.get(apis.student_grades + "1")
            .then((response) => {
                if (response.status === 200) { // OK
                    this.setState({ gradesAreReady: true, grades: response.data, loading: false })
                }
            })
            .catch((error) => {
                this.setState({ gradesAreReady: false, loadingMessage: error.response.data })
            })
    }

    /**
     * Shows the list of grades of all semesters the student has enrolled
     */
    render() {

        let { loadingMessage, loading } = this.state;

        if (loading)

            return (<Loader text={loadingMessage.toString()}/>)

        else

            return (

                <div style={{ backgroundColor: 'white', padding: 10 }}>

                    <Message info >
                        <Message.Header>About your grades: </Message.Header>
                        <p>Please note:</p>
                        <Message.List items={[
                            "You can download and export your current grade as a transcript",
                            "If you apply for a student job, your current grade will be shared with the lecturer",
                            "Your grades are only visible to you , unless you share them",
                            "You may expand each grade and view the course statistics",
                            "If you feel there is a problem with your grade, please report an issue immediately!"
                        ]} />

                    </Message>

                    {this.renderGrades()}

                </div>

            )
    }

    renderGrades() {

        let { grades } = this.state;

        if (grades.length < 1) return (<Alert message="No grade found at this time, check again" type="info" showIcon />)
        else
            return (
                <div>

                    {
                        grades.map((grade, index) =>

                            <div key={index}>
                                {
                                    index === 0 ?

                                        <p style={{ padding: 10, marginBottom: 10, backgroundColor: colors.mute }}>
                                            {this.formatGradeSectionHeader(grade)}
                                        </p>

                                        : null
                                }


                                {
                                    index > 0 && (
                                        grade.course.session !== grades[index - 1].course.session ||
                                        moment(grade.startDate).format("YY").toString() !== moment(grades[index - 1].startDate).format("YY").toString()
                                    )

                                        ?

                                        <p style={{ padding: 10, marginTop: 10, marginBottom: 10, backgroundColor: colors.mute }}>
                                            {this.formatGradeSectionHeader(grade)}
                                        </p>

                                        : null

                                }

                                <GradeCard grade={grade} />

                            </div>

                        )
                    }

                </div>
            )
    }

    /**
     * Separates grades with a simple header
     * @param grade grade to be formated
     * @returns string of formatted header
     */
    formatGradeSectionHeader = (grade) => {

        return (

            grade.course.session + " SEMESTER "

        )

    }
}
