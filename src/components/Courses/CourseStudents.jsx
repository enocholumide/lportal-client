import React from 'react';
import { Card, Image, Message } from 'semantic-ui-react'
import axios from 'axios'
import Loading from "../../shared/Loader";
import { apis } from '../../shared/config';

export default class CourseStudents extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            students: [],
            loading: true
        }

    }

    async componentDidMount() {

        await this.loadStudents();
    }

    loadStudents() {

        ///api/courses/{id}/students
        let request = "" + apis.courses + this.props.course.id + "/students"

        axios.get(request)
            .then((response) => {
                this.setState({ students: response.data, loading: false })

            })
            .catch((error) => {
                console.log(error)
            })
    }

    render() {

        let { students, loading } = this.state

        return (
            <div>

                {
                    loading ? <Loading text="Loading.." /> :


                        students.length === 0 ?

                            <Message info>
                                <Message.Header> No student is enrolled in this course</Message.Header>
                            </Message>

                            :

                            <div>

                                <Message info>
                                    <Message.Header> {students.length > 1 ? "" : "Only"} {students.length} Student{students.length > 1 ? "s are" : " is"} enrolled in this course</Message.Header>
                                </Message>

                                <Card.Group itemsPerRow={4}>
                                    {
                                        students.map((student, index) =>
                                            <Card key={index} raised color='teal' >
                                                <Image src={student.photoUrl} />
                                                <Card.Content>
                                                    <Card.Description>{student.firstName + " " + student.lastName}</Card.Description>
                                                </Card.Content>
                                            </Card>

                                        )
                                    }
                                </Card.Group>

                            </div>
                }

            </div>
        );
    }

}
