import React, { Component } from 'react';
import { View } from 'react-native-web';
import { colors } from '../../shared/appStyles';
import HeaderNavigator from '../../shared/Header/Header';
import { Jumbotron, Button } from 'reactstrap'

class Jobs extends Component {

    render() {
        return (
            <div>
                <HeaderNavigator activeIndex={7} />
                <View style={{ flex: 1, height: "100% !important", justifyContent: 'center', alignItems: "center", backgroundColor: colors.muteColor }}>
                    <Jumbotron style={{ margin: 100 }}>
                        <h1 className="display-3">Jobs</h1>
                        <p className="lead">Jobs jobs jobs! Who doesnt like a good job? Working on it!</p>
                        <hr className="my-2" />
                        <p>You may play around and see what is up :) </p>
                        <p className="lead">
                            <Button color="primary" href="https://github.com/enocholumide/SIS--Spring-MVC-with-React">Show Code in GIT</Button>
                        </p>
                    </Jumbotron>
                </View>

            </div>
        );
    }
}

export default Jobs;
