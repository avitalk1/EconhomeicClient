import React, { useEffect, useState } from 'react';
import { Switch, View, Text, SafeAreaView, StyleSheet } from 'react-native';
import { Auth } from 'aws-amplify'
import { styles } from '../styles';
import awsconfigsclient from '../../common/aws-configs'
import { userDataUpdate } from '../../Redux/actions/UserDataActions/action';
import { UpdateUserActions } from '../../common/api';
import { connect } from 'react-redux'
import Amplify from 'aws-amplify';

Amplify.configure(awsconfigsclient);

function AutoActions(props) {
    const [LightValue, setLightValue] = useState(props.userInfo.data.AutomaticActions.Light);
    const [AirConditionerValue, setAirConditionerValue] = useState(props.userInfo.data.AutomaticActions.AirConditioner);
  
    const toggleSwitch = (field) => {
        handleSwitch(field);
    };

    const handleSwitch = async (val) => {
        try {
            if(val == "light"){       
                await UpdateUserActions({
                    Light: !props.userInfo.data.AutomaticActions.Light,
                    AirConditioner: props.userInfo.data.AutomaticActions.AirConditioner,
                    UserID: props.userInfo.data.UserID
                })
                props.updateUserDataFunc({
                    Light: !props.userInfo.data.AutomaticActions.Light,
                    AirConditioner: props.userInfo.data.AutomaticActions.AirConditioner,
                    UserID: props.userInfo.data.UserID
                })
                setLightValue(!props.userInfo.data.AutomaticActions.Light)
            }
            if(val == "ac"){
                await UpdateUserActions({
                    Light: props.userInfo.data.AutomaticActions.Light,
                    AirConditioner: !props.userInfo.data.AutomaticActions.AirConditioner,
                    UserID: props.userInfo.data.UserID
                })
                props.updateUserDataFunc({
                    Light: props.userInfo.data.AutomaticActions.Light,
                    AirConditioner: !props.userInfo.data.AutomaticActions.AirConditioner,
                    UserID: props.userInfo.data.UserID
                })
                setAirConditionerValue(!props.userInfo.data.AutomaticActions.AirConditioner)
            }
        } catch (err) {
            console.log(err)
        }
    }


    return (
            <View>
                <SafeAreaView>
                    <View >
                        <View style={styles.switchLine}>
                            <Text style={styles.switchTxt}>{LightValue ? 'Light is ON' : 'Light is OFF'}</Text>
                            <Switch
                                style={styles.switchBtn}
                                onValueChange={() => toggleSwitch("light")}
                                value={LightValue}
                            />
                        </View>
                        <View style={styles.switchLine}>
                            <Text style={styles.switchTxt} >{AirConditionerValue ? 'AirConditioner is ON' : 'AirConditioner is OFF'}</Text>
                            <Switch
                                style={styles.switchBtn}
                                onValueChange={() => toggleSwitch("ac")}
                                value={AirConditionerValue}
                            />
                        </View>

                    </View>
                </SafeAreaView>
            </View>
    );


}

const mapStateToProps = (store) => ({
    userInfo: store.userData,
});

const mapDispatchToProps = (dispatch)=> ({
   updateUserDataFunc:(data)=> dispatch(userDataUpdate(data))
  })
export default connect(mapStateToProps, mapDispatchToProps)(AutoActions);

