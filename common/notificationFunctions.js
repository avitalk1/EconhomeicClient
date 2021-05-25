
import {getDateAndTimeAsString} from './utils'
const mainNotificationFunction =(notifications) => {
  
   let tempNotifications = JSON.parse(JSON.stringify(notifications))
    tempNotifications = tempNotifications.map(notification=>{
        notification.sentAt = new Date(notification.sentAt)
        return notification
    })
    let sortedNotifications = tempNotifications.sort((a, b) => b.sentAt - a.sentAt)
    sortedNotifications = sortedNotifications.map(notification =>{
        notification.sentAt = getDateAndTimeAsString(notification.sentAt)
        return notification
    })
    return sortedNotifications
}

const findNotificationData = (notificationID, notifications) => {
    let temp = notifications.filter(function (e) {
        return e.NotificationsID == notificationID;
    });

    return temp[0]
}

export {
 mainNotificationFunction,
 findNotificationData
}