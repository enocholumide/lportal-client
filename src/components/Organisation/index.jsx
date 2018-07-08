import React from 'react'
import { Button, Row, Col, List, Modal, Input, Alert, Avatar, Tag } from 'antd'
import Header from '../../shared/Header/Header'
import { colors, apis } from '../../shared/config'
import { View } from 'react-native-web'
import { AppContext } from '../../provider/DataProvider'
import axios from 'axios'
import req from '../../shared/axios/requests'

let stateContext = null

export default class Organisations extends React.Component {
    constructor(props) {
        super(props)
        //this.setContext = this.setContext.bind(this)

        this.state = {
            loading: true,
            organisations: [],
            createModal: false,
            createError: '',
        }
    }

    componentDidMount() {

        if (stateContext.state.user === undefined) {
            // return stateContext.checkAuthorization()
        }

        // If not logged out

        // Proceed to get user organisations

        axios.get(apis.organisations + stateContext.state.user.id)
            .then((response) => {
                if (response.status === 200) {
                    this.setState({ organisations: response.data, loading: false })
                    console.log(response.data)
                }
            })
            .catch((error) => {
                console.log(error)
                error.response && console.log(error.response)
            })
    }

    render() {

        let { loading, organisations, createError } = this.state

        if (loading) {

            return (
                <AppContext.Consumer>
                    {context => {
                        stateContext = context
                    }}
                </AppContext.Consumer>
            )
        }
        else
            return (
                <div style={{ backgroundColor: 'white', paddingBottom: '100px' }}>

                    <Header submenu={false} />

                    <div style={{ borderBottom: '2px', borderColor: colors.accent, backgroundColor: 'white' }}>
                        <Row >
                            <Col md={{ span: 24, offset: 0 }} lg={{ span: 16, offset: 4 }} >

                                <View style={{ paddingTop: 25, paddingBottom: 25, alignItems: 'center', flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>

                                    <div>
                                        <img src={stateContext.state.user.photoUrl} alt="Avatar" style={{ borderRadius: "50%", verticalAlign: 'middle', height: '40px', width: '40px' }} />
                                        <label style={{ marginLeft: '12px' }}>{stateContext.state.user.firstName + " " + stateContext.state.user.lastName}</label>
                                    </div>

                                    <div>
                                        <Button type="primary">Add</Button>
                                        <Button style={{ marginLeft: '12px' }} onClick={() => this.setModal(true)}>Create</Button>
                                    </div>

                                </View>

                            </Col>
                        </Row>
                    </div>
                    <hr style={{ margin: 0, padding: 0, height: '2px', backgroundColor: colors.accent }} />
                    <Row>
                        <Col md={{ span: 24, offset: 0 }} lg={{ span: 16, offset: 4 }} >
                            <List
                                itemLayout="horizontal"
                                dataSource={organisations}
                                renderItem={item => (

                                    <div>

                                        <View style={{ marginTop: 15, padding: 0, alignItems: 'center', flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>

                                            <div>
                                                <Avatar shape="square" src={item.organisation.logoUrl} size="large">{item.organisation.logoUrl ? null : item.organisation.name.charAt(0).toUpperCase()}
                                                </Avatar>
                                                <a style={{ marginLeft: '12px' }} href={"/organisation/" + item.organisation.id}>{item.organisation.name}</a>
                                            </div>

                                            <div>
                                                {
                                                    item.roles.map((role, index) =>
                                                        <Tag
                                                            color={role === "ADMIN" ? "#f50" : role === "TEACHER" ? "#2db7f5" : "#87d068"}
                                                            key={index}>
                                                            {role}
                                                        </Tag>)
                                                }
                                                <Button type={item.status === "PENDING" ? "danger" : "primary"} >{item.status}</Button>

                                            </div>
                                        </View>
                                        <hr />
                                    </div>
                                )}
                            />

                        </Col>
                    </Row>

                    <Modal
                        title="New Organisation"
                        wrapClassName="vertical-center-modal"
                        visible={this.state.createModal}
                        onOk={() => this.createOrganisation()}
                        onCancel={() => this.setModal(false)} >
                        {
                            createError.length > 0 ?

                                <Alert message={createError.toString()} type="error" showIcon style={{ marginBottom: '24px' }} /> : null
                        }
                        <Input id="newOrganisation" placeholder="Enter the name of the new organisation" size="large" />
                    </Modal>
                </div>
            )
    }

    setModal(visiblity) {
        this.setState({ createModal: visiblity });
    }

    createOrganisation() {

        let userID = stateContext.state.user.id
        let value = document.getElementById("newOrganisation").value

        req.put("/organisations/user/" + userID + "/create", { name: value })
            .then((response) => {
                if (response.status === 200) {
                    this.setState({ organisations: response.data, loading: false, createModal: false, createError: "" })
                }
                else {
                    console.log(response)
                }
            })
            .catch((error) => {
                console.log(error)
                if (error.response) {
                    this.setState({ createError: error.response.data })
                }
            })

    }
}