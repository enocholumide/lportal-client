import React from 'react'
import { Avatar, Button, List, message, Alert, Upload, Icon, Spin, Popconfirm } from 'antd'
import req from '../../../shared/axios/requests'
import Loading from '../../../shared/Loader'
import moment from 'moment'
import Operations from '../Shared/Operations'
import { AppContext } from '../../../provider/DataProvider'

const Dragger = Upload.Dragger;

let STATE_CONTEXT
let STORAGE_PATH = ""
export default class CourseFiles extends React.Component {

    constructor(props) {
        super(props)

        this.downloadFinish = this.downloadFinish.bind(this);
        this.uploadFileFinishCallback = this.uploadFileFinishCallback.bind(this);

        this.state = {
            files: [],
            uploadProgress: -1,

            fileList: [],
            uploading: false,
            isLoading: true
        }

    }

    async componentWillReceiveProps(nextProps) {
        await this.setUp(nextProps)
    }


    async componentDidMount() {

        await this.setUp(this.props)

    }

    setUp(props) {

        this.setState({ loading: true })

        this.loadContent(props)
        this.draggerSettings = this.setDraggerSettings(props)
        STORAGE_PATH = this.getStoragePath(props)
    }


    handleChange(data, file) {

        if (data.value.toUpperCase() === "DOWNLOAD") {
            this.downloadFile(file)
        }
    }

    loadContent(props) {

        let courseFiles = "/courses/" + props.course.id + "/content/read"

        if (props.api) courseFiles = props.api

        req.get(courseFiles)
            .then((response) => {
                this.setState({ files: response.data, isLoading: false })

            })
            .catch((error) => {
                console.log(error)
            })
    }

    render() {

        let { files, isLoading } = this.state
        let { listOnly, writeAble } = this.props
        let _draggerSettings = this.draggerSettings;

        if (isLoading) return (<div><Spin /> <AppContext.Consumer>{context => { STATE_CONTEXT = context }}</AppContext.Consumer></div>)

        else if (!this.props.course) return (<div><Loading text="An error has occured" /></div>)

        else

            return (
                <div>

                    {
                        writeAble && !listOnly ?

                            <div style={{ marginBottom: '15px' }}>
                                <Dragger {..._draggerSettings} >
                                    <p className="ant-upload-drag-icon">
                                        <Icon type="inbox" />
                                    </p>
                                    <p className="ant-upload-text">Click or drag file to this area to upload</p>
                                    <p className="ant-upload-hint">Students enrolled in this course will have only read access to the file</p>
                                </Dragger>

                                <hr />

                            </div>
                            : null
                    }

                    {
                        files.length < 1 ?

                            <Alert
                                message="Nothing found"
                                type="warning"
                                showIcon
                                style={{ marginBottom: '15px' }}
                            />

                            : null
                    }

                    <List
                        itemLayout="horizontal"
                        grid={{ gutter: 15, xs: 1, sm: 1, md: 1, lg: 1, xl: 1, xxl: 1 }}
                        dataSource={files}
                        renderItem={file => (
                            <List.Item
                                actions={writeAble && !listOnly ?
                                    [

                                        <Popconfirm title="Delete file ?" onConfirm={() => this.deleteFile(file)} okText="Yes" cancelText="No">
                                            <Button type="danger" shape="circle" icon="close" size="small" />
                                        </Popconfirm>
                                    ]
                                    :
                                    [
                                        <Button type="primary" shape="circle" icon="download" size="small" onClick={() => this.downloadFile(file)} />
                                    ]} >
                                <List.Item.Meta
                                    avatar={<Avatar src={this.getFileLogo(file)} shape="square" />}
                                    title={<a onClick={() => this.downloadFile(file)}>
                                        <p>{file.user.firstName + " " + file.user.lastName + " - "}
                                            <span style={{color:'#00B8D4', fontWeight: 'bold'}}>{file.name}</span>
                                        </p>
                                    </a> }
                                    description={file.name.substr(file.name.length - 4) + " | " + file.size * 0.001 + " kb | " + moment(file.created).format("MMMM Do YYYY, h:mm:ss a").toString()}
                                />
                            </List.Item>
                        )}
                    />
                </div>
            );
    }

    getFileLogo(file) {

        let extension = file.name.substr(file.name.length - 4)

        switch (extension) {
            case ".pdf":
                return "http://media.idownloadblog.com/wp-content/uploads/2016/04/52ff0e80b07d28b590bbc4b30befde52.png"
            default:
                return "http://icons.iconarchive.com/icons/untergunter/leaf-mimes/512/text-x-generic-icon.png"
        }

    }

    getStoragePath(props) {
        return "organisations/" + STATE_CONTEXT.state.organisationID + "/courses/" + props.course.id + "/files/"
    }

    setDraggerSettings(props) {

        let api = "/courses/" + props.course.id + "/content/create/" + STATE_CONTEXT.state.user.id // -> TEACHER ID

        return {
            action: '//jsonplaceholder.typicode.com/posts/',
            onRemove: (file) => {
                this.setState(({ fileList }) => {
                    const index = fileList.indexOf(file);
                    const newFileList = fileList.slice();
                    newFileList.splice(index, 1);
                    return {
                        fileList: newFileList,
                    };
                });
            },
            beforeUpload: (file) => {
                console.log("before Upload!")
                Operations.uploadCourseFileMedia(file, api, STORAGE_PATH, null, this.uploadFileFinishCallback)
                return false;
            },
            fileList: this.state.fileList,
        };
    }

    /**
     * Callback when a file download is finished or interrupted
     * @param {number} state 0 for sucess and 1 for error
     */
    downloadFinish(state) {
        if (state < 0) message.error("An error occured", 3) // 3 is the duration 
        else message.success("File download completed", 3)
    }

    uploadFileFinishCallback(state, data, info) {
        if (state < 0) message.error(info.toString(), 3) // 3 is the duration 
        else {
            this.setState({ files: data })
            message.success("Completed", 3)
        }
    }

    /**
     * Downloads file from link
     */
    downloadFile(file) {

        Operations.downloadFile(file, null, this.downloadFinish)

    }

    deleteFile(file) {
        let api = "/courses/" + this.props.course.id + "/content/delete/" + file.id // -> TEACHER ID
        Operations.deleteCourseFileMedia(file, api, STORAGE_PATH, null, this.uploadFileFinishCallback);
    }
}



