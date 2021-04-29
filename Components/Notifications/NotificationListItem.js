import React, {useEffect, useState} from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Auth } from 'aws-amplify'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { Divider , Badge} from 'react-native-elements';
import {getNotifications} from '../../common/api'
function NotificationListItem(props) {

        return (
            <View style={styles.notificationContainer}>
                <View style={styles.titleNotificationContainer}>
                    <Text style={styles.notificationItemTitle}>{props.title}</Text>
                    <Text style={styles.notificationItemDate}>{props.date}</Text>
                </View>
                <View style={styles.titleNotificationContainer}>
                <Text style={styles.notificationItemMsg}>{props.msg}</Text>
                {/* <Badge status="primary"/> */}
                </View>
                <Divider style={{ backgroundColor: 'blue' }} />
            </View>
        );

    
}
const styles = StyleSheet.create({
    notificationContainer:{
        //borderBottomWidth: 1,
        margin:5, 
        paddingBottom:5
    }, 
    notificationItemTitle:{
        fontWeight:'bold'
    }, 
    titleNotificationContainer:{
        display: "flex",
        flexDirection: 'row',
        justifyContent:"space-between"
    }, 
    notificationItemDate:{
        fontSize:12
    }
});

export default NotificationListItem

