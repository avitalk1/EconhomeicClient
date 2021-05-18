import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SimpleLineIcons, MaterialCommunityIcons, Octicons } from '@expo/vector-icons'
import MainStatisticsPage from '../StatisticsComponents/MainStatisticsPage'
import StatisticsGraphs from '../StatisticsComponents/StatisticsGraphs'
import NotificationList from '../Notifications/NotificationList'
import Menu from '../Menu';
import { styles } from '../styles';


const Tab = createBottomTabNavigator();

function MyTabs() {
    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
            }}
            tabBarOptions={{
                activeTintColor: '#ffffff',
                style: {
                    backgroundColor: '#10375C',
                }
            }}
        >
            <Tab.Screen
                name="MAIN_STATISTICS_PAGE"
                component={MainStatisticsPage}
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
                component={NotificationList}
                options={{
                    tabBarLabel: 'Notifications',
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="bell" color={color} size={size} />
                    ),
                }}
            />
            <Tab.Screen
                name="STATISTICS_GRAPHS"
                component={StatisticsGraphs}
                options={{
                    tabBarLabel: 'Statistics',
                    tabBarIcon: ({ color, size }) => (
                        <Octicons name="graph" size={size} color={color} />
                    ),
                }}
            />
             <Tab.Screen
                name="LEFT_MENU"
                component={Menu}
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
