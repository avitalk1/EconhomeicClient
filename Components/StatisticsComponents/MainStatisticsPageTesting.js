import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Input, Button } from 'react-native-elements';
import { connect } from 'react-redux'
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import Amplify from 'aws-amplify';
import awsconfigsclient from '../../common/aws-configs'
import { getUserInfo } from '../../common/api'
import { mainStatisticsFunction } from './statisticFunctions'
Amplify.configure(awsconfigsclient);
function MainStatisticsPageTesting(props) {
    return (<View><Text>Hello I am signin</Text></View>)
};
  
export default MainStatisticsPageTesting;
