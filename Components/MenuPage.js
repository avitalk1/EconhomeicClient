import React, { useState , useEffect} from 'react';
import { ScrollView, View, Text, Switch, SafeAreaView } from 'react-native';
import { Divider } from 'react-native-paper';
import { Auth } from 'aws-amplify'
import { connect } from 'react-redux'
import { handleDeivceForNotifications } from '../common/api'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { styles } from './styles';
import { changeIsSignedInStatus, changeIsSignedInEmail } from '../Redux/actions/IsSignedInActions/action';
import {  userDataUpdateAutoactions } from '../Redux/actions/UserDataActions/action';
import { UpdateUserActions } from '../common/api';
import { Foundation, MaterialCommunityIcons, Feather,Fontisto, AntDesign, MaterialIcons, Ionicons, Entypo, } from '@expo/vector-icons';

function Menu(props) {
    const [LightValue, setLightValue] = useState(false);
    const [AirConditionerValue, setAirConditionerValue] = useState(false);

    const handleLogout = () => {
        Auth.currentAuthenticatedUser()
            .then(user => {
                handleDeivceForNotifications(user.attributes.email, "deactivate")
            })
        Auth.signOut().then(() => {
            props.changeIsSignedInStatusFunc(2)
            props.changeIsSignedInEmailFunc(null)
        })
    }
    const handleConstraints = () => {
        props.navigation.navigate('CONSTRAINTS')
    }
    const handlePassword = () => {
        props.navigation.navigate('CHANGE_PASSWORD')
    }
    const handleConfiguration = () => {
        props.navigation.navigate('CONFIGURATION')
    }
    const handleAccount = () => {
        props.navigation.navigate('ACCOUNT')
    }
    const toggleSwitch = (field) => {
        handleSwitch(field);
    };

    const handleSwitch = async (val) => {
        try {
            if (val == "light") {
                await UpdateUserActions({
                    Light: !props.userInfo.data.AutomaticActions.Light,
                    AirConditioner: props.userInfo.data.AutomaticActions.AirConditioner,
                    UserID: props.userInfo.data.UserID
                })
                props.userDataUpdateAutoactionsFunc({
                    Light: !props.userInfo.data.AutomaticActions.Light,
                    AirConditioner: props.userInfo.data.AutomaticActions.AirConditioner,
                })
                setLightValue(!props.userInfo.data.AutomaticActions.Light)
            }
            if (val == "ac") {
                await UpdateUserActions({
                    Light: props.userInfo.data.AutomaticActions.Light,
                    AirConditioner: !props.userInfo.data.AutomaticActions.AirConditioner,
                    UserID: props.userInfo.data.UserID
                })
                props.userDataUpdateAutoactionsFunc({
                    Light: props.userInfo.data.AutomaticActions.Light,
                    AirConditioner: !props.userInfo.data.AutomaticActions.AirConditioner,
                })
                setAirConditionerValue(!props.userInfo.data.AutomaticActions.AirConditioner)
            }
        } catch (err) {
            console.log(err)
        }
    }
    useEffect(() => {
        if(props.userInfo.data!=null){
            setLightValue(props.userInfo.data.AutomaticActions.Light)
            setAirConditionerValue(props.userInfo.data.AutomaticActions.AirConditioner);
        }
    }, [props.userInfo])
    return (
        <ScrollView>
            <View>
                <Text style={styles.MenuName}>Hello {`${props.userInfo.data.userDetails.firstName}`} {`${props.userInfo.data.userDetails.lastName}`} !</Text>
            </View>

            <View>
                <Text style={styles.MenuTitels}>Account</Text>
                <View style={styles.boxContainer}>
                    <TouchableOpacity style={styles.MenuLine} onPress={handleAccount} >
                        <View style={styles.rowContainer}>
                            <MaterialCommunityIcons name="account" size={24} color="white" style={{ backgroundColor: '#ffad33' , borderRadius:5 ,opacity:0.6}} />
                            <Text style={styles.generalText}>Profile</Text>
                        </View>
                        <AntDesign name="right" style={styles.arrowIcon} />
                    </TouchableOpacity>
                    <Divider />
                    <TouchableOpacity style={styles.MenuLine} onPress={handlePassword} >
                        <View style={styles.rowContainer}>
                            <Entypo name="key" size={24} color="white" style={{ backgroundColor: '#339933' , borderRadius:5 ,opacity:0.6 }} />
                            <Text style={styles.generalText}>Change Password</Text>
                        </View>
                        <AntDesign name="right" style={styles.arrowIcon} />
                    </TouchableOpacity>
                </View>

                <Text style={styles.MenuTitels}>Settings</Text>
                <View style={styles.boxContainer}>
                    <TouchableOpacity style={styles.MenuLine} onPress={handleConstraints} >
                        <View style={styles.rowContainer}>
                            <Ionicons name="settings-outline" size={24} color="white" style={{ backgroundColor: '#9494b8' , borderRadius:5,opacity:0.6 }} />
                            <Text style={styles.generalText}>Constraints</Text>
                        </View>
                        <AntDesign name="right" style={styles.arrowIcon} />
                    </TouchableOpacity>
                    <Divider />
                    <TouchableOpacity style={styles.MenuLine} onPress={handleConfiguration} >
                        <View style={styles.rowContainer}>
                            <Feather name="book-open" size={24} color="white" style={{ backgroundColor: '#4d4dff' , borderRadius:5 ,opacity:0.6}} />
                            <Text style={styles.generalText}>Configuration</Text>
                        </View>
                        <AntDesign name="right" style={styles.arrowIcon} />
                    </TouchableOpacity>
                </View>

                <Text style={styles.MenuTitels}>Auto Actions</Text>
                <SafeAreaView style={styles.boxContainer}>
                    <View style={styles.MenuLine} >
                        <View style={styles.rowContainer}>
                            <Foundation name="lightbulb" size={24} color="white" style={{ backgroundColor: '#ffcc00' , borderRadius:5 ,opacity:0.6 }} />
                            <Text style={styles.generalText}>{LightValue ? 'Light Auto ON' : 'Light Auto OFF'}</Text>
                        </View>
                        <Switch
                            style={styles.switchBtn}
                            onValueChange={() => toggleSwitch("light")}
                            value={LightValue}
                        />
                    </View>
                    <Divider />
                    <View style={styles.MenuLine} >
                        <View style={styles.rowContainer}>
                            <Fontisto name="snowflake" size={24} color="white" style={{ backgroundColor: '#20a7d4' , borderRadius:5 ,opacity:0.6}} />
                            <Text style={styles.generalText}>{AirConditionerValue ? 'AirConditioner Auto ON' : 'AirConditioner Auto OFF'}</Text>
                        </View>
                        <Switch
                            style={styles.switchBtn}
                            onValueChange={() => toggleSwitch("ac")}
                            value={AirConditionerValue}
                        />
                    </View>
                </SafeAreaView>
                <Text style={styles.MenuTitels}>Logout</Text>
                <View style={styles.boxContainer}>
                    <TouchableOpacity style={styles.MenuLine} onPress={handleLogout} >
                        <View style={styles.rowContainer}>
                            <MaterialIcons name="power-settings-new" size={24} color="white" style={{ backgroundColor: 'red' , borderRadius:5 ,opacity:0.6}} />
                            <Text style={styles.generalText}>Logout</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>

        </ScrollView>

    );
}


const mapStateToProps = (store) => ({
    userInfo: store.userData,
});

const mapDispatchToProps = (dispatch) => ({
    changeIsSignedInStatusFunc: (status) => dispatch(changeIsSignedInStatus(status)),
    changeIsSignedInEmailFunc: (email) => dispatch(changeIsSignedInEmail(email)), 
    userDataUpdateAutoactionsFunc:(data)=> dispatch(userDataUpdateAutoactions(data))
})

export default connect(mapStateToProps, mapDispatchToProps)(Menu);

