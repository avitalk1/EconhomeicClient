import React, { useEffect, useState } from 'react';
import { Switch, View, Text, SafeAreaView, StyleSheet } from 'react-native';
import { Auth } from 'aws-amplify'
import { styles } from '../styles';

function AutoActions(props) {
    const [LightValue, setLightValue] = useState(false);
    const [AirConditionerValue, setAirConditionerValue] = useState(false);
    const toggleLightSwitch = (value) => {
        setLightValue(value);
    };
    const toggleAirConditionSwitch = (value) => {
        setAirConditionerValue(value);
    };


    return (
            <View>
                <SafeAreaView>
                    <View >
                        <View style={styles.switchLine}>
                            <Text style={styles.switchTxt}>{LightValue ? 'Light is ON' : 'Light is OFF'}</Text>
                            <Switch
                                style={styles.switchBtn}
                                onValueChange={toggleLightSwitch}
                                value={LightValue}
                            />
                        </View>
                        <View style={styles.switchLine}>
                            <Text style={styles.switchTxt} >{AirConditionerValue ? 'AirConditioner is ON' : 'AirConditioner is OFF'}</Text>
                            <Switch
                                style={styles.switchBtn}
                                onValueChange={toggleAirConditionSwitch}
                                value={AirConditionerValue}
                            />
                        </View>

                    </View>
                </SafeAreaView>
            </View>
    );


}

export default AutoActions

