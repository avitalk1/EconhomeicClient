import React, { useState, useEffect } from 'react';
import { TouchableOpacity, View, Text, StyleSheet, ScrollView } from 'react-native';
import { ButtonGroup, Button, ListItem } from 'react-native-elements'
import { getDateAsString } from '../../common/utils'
function PerDeviceViewCompare(props) {
   const [firstDate, setFirstDate] = useState(null)
   const [secondDate, setSecondDate] = useState(null)
    const [expanded, setExpanded] = useState(null)
    useEffect(() => {
        let tempExpended = new Array(props.route.params.params.data.length).fill(false)
        setExpanded(tempExpended)
        if(props.route.params.params.chartType === "daily"){
            let date1Str = getDateAsString(props.route.params.params.dates.first.day,props.route.params.params.dates.first.month, props.route.params.params.dates.first.year)
            let date2Str = getDateAsString(props.route.params.params.dates.second.day,props.route.params.params.dates.second.month, props.route.params.params.dates.second.year)
            setFirstDate(date1Str)
            setSecondDate(date2Str)
        }else{
            setFirstDate(`${props.route.params.params.dates.first.month} ${props.route.params.params.dates.first.year}`)
            setSecondDate(`${props.route.params.params.dates.second.month} ${props.route.params.params.dates.second.year}`)
        }
    }, [])

    const handleExpandedClick = (index) => {
        let tempIndexValue = expanded[index]
        let tempExpended = new Array(props.route.params.params.data.length).fill(false)
        if (!tempIndexValue) {
            tempExpended[index] = true
        }
        setExpanded(tempExpended)
    }
    if (expanded != null) {
        return (
            <ScrollView>
                <View style={styles.container}>
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
                                        key={`${item.deviceName}-${index}-w-compare`}
                                        content={
                                            <ListItem.Content>
                                                <ListItem.Title>{`${item.deviceName} ${item.floor} ${item.room}`}</ListItem.Title>
                                            </ListItem.Content>
                                        }
                                        isExpanded={expanded[index]}
                                        onPress={() => {
                                            handleExpandedClick(index)
                                        }}
                                    >

                                        <ListItem containerStyle={{ width: 300 }} key={`${item.deviceName}-${index}-exp-w-compare`} bottomDivider>
                                            <ListItem.Content>
                                                <ListItem.Title>{`Date: ${firstDate} - Amount: ${item.expenses1.toFixed(1)*43}`}</ListItem.Title>
                                                <ListItem.Title>{`Date: ${secondDate} - Amount: ${item.expenses2.toFixed(1)*43}`}</ListItem.Title>
                                            </ListItem.Content>
                                        </ListItem>
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
                                        key={`${item.deviceName}-${index}-e-compare`}
                                        content={
                                            <ListItem.Content>
                                                <ListItem.Title>{`${item.deviceName} ${item.floor} ${item.room}`}</ListItem.Title>
                                            </ListItem.Content>
                                        }
                                        isExpanded={expanded[index]}
                                        onPress={() => {
                                            handleExpandedClick(index)
                                        }}
                                    >

                                        <ListItem containerStyle={{ width: 300 }} key={`${item.deviceName}-${index}-exp-e-compare`} bottomDivider>
                                            <ListItem.Content>
                                            <ListItem.Title>{`Date: ${firstDate} - Amount: ${item.expenses1.toFixed(1)*43}`}</ListItem.Title>
                                            <ListItem.Title>{`Date: ${secondDate} - Amount: ${item.expenses2.toFixed(1)*43}`}</ListItem.Title>
                                            </ListItem.Content>
                                        </ListItem>
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
export default PerDeviceViewCompare;