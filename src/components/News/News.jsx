import React, { Component } from 'react'
import { Dropdown } from 'semantic-ui-react'
import { Alert, List } from 'antd'
import Loading from "../../shared/Loader"
import Feed from './Feed'
import req from '../../shared/axios/requests'


class News extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isLoading: true,
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

        let { isLoading } = this.state;

        if (isLoading)
            return (<Loading text={this.state.loadingMessage} />)

        else
            return (<div> {this.renderMainContent()} </div>);
    }

    renderMainContent = () => {
        return (
            <div>
                <Dropdown
                    placeholder='Filter news by department'
                    fluid multiple search selection
                    options={this.state.schools}
                //onChange={(event, data) => this.filterNews(data.value)}
                />

                {this.renderFeeds()}
            </div>
        )
    }

    /**
     * Loads the data from the server
     */
    loadDataFromServer = () => {

        let orgID = this.props.organisationID;

        let schoolsRequest = "/organisations/" + orgID + "/schools";
        let newsRequest = "/organisations/" + orgID + "/news";

        req.get(schoolsRequest)
            .then((response) => {
                if (response.status === 200) {
                    this.setState(
                        {
                            schools: this.formatSchoolsAPIData(response.data),
                        });
                }
                else
                    console.log(response)
            })
            .catch((error) => {
                console.log(error)
                this.setState({ isLoading: true, loadingMessage: error.toString() })
            })

        req.get(newsRequest)
            .then((response) => {
                if (response.status === 200) {
                    this.setState(
                        {
                            news: response.data,
                            news_reserved: response.data,
                            isLoading: false,
                        });
                }
                else
                    console.log(response)
            })
            .catch((error) => {
                console.log(error)
                this.setState({ isLoading: true, loadingMessage: error.toString() })
            })

        /** 

        req.all(
            [
                req.get(schoolsRequest),
                req.get(newsRequest)
            ])
            .then(req.spread((schoolsResponse, newsResponse) => {

                this.setState(
                    {
                        schools: this.formatSchoolsAPIData(schoolsResponse.data),
                        news: newsResponse.data,
                        news_reserved: newsResponse.data,
                        isLoading: true,
                        feedIsReady: true
                    });

            }))
            .catch(error => {
                this.setState({isLoading: false, loadingMessage: error.toString()})
                console.log(error)
            })

            */
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
            
            this.state.news.push(this.state.news[0]);

            return (

                <div >

                    <List
                        itemLayout="vertical"
                        size="large"
                        dataSource={this.state.news}
                        renderItem={(feed, index) => (

                            <Feed feed={feed} key={index} />


                        )}
                    />

                    {
                        /**
                         this.state.news.map((feed, index) =>
    
                        <Feed feed={feed} key={index} />
    
                     )
                         */
                    }

                </div>

            )
        } else {
            return (
                <Alert
                    message="No feed found"
                    description="No feed found at this time, please check again later "
                    type="info"
                    showIcon
                    style={{ marginBottom: '24px', marginTop: '24px' }}
                />

            )
        }
    }
}

export default News;