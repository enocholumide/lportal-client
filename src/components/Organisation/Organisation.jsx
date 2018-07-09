import React from 'react'
import { View } from 'react-native-web'

import Overview from './Tabs/Overview'
import Admin from './Tabs/Admin'
import Activities from './Tabs/Activities'
import Teachers from './Tabs/Teachers'
import Storage from './Tabs/Storage'

import School from '../../components/School/index'

import Header from '../../shared/Header/Header'
import { colors } from '../../shared/config'
import { AppContext } from '../../provider/DataProvider'
import Loading from '../../shared/Loader'
import req from '../../shared/axios/requests'

import { Row, Col, Button, Tabs, Breadcrumb } from 'antd'
const TabPane = Tabs.TabPane;

let STATE_CONTEXT = undefined
export default class Organisation extends React.Component {
    constructor(props) {
        super(props)

        this.updatePath = this.updatePath.bind(this)
        this.onTabChange = this.onTabChange.bind(this)

        this.state = {
            id: 1,
            orgranisation: undefined,
            loading: true,
            school: true,
            path: 'Courses',
            activeKey: "Overview"
        }
    }


    async componentDidMount() {
        await this.getOrganisation();
    }

    toggleSchool() {
        this.setState({ school: !this.state.school })
    }

    updatePath(path) {
        this.setState({ path: path })
    }

    getOrganisation() {

        let organisationID = this.props.match.params.id
        let userID = STATE_CONTEXT.state.user.id

        STATE_CONTEXT.setOrganisation(organisationID);

        req.get("/organisations/" + organisationID + "/user/" + userID)
            .then((response) => {
                if (response.status === 200) {
                    let organisation = response.data;
                    let isAdmin = organisation.roles.includes("ADMIN")
                    this.setState({ loading: false, organisation: organisation, school: !isAdmin })
                    STATE_CONTEXT.setOrganisation(organisation.id);
                }
                else
                    console.log(response)
            })
            .catch((error) => {
                console.log(error.response)
            })
    }

    onTabChange = (activeKey) => {
        this.setState({ activeKey });
    }

    render() {
        let { loading } = this.state

        return (
            <div style={{ backgroundColor: 'white' }}>
                <Header submenu={false} />
                {loading ? <div> <Loading /> <AppContext.Consumer>{context => { STATE_CONTEXT = context }}</AppContext.Consumer></div> : this.renderComponent()}
            </div>
        )
    }

    renderComponent() {

        let { organisation, school } = this.state

        let isAdmin = organisation.roles.includes("ADMIN")

        return (
            <div>
                <div style={{ borderBottom: '2px', borderColor: colors.accent }}>
                    <Row >
                        <Col md={{ span: 24, offset: 0 }} lg={{ span: 16, offset: 4 }} >

                            <View style={{ paddingTop: 25, paddingBottom: 25, alignItems: 'center', flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>

                                <div>
                                    <Breadcrumb separator=">">
                                        <Breadcrumb.Item href="/organisations">
                                            <img src={STATE_CONTEXT.state.user.photoUrl} alt="Avatar" style={{ marginRight: '12px', borderRadius: "50%", verticalAlign: 'middle', height: '30px', width: 'auto' }} />
                                            {STATE_CONTEXT.state.user.firstName + " " + STATE_CONTEXT.state.user.lastName}
                                        </Breadcrumb.Item>
                                        <Breadcrumb.Item href={"/organisation/" + STATE_CONTEXT.state.organisationID} >{organisation.name}</Breadcrumb.Item>
                                    </Breadcrumb>
                                </div>

                                <div>
                                    <Button disabled type="primary">Add</Button>
                                    <Button disabled style={{ marginLeft: '12px' }}>Create</Button>
                                    {
                                        isAdmin ?

                                            <Button
                                                style={{ marginLeft: '12px' }}
                                                type={this.state.school ? "primary" : "secondary"}
                                                onClick={() => this.toggleSchool()}>
                                                {this.state.school ? "Admin" : "School"}
                                            </Button>

                                            : null
                                    }
                                </div>

                            </View>

                        </Col>
                    </Row>
                </div>
                <hr style={{ margin: 0, padding: 0, height: '2px', backgroundColor: colors.accent }} />

                {
                    school ?

                        <School updatePath={this.updatePath} active={this.state.path} organisationID={STATE_CONTEXT.state.organisationID} context={STATE_CONTEXT} />

                        :

                        <Row>
                            <Col md={{ span: 24, offset: 0 }} lg={{ span: 16, offset: 4 }} >

                                <Tabs
                                    tabPosition="top"
                                    onChange={this.onTabChange}
                                    defaultActiveKey={this.state.activeKey}
                                    activeKey={this.state.activeKey}
                                    style={{ padding: 10 }} >
                                    <TabPane tab="Overview" key="Overview"><Overview organisation={organisation} onTabChange={this.onTabChange} /></TabPane>
                                    <TabPane tab="Admin" key="Admin"><Admin organisation={organisation} onTabChange={this.onTabChange} /></TabPane>
                                    <TabPane tab="Teachers" key="Teachers"><Teachers organisation={organisation} context={STATE_CONTEXT} onTabChange={this.onTabChange} /></TabPane>
                                    <TabPane tab="Activities" key="Activities"><Activities organisation={organisation} onTabChange={this.onTabChange} /></TabPane>
                                    <TabPane tab="Storage" key="Storage"><Storage organisation={organisation} onTabChange={this.onTabChange} /></TabPane>
                                    <TabPane tab="Settings" key="Settings"><Overview organisation={organisation} onTabChange={this.onTabChange} /></TabPane>
                                </Tabs>
                            </Col>
                        </Row>

                }
            </div>
        )
    }
}