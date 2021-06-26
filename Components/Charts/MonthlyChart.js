import React from 'react';
import {VictoryAxis, VictoryBar, VictoryChart } from "victory-native";

import Svg from 'react-native-svg';
import {
    FirstLegendColor
} from '../../common/styleColors'
function MonthlyChart(props) {
    return (
        <Svg>
        <VictoryChart>
            <VictoryBar
                style={{ data: { fill: FirstLegendColor } }}
                alignment="start"
                data={props.data}
                x="monthName"
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
          axisLabel: { fontSize: 10, padding: 35 },
        }}/>
            <VictoryAxis tickValues={props.ticks} label="Month" style={{
          axisLabel: { fontSize: 10, padding: 30 },
        }}/>
        </VictoryChart>
        </Svg>
    );
}
export default MonthlyChart;