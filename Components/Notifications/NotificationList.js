import React, { useEffect, useState } from 'react';
import { ScrollView, TouchableOpacity, Button } from 'react-native';
import { connect } from 'react-redux'
import { Auth } from 'aws-amplify'
import {getNotificationByID } from '../../common/api'
import { fetchNotificationData, addNotification } from '../../Redux/actions/NotificationActions/action'
import { mainNotificationFunction } from '../../common/notificationFunctions'
import NotificationListItem from './NotificationListItem'
function NotificationList(props) {
    const [notifications, setNotifications] = useState();
    useEffect(() => {
        if (props.userInfo.data != null) {
            props.fetchNotificationDataFunc(props.userInfo.data.userDetails.email)
        }
    }, [props.userInfo])
    useEffect(() => {
        if (props.notifications.data != null) {     
            const sortedNotifications = mainNotificationFunction(props.notifications.data)
            setNotifications(sortedNotifications)
        }
    }, [props.notifications])
    useEffect(() => {
        if (props.isSignedInStatus.notificationId != false) {
            async function getNotification() {
                let response = await getNotificationByID(props.isSignedInStatus.notificationId)
                props.addNotificationFunc({notification:response.notification.Item})
                let tempNotifications = JSON.parse(JSON.stringify(notifications))
                tempNotifications.push(response.notification.Item)
                setNotifications(tempNotifications)
                handleNotificationClick(response.notification.Item, true)
            }
            getNotification()
        }
    }, [props.isSignedInStatus.notificationId])


    const handleNotificationClick = (data, flag=false) => {
        props.navigation.navigate('NotificationView', {
            params: { data, flag },
        });
    }
    if (notifications) {
        return (
            <ScrollView>
                {
                    notifications.map((data, index) => {
                        return (
                            <TouchableOpacity key={`noti-${index}-touchable`} onPress={() => handleNotificationClick(data)}>
                                <NotificationListItem key={`noti-${index}`} title={data.title} msg={data.msg} date={data.sentAt} />
                            </TouchableOpacity>
                        )
                    })
                }
                
            </ScrollView>
        );
    } else {
        return <></>
    }

}
const mapStateToProps = (store) => ({
    isSignedInStatus: store.isSignedIn,
    userInfo: store.userData,
    notifications: store.notificationsData
});

const mapDispatchToProps = (dispatch) => ({
    fetchNotificationDataFunc: (email) => dispatch(fetchNotificationData(email)),
    addNotificationFunc: (data) => dispatch(addNotification(data)),

})
export default connect(mapStateToProps, mapDispatchToProps)(NotificationList);