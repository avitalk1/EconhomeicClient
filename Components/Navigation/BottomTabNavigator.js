import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { SimpleLineIcons, MaterialCommunityIcons, Octicons } from '@expo/vector-icons'
import MainStatisticsPage from '../StatisticsComponents/MainStatisticsPage'
import StatisticsGraphs from '../StatisticsComponents/StatisticsGraphs'
import NotificationList from '../Notifications/NotificationList'
import Menu from '../MenuPage';
import { styles ,headerStyle } from '../styles';
import AutoActions from '../Menu/AutoActions';
import Constraints from '../Menu/Constraints';
import Account from '../Menu/Account';


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

        </NotificationStack.Navigator>
    );
}
function GraphStackScreen() {
    return (
        <GraphsStack.Navigator
            screenOptions={screenOptionsStyle}
        >
            <GraphsStack.Screen name="Statistics Graphs" component={StatisticsGraphs} />

        </GraphsStack.Navigator>
    );
}
function MenuStackScreen() {
    return (
        <MenuStack.Navigator
            screenOptions={screenOptionsStyle}
        >
            <MenuStack.Screen name="Menu" component={Menu} />
            <MenuStack.Screen name="AUTOACTIONS" component={AutoActions} options={{ title: 'Automation Actions' }} />
            <MenuStack.Screen name="CONSTRAINTS" component={Constraints} options={{ title: 'Constraints' }} />
            <MenuStack.Screen name="ACCOUNT" component={Account} options={{ title: 'Account' }} />
        </MenuStack.Navigator>
    );
}

function MyTabs() {
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


export default MyTabs;
