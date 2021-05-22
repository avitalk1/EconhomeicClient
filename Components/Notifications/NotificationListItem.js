import React from 'react';
import {View, Text } from 'react-native';
import { Divider } from 'react-native-elements';
import { styles } from '../styles';
function NotificationListItem(props) {

        return (
            <View style={styles.notificationContainer}>
                <View style={styles.titleNotificationContainer}>
                    <Text style={styles.notificationItemTitle}>{props.title}</Text>
                    <Text style={styles.notificationItemDate}>{props.date}</Text>
                </View>
                <View style={styles.titleNotificationContainer}>
                <Text style={styles.notificationItemMsg}>{props.msg}</Text>
                </View>
                <Divider style={{ backgroundColor: 'blue' }} />
            </View>
        );

    
}

export default NotificationListItem

