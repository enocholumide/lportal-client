import React from 'react'
import { Message } from 'semantic-ui-react'
import Loading from "../../../shared/Loader"
import req from '../../../shared/axios/requests'
import { List, Avatar, Popconfirm, Button } from 'antd'

export default class CourseStudents extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            students: [],
            loading: true
        }

    }

    async componentDidMount() {
        await this.loadStudents(this.props);
    }

    async componentWillReceiveProps(nextProps) {
        await this.loadStudents(nextProps);
    }

    loadStudents(props) {

        this.setState({ loading: true })

        let request = "/courses/" + props.course.id + "/students"

        req.get(request)
            .then((response) => {
                this.setState({ students: response.data, loading: false })

            })
            .catch((error) => {
                console.log(error)
            })
    }

    render() {

        let { students, loading } = this.state

        let { isTeacher } = this.props

        console.log(students)

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

                                <List
                                    grid={{ gutter: 16, column: 3 }}
                                    dataSource={students}
                                    renderItem={student => (
                                        <List.Item actions={isTeacher ?
                                            [
                                                <Popconfirm title="Remove student ?" onConfirm={() => this.onRemoveStudent(student)} okText="Yes" cancelText="No">
                                                    <Button type="danger" shape="circle" icon="close" size="small" />
                                                </Popconfirm>
                                            ] : []}
                                            style={{ backgroundColor: 'white', padding: '15px', boxShadow: '2px 2px 1px #888888' }}>
                                            <List.Item.Meta style={{ alignItems: 'center' }}
                                                avatar={<Avatar src={student.photoUrl} size='large' />}
                                                title={<div><h4 style={{ fontWeight: 'bold' }}>{student.firstName + " " + student.lastName.charAt(0) + "."}</h4></div>}
                                            />
                                        </List.Item>
                                    )}
                                />


                            </div>
                }

            </div>
        );
    }

    onRemoveStudent() {

    }

}
