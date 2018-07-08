import React, { Component } from 'react'
import req from "../../../shared/axios/requests"
import Loading from "../../../shared/Loader"
import { List, Table } from 'semantic-ui-react'
import moment from 'moment'
import { Progress, message, Upload, Button, Checkbox, Icon, Popconfirm } from 'antd'
import { AppContext } from '../../../provider/DataProvider'
import Operations from './Operations'
import Files from '../Tabs/Files'

let STATE_CONTEXT
let STORAGE_PATH = ""
export default class Submissions extends Component {

    constructor(props) {
        super(props)

        this.uploadFileFinishCallback = this.uploadFileFinishCallback.bind(this)
        this.deleteFileFinishCallback = this.deleteFileFinishCallback.bind(this)
        this.uploadFileProgress = this.uploadFileProgress.bind(this)

        this.state = {
            assignment: this.props.assignment,
            isLoading: true,
            loadingMessage: "",
            submissions: []
        }

        this.uploadSettings = this.setDraggerSettings();
    }

    async componentDidMount() {
        await this.setUp(this.props)
    }

    async componentWillReceiveProps(nextProps) {
        await this.setUp(nextProps)
    }

    setUp(props) {
        this.loadSubmissions(props)
        STORAGE_PATH = "organisations/" + STATE_CONTEXT.state.organisationID + "/courses/" + props.course.id + "/submissions/"
    }

    /**
     * Loads all submissiona that the student has uploaded for the course
     */
    loadSubmissions(props) {

        this.setState({ isLoading: true })

        let request = "/assignments/" + this.state.assignment.id + "/submissions/read/" + 3 // Current Student ID!

        req.get(request)
            .then((response) => {
                if (response.status === 200)
                    this.setState({ isLoading: false, submissions: response.data })
                else
                    this.setState({ isLoading: true, loadingMessage: "Cannot get submissions" })
            })
            .catch((error) => {
                this.setState({ isLoading: true, loadingMessage: error.toString() })
            })
    }

    render() {

        let { isLoading, submissions } = this.state;

        let { isTeacher } = this.props

        if (isLoading) return (<div><Loading /> <AppContext.Consumer>{context => { STATE_CONTEXT = context }}</AppContext.Consumer></div>)

        else return (
            <div>
                {
                    isTeacher ? this.renderTeacherSubmissions() : this.renderStudentSubmissions(submissions)
                }
            </div>);
    }

    /**
     * Renders all submission for the course
     * The assignment ID is used
     */
    renderTeacherSubmissions() {

        let request = "/assignments/" + this.state.assignment.id + "/submissions"

        return (

            <div>
                <Files listOnly api={request} {...this.props}/>
            </div>
        )
    }

    /**
     * Renders a student submission retrieved from the server
     * The course ID and the student ID are used
     * @param {Array} handIns array of handins to render 
     */
    renderStudentSubmissions(handIns) {
        return (

            <List.Content>

                <Table celled striped>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell colSpan='5'>Your hand-ins</Table.HeaderCell>
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
                                        <Button style={{ marginRight: 10 }} type="primary" shape="circle" icon="download" size="small" onClick={() => this.downloadHandIn(handIn)} />
                                        <Popconfirm title="Delete submission ?" onConfirm={() => this.deleteHandIn(handIn)} okText="Yes" cancelText="No">
                                            <Button type="danger" shape="circle" icon="close" size="small" />
                                        </Popconfirm>
                                    </Table.Cell>
                                </Table.Row>

                            )
                        }
                    </Table.Body>
                    <Table.Footer fullWidth>
                        <Table.Row>
                            <Table.HeaderCell />
                            <Table.HeaderCell colSpan='5'>
                                <Upload {...this.uploadSettings}>
                                    <Button>
                                        <Icon type="upload" /> Click to Upload
                                    </Button>
                                </Upload>
                            </Table.HeaderCell>
                        </Table.Row>
                    </Table.Footer>
                </Table>

                {
                    this.state.uploadProgress > 0 ?

                        <Progress percent={this.state.uploadProgress} status="active" />

                        :

                        null

                }

            </List.Content>
        )
    }

    /**
     * @returns {Object} dragger settings object
     */
    setDraggerSettings() {

        let API_URL = "/assignments/" + this.props.assignment.id + "/submissions/create/" + 3 // -> Student ID

        return {
            beforeUpload: (file) => {
                Operations.uploadCourseFileMedia(file, API_URL, STORAGE_PATH, this.uploadFileProgress, this.uploadFileFinishCallback)
                return false;
            },
            fileList: [],
        };
    }

    /**
     * Callback for showing the progress of a file upload
     * @param {*} progress 
     */
    uploadFileProgress(progress) {
        this.setState({ uploadProgress: progress })
    }

    /**
     * Callback from the input button for uploading files
     * @param {*} e the files to be uploaded
     */
    uploadFile(e) {
        let API_URL = "/assignments/" + this.props.assignment.id + "/submissions/create/" + 3 // -> Student ID
        let file = e.target.files[0]
        Operations.uploadCourseFileMedia(file, API_URL, STORAGE_PATH, this.uploadFileProgress, this.uploadFileFinishCallback)
    }

    /**
     * Deletes a submission for a student
     * @param {*} handIn the submission to delete
     */
    deleteHandIn(handIn) {
        let API_URL = "/assignments/submissions/delete/" + handIn.id //
        Operations.deleteCourseFileMedia(handIn, API_URL, STORAGE_PATH, this.uploadFileProgress, this.deleteFileFinishCallback)
    }

    /**
     * Downloads a submission for a course. The Url must be valid
     * @param {*} handIn 
     */
    downloadHandIn(handIn) {
        Operations.downloadFile(handIn)
    }

    /**
     * Call back for a file upload request
     * @param {*} state the state of the upload, 0 for success and -1 for an error
     * @param {*} data the data returned from the server, note that this can also be an error if the state is -1
     */
    uploadFileFinishCallback(state, data) {

        let DURATION = 5

        if (state > -1) {
            message.success('Your assignment have been uploaded and will be reviewed by the course coordinator(s)', DURATION);
            this.setState({ submissions: data, uploadProgress: -1 })
        } else {
            message.success('Cannot upload file, an error occured', DURATION);
        }
    }

    /**
     * Call back for a file delete request
     * @param {*} state the state of the delete action, 0 for success and -1 for an error
     * @param {*} data the data returned from the server, note that this can also be an error if the state is -1
     */
    deleteFileFinishCallback(state, data) {

        let DURATION = 5

        if (state > -1) {
            message.success('Submission deleted', DURATION);
            this.setState({ submissions: data, uploadProgress: -1 })
        } else {
            message.success('Cannot delete submission, an error occured', DURATION);
        }
    }
}
