import React, { useState } from 'react';
import { View, Text, TextInput, SafeAreaView } from 'react-native';
import { connect } from 'react-redux'
import { Input, Icon, Button } from 'react-native-elements';
import { userDataUpdate } from '../../Redux/actions/UserDataActions/action';
import { styles } from '../styles';
import { Entypo } from '@expo/vector-icons';



function ChangePassword(props) {
    console.log(JSON.stringify(props.route,null,2))
    const [eyeIcon, seteyeIcon] = useState("eye")
    const [passwordShow, setpasswordShow] = useState(false)

    const changeIcon = async () => {
        let temp = eyeIcon === "eye" ? "eye-with-line" : "eye";
        let pass= !passwordShow;
        setpasswordShow(pass);
        seteyeIcon(temp)
    }

    const handleSubmit = async () => {
        props.navigation.goBack();
    }
    return (
        <SafeAreaView style={styles.constrainsContainer}>
            <View>
                <Input
                    placeholder='Enter current password'
                    secureTextEntry={passwordShow}
                    leftIcon={
                        <Icon
                            name='lock'
                            size={24}
                            color='black'
                        />
                    }
                    rightIcon={
                        <Entypo name={eyeIcon} size={24} color="black" onPress={() =>changeIcon()}/>
                    }
                />
                <Input
                    placeholder='Enter new password'
                    secureTextEntry={passwordShow}
                    leftIcon={
                        <Icon
                            name='lock'
                            size={24}
                            color='black'
                        />
                    }
                    rightIcon={
                        <Entypo name={eyeIcon} size={24} color="black" onPress={() =>changeIcon()}/>
                    }
                />
                <Input
                    placeholder='Confirm password'
                    secureTextEntry={passwordShow}
                    leftIcon={
                        <Icon
                            name='lock'
                            size={24}
                            color='black'
                        />
                    }
                    rightIcon={
                        <Entypo name={eyeIcon} size={24} color="black" onPress={() =>changeIcon()}/>
                    }
                />
            </View>
            <View style={styles.container}>
                <View style={styles.buttonContainer}>
                    <Button
                        buttonStyle={styles.button}
                        title="Submit"
                        onPress={handleSubmit}
                    />
                </View>
            </View>
        </SafeAreaView>
    );
}


const mapStateToProps = (store) => ({
    userInfo: store.userData
});

const mapDispatchToProps = (dispatch) => ({
    updateUserDataFunc: (data) => dispatch(userDataUpdate(data))
})
export default connect(mapStateToProps, mapDispatchToProps)(ChangePassword);