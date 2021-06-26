import React , {useState, useEffect} from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import { connect } from 'react-redux'
import { SimpleLineIcons, MaterialCommunityIcons, Octicons } from '@expo/vector-icons'
import MainStatisticsPage from '../StatisticsComponents/MainStatisticsPage'
import StatisticsGraphs from '../StatisticsComponents/StatisticsGraphs'
import Charts from '../Charts'
import NotificationList from '../Notifications/NotificationList'
import Menu from '../MenuPage';
import { styles ,headerStyle } from '../styles';
import Constraints from '../Menu/Constraints';
import ChangePassword from '../Menu/changePassword';
import Configuration from '../Menu/configuration'
import Account from '../Menu/Account';

import NotificationView from '../Notifications/NotificationView'
import PerDeviceViewMain from '../Charts/PerDeviceViewMain'
import PerDeviceViewCompare from '../Charts/PerDeviceViewCompare'
const navigationRef = React.createRef();

import TimeList from '../Menu/TimesList';



const Tab = createBottomTabNavigator();
const HomeStack = createStackNavigator();
const NotificationStack = createStackNavigator();
const GraphsStack = createStackNavigator();
const MenuStack = createStackNavigator();
const screenOptionsStyle = headerStyle;

function HomeStackScreen() {
    return (
        <HomeStack.Navigator
            screenOptions={screenOptionsStyle}
        >
            <HomeStack.Screen name="Main Statistics" component={MainStatisticsPage} />
        </HomeStack.Navigator>
    );
}
function NotificationStackScreen() {
    return (
        <NotificationStack.Navigator
            screenOptions={screenOptionsStyle}
        >
            <NotificationStack.Screen name="Notification" component={NotificationList} />
            <NotificationStack.Screen name="NotificationView" component={NotificationView} />

        </NotificationStack.Navigator>
    );
}
function GraphStackScreen() {
    return (
        <GraphsStack.Navigator
            screenOptions={screenOptionsStyle}
        >
            <GraphsStack.Screen name="CHARTS" component={Charts} />
            <GraphsStack.Screen name="PerDeviceViewMain" component={PerDeviceViewMain} />
            <GraphsStack.Screen name="PerDeviceViewCompare" component={PerDeviceViewCompare} />

        </GraphsStack.Navigator>
    );
}
function MenuStackScreen() {
    return (
        <MenuStack.Navigator
            screenOptions={screenOptionsStyle}
        >
            <MenuStack.Screen name="Menu" component={Menu} />
            <MenuStack.Screen name="CONSTRAINTS" component={Constraints} options={{ title: 'Constraints' }} />
            <MenuStack.Screen name="ACCOUNT" component={Account} options={{ title: 'Account' }} />
            <MenuStack.Screen name="CHANGE_PASSWORD" component={ChangePassword} options={{ title: 'Password' }} />
            <MenuStack.Screen name="CONFIGURATION" component={Configuration} options={{ title: 'Configuration' }} />
            <MenuStack.Screen name="TIMES" component={TimeList} options={{ title: 'Times' }} />
        </MenuStack.Navigator>
    );
}



function MyTabs(props) {
   useEffect(()=>{
       if(props.isSignedInStatus.notificationId != false){
        props.navigate("NOTIFICATION_LIST")
       }
    
   }, [props.isSignedInStatus.notificationId])
    return (
        <Tab.Navigator
            tabBarOptions={{
                activeTintColor: '#ffffff',
                style: {
                    backgroundColor: '#10375C',
                }
            }}
        >
            <Tab.Screen
                name="MAIN_STATISTICS_PAGE"
                component={HomeStackScreen}
                options={{
                    tabBarLabel: 'Home',
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="home" color={color} size={size} />
                    ),
                }}
                style={styles.bottomNav}
            />
            <Tab.Screen
                name="NOTIFICATION_LIST"
                component={NotificationStackScreen}
                options={{
                    tabBarLabel: 'Notifications',
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="bell" color={color} size={size} />
                    ),
                }}
            />
            <Tab.Screen
                name="STATISTICS_GRAPHS"
                component={GraphStackScreen}
                options={{
                    tabBarLabel: 'Statistics',
                    tabBarIcon: ({ color, size }) => (
                        <Octicons name="graph" size={size} color={color} />
                    ),
                }}
            />
            <Tab.Screen
                name="MENU"
                component={MenuStackScreen}
                options={{
                    tabBarLabel: 'More',
                    tabBarIcon: ({ color, size }) => (
                        <SimpleLineIcons name="menu" size={size} color={color} />
                    ),
                }}
            />

        </Tab.Navigator>
    );
}

const mapStateToProps = (store) => ({
    isSignedInStatus: store.isSignedIn
});
export default connect(mapStateToProps, null)(MyTabs);