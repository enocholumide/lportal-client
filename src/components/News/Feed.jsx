import React, { Component } from 'react';
import { Card, Image, List, Feed, Form, Button } from 'semantic-ui-react';
import moment from 'moment';
import { View, TouchableOpacity } from 'react-native-web';
import axios from 'axios'

class Feeds extends Component {

    constructor(props) {
        super(props)

        this.state = {
            showComment: false,
            reply: '',
            events: this.mapCommentsToEvents(this.props.feed.comments),
            feed: this.props.feed,
            submited : false
        }
    }

    render() {

        let feed = this.state.feed

        return (
            <Card style={{ flex: 1, width: '100%' }}>
                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', padding: 10 }}>
                    <List>
                        <List.Item>
                            <Image avatar src={feed.user.photoUrl} />
                            <List.Content>
                                <List.Header as='a'>{feed.user.firstName + " " + feed.user.lastName}</List.Header>
                                <List.Description>{feed.user.department.name}</List.Description>
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
                                        onChange={(event, data) => this.state.reply = data.value} />
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

    addReplyToPost = (feed) => {

        if (this.state.reply.length > 0) {

            var currentUser = 2

            axios
                .put(
                    "http://localhost:8080/api/news/comments/" + feed.id + "/add/user/ " + currentUser,
                    {
                        text: this.state.reply
                    }
                )
                .then((response) => {
                    
                    var updatedFeed = response.data;
                    this.setState({ events: this.mapCommentsToEvents(updatedFeed.comments), feed: updatedFeed, reply: '' })
                    console.log(this.formArea)
                });

        }
    }

    mapCommentsToEvents = (comments) => {
        let events = []
        for (let comment of comments) {
            events.push(
                {
                    date: moment(comment.created).fromNow(),
                    image: comment.user.photoUrl,
                    summary: comment.user.firstName + " " + comment.user.lastName,
                    extraText: comment.text,
                    extraImages: comment.extraImages.length > 0 ? comment.extraImages.split("&") : [],

                }
            )
        }

        return events
    }
}

export default Feeds;