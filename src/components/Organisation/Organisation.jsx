import React from 'react'
import axios from 'axios'
import { Row, Col, Button, Tabs, Breadcrumb } from 'antd'
import Header from '../../shared/Header/Header'
import { colors, apis } from '../../shared/config'
import { View } from 'react-native-web'
import Overview from './Tabs/Overview'
import Activities from './Tabs/Activities'
import { AppContext } from '../../provider/DataProvider'
import Loading from '../../shared/Loader'
import School from '../../components/School/index'
const TabPane = Tabs.TabPane;

let stateContext = undefined
export default class Organisation extends React.Component {
    constructor(props) {
        super(props)

        this.toggleSchool = this.toggleSchool.bind(this)
        this.updatePath = this.updatePath.bind(this)

        console.log(this.props)

        this.state = {
            id: 1,
            orgranisation: undefined,
            loading: true,
            school: false,
            path: 'Dashboard'
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

        // /api/organisations/1/user/1

        let organisationID = this.props.match.params.id
        let userID = stateContext.state.user.id

        axios.get(apis.organisations + organisationID + "/user/" + userID)
            .then((response) => {
                if (response.status === 200) {
                    console.log(response.data)
                    this.setState({ loading: false, organisation: response.data })
                }
                else
                    console.log(response)
            })
            .then((error) => {
                console.log(error)
            })
    }

    render() {
        let { loading } = this.state

        return (
            <div style={{ backgroundColor: 'white' }}>
                <Header submenu={false} />
                {loading ? <div> <Loading /> <AppContext.Consumer>{context => { stateContext = context }}</AppContext.Consumer></div> : this.renderComponent()}
            </div>
        )
    }

    renderComponent() {

        let { organisation, school } = this.state
        return (
            <div>
                <div style={{ borderBottom: '2px', borderColor: colors.accent }}>
                    <Row >
                        <Col span={16} offset={4} >

                            <View style={{ paddingTop: 25, paddingBottom: 25, alignItems: 'center', flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>

                                <div>
                                    <Breadcrumb separator=">">
                                        <Breadcrumb.Item href="">
                                            <img src={stateContext.state.user.photoUrl} alt="Avatar" style={{ marginRight: '12px', borderRadius: "50%", verticalAlign: 'middle', height: '30px', width: 'auto' }} />
                                            {stateContext.state.user.firstName + " " + stateContext.state.user.lastName}
                                        </Breadcrumb.Item>
                                        <Breadcrumb.Item href="">{organisation.name}</Breadcrumb.Item>
                                        <Breadcrumb.Item href="">{this.state.path}</Breadcrumb.Item>
                                    </Breadcrumb>
                                </div>

                                <div>
                                    <Button type="primary">Add</Button>
                                    <Button style={{ marginLeft: '12px', marginRight: '12px' }}>Create</Button>
                                    <Button type="secondary" onClick={this.toggleSchool} >School</Button>
                                </div>

                            </View>

                        </Col>
                    </Row>
                </div>
                <hr style={{ margin: 0, padding: 0, height: '2px', backgroundColor: colors.accent }} />

                {
                    school ? <School updatePath={this.updatePath} active={this.state.path} /> :


                        <Row>
                            <Col span={16} offset={4} >

                                <Tabs
                                    defaultActiveKey="1"
                                    tabPosition="top"
                                    style={{ padding: 10 }} >
                                    <TabPane tab="Overview" key="1"><Overview organisation={organisation} /></TabPane>
                                    <TabPane tab="Admin" key="2"><Overview organisation={organisation} /></TabPane>
                                    <TabPane tab="Teachers" key="3"><Overview organisation={organisation} /></TabPane>
                                    <TabPane tab="Students" key="4"><Overview organisation={organisation} /></TabPane>
                                    <TabPane tab="Activities" key="5"><Activities organisation={organisation} /></TabPane>
                                    <TabPane tab="Storage" key="6"><Overview organisation={organisation} /></TabPane>
                                    <TabPane tab="Settings" key="8"><Overview organisation={organisation} /></TabPane>
                                </Tabs>

                            </Col>
                        </Row>

                }
            </div>
        )
    }
}