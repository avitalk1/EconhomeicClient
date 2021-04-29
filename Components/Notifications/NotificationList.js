import React, {useEffect, useState} from 'react';
import { View, StyleSheet , Text} from 'react-native';

import { Auth } from 'aws-amplify'
import { TouchableOpacity } from 'react-native-gesture-handler'
import {getNotifications} from '../../common/api'
import NotificationListItem from './NotificationListItem'
function NotificationList(props) {
    const [notifications, setNotifications] =  useState();
    useEffect( () => {
        async function getData(){
        try{
            const user = await Auth.currentAuthenticatedUser(); 
            const userNotificationResult = await getNotifications(user.attributes.email)
            setNotifications(userNotificationResult.Items)
        }catch(err){
            console.log(err)
        }
    }
    getData();
    }, [])

    
    if(notifications){
        return (
            <View >
                <View style={styles.notificationListTitleContainer}>
                <Text style={styles.notificationListTitle}>Notifications</Text>
                </View>
             {
                 notifications.map((data, index) => {
                     return (
                        <NotificationListItem key={`noti-${index}`} title={data.title} msg={data.msg} date={data.sentAt}/>
                     )
                 })
             }
            </View>
        );
    }else {
        return <></>
    }
    
}
const styles = StyleSheet.create({
    notificationListTitle:{
        fontSize:24
    },
    notificationListTitleContainer:{
        marginTop: 30,
        marginBottom:10, 
        display: 'flex',
        alignItems: 'center',
    }
});

export default NotificationList 

