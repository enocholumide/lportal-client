import React, { Component } from 'react'
import { Image } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'
import { colors } from '../config'
import { Button } from 'antd'
import { View } from 'react-native-web'
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

let appcontext = undefined
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
                            <Row style={{ backgroundColor: 'black' }}>
                                <Col span={16} offset={4}>
                                        <Navbar dark expand="md" style={{ paddingLeft: 0, paddingRight: 0, height: '7vh'  }}>
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
                    <NavLink href="/login" style={{ fontWeight: 'bold', color: 'white' }}>Sign in</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink>Or</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink href="/signup" style={{ fontWeight: 'bold', color: 'white' }}>Sign up</NavLink>
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
