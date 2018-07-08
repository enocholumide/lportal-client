import React, { Component } from 'react'
import moment from 'moment'
import req from '../../../shared/axios/requests'
import { Col, DatePicker, Form, Input, Button, message } from 'antd';
const FormItem = Form.Item;
const InputGroup = Input.Group;
const { TextArea } = Input

const DATE_FORMAT = "DD-MM-YYYY";

class NewAssignment extends Component {

    constructor(props) {
        super(props)

        this.onDeadlineChange = this.onDeadlineChange.bind(this)
        this.handleChange = this.handleChange.bind(this)

        this.state = {
            deadline: moment().add(3, 'd'),
            type: "",
            title: "",
            description: "",
            notes: "",
            message: "",
            error: "",

        }
    }


    componentDidMount() {

        let { assignment } = this.props;

        console.log(assignment)

        if (assignment) {

            this.setState({
                deadline: moment(assignment.deadline),
                type: assignment.type,
                title: assignment.title,
                description: assignment.description ? assignment.description : "",
                notes: assignment.notes ? assignment.notes : "",
            })
        }

    }

    handleChange = (e) => {

        let data = e.target

        const state = this.state;

        state[data.name] = data.value;

        this.setState({ state })
    }

    onDeadlineChange(moment) {
        this.setState({ deadline: moment })
    }

    handleSubmit() {


        let NEW = "create";
        let UPDATE = "update"

        let mode = this.props.assignment ? UPDATE : NEW;
        let teacherID = this.props.context.state.user.id

        let validate = this.validateFields();

        if (validate) {

            const { course } = this.props;
            const { deadline, type, title, description, notes } = this.state

            let assignment = {
                deadline: moment(deadline),
                type: type,
                title: title,
                description: description,
                notes: notes
            }
            ///create/course/{courseID}/teacher/{teacherID}

            let put = "/assignments/create/course/" + course.id + "/teacher/" + teacherID
            if (mode === UPDATE) {
                //"/{assgID}/update/course/{courseID}/teacher/{teacherID}"
                put = "/assignments/" + this.props.assignment.id + "/update/course/" + course.id + "/teacher/" + teacherID
            }

            req.put(put, assignment)
                .then((response) => {

                    if (response.status === 200) {

                        message.success("Assignment " + (mode === NEW ? "created!" : "updated"));

                        this.props.updateAssignment && this.props.updateAssignment(assignment)
                        this.props.updateAssignmentsList && this.props.updateAssignmentsList(response.data)

                    }
                    else 
                        message.error("The request was rejected by the server: ");
                    
                })
                .catch((error) => {
                    console.log(error.response);
                    this.setState({ message: 'error' })
                    message.error("The request was rejected by the server: " + error.response.data.toString());
                })

        }



        else {

            this.setState({ message: 'Form validation failed', })
        }



    }

    validateFields() {

        const { deadline, type, title  } = this.state

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

        let labelStyle = { fontWeight: "bold" }

        return (

            <div style={{ padding: '1px' }}>

                <Form>

                    <FormItem>
                        {
                            error === 'deadline' ? <div><label style={{ color: 'red' }}>Assignment requires a deadline</label> <br /> </div> : null
                        }
                        {
                            error === 'type' ? <div><label style={{ color: 'red' }}>Assignment requires a type</label> <br /> </div> : null
                        }
                        <InputGroup >
                            <Col span={12}>
                                <label style={labelStyle}>Deadline*</label>
                                <br />
                                <DatePicker defaultValue={moment(deadline)} style={{ width: '100%' }} name='deadline' id="deadline" onChange={this.onDeadlineChange} />
                            </Col>
                            <Col span={12}>
                                <label style={labelStyle}>Type*</label>
                                <Input defaultValue={type} placeholder='e.g. Essay' name='type' id="type" onChange={this.handleChange}/>
                            </Col>
                        </InputGroup>
                    </FormItem>

                    <label style={labelStyle}>Title*</label>
                    {
                        error === 'title' ? <div><label style={{ color: 'red' }}>Assignment requires a title</label> <br /> </div> : null
                    }
                    <FormItem>
                        <Input placeholder='Enter title' name='title' defaultValue={title} id="title" onChange={this.handleChange} />
                    </FormItem>

                    <label style={labelStyle}>Description</label>
                    <FormItem>
                        <TextArea rows={3} placeholder='Enter assignment description...' name='description' defaultValue={description} id="description" />
                    </FormItem>

                    <label style={labelStyle}>Notes</label>
                    <FormItem>
                        <TextArea rows={5} placeholder='Enter assignment notes...' name='notes' defaultValue={notes} id="notes" />
                    </FormItem>

                    <FormItem>
                        <Button type="primary" onClick={() => this.handleSubmit()}>Submit</Button>
                    </FormItem>

                </Form>
            </div>
        );
    }
}

export default NewAssignment;
