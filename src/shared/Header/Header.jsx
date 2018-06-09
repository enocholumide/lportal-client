import React, { Component } from 'react';
import {
    Icon, Image,
    Menu,
    Tab
} from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import { Link } from 'react-router-dom';
import MediaQuery from 'react-responsive'
import { View } from 'react-native-web';
import {colors} from '../config'

import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    Row, Col, TabContent, TabPane, Card, Button, CardTitle, CardText,
} from 'reactstrap';
import classnames from 'classnames';


const header_icons_color = '#BDBDBD';

class Header extends Component {

    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            isOpen: false,
            activeTab: 1
        };
    }
    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    render() {

        return (
            <div style={{backgroundColor: colors.header, borderBottomColor: '#757575', borderBottomWidth: 1}}>

                <Row style={{backgroundColor: '#424242'}}>
                    <Col sm="12" lg={{ size: 8, offset: 2 }} >
                        <Navbar dark expand="md" >
                            <NavbarBrand href="/">
                                <Image
                                    src='https://i.pinimg.com/originals/9c/11/2a/9c112aee0359cb51ae0d580e7daafadd.png'
                                    style={{ width: 40, height: 40, borderRadius: 20, marginRight: 10 }}
                                />
                            </NavbarBrand>
                            <NavbarToggler onClick={this.toggle} />
                            <Collapse isOpen={this.state.isOpen} navbar>

                                <Nav className="mr-auto" navbar>
                                    <NavItem>
                                        <NavLink href="/">Our School</NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink href="/">Admissions</NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink href="/">Issues</NavLink>
                                    </NavItem>
                                </Nav>
                                <Nav className="ml-auto" navbar>
                                    <NavItem>
                                        <NavLink href="/">Invite</NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink href="https://github.com/enocholumide">Credits</NavLink>
                                    </NavItem>

                                    <NavItem>
                                        <NavLink href="https://github.com/enocholumide">
                                            <Image
                                                src='https://media.licdn.com/dms/image/C5603AQHnQxbadUX5_Q/profile-displayphoto-shrink_100_100/0?e=1531958400&v=beta&t=rc8O0NrheHHILd9KciSZLsXl7uoDNCUtnnkucT6JnFY'
                                                style={{ width: 25, height: 25, borderRadius: 3 }}
                                            /></NavLink>
                                    </NavItem>

                                    <UncontrolledDropdown nav inNavbar>
                                        <DropdownToggle nav caret >
                                        </DropdownToggle>
                                        <DropdownMenu right>
                                            <DropdownItem>
                                                Option 1
                                </DropdownItem>
                                            <DropdownItem>
                                                Option 2
                                </DropdownItem>
                                            <DropdownItem divider />
                                            <DropdownItem>
                                                Reset
                                </DropdownItem>
                                        </DropdownMenu>
                                    </UncontrolledDropdown>
                                </Nav>
                            </Collapse>
                        </Navbar>
                    </Col>
                </Row>



                <Row>
                    <Col sm="12" lg={{ size: 8, offset: 2 }}>
                        {this.renderTabs()}
                    </Col>
                </Row>



            </div>
        );
    }

    renderTabs() {
        return (
            <div>
                <Nav tabs justified style={{ paddingLeft: 20, paddingRight: 20, marginTop: 60 }}>
                    {
                        panes2.map((pane, index) =>

                            <NavItem key={index}>
                                <NavLink
                                    href={pane.link}
                                    active={this.props.activeIndex === index ? true : false}>

                                    <div>
                                        <i className={pane.icon + " icon"} style={{ color: 'darkgray' }}></i>
                                    </div>
                                    <div>
                                        {pane.title}
                                    </div>

                                </NavLink>
                            </NavItem>
                        )
                    }
                </Nav>
            </div>
        )
    }
}

const panes2 = [
    { link: "/dashboard", icon: "calendar", title: "Dashboard" },
    { link: "/news", icon: "feed", title: "News" },
    { link: "/people", icon: "users", title: "People" },
    { link: "/lectures", icon: "student", title: "Lectures" },
    { link: "/grades", icon: "pencil square", title: "Grades" },
    { link: "/exams", icon: "pencil", title: "Exams" },
    { link: "/courses", icon: "student  ", title: "Courses" },
    { link: "/jobs", icon: "suitcase", title: "Jobs" },
    { link: "/info", icon: "info", title: "Info" },
]

const panes = [
    {
        menuItem:
            <Menu.Item as={Link} to='/dashboard' key='news'><Icon name='setting' style={{ color: header_icons_color }} />
                Dashboard
            </Menu.Item>
    },
    {
        menuItem:
            <Menu.Item as={Link} to='/news' key='dashboard'><Icon name='feed' style={{ color: header_icons_color }} />
                News
            </Menu.Item>
    },
    {
        menuItem:
            <Menu.Item as={Link} to='/people' key='people'><Icon name='users' style={{ color: header_icons_color }} />
                People
            </Menu.Item>
    },
    {
        menuItem:
            <Menu.Item as={Link} to='/lectures' key='lectures'><Icon name='student' style={{ color: header_icons_color }} />
                Lectures
            </Menu.Item>
    },
    {
        menuItem:
            <Menu.Item as={Link} to='/grades' key='grades'><Icon name='pencil square' style={{ color: header_icons_color }} />
                Grades
            </Menu.Item>
    },
    {
        menuItem:
            <Menu.Item as={Link} to='/exams' key='exams'><Icon name='pencil square' style={{ color: header_icons_color }} />
                Exams
            </Menu.Item>
    },
    {
        menuItem:
            <Menu.Item as={Link} to='/courses' key='courses'><Icon name='student' style={{ color: header_icons_color }} />
                My Courses
            </Menu.Item>
    },
    {
        menuItem:
            <Menu.Item as={Link} to='/jobs' key='jobs'><Icon name='suitcase' style={{ color: header_icons_color }} />
                Jobs
            </Menu.Item>
    },
    {
        menuItem:
            <Menu.Item as={Link} to='/info' key='info'><Icon name='info' style={{ color: header_icons_color }} />
                Info
            </Menu.Item>
    },
]

export default Header;
