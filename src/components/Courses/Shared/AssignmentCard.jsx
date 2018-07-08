import React from 'react'
import { Button, Card, Modal, message } from 'antd'
import moment from 'moment'
import Submissions from './Submissions'
import NewAssignment from './NewAssignmentCard'
import req from '../../../shared/axios/requests'

export default class Assignment extends React.Component {

    constructor(props) {
        super(props)

        this.toggle = this.toggle.bind(this)
        this.handleCancel = this.handleCancel.bind(this)
        this.updateAssignment = this.updateAssignment.bind(this)

        this.state = {
            open: false,
            assignments: [],
            handIns: [],
            uploadProgress: -1,
            teacher: this.props.teacher,
            modal: false,
            assignment: this.props.assignment,
            editModal: false
        }
    }

    toggle() {
        this.setState({
            modal: !this.state.modal
        });
    }

    updateAssignment(edited) {

        let { assignment } = this.state;

        assignment.deadline = moment(edited.deadline).format("DD-MM-YYYY")
        assignment.type = edited.type
        assignment.title = edited.title
        assignment.description = edited.description
        assignment.notes = edited.notes

        this.setState({ assignment: assignment, editModal: false })
        //this.props.other.updateCourse(["activities"])

    }


    toggleShowSubmissions() {
        this.setState({ open: !this.state.open })
    }

    handleCancel = () => {
        this.setState({
            editModal: false,
        });
    }

    editAssignment() {

        this.setState({ editModal: !this.state.editModal });
    }

    deleteAssignment() {

        let assignment = "/assignments/" + this.props.assignment.id + "/delete"

        req.delete(assignment)
            .then((response) => {
                if (response.status === 200) {
                    this.props.updateAssignmentsList && this.props.updateAssignmentsList(response.data)
                    message.success("Assignment deleted")
                }
            })
            .catch((error) => {
                console.log(error)
                message.error("Cannot delete assignment")
            })
    }

    getActions() {

        let actions = []

        let { writeAble } = this.props

        if (writeAble) {
            actions.push(<Button key={actions.length} type="danger" shape="circle" icon="close" onClick={() => this.deleteAssignment()}></Button>)
            actions.push(<Button style={{ margin: 10 }} key={actions.length} type="secondary" shape="circle" icon="edit" onClick={() => this.editAssignment()}></Button>)
        }

        actions.push(<Button key={actions.length} type="primary" shape="circle" icon='file' onClick={() => this.toggleShowSubmissions()}></Button>)

        return (

            <div>
                {
                    actions.map((action, key) => action

                    )
                }
            </div>
        )
    }

    render() {

        let { open, assignment, editModal } = this.state
        let { course } = this.props
        let actions = this.getActions()

        return (
            <div >
                <Card
                    extra={actions}
                    hoverable
                    title={<label style={{ fontSize: 14 }}>{assignment.type}<br /><h4 style={{ fontWeight: 'bold' }}>{assignment.title}</h4></label>}
                    style={{ backgroundColor: 'white', padding: '15px', boxShadow: '2px 2px 1px #888888', alignItems: 'center', marginBottom: '24px' }}>
                    <div style={{ paddingBottom: 0 }}>
                        <p>{"Deadline: " + moment(assignment.deadline).fromNow()}</p>
                        <div>{assignment.notes}</div>
                        {
                            open ?

                                <div>

                                    <hr />

                                    {<Submissions assignment={assignment} course={course} {...this.props} />}

                                </div> : null
                        }

                    </div>
                </Card>

                <Modal title="Edit Assignment"
                    visible={editModal}
                    onOk={this.handleCancel}
                    onCancel={this.handleCancel}
                >
                    <NewAssignment assignment={this.state.assignment} {...this.props} updateAssignment={this.updateAssignment} />
                </Modal>
            </div>
        );
    }

}
