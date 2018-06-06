import React, { Component } from 'react';
import { List, Image } from 'semantic-ui-react';
import { View, ScrollView } from 'react-native-web';
import moment from 'moment'

class LectureCard extends Component {

    render() {

        let lecture = this.props.lecture

        return (
            <div>
                <List.Item>

                    <View style={{ flex: 1, flexDirection: 'column', padding: 20, borderColor: 'lightgray', borderWidth: 1, marginVertical: 10 }}>

                        <p style={{ color: 'lightgray', margin: 0, fontWeight: 'bold', fontSize: 14 }}>{lecture.code}</p>
                        <p style={{ fontSize: 18, margin: 0, fontWeight: 'bold' }}>{lecture.name}</p>
                        <div style={{ marginTop: 10, marginBottom: 10 }}>
                            {
                                lecture.schedules.map((schedule, index) =>
                                    <List divided key={index}>
                                        <List.Item >
                                            <span className="floated" >
                                                <i className="calendar icon" style={{ color: 'darkgray' }}></i>
                                                {moment(schedule.start).format("ddd").toString() + ". " +
                                                    "(" + schedule.period + ") " +
                                                    moment(schedule.start).format("HH:mm").toString() + " : " +
                                                    moment(schedule.end).format("HH:mm").toString()
                                                }
                                            </span>
                                        </List.Item>
                                    </List>
                                )
                            }
                        </div>

                        <ScrollView
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            showsVerticalScrollIndicator={false}>
                            {
                                lecture.lecturers.map((lecturer, index) =>

                                    <View key={index} style={{ marginHorizontal: index > 0 ? 10 : 0 }}>

                                        <span className="floated">
                                            <Image src={lecturer.photoUrl} avatar />
                                            {lecturer.firstName.charAt(0).toUpperCase() + ". " + lecturer.lastName}
                                        </span>

                                    </View>
                                )
                            }
                        </ScrollView>

                    </View>
                </List.Item>
            </div>
        );
    }
}

export default LectureCard;
