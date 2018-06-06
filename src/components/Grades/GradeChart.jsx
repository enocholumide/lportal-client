import React, { Component } from 'react';
import { View, Animated, Text, StyleSheet } from 'react-native-web';
import { apis } from '../../shared/config';
import axios from 'axios'
import Loading from '../../shared/Loader';

class GradeChart extends Component {
    constructor(props) {
        super(props)
        this.setWidth = this.setWidth.bind(this)
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
     * 1. The dimension of the chart area is updated
     * 2. The course statistics is retirevd from the server
     * 3. A window listener is attached, so that the chart area is updated on resize of the window
     */
    async componentDidMount() {

        this.updateDimensions()
        await this.loadStatistics(this.props.grade);
        window.addEventListener("resize", this.updateDimensions.bind(this));

    }

    /**
     * Component lifecycle method
     * Here the window listener is removed
     */
    componentWillUnmount() {
        window.removeEventListener("resize", this.updateDimensions.bind(this));
    }

    /**
     * Main Render method
     */
    render() {

        let { width, stats } = this.state

        return (
            <div>
                {
                    (width < 0 || stats === undefined) ?

                        <View style={{ height: 100 }}>

                            <Loading text={this.state.loadingMessage} />

                        </View>

                        :

                        this.renderChart()

                }
            </div>
        );
    }
   
    /**
     * 
     */
    renderChart = () => {

        let { stats } = this.state;
        let gradesArrayWithWidths = this.calculateGradeWidth(stats.details);

        return (
            <View style={{ marginVertical: 15 }}>

                {
                    gradesArrayWithWidths.map((grade, index) => (

                        <View style={styles.item}
                            key={index}>
                            <Text style={styles.label}>{grade.gradeLevel} {this.props.grade.gradeLevel === grade.gradeLevel ? " (including your performance)" : ""}</Text>
                            <View style={styles.data}>
                                {
                                    <Animated.View style={[styles.bar, styles.points, { width: grade.width, backgroundColor: this.props.grade.gradeLevel === grade.gradeLevel ? "blue" : "red" }]} />
                                }
                                <Text style={styles.dataNumber}>{grade.count}</Text>
                            </View>
                        </View>

                    ))
                }

                <View style={{ flexDirection: "row", justifyContent: "center" }}>

                    <Text>Average: {stats.averageGrade} | Enrolled: {stats.enrolled} students</Text>

                </View>

            </View>
        )
    }

    /**
     * Updates the dimensions of the chart area
     */
    updateDimensions() {
        setTimeout(this.measureWidth.bind(this))
    }

    /**
     * Retreives grade statistics from the server
     * Uses the course ID in the grade to get the statistics
     * @param {Object} grade graade
     */
    loadStatistics(grade){

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
     * Measures the wdith of the chart area
     */
    measureWidth() {
        this.props.component.measure(this.setWidth);
    }

    /**
     * Sets the width of the chart area
     * @param {Number} ox 
     * @param {Number} oy 
     * @param {Number} width 
     * @param {Number} height 
     * @param {Number} px 
     * @param {Number} py 
     */
    setWidth(ox, oy, width, height, px, py) {
        this.setState({ width: width });
    }

    /**
     * Calculates the width of each grade in the bar chart
     * @param {*} gradesArray  the grades array from the server
     * @returns the same gradesarray but with calculated width for each entry in the array
     */
    calculateGradeWidth(details){

        // 0. Map the grades to an array
        let gradesArray = this.mapGradesToArray(details)

        // 1. Get variables from state
        let { stats, width } = this.state;

        // 2. Reduce the max width 10 percent of the total width of the chart area, to allow labels on top
        let maxWidth = width - (width * 0.1); // 

        // 3. Loop through each grade
        for (let grade of gradesArray) {

            // 3.1 Make the highest grade count take up the max width
            let gradeWidth = (grade.count * maxWidth / stats.maximumCount)

            // 3.2 Just to show something, if the gradeWidth is zero make the wodth equals to 5
            if (gradeWidth < 5) { gradeWidth = 5 }

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
            gradesArray.push({ gradeLevel: key, count: details[key], width: 0 })
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


