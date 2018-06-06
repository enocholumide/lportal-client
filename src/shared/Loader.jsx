import React, { Component } from 'react';
import {Container, Dimmer, Loader} from 'semantic-ui-react'

class Loading extends Component {

    render() {
        return (
            <Container style={{ flex: 1 }}>
                <Dimmer active>
                    <Loader content={this.props.text} />
                </Dimmer>
            </Container>
        );
    }
}

export default Loading;
