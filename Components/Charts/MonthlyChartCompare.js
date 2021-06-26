import React from 'react';
import { VictoryGroup, VictoryAxis, VictoryBar, VictoryChart } from "victory-native";
import Svg from 'react-native-svg';

import {
    FirstLegendColor,
    SecondLegendColor
} from '../../common/styleColors'
function MonthlyChartCompare(props) {

    return (
        <Svg>
        <VictoryChart>
            <VictoryGroup offset={10}>
                <VictoryBar
                    barWidth={10}
                    color={FirstLegendColor}
                    data={props.data.data.first}
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
                <VictoryBar
                    color={SecondLegendColor}
                    barWidth={10}
                    alignment="start"
                    data={props.data.data.second}
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
            </VictoryGroup>
            <VictoryAxis dependentAxis label="Amount (NIS)" style={{
          axisLabel: { fontSize: 10, padding: 35 },
        }}/>
            <VictoryAxis tickValues={props.data.ticks} label="Month" style={{
          axisLabel: { fontSize: 10, padding: 30 },
        }}/>
        </VictoryChart>
        </Svg>
    );
}
export default MonthlyChartCompare;