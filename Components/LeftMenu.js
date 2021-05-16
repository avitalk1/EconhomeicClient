import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Auth } from 'aws-amplify'
import { handleDeivceForNotifications } from '../common/api'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { Divider } from 'react-native-elements';
function LeftMenu(props) {
    const handleLogout = () => {
        Auth.currentAuthenticatedUser()
            .then(user => {
                handleDeivceForNotifications(user.attributes.email, "deactivate")
            })
        Auth.signOut().then(
            props.handleLogoutAction()
        )
    }
    const handleGotoNotifications = () => {
        props.handleCloseMenu()
        props.navigation('NOTIFICATION_LIST')
    }

    const handleGotoMainPage = () => {
        props.handleCloseMenu()
        Auth.currentAuthenticatedUser().then(user => {
            props.navigation('MAIN_STATISTICS_PAGE', {
                userInfo: user.attributes.email,
            })
        }).catch(err => console.log(err))
    } 
    return (
        <View style={styles.menuContainer}>
            <View>
                <TouchableOpacity onPress={handleLogout}>
                    <View style={styles.menuOptionsTextContainer}>
                        <Text style={styles.menuOptionsText}>Logout</Text>
                    </View>
                </TouchableOpacity>
                <Divider style={{ backgroundColor: 'blue' }} />
            </View>
            <View>
            <TouchableOpacity onPress={handleGotoNotifications}>
                <View style={styles.menuOptionsTextContainer}>
                    <Text style={styles.menuOptionsText}>Notifications</Text>
                </View>
             </TouchableOpacity>
             <Divider style={{ backgroundColor: 'blue' }} />
            </View>

            <View>
            <TouchableOpacity onPress={handleGotoMainPage}>
                <View style={styles.menuOptionsTextContainer}>
                    <Text style={styles.menuOptionsText}>Main</Text>
                </View>
             </TouchableOpacity>
             <Divider style={{ backgroundColor: 'blue' }} />
            </View>

            <View>
                <TouchableOpacity onPress={() => props.handleCloseMenu()}>
                    <View style={styles.menuOptionsTextContainer}>
                        <Text style={styles.menuOptionsText} >Close Menu</Text>
                    </View>
                </TouchableOpacity>
                <Divider style={{ backgroundColor: 'blue' }} />
            </View>

        </View>
        
    );
}
const styles = StyleSheet.create({
    menuContainer: {
        position: 'absolute',
        zIndex: 1,
        elevation: 1,
        width: '30%',
        height: '100%',
        backgroundColor: "red",
        color:"red"
    },
    menuOptionsTextContainer:{
        display:'flex', 
        alignItems:'center', 
        justifyContent:'center',
        width:'100%', 
        marginTop:5, 
        marginBottom:5
    },
    menuOptionsText:{
        fontSize:16
    }
});

export default LeftMenu

