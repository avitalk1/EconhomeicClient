import React from 'react';
import { View, Text} from 'react-native';
import Amplify from 'aws-amplify';
import awsconfigsclient from '../../common/aws-configs'

Amplify.configure(awsconfigsclient);
function StatisticsGraphs(props) {
    return (<View><Text>Hello I am signin</Text></View>)
};
  
export default StatisticsGraphs;
