import React, { Component } from 'react';
import { View, TouchableOpacity, Animated } from 'react-native-web';
import { Icon } from 'semantic-ui-react';
import GradeChart from './GradeChart'

class Grade extends Component {

    state = {
        open: false,
        chartGrades: undefined
    };



    prepareChart = () => {

        let indicators = [{ grade: 'A', count: 5 }, { grade: 'B', count: 5 }]

        this.refs.chart.measure((ox, oy, width, height) => {
            let grades = this.getWidth(indicators, width);
            this.setState({ chartGrades: grades, open: true });
        })
    }

    /**
 * Compute width of each bar based on their value
 * @param gradeIndicators : the grade indicators to compute individual width
 */
    getWidth = (gradeIndicators, containerWidth) => {

        // Get the device width
        const deviceWidth = containerWidth;

        // Clone the data
        let grades = JSON.parse(JSON.stringify(gradeIndicators))

        // Remove the view padding and allow space for the data number on top
        let maxWidth = deviceWidth //- (chartPadding * 2) - 50;

        // Find maximum value the grade indicator, which is going to get the maximum width 
        let maxValue = 1;
        for (var item of grades) {
            if (maxValue < item.count) {
                maxValue = item.count
            }
        }

        // Compute the width of each grade indicator
        for (let item of grades) {

            // The maximum value will get the maximum width with this equation
            let width = (maxWidth * item.count) / maxValue;

            // In order to show the rounded bar, if width=0 at first time, the borderRadius can't be implemented in the View
            if (width < 5) { width = 5 }

            // Add computed the width to the object
            item.width = new Animated.Value(width);

        }

        return grades;

    }

    showChart() {

        let indicators = [{ grade: 'A', count: 5 }, { grade: 'B', count: 5 }]
        

        this.refs.chart.measure((ox, oy, width, height) => 
            this.grades = this.getWidth(indicators, width)
            //this.setState({ chartGrades: grades, open: true });

            //console.log(this.state)
        );

        console.log(this.grades)

        return (
            <View style={{ flexDirection: 'column', flex: 1 }}>

                {
                    this.grades.map((item, index) => (

                        <View key={index} style={{ height: 50, flexDirection: 'row', width: 100, margin: 10, borderRadius: 3, backgroundColor: 'red' }}>


                        </View>

                    ))
                }

            </View>
        )
    }

    render() {

        let { grade } = this.props;

        return (

            <div>

                <TouchableOpacity >

                    <View

                        style={{
                            flexDirection: 'row', justifyContent: 'space-between',
                            alignItems: 'center', padding: 10, borderColor: 'lightgray',
                            borderRadius: 3, borderWidth: 1, marginVertical: 10
                        }}>

                        <label >{grade.course.name}</label>
                        <View style={{ flexDirection: 'row' }}>
                            <label>{grade.score + " " + grade.grade}</label>
                            <Icon name="info circle" color="blue" style={{ marginLeft: 5 }} onClick={() => this.setState({ open: !this.state.open })} />
                        </View>

                    </View>

                </TouchableOpacity>

                <View style={{ flexDirection: 'column', flex: 1 }} ref="chart">

                    {
                        this.state.open ?


                            <GradeChart grade={grade} component={this.refs.chart}/>



                            : null
                    }

                </View>

            </div>


        );
    }
}

export default Grade;

