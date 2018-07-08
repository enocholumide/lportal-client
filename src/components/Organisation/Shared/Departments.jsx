import React from 'react'
import { List, Divider, Card, Input, Modal, Button } from 'antd'

export default class Departments extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            createModal: false,
            currentSchool: this.props.school
        }
    }

    render() {

        let { currentSchool } = this.state;
        let departments = currentSchool.departments

        return (

            <React.Fragment>

                <Divider orientation="right">Create new <Button type="primary" size="small" onClick={() => this.setModal(true)}>+</Button></Divider>

                <List
                    grid={{ gutter: 16, xs: 1, sm: 1, md: 1, lg: 1, xl: 1, xxl: 1 }}
                    dataSource={departments}
                    renderItem={department => (
                        <List.Item >
                            <Card >
                                <h4>{department.name}</h4>
                            </Card>
                        </List.Item>
                    )}
                />

                <Modal
                    title="New Department"
                    wrapClassName="vertical-center-modal"
                    visible={this.state.createModal}
                    onOk={() => this.createDepartment()}
                    onCancel={() => this.setModal(false)} >
                    <Input id="newDepartment" placeholder="Enter the name of the new department" size="large" />
                </Modal>

            </React.Fragment>
        )
    }

    createDepartment() {

        let { currentSchool } = this.state
        let value = document.getElementById("newDepartment").value

        

        currentSchool.departments.push({ name: value, created: new Date() })
        this.setState({ createModal: false, currentSchool: currentSchool })
    }

    setModal(visiblity) {
        this.setState({ createModal: visiblity });
    }
}