import React, { useState } from 'react';
import { ScrollView, View, Text, Switch, SafeAreaView } from 'react-native';
import { Divider } from 'react-native-paper';
import  Amplify from 'aws-amplify'
import awsconfigsclient from '../../common/aws-configs'
import { connect } from 'react-redux'
import { handleDeivceForNotifications ,UpdateUserActions } from '../../common/api'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { styles } from '../styles';
import { userDataUpdate } from '../../Redux/actions/UserDataActions/action';
import { Foundation, MaterialCommunityIcons, Feather,Fontisto, AntDesign, MaterialIcons, Ionicons, Entypo } from '@expo/vector-icons';


Amplify.configure(awsconfigsclient);

function TimeList(props) {
    console.log(props.userInfo.data.UserConstraints)

    const updateTimes = () => {
        props.navigation.navigate('TIMES')
    }
    return (
        <View>
            <Text style={styles.MenuTitels}>Account</Text>
            <View style={styles.boxContainer}>
                <TouchableOpacity style={styles.MenuLine} onPress={updateTimes} >
                    <View style={styles.rowContainer}>
                        <MaterialCommunityIcons name="account" size={24} color="white" style={{ backgroundColor: '#ffad33', borderRadius: 5, opacity: 0.6 }} />
                        <Text style={styles.generalText}>Profile</Text>
                    </View>
                    <AntDesign name="right" style={styles.arrowIcon} />
                </TouchableOpacity>
                <Divider />
                <TouchableOpacity style={styles.MenuLine} onPress={updateTimes} >
                    <View style={styles.rowContainer}>
                        <Text style={styles.generalText}>1 Minutes</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    );
}


const mapStateToProps = (store) => ({
    userInfo: store.userData
});

const mapDispatchToProps = (dispatch) => ({
    updateUserDataFunc: (data) => dispatch(userDataUpdate(data))
})
export default connect(mapStateToProps, mapDispatchToProps)(TimeList);