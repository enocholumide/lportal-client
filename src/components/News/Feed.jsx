import React, { Component } from 'react';
import { Card, Image, List, Feed, Form, Button } from 'semantic-ui-react';
import moment from 'moment';
import { View, TouchableOpacity } from 'react-native-web';
import axios from 'axios'
import { apis } from '../../shared/config'
import Loading from '../../shared/Loader'

class Feeds extends Component {

    constructor(props) {
        super(props)

        this.state = {
            showComment: false,
            reply: '',
            events: this.mapCommentsToEvents(this.props.feed.comments),
            feed: this.props.feed,
            submited: false,
            loading: true
        }
    }

    componentDidMount() {
        setTimeout(() => this.setState({ loading: false }), 200)
    }

    render() {

        let { feed, loading } = this.state

        if (loading) {
            return (
                <Loading text=".." />
            )
        }

        else

            return (
                <Card style={{ flex: 1, width: '100%' }}>
                    <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', padding: 10 }}>
                        <List>
                            <List.Item>
                                <Image avatar src={feed.applicationUser.photoUrl} />
                                <List.Content>
                                    <List.Header as='a'>{feed.applicationUser.firstName + " " + feed.applicationUser.lastName}</List.Header>
                                    <List.Description>{feed.applicationUser.department.name}</List.Description>
                                </List.Content>
                            </List.Item>
                        </List>
                        <Card.Meta>
                            {moment(feed.created).fromNow()}
                        </Card.Meta>
                    </View>

                    <Card.Content>

                        <Card.Header>
                            {feed.title}
                        </Card.Header>

                        <Card.Description>
                            {feed.body}
                        </Card.Description>

                    </Card.Content>

                    <Card.Content style={{ padding: 0, margin: 0 }}>

                        <Image
                            style={{ width: null, flex: 1 }}
                            src={feed.photoUrl} />

                    </Card.Content>

                    <Card.Content>
                        <Card.Meta>
                            {feed.likes.length} {<i className="like icon"></i>}
                            {feed.comments.length} {<i className="comments icon"></i>}
                            0 {<i className="share icon"></i>}
                        </Card.Meta>
                    </Card.Content>

                    <Card.Content >

                        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>

                            <span className="floated">
                                <i className="like icon"></i>Like
                    </span>
                            <TouchableOpacity onPress={() => this.setState({ showComment: !this.state.showComment })}>
                                <span className="floated">
                                    <i className="comments icon"></i>Comment
                    </span>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => alert("pressed me")}>
                                <span className="floated">
                                    <i className="share icon"></i>Share
                    </span>
                            </TouchableOpacity>
                        </View>

                        {
                            this.state.showComment ?

                                <div>
                                    <Feed events={this.state.events} />

                                    <Form reply>
                                        <Form.TextArea
                                            onChange={this.handleFormChange.bind(this)} />
                                        <Button content='Add Reply' labelPosition='left' icon='edit' primary onClick={() => this.addReplyToPost(feed)} />
                                    </Form>
                                </div>

                                :

                                null
                        }
                    </Card.Content>


                </Card>
            );
    }

    handleFormChange = (event, data) => {

        //event.preventDefault()
        this.setState({ reply: data.value })
        //event.preventDefault()

        // this.state.reply = data.value

    }

    addReplyToPost = (feed) => {

        if (this.state.reply.length > 0) {

            let currentapplicationUser = 2

            // /api/news/{news_id}/comments/add/applicationUser/{user_id}

            let reply = "" + apis.news + feed.id + "/comments/add/applicationUser/" + currentapplicationUser

            axios
                .put(reply,
                    {
                        text: this.state.reply
                    }
                )
                .then((response) => {

                    let updatedFeed = response.data;
                    this.setState({ events: this.mapCommentsToEvents(updatedFeed.comments), feed: updatedFeed, reply: '' })
                });

        }
    }

    mapCommentsToEvents = (comments) => {
        let events = []
        for (let comment of comments) {
            events.push(
                {
                    date: moment(comment.created).fromNow(),
                    image: comment.applicationUser.photoUrl,
                    summary: comment.applicationUser.firstName + " " + comment.applicationUser.lastName,
                    extraText: comment.text,
                    extraImages: comment.extraImages.length > 0 ? comment.extraImages.split("&") : [],

                }
            )
        }

        return events
    }
}

export default Feeds;