
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Amplify, { Auth } from 'aws-amplify';
import { connect } from 'react-redux'
import awsconfigsclient from '../common/aws-configs'
import { handleDeivceForNotifications } from '../common/api'
import { Button } from 'react-native-elements';
import LandingPage from './LandingPage';
import MainStatisticsPage from './StatisticsComponents/MainStatisticsPage';
import { fetchUserData } from '../Redux/actions/UserDataActions/action';
Amplify.configure(awsconfigsclient);
function InitRouting(props) {
    const [testing, setTesting] = useState(0)
    useEffect(() => {
        Auth.currentAuthenticatedUser()
            .then(user => {
                handleDeivceForNotifications(user.attributes.email, "check")
                props.fetchUserDataFunc(user.attributes.email)
                setTesting(1)
            })
            .catch((err) => {
                setTesting(2)
                console.log(err)
            });
    }, [])
    if (testing === 1) {
        return (<MainStatisticsPage navigation={props.navigation}/>)
    } else if (testing === 2) {
        return (<LandingPage navigation={props.navigation}/>)
    } else {
        return (
            <View>
                <Text>Loading</Text>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        marginTop: 50,
        display: 'flex',
        alignItems: 'center',
        height: "100%"
    },
    welcomeText: {
        fontSize: 24,
        marginBottom: 50
    },
    OrText: {
        fontSize: 20,
        marginBottom: 20,
        marginTop: 20
    },
    buttonContainer: {
        width: "80%"
    }
});

const mapDispatchToProps = (dispatch)=> ({
   fetchUserDataFunc : (email) => dispatch(fetchUserData(email))
  })
  export default connect(null, mapDispatchToProps)(InitRouting);