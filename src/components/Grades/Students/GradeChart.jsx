import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native-web'
import { apis } from '../../../shared/config'
import axios from 'axios'
import Loading from '../../../shared/Loader'
import { Progress } from 'antd'
import 'antd/dist/antd.css'


class GradeChart extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isLoading: true,
            width: -1,
            stats: undefined,
            loadingMessage: "Loading...."
        }
    }

    /**
     * Component lifecycle method
     * Here
     * 1. The course statistics is retirevd from the server
     */
    async componentDidMount() {

        await this.loadStatistics(this.props.grade);

    }


    /**
     * Main Render method
     */
    render() {

        let { stats } = this.state

        return (
            <div>
                {
                    ( stats === undefined) ?

                        <View style={{ height: 100 }}>

                            <Loading text={this.state.loadingMessage} />

                        </View>

                        :

                        this.renderBetterChart()

                }
            </div>
        );
    }

    renderBetterChart = () => {

        let { stats } = this.state;
        let gradesArrayWithWidths = this.calculateGradeWidth(stats.details);

        return (
            <div>

                {
                    gradesArrayWithWidths.map((grade, index) => (

                        <View style={{flex: 1, flexDirection: "column"}}
                            key={index}>

                            <Text style={styles.label}>{grade.gradeLevel} {this.props.grade.gradeLevel === grade.gradeLevel ? " (including your performance)" : ""}</Text>
                            <View style={{flex: 1, flexDirection: "row", justifyContent:"space-between", alignItems:"center"}}>
                                <Progress percent={grade.width} showInfo={false} status={this.props.grade.gradeLevel === grade.gradeLevel ? "active" : "normal" }/>
                                <Text style={styles.label}>{grade.count}</Text>
                            </View>
                            
                        </View>
                    ))
                }
            </div>
        )


    }

    /**
     * Retreives grade statistics from the server
     * Uses the course ID in the grade to get the statistics
     * @param {Object} grade graade
     */
    loadStatistics(grade) {

        // Set the loading to false so that the loading message can appear 
        this.setState({ isLoading: true })

        // Retrieve stats from server
        axios.get(apis.grade_statistics + grade.course.id)
            .then((response) => {
                if (response.status === 200) {
                    this.setState({ stats: response.data, isLoading: false }) // Set the loading to false so that the loading message can disappear 
                }
            })
            .catch((error) => {
                console.log(error);
                this.setState({ loadingMessage: "Failed to load course statistics" })
            })
    }

    /**
     * Calculates the width of each grade in the bar chart
     * @param {*} gradesArray  the grades array from the server
     * @returns the same gradesarray but with calculated width for each entry in the array
     */
    calculateGradeWidth(details) {

        // 0. Map the grades to an array
        let gradesArray = this.mapGradesToArray(details)

        // 1. Get variables from state
        let { stats } = this.state;

        // 2. Reduce the max width 10 percent of the total width of the chart area, to allow labels on top
        let maxWidth = 100; // 

        // 3. Loop through each grade
        for (let grade of gradesArray) {

            // 3.1 Make the highest grade count take up the max width
            let gradeWidth = (grade.count * maxWidth / stats.maximumCount)

            // 3.2 Just to show something, if the gradeWidth is zero make the wodth equals to 5
            if (gradeWidth === 0) { gradeWidth = 2 }

            // 3.3 Add the calculated width to the object
            grade.width = gradeWidth;

        }

        // 4. Return the edited gradearray, note that the calculated width is now inside each grade
        return gradesArray

    }

    /**
 * Map the details from the server to an array object
 * @param {Object} details object array from the server
 */
    mapGradesToArray(details) {
        let gradesArray = [];

        for (const key of Object.keys(details)) {
            gradesArray.push({ gradeLevel: key, count: details[key], width: 0, percent: 0 })
        }

        return gradesArray
    }

}

const styles = StyleSheet.create({

    // Item
    item: {
        flexDirection: 'column',
        marginBottom: 5,
        paddingHorizontal: 10
    },
    label: {
        //color: '#CBCBCB',
        flex: 1,
        fontSize: 12,
        position: 'relative',
        top: 2
    },
    data: {
        flex: 2,
        flexDirection: 'row'
    },
    dataNumber: {
        color: '#CBCBCB',
        fontSize: 11,
        fontWeight: 'bold'
    },
    bar: {
        alignSelf: 'center',
        borderRadius: 5,
        height: 8,
        marginRight: 5
    }
})

export default GradeChart;


