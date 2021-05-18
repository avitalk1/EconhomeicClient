import React from 'react';
import { View, Text } from 'react-native';
import { Auth } from 'aws-amplify'
import { connect } from 'react-redux'
import { handleDeivceForNotifications } from '../common/api'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { styles } from './styles';
import { Avatar } from 'react-native-paper';
import { MaterialCommunityIcons, AntDesign, MaterialIcons, Ionicons } from '@expo/vector-icons';
import { Divider } from 'react-native-elements';

function Menu(props) {
    const handleLogout = () => {
        Auth.currentAuthenticatedUser()
            .then(user => {
                handleDeivceForNotifications(user.attributes.email, "deactivate")
            })
        Auth.signOut().then(
            props.handleLogoutAction()
        )
    }
    const handleLogoutActionFunction = () => {
        navigate('LANDING_PAGE')
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
        <View style={styles.container}>
            <View style={styles.avatarImg}>
                <Avatar.Image size={150} source={require('../assets/womenAvatar.png')} />
            </View>
            <View>
                <Text style={styles.daysText}>Hello {`${props.userInfo.data.userDetails.firstName}`}!</Text>
                <Divider style={{ backgroundColor: '#10375C' , width:200 }} />
            </View>
            <View style={styles.MenuContainer}>
                <TouchableOpacity onPress={handleLogout}>
                    <View style={styles.MenuLines}>
                        <MaterialCommunityIcons name="account-circle-outline" size={24} color="#10375C" />
                        <Text style={styles.MenuText}>Account</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleLogout}>
                    <View style={styles.MenuLines}>
                        <Ionicons name="settings-outline" size={24} color="#10375C" />
                        <Text style={styles.MenuText}>Constraints</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleLogout}>
                    <View style={styles.MenuLines}>
                        <AntDesign name="plus" size={24} color="#10375C" />
                        <Text style={styles.MenuText}>Auto Actions</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleLogout}>
                    <View style={styles.MenuLines}>
                        <MaterialIcons name="power-settings-new" size={24} color="#10375C" />
                        <Text style={styles.MenuText}>Logout</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>

    );
}
const mapStateToProps = (store) => ({
    userInfo: store.userData,
});


export default connect(mapStateToProps, null)(Menu);

