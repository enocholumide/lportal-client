import React, { Component } from 'react';
import HeaderNavigator from '../../shared/Header/Header'
import { Dropdown, Container } from 'semantic-ui-react';
import axios from 'axios'
import { View } from 'react-native-web'
import { Row, Col } from 'reactstrap';
import { colors } from '../../shared/appStyles';
import Loading from "../../shared/Loader";
import Feed from './Feed'
import { apis } from '../../shared/config'

class News extends Component {

    constructor(props) {
        super(props);

        this.state = {
            dataIsReady: false,
            news: [],
            news_reserved: [],
            schools: [],
            loadingMessage: "Getting content from server..."
        }
    }

    async componentDidMount() {

        await this.loadDataFromServer();

    }

    render() {

        return (

            <div>
                <HeaderNavigator activeIndex={1} />

                {
                    this.state.dataIsReady ? 
                    
                        this.renderComponent() 
                    
                        :

                        <Loading text={this.state.loadingMessage}/>
                }

            </div>
        );
    }

    renderComponent = () => {

        return (

            <div>

                <Row>
                    <Col lg="4" xs="3" sm="3" style={{ backgroundColor: colors.muteColor }}>


                        <View style={{ flex: 1, flexDirection: 'row', padding: 10 }}>

                            <p>col-sm-4</p>

                        </View>


                    </Col>
                    <Col lg="4" xs="6" sm="6" style={{ backgroundColor: "white", padding:10 }}>

                        <Dropdown
                            placeholder='Filter news by department'
                            fluid multiple search selection
                            options={this.state.schools}
                            //onChange={(event, data) => this.filterNews(data.value)}
                        /> 

                        {
                            this.state.feedIsReady ?


                                this.renderFeeds()

                                :

                                <Loading text={"Refreshing feeds"}/>

                        }

                    </Col>
                    <Col lg="4" xs="3" sm="3" style={{ backgroundColor: colors.muteColor }}>
                    
                    
                    
                    .col-sm-4
                    
                    
                    </Col>
                </Row>

            </div>
        );
    }

    /**
     * Loads the data from the server
     */
    loadDataFromServer = () => {

        let schoolsRequest = apis.schools;
        let newsRequest = apis.news

        axios.all(
            [
                axios.get(schoolsRequest),
                axios.get(newsRequest)
            ])
            .then(axios.spread((schoolsResponse, newsResponse) => {

                this.setState(
                    {
                        schools: this.formatSchoolsAPIData(schoolsResponse.data),
                        news: newsResponse.data,
                        news_reserved: newsResponse.data,
                        dataIsReady: true,
                        feedIsReady: true
                    });

            }))
            .catch(error => console.log(error))
    }

    /**
     * Format the API reponse to match the drop down options from semantic ui
     */
    formatSchoolsAPIData = (schools) => {

        var schoolsFormatted = []
        for (let school of schools) {
            schoolsFormatted.push({ key: school.id, value: school.id, text: school.name })
        }

        return schoolsFormatted;

    }

    /**
     * Filter the news feed 
     * @param values : Values from the dropdown list.
     */
    filterNews = (values) => {

        this.setState({ feedIsReady: false });

        var filteredNews = [];

        if (values.length > 0) {

            for (let feed of this.state.news_reserved) {

                for (var i = 0; i < values.length; i++) {

                    if (feed.applicationUser.school.id === values[i]) {
                        filteredNews.push(feed)
                    }
                }

            }

            this.setState({ news: filteredNews, feedIsReady: true });

        } else {
            this.loadDataFromServer();
        }
    }


    renderFeeds = () => {

        if (this.state.news.length > 0) {

            return (
                this.state.news.map((feed, index) =>

                   <Feed feed={feed} key={index}/>

                )
            )
        } else {
            return (
                <Container style={{ flex: 1 }}>
                    <h2>No feeds found</h2>
                </Container>

            )
        }
    } 
}

export default News;