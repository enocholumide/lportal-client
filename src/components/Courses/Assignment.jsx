import React from 'react'
import { Message, List, Icon, Button, Table, Divider, Checkbox, Dropdown } from 'semantic-ui-react'
import moment from 'moment'
import firebase from 'firebase/app'
import 'firebase/storage'
import { Progress, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import axios from 'axios'
import swal from 'sweetalert'
import CreateNewAssignment from './CreateNewAssignment'
import { apis } from '../../shared/config'
import { message } from 'antd';



export default class Assignment extends React.Component {

    constructor(props) {
        super(props)

        this.toggle = this.toggle.bind(this);
        this.deleteAssignment = this.deleteAssignment.bind(this);
        this.updateAssignment = this.updateAssignment.bind(this);

        this.state = {
            open: false,
            assignments: [],
            handIns: [],
            uploadProgress: -1,
            teacher: this.props.teacher,
            modal: false,
            assignment: this.props.assignment
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

        this.setState({ assignment: assignment })
        this.props.other.updateCourse(["activities"])

    }

    async componentDidMount() {

        //await this.loadHandIns();


    }

    render() {

        let { open, handIns, teacher, modal, assignment } = this.state;
        let { course } = this.props;
        let deadlineHasPassed = moment(new Date()).isAfter(moment(assignment.deadline));

        return (
            <div >
                <List.Item style={{ padding: 10, alignItems: 'center' }}>
                    <List.Content floated='right'>

                        <Button floated='right' icon labelPosition='left' primary size='small'
                            onClick={() => this.loadHandIns()}>
                            <Icon name={open ? 'caret up' : 'caret down'} /> Hand-ins
                        </Button>

                        {
                            teacher ?
                                <Dropdown icon='setting' floating button className='icon'>
                                    <Dropdown.Menu>
                                        <Dropdown.Item icon='edit' text='Edit' onClick={this.toggle} />
                                        <Dropdown.Item icon='delete' text='Delete' onClick={this.deleteAssignment} />
                                    </Dropdown.Menu>
                                </Dropdown> : null
                        }

                        {
                            teacher && modal ?

                                <Modal isOpen={modal} toggle={this.toggle} className={this.props.className}>
                                    <ModalHeader>Assignments</ModalHeader>
                                    <ModalBody>
                                        <CreateNewAssignment assignment={assignment} callback={this.updateAssignment} course={course} />
                                    </ModalBody>
                                    <ModalFooter>
                                        <Button secondary onClick={this.toggle}>Close</Button>
                                    </ModalFooter>
                                </Modal> : null
                        }



                    </List.Content>
                    <List.Content>
                        <List.Description as='a'>{assignment.type}</List.Description>
                        <List.Header as='h4' style={{ margin: 10, marginLeft: 0 }}>{assignment.title}</List.Header>
                        <List.Description>Deadline: {" " + moment(assignment.deadline).format("MMMM Do YYYY, h:mm:ss a").toString()}</List.Description>
                    </List.Content>
                    {
                        open ?

                            <div>

                                <Divider />

                                {
                                    handIns !== undefined && handIns !== null && handIns.length > 0 ? this.displayHandIns(handIns)

                                        :

                                        <div>
                                            <Message
                                                icon='question'
                                                header='Nothing found'
                                                content="You have not uploaded any file."
                                            />

                                            {

                                                // Compare dates
                                                deadlineHasPassed ?

                                                    null :

                                                    <div>

                                                        <Divider />
                                                        <Button floated='left' icon labelPosition='left' secondary size='small'>
                                                            <Icon name='file' /> Upload
                                                        </Button>
                                                        <input
                                                            type="file"
                                                            onChange={(e) => this.uploadFile(e)}
                                                        >

                                                        </input>

                                                    </div>

                                            }

                                        </div>
                                }

                            </div> : null
                    }
                </List.Item>




            </div>
        );
    }

    loadHandIns() {

        let { course, assignment } = this.props;

        // /api/courses/{id}/assignment/{a_id}/submissions/{s_id}

        let handins = "" + apis.courses + course.id + "/assignment/" + assignment.id + "/submissions/" + 1 // 1 -> Current student ID

        axios.get(handins)
            .then((response) => {
                if (response.status === 200) {
                    this.setState({ handIns: response.data, open: !this.state.open })
                }
                else if (response.status === 403) {
                    swal({
                        title: "Oh oh!",
                        text: "You do not have permission to do that, contact the course coordinator",
                        icon: "error",
                        button: "Close",
                    });
                }
            })
            .catch((error) => {

                if (error.response.status === 403) {
                    swal({
                        title: "Oh oh!  ",
                        text: error.response.data,
                        icon: "error",
                        button: "Close",
                    });
                }
                console.log(error.response)
            })

    }

    downloadHandIns(listUrl) {

        for (let url of listUrl) {
            setTimeout(() => {
                const response = {
                    file: url,
                };
                window.open(response.file);
                //window.location.href = response.file;
            }, 100);
        }
    }

    deleteAssignment() {

        let { assignment } = this.props;

        swal("Do you want to delete this assignment? Please note that all hand-ins will be removed", {
            buttons: {
                cancel: "No",
                delete: "Yes",
            },
        })
            .then((value) => {
                switch (value) {

                    case "delete":

                        let { course } = this.props;
                        let teacherID = 3;

                        // /api/courses/{c_id}/assignments/{a_id}/delete/{u_id}

                        let del = "" + apis.courses + course.id + "/assignments/" + assignment.id + "/delete/" + teacherID;

                        axios.delete(del)
                            .then((response) => {

                                if (response.status === 200) {

                                    this.setState({ assignments: response.data, loading: false })
                                    if (this.props.updateAssignmentList) { this.props.updateAssignmentList(response.data) }
                                    message.info("Assigment have been deleted and all hand-ins have been removed")
                                    //swal({ title: "Deleted", text: "Assigment have been deleted and all hand-ins have been removed", icon: "error", button: "Close" })
                                    this.props.other.updateCourse(["activities"])

                                } else
                                    message.info("Could not delete, aborting")
                                //swal("Could not delete, aborting");

                            })
                            .catch((error) => {
                                console.log(error)
                                swal("Could not delete assignment, aborting");
                            })
                        break;
                    default:
                        swal("Ok");
                }
            });
    }

    deleteHandIns(handIns) {

        let storageRef = firebase.storage().ref();

        for (let handIn of handIns) {

            swal("Do you want to delete this hand-in?", {
                buttons: {
                    cancel: "No",
                    delete: "Yes",
                },
            })
                .then((value) => {
                    switch (value) {

                        case "delete":

                            //
                            let submission = "" + apis.courses + "handin/delete/" + handIn.id // -> Student ID

                            axios.delete(submission)
                                .then((response) => {

                                    if (response.status === 200) {

                                        this.setState({ handIns: response.data })
                                        storageRef.child('course/' + this.props.course.id + '/handins/' + handIn.name).delete()
                                        swal("Deleted!");

                                    } else
                                        swal("Could not delete, aborting");

                                })
                                .catch((error) => {
                                    console.log(error)
                                    swal("Could not delete, aborting");
                                })
                            break;
                        default:
                            swal("Ok");
                    }
                });
        }
    }


    showHandIns() {

        this.setState({ open: !this.state.open })

        let { open } = this.state;

        // Only reload from server if not previosuly loaded
        if (open && this.state.handIns !== undefined && !this.state.handIns.length > 0) {

            this.loadHandIns();

        }
    };


    /**
     * 
     * @param {*} handIns 
     */
    displayHandIns(handIns) {

        console.log(handIns)
        return (
            <List.Content>

                <Table celled striped>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell colSpan='4'>Your hand-ins</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>

                    <Table.Body>
                        {
                            handIns.map((handIn, index) =>

                                <Table.Row key={index}>
                                    <Table.Cell collapsing>
                                        <Checkbox />
                                    </Table.Cell>
                                    <Table.Cell>{handIn.name}</Table.Cell>
                                    <Table.Cell collapsing textAlign='right'>
                                        {moment(handIn.created).fromNow()}
                                    </Table.Cell>
                                    <Table.Cell collapsing>
                                        {Math.round(handIn.size * 0.001)}kb
                                    </Table.Cell>
                                    <Table.Cell collapsing>
                                        <Icon name='download' onClick={() => this.downloadHandIns([handIn.url])} />
                                        <Icon name='delete' color='red' onClick={() => this.deleteHandIns([handIn])} />
                                    </Table.Cell>
                                </Table.Row>

                            )
                        }
                    </Table.Body>
                    <Table.Footer fullWidth>
                        <Table.Row>
                            <Table.HeaderCell />
                            <Table.HeaderCell colSpan='5'>
                                <Button floated='right' icon labelPosition='left' primary size='small'>
                                    <Icon name='file' /> Upload
                                </Button>
                                <Button type="file" size='small' secondary active={this.state.handIns.length > 0} onClick={() => this.deleteHandIns(this.state.handIns)}>
                                    <Icon name='delete' />Delete all </Button>
                                <input
                                    type="file"
                                    onChange={(e) => this.uploadFile(e)}
                                />
                            </Table.HeaderCell>
                        </Table.Row>
                    </Table.Footer>
                </Table>

                {
                    this.state.uploadProgress > 0 ?

                        <Progress animated color="success" value={this.state.uploadProgress} >{this.state.uploadProgress}% uploaded</Progress>

                        :

                        null

                }

            </List.Content>
        )
    }

    uploadFile(e) {

        let storageRef = firebase.storage().ref();

        let file = e.target.files[0];
        let { course, assignment } = this.props

        // Upload file and metadata to the object 'images/mountains.jpg'
        let uploadTask = storageRef.child('course/' + course.id + '/handins/' + file.name).put(file);

        // Listen for state changes, errors, and completion of the upload.
        uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,

            (snapshot) => {
                let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                this.setState({ uploadProgress: progress })
                switch (snapshot.state) {
                    case firebase.storage.TaskState.PAUSED:
                        break;
                    case firebase.storage.TaskState.RUNNING:
                        break;
                    default:
                        break;

                }
            },

            (error) => {
                // A full list of error codes is available at
                // https://firebase.google.com/docs/storage/web/handle-errors
                switch (error.code) {
                    case 'storage/unauthorized':
                        // User doesn't have permission to access the object
                        break;

                    case 'storage/canceled':
                        // User canceled the upload
                        break;

                    case 'storage/unknown':
                        // Unknown error occurred, inspect error.serverResponse
                        break;

                    default:
                        break;
                }
            },

            () => {
                uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
                    //console.log('File available at', downloadURL);

                    let fp = { name: file.name, url: downloadURL, size: file.size, type: file.type }
                    // Upload to server
                    // /api/courses/{id}/assignment/{a_id}/submit/{s_id}
                    let submission = "" + apis.courses + course.id + "/assignment/" + assignment.id + "/submit/" + 1 // -> Student ID
                    axios.put(submission, fp)
                        .then((response) => {
                            if (response.status === 200) {
                                swal({
                                    title: "Submitted!",
                                    text: "Your assignment has been uploaded and will be reviewed by the course coordinator(s)",
                                    icon: "success",
                                    button: "Close",
                                });
                                this.setState({ handIns: response.data, uploadProgress: -1 })
                            }
                            else
                                storageRef.child('course/' + this.props.course.id + '/handins/' + file.name).delete()
                        })
                        .catch((error) => {
                            console.log(error)
                            storageRef.child('course/' + this.props.course.id + '/handins/' + file.name).delete()
                        })
                });
            }
        )
    }
}
