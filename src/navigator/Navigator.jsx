import { Switch, Route } from 'react-router-dom';
import React, { Component } from 'react';

import Dashboard from '../components/Dashboard/Dashboard';
import News from '../components/News/News';
import People from '../components/People/People';
import Lectures from '../components/Lectures/Lectures';
import Grades from '../components/Grades/Grades';
import CoursesOverview from '../components/Courses/CoursesOverview';
import Course from '../components/Courses/Course';


class Navigator extends Component {
    render() {
        return (
            <div>
                <Switch>

                    <Route exact path="/" component={Dashboard} />
                    <Route exact path="/dashboard" component={Dashboard} />
                    <Route path="/news" component={News} />
                    <Route path="/people" component={People} />
                    <Route path="/lectures" component={Lectures} />
                    <Route path="/grades" component={Grades} />
                    <Route path="/courses" component={CoursesOverview} />
                    <Route exact path="/course/:id" component={Course} />

                </Switch>
            </div>
        )
    }
}

export default Navigator;