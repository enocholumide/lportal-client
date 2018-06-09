import React from 'react'
import { Icon, List, Button,Dropdown, Message } from 'semantic-ui-react'
import axios from 'axios'
import firebase from 'firebase'
import { Progress } from 'reactstrap'
import moment from 'moment'
import swal from 'sweetalert'
import { apis } from '../../shared/config';

export default class CourseFiles extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            registered: false,
            admin: true,
            files: [],
            stagedFiles: [],
            uploadProgress: -1
        }

        if (this.state.admin) {
            options.push({ key: 'DELETE', text: 'Delete', value: 'DELETE' })
        }
    }

    async componentDidMount() {

        await this.loadContent();
    }

    handleChange(data, file) {

        if (data.value === "DELETE") {
            this.deleteFile(file)
        }
    }

    loadContent(){

        let request = "" + apis.courses + this.props.course.id + "/contents"

        axios.get(request)
        .then((response) => {
            this.setState({ files: response.data })

        })
        .catch((error) => {
            console.log(error)
        })
    }

    render() {

        let { admin, files } = this.state

        return (
            <div>
                {
                    admin ?

                        <div>
                            <Message
                                success
                                header='Upload a new file for this course'
                                list={["Only .pdf files allowed for upload"]}
                            />
                            <input
                                type="file" accept=".pdf"
                                onChange={(e) => this.setState({ stagedFiles: e.target.files })}
                            />

                            <Button floated='right' icon labelPosition='left' secondary size='small'
                                disabled={this.state.stagedFiles.length > 0 ? false : true}
                                onClick={() => this.uploadFiles(this.state.stagedFiles)}

                            >
                                <Icon name='file' /> Upload
                            </Button>

                            {
                                this.state.uploadProgress > 0 ?

                                    <Progress animated color="success" value={this.state.uploadProgress} >{this.state.uploadProgress}% uploaded</Progress>

                                    : null
                            }

                        </div>

                        :

                        null
                }


                {
                    files.length < 1 ?

                        <Message
                            info
                            icon='search'
                            header='Nothing found'
                            content='The lecturer has not uploaded any content for this coruse'
                        />

                        :

                        <div style={{ marginTop: 20 }}>

                            <Message error>
                                <Message.Header>What can you do?</Message.Header>
                                <Message.List items={["Click to download a file"]} />
                            </Message>

                            <List divided relaxed>
                                {
                                    files.map((file, index) =>
                                        <List.Item key={index} style={{ padding: 10 }}>
                                            <List.Content floated='right'>
                                                <Dropdown options={options} onChange={(event, data) => this.handleChange(data, file)} />

                                            </List.Content>
                                            <List.Icon name='github' size='large' verticalAlign='top' />
                                            <List.Content>
                                                <List.Header as='a' onClick={() => this.downloadFile(file.url)}>{file.name}</List.Header>
                                                <List.Description style={{ padding: 10 }}>{file.name.substr(file.name.length - 4)}  |  {file.size * 0.001}kb  |  {moment(file.created).format("MMMM Do YYYY, h:mm:ss a").toString()}</List.Description>
                                            </List.Content>
                                        </List.Item>

                                    )
                                }
                            </List>



                        </div>

                }

            </div>
        );
    }

    deleteFile(file) {

        let storageRef = firebase.storage().ref();

        let { course } = this.props
        ///api/courses/{id}/content/{co_id}/delete
        let deleteRequest = "" + apis.courses + this.props.course.id + "/content/" + file.id + "/delete"

        axios.delete(deleteRequest)
        .then((response) => {

            if(response.status === 200) {
                this.setState({ files: response.data })
                // Delete from database
                storageRef.child('course/' + course.id + '/content/' + file.name).delete()
                this.props.updateCourse(["activities"])
            }

        })
        .catch((error) => {
            console.log(error)
        })
    }

    uploadFiles(files) {

        let storageRef = firebase.storage().ref();

        let { course } = this.props
        
        for (let file of files) {

            console.log(file)

            if(file.size < (1*1000000)) {

                let uploadTask = storageRef.child('course/' + course.id + '/content/' + file.name).put(file);

                uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,

                    (snapshot) => {
                        let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                        this.setState({ uploadProgress: progress })
                        switch (snapshot.state) {
                            case firebase.storage.TaskState.PAUSED: // or 'paused'
                                //console.log('Upload is paused');
                                break;
                            case firebase.storage.TaskState.RUNNING: // or 'running'
                                //console.log('Upload is running');
                                break;
                            default :
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
                            default :
                                break;
                        }
                    },

                    () => {
                        uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
                            console.log('File available at', downloadURL);

                            let fp = { name: file.name, url: downloadURL, size: file.size, type: file.type }
                            let teacherID = 3 // STAFFFFFF

                            let request = "" + apis.courses +  course.id + "/content/" + teacherID + "/create";

                            axios.put(request, fp) 
                                .then((response) => {

                                    this.setState({ files: response.data, uploadProgress: -1 })
                                    this.props.updateCourse(["activities"])

                                })
                                .catch((error) => {
                                    console.log(error)
                                })
                        });
                    }
                )

            } else {
                
                swal({
                    title: "File too large",
                    text: "The file you chose to upload is too large, consider separating the files or upload a file of lower size",
                    icon: "error",
                    button: "Abort",
                  });
                this.setState({stagedFiles: []})
            }
                
        }
    }


    /**
     * Downloads file from link
     */
    downloadFile(url) {
        setTimeout(() => {
            const response = {
                file: url,
            };
            window.open(response.file);
            //window.location.href = response.file;
        }, 100);
    }
}


const options = [
    { key: 'download', text: 'Download' }
]