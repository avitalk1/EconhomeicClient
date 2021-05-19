import React from 'react';
import { View, Text } from 'react-native';
import { Auth } from 'aws-amplify'
import { connect } from 'react-redux'
import { handleDeivceForNotifications } from '../common/api'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { styles } from './styles';
import { Avatar } from 'react-native-paper';
import { MaterialCommunityIcons, AntDesign, MaterialIcons, Ionicons } from '@expo/vector-icons';
import { Icon } from 'react-native-elements'

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
        <View>
            <Text style={styles.MSPageTitle}>Menu</Text>
            <View style={styles.avatarImg}>
                <Avatar.Image size={80} source={require('../assets/womenAvatar.png')} />
                <Text style={styles.MenuName}>{`${props.userInfo.data.userDetails.firstName}`} {`${props.userInfo.data.userDetails.lastName}`}!</Text>
            </View>
            <View style={styles.MenuContainer}>
                <View style={styles.MenuLines}>
                    <TouchableOpacity >
                        <View style={styles.MenuBox}>
                            <MaterialCommunityIcons name="account-circle-outline" size={24} color="#10375C" />
                            <Text style={styles.MenuText}>Account</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity >
                        <View style={styles.MenuBox}>
                            <Ionicons name="settings-outline" size={24} color="#10375C" />
                            <Text style={styles.MenuText}>Constraints</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={styles.MenuLines}>
                    <TouchableOpacity>
                        <View style={styles.MenuBox} >
                            <AntDesign name="plus" style={styles.MenuIcon} />
                            <Text style={styles.MenuText}>Auto Actions</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handleLogout}>
                        <View style={styles.MenuBox}>
                            <MaterialIcons name="power-settings-new" style={styles.MenuIcon} color="red"/>
                            <Text style={styles.MenuText}>Logout</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        </View>

    );
}
const mapStateToProps = (store) => ({
    userInfo: store.userData,
});


export default connect(mapStateToProps, null)(Menu);

