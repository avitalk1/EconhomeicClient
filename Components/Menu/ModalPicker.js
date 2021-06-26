import React, { useState } from 'react';
import { ScrollView, Modal, View, Text, Dimensions, TouchableOpacity } from 'react-native';
import { Divider } from 'react-native-paper';
import { styles } from '../styles';

const TIME_OPTIONS = ['None','10 Minuets', '15 Minuets', '30 Minuets','45 Minuets', '1 Hour' , '2 Hours']
const LEVEL_OPTIONS = ['Low','Medium','High']

const WIDTH = Dimensions.get("window").width
const HEIGHT = Dimensions.get("window").height

const ModalPicker = (props) => {
    let optionType =[]
    const onPressItem = (option) => {
        props.changeModalVisibility(false)
        props.setData(option)

    }
    if(props.modalType =='time'){
        optionType = TIME_OPTIONS
    }
    else{
        optionType = LEVEL_OPTIONS
    }
    const option = optionType.map((item, index) => {
    
        return (
            <View key={`${index}-ModalPicker`}>
                <TouchableOpacity
                    style={styles.modalOption}
                    onPress={() => onPressItem(item)}
                >
                    <Text style={styles.optionText}>{item}</Text>
                </TouchableOpacity>
                <Divider style={{ height: 1 }} />
            </View>

        )
    })
    
    return (
        <TouchableOpacity
            onPress={() => props.changeModalVisibility(false)}
            style={styles.ModalPickerContainer}
        >
            <View style={[styles.Modal, { width: WIDTH - 40, height: HEIGHT / 4 }]}>
                <ScrollView>
                    {option}
                </ScrollView>
            </View>
        </TouchableOpacity>

    )
}

export { ModalPicker }