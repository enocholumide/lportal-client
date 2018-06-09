import React from 'react';
import { Message, List, Divider, Icon } from 'semantic-ui-react'
import Assignment from './Assignment'
import Loading from "../../shared/Loader";
import axios from 'axios';
import { Container } from 'reactstrap'
import CreateNewAssignment from './CreateNewAssignment'
import { apis } from '../../shared/config';

export default class CourseAssignments extends React.Component {

    constructor(props) {
        super(props)

        this.updateAssignmentList = this.updateAssignmentList.bind(this);

        this.state = {
            assignments: [],
            loading: true,
            loadingMessage: "Getting assignments...",
            teacher: true,
            opennew: true
        }

    }

    async componentDidMount() {

        //await this.loadHandIns();
        await this.loadAssignments();

    }

    loadAssignments() {

        let request = "" + apis.courses + this.props.course.id + "/assignments"

        axios.get(request)
            .then((response) => {
                this.setState({ assignments: response.data, loading: false })
            })
            .catch((error) => {
                console.log(error)
                this.setState({ loading: true, loadingMessage: "Error getting assignments" })
            })


    }


    updateAssignmentList(newList) {

        let { assignments } = this.state
        assignments = [];
        assignments = newList

        this.setState({ assignments: assignments })
        this.props.updateCourse(["activities"])
    }

    render() {

        let { loading, loadingMessage } = this.state

        return (
            <div >

                {
                    loading ?

                        <div style={{ height: 100 }}>
                            <Loading text={loadingMessage} />
                        </div>

                        :

                        this.showAssignments()
                }

            </div>
        );
    }

    /**
     * 
     */
    showAssignments() {

        let { teacher } = this.state

        return (
            <Container>

                {
                    teacher ?

                        <div>
                            {this.showAssignmentsForTeachers()}
                            {this.showAssignmentsForStudents()}
                        </div> : this.showAssignmentsForStudents()
                }

            </Container>
        )
    }

    /**
     * 
     */
    showAssignmentsForTeachers() {

        let { assignments } = this.state

        return (
            <div style={{ marginBottom: 20 }}>
                <Message
                    attached
                    header='Welcome, Create a new assignement for this course'
                    content='Fill out the form below to add a new assignment'
                />
                <CreateNewAssignment course={this.props.course} updateAssignmentList={this.updateAssignmentList} />
                {
                    assignments.length > 0 ?
                        <Message attached='bottom' warning>
                            <Icon name='help' />
                            Only enrolled students for this course can see this assignment.
                        </Message> : null
                }
            </div>
        )
    }

    /**
     * 
     */
    showAssignmentsForStudents() {

        let { assignments } = this.state

        return (
            <div>
                {
                    assignments.length < 1 ?

                        <Message
                            info
                            icon='search'
                            header='Nothing found'
                            content='The lecturer has not added any assignment for this course, please check again later'
                        />
                        :

                        <div>

                            <Message error>
                                <Message.Header>Notice:</Message.Header>
                                <Message.List items={["You have " + assignments.length + " assignments to hand in.", "See below for deadlines"]} />
                            </Message>

                            <Message info>
                                <Message.Header>The following files are allowed for upload: </Message.Header>
                                <Message.List items={["Microsoft .docx files", "PDF .pdf files only"]} />
                            </Message>

                            <Divider />

                            <List divided relaxed>
                                {
                                    assignments.map((assignment, index) =>
                                        <List.Item key={index} style={{ padding: 10 }}>
                                            <Assignment key={index} course={this.props.course} assignment={assignment} teacher={this.state.teacher} updateAssignmentList={this.updateAssignmentList} other={this.props} />
                                        </List.Item>

                                    )
                                }
                            </List>

                        </div>
                }
            </div>
        )
    }

}
