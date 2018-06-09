import React, { Component } from 'react';
import { Form, Message } from 'semantic-ui-react';
import moment from 'moment';
import axios from 'axios';
import swal from 'sweetalert';
import { apis } from '../../shared/config';

const DATE_FORMAT = "DD-MM-YYYY";

class NewAssignment extends Component {

    state = {
        deadline: "",
        type: "",
        title: "",
        description: "",
        notes: "",
        message: "",
        error: "",

    }

    async componentDidMount() {

        let { assignment } = this.props;

        if (assignment) {

            this.setState({
                deadline: moment(assignment.deadline).format(DATE_FORMAT),
                type: assignment.type,
                title: assignment.title,
                description: assignment.description ? assignment.description : "" ,
                notes: assignment.notes ? assignment.notes : "",
            })
        }
    }

    handleChange = (data) => {

        const state = this.state;

        state[data.name] = data.value;

        this.setState({ state })
    }

    handleSubmit = () => {

        let validate = this.validateFields();

        let NEW = "create";
        let UPDATE = "update"

        let mode = this.props.assignment ? UPDATE : NEW;
        let teacherID = 3

        if (validate) {

            const { deadline, type, title, description, notes } = this.state
            const { course } = this.props;

            let assignment = {
                deadline: moment.utc(deadline, DATE_FORMAT),
                type: type,
                title: title,
                description: description,
                notes: notes
            }

            // /api/courses/{c_id}/assignments/create/{u_id}
            // /api/courses/{c_id}/assignments/{a_id}/update/{u_id}
            let put = "" + apis.courses + course.id + "/assignments/" + NEW + "/" + teacherID;
            if (mode === UPDATE) {
                put = "" + apis.courses + course.id + "/assignments/" + this.props.assignment.id + "/update/" + teacherID
            }

            axios.put(put, assignment)
                .then((response) => {

                    if (response.status === 200) {

                        this.setState({ deadline: '', type: '', title: '', description: '', notes: '', message: 'success' })

                        swal({
                            title: "Assignment " + (mode === NEW ? "created!" : "updated"),
                            text: "The assignment has been sent to all enrolled students",
                            icon: "success",
                            button: "Close",
                        });

                        if (this.props.callback) { this.props.callback(assignment) }
                        if (this.props.updateAssignmentList) { this.props.updateAssignmentList(response.data) }

                    }
                    else {
                        console.log(response)
                        swal({ title: "The request was rejected by the server", text: response, icon: "error", button: "Close" })
                    }
                })
                .catch((error) => {
                    console.log(error);
                    this.setState({ message: 'error' })
                    swal({ title: "Internal error", text: error.toString(), icon: "error", button: "Close" })
                })
        }

        else {

            this.setState({ message: 'Form validation failed', })
        }

    }

    validateFields() {

        const { deadline, type, title } = this.state

        let active_time = moment.utc(deadline, DATE_FORMAT)
        let current_time = moment.utc(moment(), DATE_FORMAT)
        let isAfter = active_time.isAfter(current_time)

        if (!isAfter) {
            this.setState({ error: 'deadline' })
            return false
        } else

        if (type.length < 1) {
            this.setState({ error: 'type' })
            return false
        }

        if (title.length < 6) {
            this.setState({ error: 'title' })
            return false
        }

        this.setState({ error: '' })

        return true

    }


    render() {

        const { deadline, type, title, description, notes, error } = this.state

        return (

            <div>

                <Form onSubmit={this.handleSubmit} className='attached fluid segment'>
                    <Form.Group widths='equal'>
                        <Form.Input error={error === "deadline" ? true : false} fluid label='Deadline*' placeholder='format dd-mm-yyy' name='deadline' value={deadline} onChange={(e, data) => this.handleChange(data)} />
                        <Form.Input error={error === "type" ? true : false} fluid label='Type*' placeholder='e.g. Essay' name='type' value={type} onChange={(e, data) => this.handleChange(data)} />
                    </Form.Group>
                    {
                        (error === "deadline" || error === "type") ?

                            <div style={{ marginBottom: 10 }}>

                                {
                                    error === "deadline" ?

                                        <Message color="red">
                                            <Message.Header>Validation error</Message.Header>
                                            <Message.List items={["The deadline field is mandatory", "The deadline must be after today " + moment().format(DATE_FORMAT), "Use a format like: " + DATE_FORMAT]} />
                                        </Message> : null

                                }

                                {
                                    error === "type" ?

                                        <Message color="red">
                                            <Message.Header>Validation error</Message.Header>
                                            <Message.List items={["The type of the assignment is important", "For example: Essay, Paper"]} />
                                        </Message> : null
                                }

                            </div>

                            : null
                    }
                    <Form.Input error={error === "title" ? true : false} fluid label='Title*' placeholder='Enter title' name='title' value={title} onChange={(e, data) => this.handleChange(data)} />
                    {
                        (error === "title") ?

                            <div style={{ marginBottom: 10 }}>

                                <Message color="red">
                                    <Message.Header>Validation error</Message.Header>
                                    <Message.List items={["The title for the assignment is mandatory", "At least 6 characters are required"]} />
                                </Message>

                            </div>

                            : null
                    }

                    <Form.TextArea error={error === "description" ? true : false} label='Description' placeholder='Enter assignment description...' name='description' value={description} onChange={(e, data) => this.handleChange(data)} />
                    <Form.TextArea error={error === "notes" ? true : false} label='Notes' placeholder='Enter assignment notes...' name='notes' value={notes} onChange={(e, data) => this.handleChange(data)} />
                    <Form.Button primary>Submit</Form.Button>
                </Form>
            </div>
        );
    }
}

export default NewAssignment;
