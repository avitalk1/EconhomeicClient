import React from 'react';
import {VictoryAxis, VictoryBar, VictoryChart } from "victory-native";
import {
    FirstLegendColor
} from '../../common/styleColors'
function MonthlyChart(props) {
    return (
        <VictoryChart>
            <VictoryBar
                style={{ data: { fill: FirstLegendColor } }}
                alignment="start"
                data={props.data}
                x="monthName"
                y={`${props.viewType}`} />
            <VictoryAxis dependentAxis />
            <VictoryAxis tickValues={props.ticks} />
        </VictoryChart>
    );
}
export default MonthlyChart;