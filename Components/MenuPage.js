import React from 'react';
import { View, Text } from 'react-native';
import { Auth } from 'aws-amplify'
import { connect } from 'react-redux'
import { handleDeivceForNotifications } from '../common/api'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { styles } from './styles';
import { Avatar } from 'react-native-paper';
import { MaterialCommunityIcons, AntDesign, MaterialIcons, Ionicons, Entypo } from '@expo/vector-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { changeIsSignedInStatus, changeIsSignedInEmail } from '../Redux/actions/IsSignedInActions/action';

function Menu(props) {
    const handleLogout = () => {
        Auth.currentAuthenticatedUser()
            .then(user => {
                handleDeivceForNotifications(user.attributes.email, "deactivate")
            })
        Auth.signOut().then(() => {
            props.changeIsSignedInStatusFunc(2)
            props.changeIsSignedInEmailFunc(null)
        })
    }
    const handleAutoAction = () => {
        props.navigation.navigate('AUTOACTIONS')
    }
    const handleConstraints = () => {
        props.navigation.navigate('CONSTRAINTS')
    }
    const handleAccount = () => {
        props.navigation.navigate('ACCOUNT')
    }

    return (
        <View>
            <View style={styles.avatarImg}>
                <Avatar.Image size={80} source={require('../assets/womenAvatar.png')} />
                <Text style={styles.MenuName}>{`${props.userInfo.data.userDetails.firstName}`} {`${props.userInfo.data.userDetails.lastName}`}!</Text>
            </View>
            <View style={styles.MenuContainer}>
                <View style={styles.MenuLines}>
                    <TouchableOpacity onPress={handleAccount} >
                        <View style={styles.MenuBox}>
                            <MaterialCommunityIcons name="account-circle-outline" style={styles.MenuIcon} color="#4D105C" />
                            <Text style={styles.generalText}>Account</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handleConstraints}>
                        <View style={styles.MenuBox} >
                            <Ionicons name="settings-outline" style={styles.MenuIcon} color="#459BFF" />
                            <Text style={styles.generalText}>Constraints</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={styles.MenuLines}>
                    <TouchableOpacity onPress={handleAutoAction}>
                        <View style={styles.MenuBox} >
                            <AntDesign name="plus" style={styles.MenuIcon} color="green" />
                            <Text style={styles.generalText}>Auto Actions</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handleLogout}>
                        <View style={styles.MenuBox}>
                            <Entypo name="open-book" style={styles.MenuIcon} color="black" />
                            <Text style={styles.generalText}>Configeration</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={styles.MenuLines}>
                    <TouchableOpacity onPress={handleLogout}>
                        <View style={styles.MenuBox}>
                            <MaterialIcons name="power-settings-new" style={styles.MenuIcon} color='red' />
                            <Text style={styles.generalText}>Logout</Text>
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

const mapDispatchToProps = (dispatch) => ({
    changeIsSignedInStatusFunc: (status) => dispatch(changeIsSignedInStatus(status)),
    changeIsSignedInEmailFunc: (email) => dispatch(changeIsSignedInEmail(email))
})
export default connect(mapStateToProps, mapDispatchToProps)(Menu);

