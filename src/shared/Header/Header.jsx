import React, { Component } from 'react';
import {
    Icon, Image,
    Menu,
    Tab
} from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import { Link } from 'react-router-dom';

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
    Row, Col
} from 'reactstrap';


const header_icons_color = '#BDBDBD';

class Header extends Component {

    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            isOpen: false
        };
    }
    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    render() {

        return (
            <div  style={{ color: 'white', backgroundColor: '#F5F5F5'}}>

                <Navbar dark color='dark' expand="md" style={{paddingLeft: '20%', paddingRight: '20%'}}>
                    <NavbarBrand href="/">
                        <Image
                            src= 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQLyiogTkG74MAYhXCVJL4z3DpU80Vu-MAuP1FNzWCxRYcRTtwe'
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

                <div>

                    <div>
                        <Row>
                            <Col sm="12" md={{ size: 6, offset: 3 }} style={{ marginTop: 75, backgroundColor: '#F5F5F5' }}>

                                <Row>
                                    <Tab
                                        ref={tab => this.tab = tab}
                                        activeIndex={this.props.activeIndex}
                                        panes={panes}
                                    />
                                </Row>

                            </Col>
                        </Row>

                    </div>
                </div>

            </div>
        );
    }
}

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
            <Menu.Item as={Link} to='/exams' key='exams'><Icon name='pencil' style={{ color: header_icons_color }} />
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
