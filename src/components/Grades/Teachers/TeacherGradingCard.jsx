import React, { Component } from 'react'
import axios from 'axios'
import { apis } from '../../../shared/config'
import { List, Avatar, Button, Spin, Alert, InputNumber, Table } from 'antd';

class TeacherGradingCard extends Component {

    constructor(props) {
        super(props)

        this.toggleShow = this.toggleShow.bind(this)

        this.state = {
            showStudents: false,
            registrationIDs: [],
            loadingMessage: "Loading students.."
        }
    }

    async componentDidMount() {
        await this.loadCourseStudents();
    }


    render() {

        let { course } = this.props
        let { showStudents } = this.state

        return (


            <div>
                <List.Item actions={[<Button type="primary" shape="circle" icon="edit" size="small" onClick={this.toggleShow} />]}>
                    <List.Item.Meta
                        avatar={<Avatar src="https://cdn.icon-icons.com/icons2/1194/PNG/512/1490886349-11-writing-board_82501.png" />}
                        title={<a href="https://ant.design">{course.name} {course.code}</a>}
                        description={course.session}
                    />
                </List.Item>

                {
                    showStudents ? this.showStudentsList() : null
                }

            </div>

        )

    }

    onGradeChange(v) {
       // console.log(v)

    }

    showStudentsList() {

        let { loading, loadingMessage, registrationIDs } = this.state

        const columns = [
            { title: 'Last Name', dataIndex: 'lastName', key: 'lastName', },
            { title: 'ID', dataIndex: 'registrationID', key: 'registrationID', },
            { title: 'Grade', dataIndex: '', key: 'x', render: () => <InputNumber min={0} max={100} defaultValue={0} onChange={this.onGradeChange.bind(this)} /> },
        ];

        return (
            <div>
                {loading ?

                    <div style={{ padding: 80, textAlign: 'center' }}>
                        <Spin size="small" tip={loadingMessage} />
                    </div>

                    :

                    (registrationIDs.length) > 0 ?

                        <div>

                            <Table
                                dataSource={this.state.registrationIDs}
                                columns={columns} rowKey="id"
                                pagination={{ pageSize: 10 }}
                            /> 
                            <Button onClick={this.saveChanges()} type="primary" style={{ marginBottom: 16 }}>Save</Button>
                        </div> :

                        <Alert message="No students found at this time, check again" type="info" showIcon />
                }

            </div>

        )
    }

    saveChanges(){

    }


    loadCourseStudents() {

        axios.get(apis.courses + this.props.course.id + "/students")
            .then((response) => {
                if (response.status === 200) {
                    this.setState({ loading: false, registrationIDs: response.data })
                }
            })
            .catch((error) => {
                this.setState({ loading: true, loadingMessage: "Cannot get students registration number" })
            })

    }


    toggleShow() {

        this.setState({ showStudents: !this.state.showStudents })

    }
}

export default TeacherGradingCard;
