import React from 'react'   
import { Button } from 'semantic-ui-react'

export default class HomeMessage extends React.Component {

    render() {

        return (
            <div style={{ maxWidth: 720, height: "100%", alignItems: 'center' }}>
                <h1 style={{ fontSize: 48 }} className="alt-h0 text-white lh-condensed-ultra mb-3">MADE FOR STUDENTS AND TEACHERS</h1>
                <h3 style={{ color: '#4dd0e1', fontWeight: 'bold' }}>Student Information Management System </h3>
                <p className="alt-lead mb-4" style={{ fontSize: 18, color: 'white' }}>
                    Lportal is a place where teachers can easily interact with their students without having a website!
                    Everything has been prepared for you, all you need is to sign up, create your organisation and add your students.
            </p>

                <div>
                    <Button circular color='facebook' icon='facebook' />
                    <Button circular color='twitter' icon='twitter' />
                    <Button circular color='linkedin' icon='linkedin' />
                    <Button circular color='youtube' icon='youtube' />
                </div>
            </div>
        )
    }
}


