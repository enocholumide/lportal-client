import React, { Component } from 'react';
import { Icon, Accordion, List, Image } from 'semantic-ui-react';
import { View } from 'react-native-web';
import { colors } from '../../shared/appStyles';

class Person extends Component {

    constructor(props) {
        super(props);
        this.state = {
            activeIndex: 0,
            showMore: false
        }
    }

    handleClick = (e, titleProps) => {
        const { index } = titleProps
        const { activeIndex } = this.state
        const newIndex = activeIndex === index ? -1 : index

        this.setState({ activeIndex: newIndex })
    }


    render() {

        let person = this.props.person;

        return (
            <div>
                <View style={{ borderRadius: 3, borderWidth: 1, padding: 15, borderColor: colors.muteColor, backgroundColor: person.role === "STAFF" ? colors.muteColor : "white" }}>
                    <View style={{ flexDirection: 'row', flex: 1, justifyContent: "space-between", alignItems: "center" }}>
                        <View style={{ flexDirection: 'row', marginVertical: 10 }}>

                            <Image avatar src={person.photoUrl} />
                            <List.Content>
                                <List.Header as='a'>{person.firstName + " " + person.lastName}</List.Header>
                                <List.Description>{person.department.name}</List.Description>
                            </List.Content>

                        </View>

                        <Icon name={this.state.showMore ? "caret up" : "caret down"} onClick={()=> this.setState({showMore: !this.state.showMore})} />

                    </View>

                    {
                        this.state.showMore ?

                            this.showMoreDetails()

                            :

                            null

                    }
                </View>


            </div>
        );
    }

    showMoreDetails = () => {

        let activeIndex = this.state.activeIndex;

        return (

            <View style={{ marginVertical: 10 }}>
                <List.Content >
                    <Accordion fluid styled>
                        <Accordion.Title active={activeIndex === 0} index={0} onClick={this.handleClick}>
                            <Icon name='dropdown' />
                            Contact
            </Accordion.Title>
                        <Accordion.Content active={activeIndex === 0}>
                            <p>Faculty of Engineering</p>
                            <p>Building 984</p>
                        </Accordion.Content>

                        <Accordion.Title active={activeIndex === 1} index={1} onClick={this.handleClick}>
                            <Icon name='dropdown' />
                            Courses
            </Accordion.Title>
                        <Accordion.Content active={activeIndex === 1}>
                            <List>
                                <List.Item>
                                    <p>Surveying and Geoinformatics B304</p>
                                    <p>Surveying and Geoinformatics B304</p>
                                    <p>Surveying and Geoinformatics B304</p>
                                    <p>Surveying and Geoinformatics B304</p>
                                    <p>Surveying and Geoinformatics B304</p>
                                </List.Item>
                            </List>
                        </Accordion.Content>
                    </Accordion>
                </List.Content>

            </View>
        )
    }
}

export default Person;
