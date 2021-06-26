import React from 'react';

import Svg from 'react-native-svg';

import { VictoryZoomContainer, VictoryAxis, VictoryBar, VictoryChart ,} from "victory-native";
import {
    FirstLegendColor
} from '../../common/styleColors'
function DailyChart(props) {
    return (
        <Svg>
        <VictoryChart
            //domain={{ y: [0, props.maxValue] }}
            // containerComponent={<VictoryZoomContainer zoomDomain={{ x: [1, 15], y: [0, 40] }} />}
        >
            <VictoryBar
                barWidth={7}
                style={{ data: { fill: FirstLegendColor } }}
                // alignment="start"
                data={props.data}
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
            <VictoryAxis dependentAxis label="Amount (NIS)" style={{
          axisLabel: { fontSize: 12, padding: 30 },
        }}/>
            <VictoryAxis  label="Days of the Month" style={{
          axisLabel: { fontSize: 12, padding: 30 },
        }}/>
        </VictoryChart>
        </Svg>
    );
}
export default DailyChart;