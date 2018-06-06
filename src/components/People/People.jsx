import React, { Component } from 'react';
import Header from '../../shared/Header/Header';
import Loader from '../../shared/Loader';
import { Row, Col } from 'reactstrap';
import { View } from 'react-native-web';
import { colors } from '../../shared/appStyles';
import { Dropdown, List, Checkbox } from 'semantic-ui-react';
import axios from "axios";
import Person from './Person'

class People extends Component {

    constructor(props) {
        super(props)

        this.state = {
            peopleListIsReady: true,
            loadingMessage: "Getting people list from server ...",
            peopleList: [],
            searchQuery: "",
            showStaffs: true,
            showStudents: false
        }
    }

    async componentDidMount() {
        await this.loadPeopleFromServer();
    }

    render() {
        return (
            <div>
                <Header activeIndex={2} />
                {
                    this.state.peopleListIsReady ?

                        this.renderComponent()

                        :

                        <Loader text={this.state.loadingMessage} />

                }
            </div>
        );
    }

    /**
     * After neccessary checks and data have been retrieved from the server,
     * this function will proceed to render the contents of the compoent
     */
    renderComponent = () => {

        // 1. At first it will apply search filters
        let people = this.applySearchFilters(this.state.peopleList);

        return (
            <div>

                <Row>
                    <Col lg="4" xs="3" sm="3" style={{ backgroundColor: colors.muteColor }}>


                        <View style={{ flex: 1, flexDirection: 'row', padding: 10 }}>

                            <p>col-sm-4</p>

                        </View>


                    </Col>
                    <Col lg="4" xs="6" sm="6" style={{ backgroundColor: "white", padding: 10 }}>

                        {this.renderFilterArea(people)}

                        {
                            this.state.peopleListIsReady ?


                                this.renderPeopleList(people)

                                :

                                <Loader text={"Refreshing .... "} />

                        }

                    </Col>
                    <Col lg="4" xs="3" sm="3" style={{ backgroundColor: colors.muteColor }}>



                        .col-sm-4


                    </Col>
                </Row>

            </div>
        )
    }

    /**
     * Main function that renders the list of people from the database.
     * @param people : list of people coming from the server or already filtered
     */
    renderPeopleList = (people) => {

        return (

            <List divided relaxed>
                {
                    people.map((person, index) =>
                        <List.Item key={index}>

                            <Person person={person} />


                        </List.Item>
                    )
                }
            </List>

        )
    }

    /**
     * Renders the filter area, the two checkboxes and the search drop down drom semantic ui components
     * @param people : list of people coming from the server or already filtered
     */
    renderFilterArea = (people) => {
        return (

            <div>

                <View style={{ flex: 1, flexDirection: 'row', marginVertical: 10 }}>

                    <Checkbox label='Students'
                        checked={this.state.showStudents}
                        onClick={() => this.setState({ showStudents: !this.state.showStudents })} />

                    <Checkbox label='Staffs'
                        checked={this.state.showStaffs}
                        onClick={() => this.setState({ showStaffs: !this.state.showStaffs })}
                        style={{ marginLeft: 10 }} />

                </View>

                <Dropdown
                    placeholder='Search people'
                    fluid search selection
                    options={this.mapPeopleListToDropDownSearchList(people)}
                    onChange={(event, data) => this.setState({ searchQuery: data.value })}
                    onSearchChange={(event, data) => this.setState({ searchQuery: data.searchQuery })}
                />
            </div>
        )
    }

    /**
     * Filters the people array list with the state of the two checkboxes and the search input
     * @param peopleList : the list of people to filter
     */
    applySearchFilters = (peopleList) => {
        
        // 1. First filter based on the current search input
        let people = peopleList
            .filter(item => (`${item.firstName} ${item.lastName} ${item.department.name}`).toUpperCase()
                .includes(this.state.searchQuery.toUpperCase()));

        // 2. if the staff checkbox is switched off, remove staffs from the list
        if (!this.state.showStaffs) {
            people = people.filter(item => item.role !== 'STAFF')
        }

        // 3. if the students checkbox is switched off, remove students from the list
        if (!this.state.showStudents) {
            people = people.filter(item => item.role !== 'STUDENT')
        }

        return people;
    }

    /**
     * Loads the list of users from the server
     * This method is first called when the compoent has finished mounting
     * It is also called later in the compoent to refresh the list
     */
    loadPeopleFromServer = () => {

        // 1. Turn of the peopleListIsReady variable so that the dimmer can appear until the data has been retrived
        this.setState({ peopleListIsReady: false });

        // TODO: Change the API to point to the app server, i.e the backend (Spring) server
        var usersAPI = "http://localhost:8080/api/users";

        axios.get(usersAPI)
            .then((response) => {
                if (response.status === 200) {      // Status OK
                    this.setState({
                        peopleList: response.data,  // Retrieve the data and set the state
                        dropdownSearchlist: this.mapPeopleListToDropDownSearchList(response.data),
                        peopleListIsReady: true     // Turn of the dimmer so that the render method can render the component
                    })
                }
            })
            // TODO: Find a better way to handle this error, bringing back the dimmer is not sufficient and not user friendly
            .catch((error) => {
                this.setState({
                    peopleListIsReady: false,       // An error has occoured, bring up the dimmer and comnnicate the message to the user
                    loadingMessage: error.toString() + "\n : Error getting content from server, please refresh"
                })
            })

    }

    /**
     * Maps the raw people list from the server to a template the semantic ui Dropdown compoent can use for search suggestions 
     * The Semantic UI has a template for rendering suggestions in drop down search list
     * @param peopleList : the list that needs to be mapped, note it has to maintain the format of users coming from the server
     */
    mapPeopleListToDropDownSearchList = (peopleList) => {

        // 1. Create an empty array, this cannot be null
        var searchList = [];

        // 2. Loop through the list
        for (let person of peopleList) {
            var displayText = person.firstName + " " + person.lastName;
            searchList.push(
                {
                    text: displayText,
                    value: displayText,   // This value will be used to filter not only the dropdown list but also the main people list 
                    image: { avatar: true, src: person.photoUrl },
                    key: person.id
                }
            )
        }

        return searchList;
    }
}

export default People;
