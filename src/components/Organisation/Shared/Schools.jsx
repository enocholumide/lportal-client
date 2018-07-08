import React, { Component } from 'react'
import { Card, List, Modal, Button, Input, Breadcrumb, Divider } from 'antd'
import moment from 'moment'
import axios from 'axios'
import SchoolAdmin from '../Shared/SchoolAdmin'
import Loading from '../../../shared/Loader'
import { apis } from '../../../shared/config'
import { AppContext } from "../../../provider/DataProvider"

const OVERVIEW = 'Overview'
const SCHOOL_VIEW = 'Schools'
//const DEPT_VIEW = 'Departments'
let stateContext = {};
export default class Schools extends Component {

    constructor(props) {
        super(props)

        this.state = {
            createModal: false,
            schools: [],
            view: OVERVIEW,
            breadcrumbs: [OVERVIEW],
            currentSchool: undefined,
            loading: true,
            loadingMessage: "Loading schools..."
        }
    }

    componentDidMount() {

        this.loadOrganisationSchools()
    }

    loadOrganisationSchools() {

        let organisationID = stateContext.state.organisationID

        console.log(stateContext);

        axios.get(apis.organisations + organisationID + "/schools/")
            .then((response) => {
                if (response.status === 200) {
                    this.setState({ schools: response.data, loading: false })
                }
                else {
                    console.log(response)
                    this.setState({ loadingMessage: "Something went wrong ", loading: true })
                }

            })
            .catch((error) => {
                console.log(error)
                this.setState({ loadingMessage: error.toString(), loading: true })
            })
    }

    render() {

        let { breadcrumbs, loading, loadingMessage } = this.state

        if (loading) return (<div><Loading text={loadingMessage} /><AppContext.Consumer>{context => { stateContext = context }}</AppContext.Consumer></div>)

        else

            return (

                <div>

                    <Breadcrumb separator=">" style={{ marginBottom: 10 }}>
                        {
                            breadcrumbs.map(breadcrumb =>
                                <Breadcrumb.Item key={breadcrumb} href="" onClick={() => this.changeViewViaCrumb(breadcrumb)}>{breadcrumb}</Breadcrumb.Item>
                            )
                        }
                    </Breadcrumb>

                    {this.getCurrentView()}

                </div>

            )
    }

    setModal(visiblity) {
        this.setState({ createModal: visiblity });
    }

    createSchool() {

        let { schools } = this.state;
        let value = document.getElementById("newschool").value

        schools.push({ name: value, created: new Date(), departments: [] })
        this.setState({ createModal: false, schools: schools })
    }

    getCurrentView() {

        let { view } = this.state


        switch (view) {

            case OVERVIEW:
                return (
                    this.renderSchoolView()
                )
            case SCHOOL_VIEW:
                return (
                    <SchoolAdmin school={this.state.currentSchool} />
                )
            default:
                return (this.renderSchoolView())
        }
    }

    renderSchoolView() {

        let { schools } = this.state

        return (

            <React.Fragment>

                <Divider orientation="right">Create new <Button type="primary" size="small" onClick={() => this.setModal(true)}>+</Button></Divider>

                <List
                    grid={{ gutter: 16, xs: 1, sm: 1, md: 1, lg: 1, xl: 1, xxl: 1 }}
                    dataSource={schools}
                    renderItem={school => (
                        <List.Item onClick={() => this.gotoSchool(school)} >
                            <Card >
                                <h4>{school.name}</h4>
                            </Card>
                        </List.Item>
                    )}
                />

                <Modal
                    title="Create a new school"
                    wrapClassName="vertical-center-modal"
                    visible={this.state.createModal}
                    onOk={() => this.createSchool()}
                    onCancel={() => this.setModal(false)} >
                    <Input ref="newschool" id="newschool" placeholder="Enter the name of the school" size="large" />
                </Modal>

            </React.Fragment>
        )

    }

    gotoSchool(school) {
        let breadcrumbs = [OVERVIEW, school.name]
        this.setState({ view: SCHOOL_VIEW, currentSchool: school, breadcrumbs: breadcrumbs })
    }

    changeViewViaCrumb(crumb) {
        if (crumb === OVERVIEW)
            this.setState({ breadcrumbs: [OVERVIEW], view: OVERVIEW })
    }

    renderDepartmentView() {

        let departments = this.state.currentSchool.departments;

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
                                <p>Created : {moment(department.created).format("MMMM Do YYYY")}</p>
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

    renderProgramView() {

    }
}

