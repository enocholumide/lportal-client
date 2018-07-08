import React, { Component } from 'react'
import moment from 'moment'
import { List, Avatar, Icon } from 'antd'
import axios from 'axios'
import { apis } from '../../shared/config'
import Loading from '../../shared/Loader'


const IconText = ({ type, text }) => (
    <span>
        <Icon type={type} style={{ marginRight: 4, marginLeft: 4 }} />
        {text}
    </span>
);

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
                <div style={{ backgroundColor: "white", marginTop: 15 }}>
                    <List.Item
                        actions={[
                            <IconText type="star-o" text={feed.comments.length} />,
                            <IconText type="like-o" text={feed.likes.length} />,
                            <IconText type="message" text={feed.comments.length} />
                        ]}>
                        <div style={{ padding: 15 }}>
                            <span>
                                <Avatar src={feed.applicationUser.photoUrl} size="small" style={{ marginRight: 8 }} />
                                {feed.applicationUser.firstName + " " + feed.applicationUser.lastName}
                            </span>
                            <p style={{ color: 'darkgray', fontSize: 12 }}>{feed.department.name +  " " + moment(feed.created).fromNow()}</p>
                            <h3>{feed.title}</h3>
                            {feed.body}
                        </div>
                        <img width="100%" height={null} alt="" src={feed.photoUrl} style={{ borderRadius: 0 }} />
                    </List.Item>
                </div>

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