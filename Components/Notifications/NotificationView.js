import React, {useState, useEffect} from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux'
import { notificationUpdate } from '../../Redux/actions/NotificationActions/action'
import { Divider, Button } from 'react-native-elements';
import { styles } from '../styles';
import {updateNotifyUserWithAnswer, setReadNotification} from '../../common/api'
import LinearGradient from 'react-native-linear-gradient';

function NotificationView(props) {
    const [isAnswered, setIsAnswered] = useState(false)
    const [userAnswer, setUserAnswer] = useState(0)
    useEffect(()=>{
        if(props.route.params.params.data.readAt != "unread"){
            setIsAnswered(true)
        }
    }, [])
    const handleButtonActionClick = async (value) => {
        setUserAnswer(value)
        updateNotifyUserAndNotification(value)
        let today = new Date()
        today = today.toLocaleString()
        props.notificationUpdateFunc({notificationId:props.route.params.params.data.NotificationsID, dateRead:today })
        setIsAnswered(true)
    }

    const updateNotifyUserAndNotification = (value) => {
        async function updateFunction() {
            await updateNotifyUserWithAnswer(props.route.params.params.data.NotificationsID, value)
            await setReadNotification(props.route.params.params.data.NotificationsID)
        }
        updateFunction() 
    }
    return (
        <View style={styles.notificationContainer}>
            <View>
                <Text style={styles.messageDate}>{props.route.params.params.data.sentAt}</Text>
                <Text style={styles.messageTitle}>{props.route.params.params.data.title}</Text>
            </View>
            <Divider/>
            <View style={styles.messageBody}>
                <Text style={styles.messageBodyTxt}>{props.route.params.params.data.msg}</Text>
            </View>
            {
                props.route.params.params.data.notificationType == "action" && !isAnswered ?
                    <View style={styles.messageBtnContainer}>

                        <Button
                            title="Turn Off"
                            onPress={() => handleButtonActionClick(1)}
                            buttonStyle={[styles.messageBtn,{backgroundColor: '#89cf74'}]}
                        />

                        <Button
                            color="#841584"
                            title="Keep On"
                            onPress={() => handleButtonActionClick(2)}
                            buttonStyle={[styles.messageBtn,{backgroundColor: '#fc8b8b'}]}
                        />

                    </View>
                    :
                    <></>
            }
            {
                isAnswered && userAnswer != 0 ?
                <View>
                    <Text>Thank you for answering</Text>
                    <Text>{userAnswer == 1 ? "Turned Off" : "Kept On"}</Text>
                </View>:
                <></>
            }
        </View>
    );


}
const mapDispatchToProps = (dispatch) => ({
    notificationUpdateFunc: (data) => dispatch(notificationUpdate(data)),
})
export default connect(null, mapDispatchToProps)(NotificationView);
