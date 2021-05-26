import React, { useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { styles } from '../styles';
import { Divider } from 'react-native-paper';
import { TouchableOpacity } from 'react-native-gesture-handler'
import awsconfigsclient from '../../common/aws-configs'
import { userDataUpdate } from '../../Redux/actions/UserDataActions/action';
import { connect } from 'react-redux'
import Amplify from 'aws-amplify'
import { Foundation, MaterialCommunityIcons, Feather, Fontisto, AntDesign, MaterialIcons, Ionicons, Entypo } from '@expo/vector-icons';


Amplify.configure(awsconfigsclient);

function Account(props) {

    const userInfo = {
        firstName: props.userInfo.data.userDetails.firstName,
        lastName: props.userInfo.data.userDetails.lastName,
        email: props.userInfo.data.userDetails.email,
        phoneNumber: props.userInfo.data.userDetails.PhoneNumber,
    }
    const address = {
        city: props.userInfo.data.Address.city,
        state: props.userInfo.data.Address.state,
        street: props.userInfo.data.Address.street,
        streetNumber: props.userInfo.data.Address.streetNumber,
        entrance:props.userInfo.data.Address.entrance,
        apartment:props.userInfo.data.Address.apartment
    }

    const HouseID = props.userInfo.data.HouseID


    return (
        <ScrollView>
            <Text style={styles.MenuTitels}>User Info</Text>
            <View style={styles.boxContainer}>
                <View style={styles.profileLine}>
                    <Text>First Name</Text>
                    <Text style={styles.ConstrainsText}>{`${userInfo.firstName}`}</Text>
                </View>
                <Divider style={{ height: 1 }} />
                <View style={styles.profileLine}  >
                    <Text>Last Name</Text>
                    <Text style={styles.ConstrainsText}>{`${userInfo.lastName}`}</Text>
                </View>
                <Divider style={{ height: 1 }}/>
                <View style={styles.profileLine}  >
                    <Text>Email</Text>
                    <Text style={styles.ConstrainsText}>{`${userInfo.email}`}</Text>
                </View>
                <Divider style={{ height: 1 }}/>
                <View style={styles.profileLine}  >
                    <Text>Phone Number</Text>
                    <Text style={styles.ConstrainsText}>{`${userInfo.phoneNumber}`}</Text>
                </View>
            </View>
            <Text style={styles.MenuTitels}>Adress</Text>
            <View style={styles.boxContainer}>
                <View style={styles.profileLine}>
                    <Text>Street, entrance , partment</Text>
                    <Text style={styles.ConstrainsText}>{`${address.street}`} {`${address.streetNumber}`} , {`${address.entrance}`}, {`${address.apartment}`}</Text>
                </View>
                <Divider style={{ height: 1 }} />
                <View style={styles.profileLine}  >
                    <Text>City</Text>
                    <Text style={styles.ConstrainsText}>{`${address.city}`}</Text>
                </View>
                <Divider style={{ height: 1 }}/>
                <View style={styles.profileLine}  >
                    <Text>State</Text>
                    <Text style={styles.ConstrainsText}>{`${address.state}`}</Text>
                </View>
            </View>
            <Text style={styles.MenuTitels}>House ID</Text>
            <View style={styles.boxContainer}>
                <View style={styles.profileLine}>
                    <Text style={styles.ConstrainsText}>{`${HouseID}`}</Text>
                </View>
            </View>
        </ScrollView>
    );

}

const mapStateToProps = (store) => ({
    userInfo: store.userData,
});

const mapDispatchToProps = (dispatch) => ({
    updateUserDataFunc: (data) => dispatch(userDataUpdate(data))
})
export default connect(mapStateToProps, mapDispatchToProps)(Account);

