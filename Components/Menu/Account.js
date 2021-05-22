import React, { useEffect, useState } from 'react';
import { View, Text, Button  } from 'react-native';
import { Auth } from 'aws-amplify'
import { styles } from '../styles';
import awsconfigsclient from '../../common/aws-configs'
import { userDataUpdate } from '../../Redux/actions/UserDataActions/action';
import { connect } from 'react-redux'
import Amplify from 'aws-amplify';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

Amplify.configure(awsconfigsclient);

function Account(props) {

    return (
            <View>
                <Text>Hello Account!</Text>
            </View>
    );


}

const mapStateToProps = (store) => ({
    userInfo: store.userData,
});

const mapDispatchToProps = (dispatch)=> ({
   updateUserDataFunc:(data)=> dispatch(userDataUpdate(data))
  })
export default connect(mapStateToProps, mapDispatchToProps)(Account);

