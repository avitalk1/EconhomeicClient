import Amplify, { API } from 'aws-amplify';
import awsconfigsclient from '../common/aws-configs'

import DeviceInfo from 'react-native-device-info';
import messaging from '@react-native-firebase/messaging';


Amplify.configure(awsconfigsclient);
const getUserByHouse = async (houseID) => {
    console.log("house id", houseID)
    const myInit = {
        body: {
            houseID: houseID
        }, // replace this with attributes you need
    };
    try {
        const result = await API.post('LambdaSimpleProxy', '/presignupcheck', myInit);
        console.log("getUserByHouse results", result)
        return result
    } catch (err) {
        console.log("err", err)
        return false
    }

}
const registrUser = async (userObject) => {

    const myInit = {
        body: userObject
    }
    try {
        const result = await API.post('LambdaSimpleProxy', '/regiternewuser', myInit);
        return result
    } catch (err) {
        console.log("err", err)
        return false
    }
}
const getUserInfo = async (email) => {
    const myInit = {
        body:{
            userEmail: email
        }
    }
    try{
        const result = await API.post('LambdaSimpleProxy', '/getuserbyemail', myInit)
        return result 
    }catch(err){
        return err;
    }
    
}
const handleDeivceForNotifications = async (email, action) => {
    const FCMToken = await messaging().getToken();
    const myInit = {
        body:{
            userEmail: email, 
            case: action, 
            deviceID: DeviceInfo.getDeviceId(), 
            FCMToken: FCMToken
        }
    }
    try{
        const result = await API.post('LambdaSimpleProxy', '/devicenotificationcheck', myInit)
        console.log(result)
        return result 
    }catch(err){
        return err;
    }
}

const getNotifications = async (email) => {
    const myInit = {
        body:{
            userEmail: email, 
        }
    }
    try{
        const result = await API.post('LambdaSimpleProxy', '/getnotifications', myInit)
        return result 
    }catch(err){
        return err;
    }
}

const setReadNotification = async (nid) => {
    const myInit = {
        body:{
            notificationID: nid,
        }
    }
    try{
        const result = await API.post('LambdaSimpleProxy', '/updatenotification', myInit)
        return result 
    }catch(err){
        return err;
    }
}
export {
    getUserByHouse,
    registrUser,
    getUserInfo,
    handleDeivceForNotifications,
    getNotifications, 
    setReadNotification
}