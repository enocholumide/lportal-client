import React from 'react'
import LoginForm from './Forms/LoginForm'
import { Row, Col, Avatar } from 'antd'
import { AppContext } from '../../provider/DataProvider'


export default class Login extends React.Component {

    render() {

        return (

            <AppContext.Consumer>
                {(context) => (

                    <Row>
                        <Col xs={{ span: 24, offset: 0 }} lg={{ span: 6, offset: 9 }} md={{ span: 10, offset: 7 }}>

                            <div style={{ textAlign: 'center', marginTop: '54px' }}>

                                <Avatar src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTetOGtBNUehuSyewuogJL5ij2UtZWedTKl6hMtxK8Tj1LcoLeT' size='big' />

                                <h1 style={{ margin: '24px', color: '#333', textShadow: 'none' }}>Sign in to Learning Portal</h1>

                            </div>

                            <div className='d-flex flex-justify-content-center'>

                                <LoginForm context={context} redirect='/organisations' />

                            </div>
                        </Col>
                    </Row >
                )}
            </AppContext.Consumer>
        )
    }
}