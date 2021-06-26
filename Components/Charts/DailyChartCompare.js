import React, { useState, useEffect } from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import { VictoryGroup, VictoryZoomContainer, VictoryAxis, VictoryBar, VictoryChart, VictoryLegend } from "victory-native";
import Svg from 'react-native-svg';
import {
  FirstLegendColor,
  SecondLegendColor
} from '../../common/styleColors'
function DailyChartCompare(props) {
  return (
    <Svg>
      <VictoryChart
        domain={{ y: [0, props.data.maxValues[props.viewType]] }}
        containerComponent={<VictoryZoomContainer zoomDomain={{ x: [1, props.data.ticks[props.data.ticks.length - 1] / 2], y: [0, 30] }} />}
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
            y={`${props.viewType}`}
            events={[
              {
                target: 'data',
                eventHandlers: {
                  onPressIn: () => {
                    return [
                      {
                        target: 'data',
                        mutation: dataProps => {
                          props.handleBarClick(dataProps.index)
                          return {}
                        }
                      }
                    ]
                  },
                  onPressOut: () => {
                  }
                }
              }
            ]}
          />
          <VictoryBar
            barWidth={7}
            // alignment="start"
            color={SecondLegendColor}
            data={props.data.data.second}
            x="dayNumber"
            y={`${props.viewType}`}
            events={[
              {
                target: 'data',
                eventHandlers: {
                  onPressIn: () => {
                    return [
                      {
                        target: 'data',
                        mutation: dataProps => {
                          props.handleBarClick(dataProps.index)
                          return {}
                        }
                      }
                    ]
                  },
                  onPressOut: () => {
                  }
                }
              }
            ]}
          />
        </VictoryGroup>
        <VictoryAxis dependentAxis label="Amount (NIS)" style={{
          axisLabel: { fontSize: 12, padding: 30 },
        }} />
        <VictoryAxis label="Days of the Month" style={{
          axisLabel: { fontSize: 12, padding: 30 },
        }} />
      </VictoryChart>
    </Svg>
  );
}
export default DailyChartCompare;