import React from 'react';
import { VictoryGroup, VictoryAxis, VictoryBar, VictoryChart } from "victory-native";
import {
    FirstLegendColor,
    SecondLegendColor
} from '../../common/styleColors'
function MonthlyChartCompare(props) {
    return (
        <VictoryChart>
            <VictoryGroup offset={10}>
                <VictoryBar
                    barWidth={10}
                    color={FirstLegendColor}
                    data={props.data.data.first}
                    x="monthName"
                    y={`${props.viewType}`}
                />
                <VictoryBar
                    color={SecondLegendColor}
                    barWidth={10}
                    alignment="start"
                    data={props.data.data.second}
                    x="monthName"
                    y={`${props.viewType}`}
                />
            </VictoryGroup>
            <VictoryAxis dependentAxis />
            <VictoryAxis tickValues={props.data.ticks} />
        </VictoryChart>
    );
}
export default MonthlyChartCompare;