import React, { useState, useEffect } from 'react';
import { Modal, View, Text, SafeAreaView, Slider } from 'react-native';
import { Divider } from 'react-native-paper';
import Amplify from 'aws-amplify'
import awsconfigsclient from '../../common/aws-configs'
import { connect } from 'react-redux'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { styles } from '../styles';
import { fetchUserConfig } from '../../Redux/actions/UserConfigAction/action';
import { AntDesign } from '@expo/vector-icons';
import { ModalPicker } from './ModalPicker';

Amplify.configure(awsconfigsclient);


function Configuration(props) {

    const [timeData, settimeData] = useState({
        AC: '',
        Light: ''
    })
    const [temperatureData, settemperatureData] = useState({
        AC: 24,
        Light: 35
    })
    const [isModalVisible, setisModalVisible] = useState(false)
    const [configTypeOptions, setConfigTypeOptions] = useState()

    const changeModalVisibility = (bool, configType = null) => {
        if (configType != null) {
            setConfigTypeOptions(configType)
        }
        setisModalVisible(bool)
    }
    useEffect(()=>{
        props.fetchUserConfigFunc(props.userInfo.data.UserID)
    },[])

    useEffect(()=>{
        console.log("config")
        console.log(JSON.stringify(props.userConfig.data, null, 2))
    },[props.userConfig])
    const setData = (option) => {
        let temp = timeData;
        temp[configTypeOptions] = option
        settimeData(temp)
    }
    const setTemperature = (value, configType = null) => {
        if (configType != null) {
            setConfigTypeOptions(configType)
        }
        setConfigTypeOptions(value)
        temperatureData.AC = value
        settemperatureData(temperatureData)
    }

    return (
        <View>
            <Text style={styles.MenuTitels}>AC</Text>
            <SafeAreaView style={styles.boxContainer}>
                <TouchableOpacity style={styles.MenuLine}
                    onPress={() => changeModalVisibility(true, "AC")}
                >
                    <View style={styles.rowContainer}>
                        <Text style={styles.generalText}>Auto Action Time</Text>
                    </View>
                    <View style={styles.rowContainer}>
                        <Text>{timeData.AC}</Text>
                        <AntDesign name="right" style={styles.arrowIcon} />
                    </View>
                </TouchableOpacity>
                <View style={styles.MenuLine}>
                    <Text style={styles.generalText}>Auto Action Temperature</Text>
                    <Text>{temperatureData.AC}°C</Text>
                </View>
                <View style={styles.smallProgressContainer}>
                    <Slider
                        style={{ width: '80%', marginBottom: 20 }}
                        value={temperatureData.AC}
                        maximumValue={32}
                        minimumValue={16}
                        step={1}
                        onValueChange={setTemperature}
                    />
                </View>

            </SafeAreaView>
            <Divider />
            <Text style={styles.MenuTitels}>Light</Text>
            <SafeAreaView style={styles.boxContainer}>
                <TouchableOpacity style={styles.MenuLine}
                    onPress={() => changeModalVisibility(true, "Light")}
                >
                    <View style={styles.rowContainer}>
                        <Text style={styles.generalText}>Auto Action Time</Text>
                    </View>
                    <View style={styles.rowContainer}>
                        <Text>{timeData.Light}</Text>
                        <AntDesign name="right" style={styles.arrowIcon} />
                    </View>
                </TouchableOpacity>

            </SafeAreaView>
            <Modal
                style={styles.ModalPickerContiner}
                transparent={true}
                animationType='fade'
                visible={isModalVisible}
                onRequestClose={() => changeModalVisibility(false)}
            >
                <ModalPicker
                    changeModalVisibility={changeModalVisibility}
                    setData={setData}
                />
            </Modal>
        </View>
    );
}


const mapStateToProps = (store) => ({
    userInfo: store.userData, 
    userConfig: store.userConfig
});

const mapDispatchToProps = (dispatch) => ({
    fetchUserConfigFunc:(userid)=> dispatch(fetchUserConfig(userid))
})
export default connect(mapStateToProps, mapDispatchToProps)(Configuration);