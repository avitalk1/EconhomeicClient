import React, { useState, useEffect } from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import { VictoryGroup, VictoryZoomContainer, VictoryAxis, VictoryBar, VictoryChart, VictoryLegend } from "victory-native";
import {
    FirstLegendColor,
    SecondLegendColor
} from '../../common/styleColors'
function DailyChartCompare(props) {
    return (
        <VictoryChart
            domain={{ y: [0, props.data.maxValues[props.viewType]] }}
            containerComponent={<VictoryZoomContainer zoomDomain={{ x: [1, props.data.ticks[props.data.ticks.length - 1] / 2.5], y: [0, 30] }} />}
        >
            <VictoryGroup offset={7}
                colorScale={"qualitative"}
            >
                <VictoryBar
                    barWidth={7}
                    // alignment="start"
                    color={FirstLegendColor}
                    data={props.data.data.first}
                    x="dayNumber"
                    y={`${props.viewType}`} />
                <VictoryBar
                    barWidth={7}
                    // alignment="start"
                    color={SecondLegendColor}
                    data={props.data.data.second}
                    x="dayNumber"
                    y={`${props.viewType}`} />
            </VictoryGroup>
            <VictoryAxis dependentAxis />
            <VictoryAxis tickValues={props.data.ticks} />
        </VictoryChart>
    );
}
export default DailyChartCompare;