import React, { Component } from 'react'
import { Image } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'
import { colors } from '../config'
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
    DropdownItem
} from 'reactstrap'

import { Row, Col } from 'antd'
import { AppContext } from '../../provider/DataProvider'
import { Redirect } from 'react-router-dom';

class Header extends Component {

    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.logOut = this.logOut.bind(this);

        this.state = {
            isOpen: false,
            context: undefined,
            logOut: false
        };
    }
    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }


    render() {

        let { logOut } = this.state

        return (
            <AppContext.Consumer>
                {(context) => (
                    <div>

                        {
                            logOut ? context.logOut() : null
                        }

                        <div style={{ backgroundColor: colors.header, borderBottomColor: '#757575', borderBottomWidth: 1 }}>
                            <Row style={{ backgroundColor: colors.header, boxShadow: '2px 2px 1px #888888' }}>
                                <Col md={{ span: 24, offset: 0 }} lg={{ span: 16, offset: 4 }} >
                                    <Navbar dark expand="md" style={{ paddingLeft: 0, paddingRight: 0, height: '50px' }}>
                                        <NavbarBrand href="/" style={{marginRight: 0}}>
                                            <Image
                                                src='http://www.clker.com/cliparts/4/e/d/a/1392556742528197424letter-l-icon.png'
                                                style={{ width: 40, height: 40, borderRadius: 20}}
                                            />
                                        </NavbarBrand>
                                        <NavbarToggler onClick={this.toggle} />
                                        <Collapse isOpen={this.state.isOpen} navbar>

                                            <Nav className="mr-auto" navbar>
                                                <NavItem>
                                                    <NavLink href="/" style={{color: 'white', fontWeight: 'bold'}}>Lportal</NavLink>
                                                </NavItem>
                                                <NavItem>
                                                    <NavLink href="/">Issues</NavLink>
                                                </NavItem>
                                            </Nav>
                                            {context.state.user ? this.showUserTab(context) : this.showNonLoggedInTab(context)}
                                        </Collapse>
                                    </Navbar>
                                </Col>
                            </Row>

                        </div>


                    </div>
                )}
            </AppContext.Consumer>
        );
    }

    showNonLoggedInTab(context) {

        return (

            <Nav className="ml-auto" navbar>
                <NavItem>
                    <NavLink href="/login" style={{ fontWeight: 'bold' }}>Sign in</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink>Or</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink href="/signup" style={{ fontWeight: 'bold' }}>Sign up</NavLink>
                </NavItem>

            </Nav>

        )

    }

    logOut(context) {

        context.logOut()

        return (
            <Redirect to="/" />
        )

    }

    showUserTab(context) {
        return (
            <Nav className="ml-auto" navbar>

                <NavItem>
                    <NavLink href="https://github.com/enocholumide">
                        <Image
                            src={context.state.user.photoUrl}
                            style={{ width: 25, height: 25, borderRadius: 3 }}
                        /></NavLink>
                </NavItem>

                <UncontrolledDropdown nav inNavbar>
                    <DropdownToggle nav caret >
                    </DropdownToggle>
                    <DropdownMenu right>
                        <DropdownItem onClick={context.gotoOrganisation}>Signed in as: <a>{context.state.user.firstName}</a> </DropdownItem>
                        <DropdownItem divider />
                        <DropdownItem onClick={context.logOut}>Logout</DropdownItem>
                    </DropdownMenu>
                </UncontrolledDropdown>

            </Nav>
        )
    }
}

export default Header;
