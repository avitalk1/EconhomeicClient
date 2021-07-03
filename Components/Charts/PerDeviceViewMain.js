import React, { useState, useEffect } from 'react';
import { TouchableOpacity, View, Text, StyleSheet, ScrollView } from 'react-native';
import { ButtonGroup, Button, ListItem } from 'react-native-elements'
function PerDeviceViewMain(props) {
    const [expanded, setExpanded] = useState(null)
    useEffect(() => {
        let tempExpended = new Array(props.route.params.params.data.length).fill(false)
        setExpanded(tempExpended)
    }, [])

    const handleExpandedClick = (index) => {
        let tempIndexValue = expanded[index]
        let tempExpended = new Array(props.route.params.params.data.length).fill(false)
        if(!tempIndexValue){
            tempExpended[index] = true
        }
        setExpanded(tempExpended)
    }
    if (expanded != null) {
        return (
            <ScrollView>
                <View  style={styles.container}>
                {
                    props.route.params.params.breakdown == "total" || props.route.params.params.breakdown == "water" ?
                        <Text>Water Consuming Devices</Text>
                        :
                        <></>
                }
                {
                    props.route.params.params.data.map((item, index) => {
                        if (item.deviceType == "water") {
                            return (
                                <ListItem.Accordion
                                    containerStyle={{ width: "100%" }}
                                    key={`${item.deviceName}-${index}-w-main`}
                                    content={
                                        <ListItem.Content  key={`${item.deviceName}-${index}-w-main-content`}>
                                            <ListItem.Title>{`${item.deviceName} ${item.floor} ${item.room}`}</ListItem.Title>
                                        </ListItem.Content>
                                    }
                                    isExpanded={expanded[index]}
                                    onPress={() => {
                                        handleExpandedClick(index)
                                    }}
                                >
                                    {
                                        item.expenses.map((exp, i) => {
                                            return (
                                                <ListItem containerStyle={{ width: 300 }} key={`${item.deviceName}-${index}-exp-${i}-w-main`} bottomDivider>
                                                    <ListItem.Content>
                                                        <ListItem.Title>{`From: ${exp.startTime}`}</ListItem.Title>
                                                        <ListItem.Title>{`To: ${exp.endTime}`}</ListItem.Title>
                                                        <ListItem.Title>{`Amount: ${exp.consumption.toFixed(1)*43}`}</ListItem.Title>
                                                    </ListItem.Content>
                                                </ListItem>
                                            )
                                        })
                                    }
                                </ListItem.Accordion>
                            )
                        } else {
                            return (<View key={`no-view-${index}-w`}></View>)
                        }
                    })
                }
                {
                    props.route.params.params.breakdown == "total" || props.route.params.params.breakdown == "electricity" ?
                        <Text>Electricity Consuming Devices</Text>
                        :
                        <></>
                }
                {
                    props.route.params.params.data.map((item, index) => {
                        if (item.deviceType == "electricity") {
                            return (
                                <ListItem.Accordion
                                    containerStyle={{ width: "100%" }}
                                    key={`${item.deviceName}-${index}-e-main`}
                                    content={
                                        <ListItem.Content  key={`${item.deviceName}-${index}-e-main-content`}>
                                            <ListItem.Title>{`${item.deviceName} ${item.floor} ${item.room}`}</ListItem.Title>
                                        </ListItem.Content>
                                    }
                                    isExpanded={expanded[index]}
                                    onPress={() => {
                                        handleExpandedClick(index)
                                    }}
                                >
                                    {
                                        item.expenses.map((exp, i) => {
                                            return (
                                                <ListItem containerStyle={{ width: 300 }} key={`${item.deviceName}-${index}-exp-${i}-e-main`} bottomDivider>
                                                    <ListItem.Content>
                                                        <ListItem.Title>{`From: ${exp.startTime}`}</ListItem.Title>
                                                        <ListItem.Title>{`To: ${exp.endTime}`}</ListItem.Title>
                                                        <ListItem.Title>{`Amount: ${exp.consumption.toFixed(1)*43}`}</ListItem.Title>
                                                    </ListItem.Content>
                                                </ListItem>
                                            )
                                        })
                                    }
                                </ListItem.Accordion>
                            )
                        } else {
                            return (<View  key={`no-view-${index}-e`}></View>)
                        }
                    })
                }
                </View>
            </ScrollView >
        );
    } else {
        return (<></>)
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: "center",
        alignItems: "center",
        display: 'flex',
        width: "100%",
    },

});
export default PerDeviceViewMain;