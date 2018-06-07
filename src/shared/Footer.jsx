import React, { Component } from 'react';

class Footer extends Component {

    render() {

        return (

            <div style={{ backgroundColor: "black", color: 'white', padding: 50}} className="main">
                <footer className="mainfooter">

                    <div className="footer-middle">
                        <div className="container">
                            <div className="row">

                                <div className="col-md-3 col-sm-6">

                                    <div className="footer-pad">
                                        <h4>Learning portal</h4>
                                        <ul className="list-unstyled">
                                            <li><a></a></li>
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
                                            <li><a></a></li>
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
    }
}


export default Footer;
