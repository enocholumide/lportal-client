import React from 'react'
import { Row, Col, List } from 'antd'
import { Avatar, Button } from 'antd';
import Header from '../../shared/Header/Header'
import { colors, apis } from '../../shared/config'
import { View } from 'react-native-web'
import { AppContext } from '../../provider/DataProvider'
import axios from 'axios'

let stateContext = null

export default class Organisations extends React.Component {
    constructor(props) {
        super(props)
        //this.setContext = this.setContext.bind(this)

        this.state = {
            loading: true,
            organisations: []
        }
    }

    componentDidMount() {

        if (stateContext.state.user === undefined) {
           return stateContext.checkAuthorization()
        }

        // If not logged out

        // Proceed to get user organisations

        console.log(stateContext)

        axios.get(apis.organisations + stateContext.state.user.id )
            .then((response) => {
                if (response.status === 200) {
                    this.setState({ organisations: response.data, loading: false })
                }
            })
            .catch((error) => {
                console.log(error.response)
            })
    }

    render() {

        let { loading, organisations } = this.state
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
                <div style={{ backgroundColor: 'white', marginBottom: '100px' }}>

                    <Header submenu={false} />

                    <div style={{ borderBottom: '2px', borderColor: colors.accent }}>
                        <Row >
                            <Col xs={{ span: 24, offset: 0 }} lg={{ span: 16, offset: 4 }} md={{ span: 16, offset: 4 }}>

                                <View style={{ paddingTop: 25, paddingBottom: 25, alignItems: 'center', flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>

                                    <div>
                                        <img src={stateContext.state.user.photoUrl} alt="Avatar" style={{borderRadius: "50%", verticalAlign: 'middle', height: '40px', width: 'auto'}}/>
                                        <label style={{marginLeft: '12px'}}>{stateContext.state.user.firstName + " " + stateContext.state.user.lastName}</label>
                                    </div>

                                    <div>
                                        <Button type="primary">Add</Button>
                                        <Button style={{marginLeft: '12px'}}>Create</Button>
                                    </div>

                                </View>

                            </Col>
                        </Row>
                    </div>
                    <hr style={{ margin: 0, padding: 0, height: '2px', backgroundColor: colors.accent }} />
                    <Row>
                        <Col xs={{ span: 24, offset: 0 }} lg={{ span: 16, offset: 4 }} md={{ span: 16, offset: 4 }}>
                            <List
                                itemLayout="horizontal"
                                dataSource={organisations}
                                renderItem={item => (
                                    <List.Item >
                                        <List.Item.Meta
                                            avatar={<Avatar src={item.organisation.logoUrl} />}
                                            title={<a href={"/organisation/"+item.id}>{item.organisation.name}</a>}
                                        />
                                        <Button type={item.status === "PENDING" ? "danger" : "primary"} >{item.status}</Button>
                                    </List.Item>
                                )}
                            />

                        </Col>
                    </Row>
                </div>
            )
    }


}