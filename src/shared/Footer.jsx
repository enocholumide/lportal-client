import React, { Component } from 'react';

let ignore = window.location.pathname === "/login" ? true : false
class Footer extends Component {

    render() {

        if (!ignore)
            return (



                <div style={{ backgroundColor: "black", color: 'white', padding: 50, height: '20vh' }} className="main">
                    <footer className="mainfooter">

                        <div className="footer-middle">
                            <div className="container">
                                <div className="row">

                                    <div className="col-md-3 col-sm-6">

                                        <div className="footer-pad">
                                            <h4>Learning portal</h4>
                                            <ul className="list-unstyled">

                                                <li><a>Help</a></li>
                                                <li><a>Blog</a></li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="col-md-3 col-sm-6">

                                        <div className="footer-pad">
                                            <h4>Contact and Feedback</h4>
                                            <ul className="list-unstyled">
                                                <li><a>Email me</a></li>
                                                <a href="mailto:enocholumide@gmail.com">gmail</a>

                                            </ul>
                                        </div>
                                    </div>
                                    <div className="col-md-3 col-sm-6">
                                        <div className="footer-pad">
                                            <h4>Social and links</h4>
                                            <ul className="list-unstyled">
                                                <li><a>Facebook</a></li>
                                                <li><a>VK</a></li>
                                                <li><a>Twitter</a></li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="footer-bottom">
                            <div className="container">
                                <div className="row">
                                    <div className="col-sm-12">
                                        <p className="text-center">&copy; 2018 Olumide-Igbiloba All rights reserved.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </footer>

                </div>
            );

        else
            return (

                <div className="footer" style={{ marginTop: '54px' }}>
                    <ul className="list-style-none d-flex flex-justify-content-center" style={{ marginLeft: 0, paddingLeft: 0, listStyle: 'none', flex: 1, flexDirection: 'row', justifyContent: 'center' }}>
                        <li className="mr-3"><a href="/login" >Terms</a></li>
                        <li className="mr-3"><a href="/login" >Privacy</a></li>
                        <li className="mr-3"><a href="/login" >Security</a></li>
                        <li><a className="link-gray" href="/login">Contact LPortal</a></li>
                    </ul>
                </div>

            )
    }
}


export default Footer;
