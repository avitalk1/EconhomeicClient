import React, { useState, useEffect } from 'react';
import { Modal, View, Text, SafeAreaView, Slider , ScrollView} from 'react-native';
import { Divider } from 'react-native-paper';
import Amplify from 'aws-amplify'
import { connect } from 'react-redux'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { styles } from '../styles';
import { fetchUserConfig, userConfigUpdate } from '../../Redux/actions/UserConfigAction/action';
import { AntDesign } from '@expo/vector-icons';
import { ModalPicker } from './ModalPicker';
import { updateUserConfig } from '../../common/api'

function Configuration(props) {
    const [isModalVisible, setisModalVisible] = useState(false)
    const [modalType, setModalType] = useState('')
    const [configTypeOptions, setConfigTypeOptions] = useState()
    const [lightLevel, setlightLevel] = useState('')
    const [timeData, settimeData] = useState({
        AC: '',
        Light: '',
        Water: ''
    })
    const [temperatureData, settemperatureData] = useState({
        AC: 0,
        Boiler: 0
    })

    useEffect(() => {
        if (props.userConfig.data != null) {
            settimeData({
                AC: props.userConfig.data.ACTime,
                Light: props.userConfig.data.LightTime,
                Water: props.userConfig.data.WTTime
            })
            setlightLevel(props.userConfig.data.LightLevel)
            settemperatureData({
                AC: props.userConfig.data.ACTemp,
                Boiler: props.userConfig.data.BoilerTemp
            })
        }
    }, [props.userConfig])

    const changeModalVisibility = (bool, configType = null) => {
        if (configType != null) {
            setConfigTypeOptions(configType)
        }
        setisModalVisible(bool)
    }

    const setData = (option) => {
        let temp;
        if (modalType == 'time') {
            temp = timeData
            temp[configTypeOptions] = option
            settimeData(temp)
            callUpdateUserConfig()
        }
        else {
            setlightLevel(option)
            callUpdateUserConfig()
        }
    }
    const combinedFunctions = (bool, configType, value) => {
        changeModalVisibility(bool, configType)
        setModalType(value)
    }
    const setACTemperature = (value, configType = null) => {
        if (configType != null) {
            setConfigTypeOptions(configType)
        }
        setConfigTypeOptions(value)
        temperatureData.AC = value
        settemperatureData(temperatureData)
        callUpdateUserConfig()
    }
    const setBoilerTemperature = (value, configType = null) => {
        if (configType != null) {
            setConfigTypeOptions(configType)
        }
        setConfigTypeOptions(value)
        temperatureData.Boiler = value
        settemperatureData(temperatureData)
        callUpdateUserConfig()
    }

    const callUpdateUserConfig = () => {
        let values = {
            timeData,
            temperatureData,
            lightLevel
        }
        async function updateData() {
            try {
                await updateUserConfig(props.userInfo.data.UserID, values)
                props.userConfigUpdateFunc({ values })

            } catch (err) {
                console.log(err)
            }
        } updateData()
    }
    useEffect(() => {
        props.fetchUserConfigFunc(props.userInfo.data.UserID)
    }, [])

    return (
        <ScrollView>
        <View>
            <Text style={styles.MenuTitels}>AC</Text>
            <SafeAreaView style={styles.boxContainer}>
                <TouchableOpacity style={styles.MenuLine}
                    onPress={() => combinedFunctions(true, "AC", "time")}
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
                        onValueChange={setACTemperature}
                    />
                </View>

            </SafeAreaView>
            <Divider />
            <Text style={styles.MenuTitels}>Light</Text>
            <SafeAreaView style={styles.boxContainer}>
                <TouchableOpacity style={styles.MenuLine}
                    onPress={() => combinedFunctions(true, "Light", "time")}
                >
                    <View style={styles.rowContainer}>
                        <Text style={styles.generalText}>Auto Action Time</Text>
                    </View>
                    <View style={styles.rowContainer}>
                        <Text>{timeData.Light}</Text>
                        <AntDesign name="right" style={styles.arrowIcon} />
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.MenuLine}
                    onPress={() => combinedFunctions(true, "Light", "level")}
                >
                    <View style={styles.rowContainer}>
                        <Text style={styles.generalText}>Light Level</Text>
                    </View>
                    <View style={styles.rowContainer}>
                        <Text>{lightLevel}</Text>
                        <AntDesign name="right" style={styles.arrowIcon} />
                    </View>
                </TouchableOpacity>
            </SafeAreaView>
            <Text style={styles.MenuTitels}>Boiler</Text>
            <SafeAreaView style={styles.boxContainer}>
                <View style={styles.MenuLine}>
                    <Text style={styles.generalText}>Auto Action Temperature</Text>
                    <Text>{temperatureData.Boiler}°C</Text>
                </View>
                <View style={styles.smallProgressContainer}>
                    <Slider
                        style={{ width: '80%', marginBottom: 20 }}
                        value={temperatureData.Boiler}
                        maximumValue={50}
                        minimumValue={5}
                        step={1}
                        onValueChange={setBoilerTemperature}
                    />
                </View>

            </SafeAreaView>
            <Text style={styles.MenuTitels}>Water</Text>
            <SafeAreaView style={styles.boxContainer}>
                <TouchableOpacity style={styles.MenuLine}
                    onPress={() => combinedFunctions(true, "Water", "time")}
                >
                    <View style={styles.rowContainer}>
                        <Text style={styles.generalText}>Auto Action Time</Text>
                    </View>
                    <View style={styles.rowContainer}>
                        <Text>{timeData.Water}</Text>
                        <AntDesign name="right" style={styles.arrowIcon} />
                    </View>
                </TouchableOpacity>

            </SafeAreaView>

            <Modal
                transparent
                animationType='fade'
                visible={isModalVisible}
                onRequestClose={() => changeModalVisibility(false)}
            >
                <View style={styles.ModalPickerContiner}>
                    <ModalPicker
                        changeModalVisibility={changeModalVisibility}
                        setData={setData}
                        modalType={modalType}
                    />
                </View>
            </Modal>
        </View>
        </ScrollView>
    );
}


const mapStateToProps = (store) => ({
    userInfo: store.userData,
    userConfig: store.userConfig
});

const mapDispatchToProps = (dispatch) => ({
    fetchUserConfigFunc: (userid) => dispatch(fetchUserConfig(userid)),
    userConfigUpdateFunc: (data) => dispatch(userConfigUpdate(data))
})
export default connect(mapStateToProps, mapDispatchToProps)(Configuration);