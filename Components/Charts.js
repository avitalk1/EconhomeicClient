import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ButtonGroup } from 'react-native-elements'
import MainCharts from './Charts/MainCharts'
import CompareCharts from './Charts/CompareCharts'
const VIEW_TYPE_OPTIONS = ["Main", "Compare"]
function Charts() {
    const [viewType, setViewType] = useState("Main")
    const [viewTypeIndex, setViewTypeIndex] = useState(0)
    const handleUpdateViewType = (index) => {
        setViewType(VIEW_TYPE_OPTIONS[index])
        setViewTypeIndex(index)
    }
    return (
        <View style={styles.container1}>
            <View style={styles.header}>
                <Text>I Am header</Text>
            </View>
            <View style={styles.container}>
                <View style={styles.ButtonGroupContainer}>
                    <ButtonGroup
                        onPress={handleUpdateViewType}
                        selectedIndex={viewTypeIndex}
                        containerStyle={styles.buttonGroupStyle}
                        buttons={VIEW_TYPE_OPTIONS}
                        selectedButtonStyle={styles.selectedButtonStyle}
                        selectedTextStyle={styles.selectedTextStyle}
                    />
                </View>
                {
                    viewTypeIndex == 0 ?
                        <MainCharts />
                        :
                        <CompareCharts />

                }

            </View>
            <View style={styles.tabNavigation}>
                <Text>I Am Tabs</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container1: {
        height: "100%",
        flex: 1,
        // justifyContent: "center",
        alignItems: "center",
        display: 'flex'
    },
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        display: 'flex',
        width: "100%",
        height: "100%"
    },
    selectedButtonStyle: {
        backgroundColor: '#10375C',
    },
    selectedTextStyle: {
        color: 'white',
    },
    buttonGroupStyle: {
        height: 50,
        borderRadius: 20,
        zIndex: 1,
        margin: 0,
    },
    tabNavigation: {
        height: 50,
        backgroundColor: "green",
        width: "100%",
    },
    header: {
        height: 50,
        backgroundColor: "yellow",
        width: "100%",

    },
    ButtonGroupContainer: {
        width: "100%",
        // height:"100%",

    }
});
export default Charts;