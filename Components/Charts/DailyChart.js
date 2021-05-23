import React from 'react';
import { VictoryZoomContainer, VictoryAxis, VictoryBar, VictoryChart } from "victory-native";
import {
    FirstLegendColor
} from '../../common/styleColors'
function DailyChart(props) {
    return (
        <VictoryChart
            domain={{ y: [0, props.maxValue] }}
            containerComponent={<VictoryZoomContainer zoomDomain={{ x: [1, 15], y: [0, 40] }} />}
        >
            <VictoryBar
                style={{ data: { fill: FirstLegendColor } }}
                alignment="start"
                data={props.data}
                x="dayNumber"
                y={`${props.viewType}`} />
            <VictoryAxis dependentAxis />
            <VictoryAxis tickValues={props.ticks} />
        </VictoryChart>
    );
}
export default DailyChart;