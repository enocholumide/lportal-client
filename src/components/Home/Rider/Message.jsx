import React from 'react'
import NewOrganisation from './NewOrganisation'

export default class HomeMessage extends React.Component {

    render() {

        return (
            <div >
                <h1 style={{ fontSize: 54 }} className="alt-h0 text-white lh-condensed-ultra mb-3">Made for Students and Teachers</h1>
                <p className="alt-lead mb-4" style={{ fontSize: 18, color: 'white' }}>
                    Lportal is a place where teachers can easily interact with their students without having a website!<br />
                    Everything has been prepared for you, all you need is to sign up, create your organisation and add your students.<br />
                    You can create course contents and materials, create assignments, grades and publish news to your students.
                    Should in case, you need your studetns to take online objective tests, it is easy with Lportal
            </p>
                <NewOrganisation />
            </div>
        )
    }
}


