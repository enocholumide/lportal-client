import React from 'react'
import { Message } from 'semantic-ui-react'
import { List, Button, Modal } from 'antd'
import AssignmentCard from '../Shared/AssignmentCard'
import Loading from "../../../shared/Loader"
import req from "../../../shared/axios/requests"
import NewAssignment from '../Shared/NewAssignmentCard';

export default class CourseAssignmentCards extends React.Component {

    constructor(props) {
        super(props)

        this.updateAssignmentsList = this.updateAssignmentsList.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.createAssignment = this.createAssignment.bind(this);

        this.state = {
            assignments: [],
            loading: true,
            loadingMessage: "Getting assignments...",
            createModal: false
        }

    }

    async componentDidMount() {

        await this.loadAssignments(this.props);

    }

    async componentWillReceiveProps(nextProps) {
        await this.loadAssignments(nextProps);
    }

    loadAssignments(props) {

        this.setState({ loading: true })

        let request = "/assignments/course/" + props.course.id

        req.get(request)
            .then((response) => {
                this.setState({ assignments: response.data, loading: false })
            })
            .catch((error) => {
                console.log(error)
                this.setState({ loading: true, loadingMessage: "Error getting assignments" })
            })


    }


    handleCancel() {
        this.setState({ createModal: false })
    }

    createAssignment() {
        this.setState({ createModal: !this.state.createModal })
    }


    /**
     * Updates the assignment list when a new one has been added or removed
     * @param {Array} newList 
     */
    updateAssignmentsList(newList) {
        console.log("Updating assignment list!")
        this.setState({ assignments: newList, createModal: false })
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

                        this.renderAssignments()
                }

            </div>
        );
    }

    /**
     * 
     */
    renderAssignments() {

        let { assignments, createModal } = this.state
        let { isTeacher } = this.props

        return (
            <div style={{ padding: '15px' }}>


                {
                    isTeacher ?


                        <div>

                            <Button type='primary' onClick={this.createAssignment}>Create New</Button>

                            <Modal title="Create New Assignment"
                                visible={createModal}
                                onOk={this.handleCancel}
                                onCancel={this.handleCancel}
                            >
                                <NewAssignment {...this.props} updateAssignmentsList={this.updateAssignmentsList} />

                            </Modal>


                        </div> : null
                }

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

                            <hr />

                            <List
                                itemLayout="horizontal"
                                grid={{ gutter: 24, xs: 1, sm: 1, md: 1, lg: 1, xl: 1, xxl: 1 }}
                                dataSource={assignments}
                                renderItem={assignment => (
                                    <AssignmentCard course={this.props.course} assignment={assignment} {...this.props} updateAssignmentsList={this.updateAssignmentsList}/>
                                )}
                            />

                        </div>
                }
            </div>
        )
    }

}
