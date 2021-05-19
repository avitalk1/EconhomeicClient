import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { styles } from '../styles';
import { Auth } from 'aws-amplify'
import { getNotifications } from '../../common/api'
import NotificationListItem from './NotificationListItem'
function NotificationList(props) {
    const [notifications, setNotifications] = useState();
    useEffect(() => {
        async function getData() {
            try {
                const user = await Auth.currentAuthenticatedUser();
                const userNotificationResult = await getNotifications(user.attributes.email)
                setNotifications(userNotificationResult.Items)
            } catch (err) {
                console.log(err)
            }
        }
        getData();
    }, [])


    if (notifications) {
        return (
            <View>
                {
                    notifications.map((data, index) => {
                        return (
                            <NotificationListItem key={`noti-${index}`} title={data.title} msg={data.msg} date={data.sentAt} />
                        )
                    })
                }
            </View>
        );
    } else {
        return <></>
    }

}


export default NotificationList

