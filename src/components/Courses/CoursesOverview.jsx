import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import { colors, apis } from '../../shared/config';
import HeaderNavigator from '../../shared/Header/Header';
import { List, Image, Message } from 'semantic-ui-react'
import { View, ScrollView } from 'react-native-web';
import { Link } from 'react-router-dom';
import axios from 'axios'
import moment from 'moment'
import Loading from "../../shared/Loader";
import MediaQuery from 'react-responsive';

export default class CoursesOverview extends Component {

    constructor(props) {
        super(props)
        this.state = {
            courses: [],
            loading: true,
            loadingMessage: "Loading content from server..."
        }
    }


    async componentDidMount() {
        await this.loadCourses();
    }

    loadCourses() {

        axios.get(apis.courses)
            .then((response) => {
                this.setState({ loading: false, courses: response.data })
            })
            .catch((error) => {
                console.log(error)
                this.setState({ loading: true, loadingMessage: "Error: Cannot load content from server, please try again" })
            })
    }


    render() {

        return (
            <div style={{ backgroundColor: colors.mute }}>
                <HeaderNavigator activeIndex={6} />

                <h2 style={{ margin: 20 }}>Overview</h2>

                <MediaQuery maxDeviceWidth={768}>

                    <Container style={{ marginTop: 50, width: "100%" }}>
                        {this.renderMainContent()}
                    </Container>

                </MediaQuery>

                <MediaQuery minDeviceWidth={769}>

                    <Row>

                        <Col lg="4" xs="3" sm="3" style={{ backgroundColor: colors.mute }}>
                        </Col>

                        <Col lg="4" xs="6" sm="6" style={{ backgroundColor: "white", padding: 10 }}>
                            {this.renderMainContent()}
                        </Col>

                        <Col lg="4" xs="3" sm="3" style={{ backgroundColor: colors.mute }}>
                        </Col>

                    </Row>
                </MediaQuery>
            </div>
        )
    }

    renderMainContent() {

        let { loading, loadingMessage } = this.state;
        return (
            <div>
                {
                    loading ?

                        <div style={{ height: 500 }}>

                            <Loading text={loadingMessage} />

                        </div>


                        : this.renderContent()
                }

            </div>
        )
    }

    renderContent() {

        let { courses } = this.state;

        return (
            <div style={{ backgroundColor: 'white', }}>

                {

                    courses.length < 1 ?

                        <Message
                            error
                            icon='question'
                            header='No course found'
                            content='You have not been enrolled in any course. Please contact admin or request to join a course'
                        />

                        :

                        <List divided relaxed>
                            {
                                courses.map((course, index) =>

                                    <List.Item key={index} style={{ padding: 15 }}>
                                        <List.Icon name='github' size='large' verticalAlign='top' />
                                        <List.Content>
                                            <List.Header as={Link} to={'/course/' + course.id} key='course'>{course.name} ({course.code})</List.Header>
                                            <List.Description
                                                style={{ marginTop: 10, marginBottom: 10 }} >
                                                Registration deadline : {moment(new Date()).format("MMMM Do YYYY")}
                                            </List.Description>
                                            <ScrollView
                                                horizontal
                                                showsHorizontalScrollIndicator={false}
                                                showsVerticalScrollIndicator={false}>
                                                <View key={index} style={{ flexDirection: 'row' }}>

                                                    {
                                                        course.lecturers.map((lecturer, index) =>

                                                            <span className="floated" key={index}>
                                                                <Image src={lecturer.photoUrl} avatar />
                                                                {lecturer.firstName.charAt(0).toUpperCase() + ". " + lecturer.lastName}
                                                            </span>

                                                        )
                                                    }
                                                </View>
                                            </ScrollView>
                                        </List.Content>
                                    </List.Item>
                                )
                            }
                        </List>

                }



            </div>

        )
    }
}