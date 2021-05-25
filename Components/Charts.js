import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ButtonGroup } from 'react-native-elements'
import { connect } from 'react-redux'
import MainCharts from './Charts/MainCharts'
import CompareCharts from './Charts/CompareCharts'
const VIEW_TYPE_OPTIONS = ["Main", "Compare"]
function Charts(props) {
    const [viewType, setViewType] = useState("Main")
    const [viewTypeIndex, setViewTypeIndex] = useState(0)
    const handleUpdateViewType = (index) => {
        setViewType(VIEW_TYPE_OPTIONS[index])
        setViewTypeIndex(index)
    }
    return (
        <View style={styles.container1}>
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
                        <MainCharts expenses={props.userInfo.data.Expenses}/>
                        :
                        <CompareCharts expenses={props.userInfo.data.Expenses}/>

                }

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
    ButtonGroupContainer: {
        width: "100%",
        // height:"100%",
        height:30

    }
});

const mapStateToProps = (store) => ({
    userInfo: store.userData,
});

export default connect(mapStateToProps, null)(Charts);
