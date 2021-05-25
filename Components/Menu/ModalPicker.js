import React, { useState } from 'react';
import { ScrollView, Modal, View, Text, Dimensions, TouchableOpacity } from 'react-native';
import { Divider } from 'react-native-paper';
import { styles } from '../styles';

const OPTIONS = ['10 Minuets', '15 Minuets', '30 Minuets',]

const WIDTH = Dimensions.get("window").width
const HEIGHT = Dimensions.get("window").height
const ModalPicker = (props) => {

    const onPressItem = (option) => {
        props.changeModalVisibility(false)
        props.setData(option)

    }
    const option = OPTIONS.map((item, index) => {
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
            onPress={() => changeModalVisibility(false)}
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