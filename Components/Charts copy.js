import React, { useState, useEffect } from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import Amplify, { API } from 'aws-amplify';
import awsconfigsclient from '../common/aws-configs'
import { VictoryScatter, VictoryZoomContainer, VictoryAxis, VictoryBar, VictoryChart, VictoryTheme } from "victory-native";

import { mainChartFunction } from '../common/chartsFunctions'
Amplify.configure(awsconfigsclient);
// const data = [
//     { quarter: 1, earnings: 13000 },
//     { quarter: 2, earnings: 16500 },
//     { quarter: 3, earnings: 14250 },
//     { quarter: 4, earnings: 19000 }
// ];
function Charts(props) {
    const [data, setData] = useState(mainChartFunction({ type: "monthly", year:2021 }))
    const [viewType, setViewType] = useState("total")

    return (

        <View style={styles.container}>
            <VictoryChart>
                <VictoryBar
                    alignment="start"
                    data={data.data}
                    x="monthName"
                    y={`${viewType}`} />
                    <VictoryAxis dependentAxis />
                <VictoryAxis tickValues={data.ticks} />
            </VictoryChart>
        </View >
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f5fcff"
    }
});
export default Charts;